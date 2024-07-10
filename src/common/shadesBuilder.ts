/*
 * Copyright (c) 2023 Discover Financial Services
 * Licensed under Apache-2.0 License. See License.txt in the project root for license information
 */
import * as chroma from "chroma-js";
import { Shade } from "./shade";
import { Settings } from "./settings";
import { Logger } from "../util/logger";
import { Util } from "../util/util";

const log = new Logger("shb");

export interface ShadeGroup {
    shade: Shade;
    halfShade: Shade;
    onShade: Shade;
}

interface IV {
    idx: number;
    val: number;
}

interface LMH {
    low: IV;
    mid: IV;
    high: IV;
}

interface Color {
    name: string;
    light: ColorMode;
    dark: ColorMode;
}

interface ColorMode {
    key: string;
    name: string;
    shades: Shade[];
    color: Color;
}

export interface BuildShadesArgs {
    lm: boolean;
    settings: Settings;
}

export interface SearchShadesArgs {
    condition: (shade: Shade) => boolean;
    add1: number;
    add2: number;
}

/**
 * A shade builder.
 * 
 * @category Utilities
 */
export class ShadesBuilder {

    public static build(shade: Shade, lm: boolean, settings: Settings): Shade[] {
        const sb = new ShadesBuilder(shade, lm, settings);
        return sb.build();
    }

    private shade: Shade;
    private lm: boolean;
    private settings: Settings;
    private prime: number;

    constructor(shade: Shade, lm: boolean, settings: Settings) {
        this.shade = shade;
        this.lm = lm;
        this.settings = settings;
        this.prime = shade.getLabel();
    }

    public build(): Shade[] {
        // calculate how many lighter shades need to get built //
        const numLighterColors = (this.prime / 100) + 1;
        // calculate how many darker shades need to get built //
        const numDarkerColors = ((900 - this.prime) / 100) + 1
        // build hex values for lighter shades
        let lightScale: string[];
        if (numLighterColors > 1) {
            lightScale = chroma.scale(['#FFFFFF', this.shade.hex]).correctLightness(true).colors(numLighterColors);
        } else {
            lightScale = [this.shade.hex]
        }
        // build hex values for darker shades
        let darkScale: string[];
        if (numDarkerColors > 1) {
            const endShade = this.shade.mix(Shade.FULL_BLACK, this.lm ? .95 : .98);
            darkScale = chroma.scale([this.shade.hex, endShade.hex]).correctLightness(true).colors(numDarkerColors);
        } else {
            darkScale = [this.shade.hex]
        }
        // remove the final lighter shade, why?
        if (lightScale.length > 0) {
            lightScale.splice(-1)
        }
        // Merge light and dark scale values into a single colorScale
        const colorScale = [...lightScale, ...darkScale];
        // Generate a shade for each color scale
        const rtn: Shade[] = [];
        for (let i = 0; i < colorScale.length; i++) {
            // 
            let newRGB: any;
            if (i == 0) {
                const fcn = chroma.scale(['#FFFFFF', this.shade.hex]);
                const scale = this.lm ? 100 / (this.prime * 2) : (100 / (this.prime * 4)) * 3;
                newRGB = fcn(scale);
            } else {
                newRGB = colorScale[i];
            }
            newRGB = this.triangle(i, newRGB);
            var shade = i * 100;
            var textShade: Shade;
            /*
            if (Shade.fromRGBArray(newRGB).getContrastShade(args.lm).hex == Shade.WHITE.hex) {
               textShade = Shade.WHITE;
            } else {
               textShade = args.settings.darkText;
            }
            // convert the color to hex //
            newRGB = Util.rgbArrayToHex(newRGB);
            */

            // based on the mode light or dark - run the appropriate check to see if the color and on color meet the contrats ratio of wcagContrast or if the shade needs to be lighted or darked //
            // TODO: Pass minRatio of 4.5 for AA and 7.1 for AAA.
            rtn.push(this.buildShade(args.lm));
            //
            // loop through each shade //
            i++;
        }
        if (!this.lm) {
            // HERE: 'theme' is the name of the color
            this.rescale(theme, args.lm) // args don't match up
        }
        return rtn;
    }

    // WHy is this named triangle?  
    private triangle(i: number, newRGB: number[]): Shade {
        const primeHsl = chroma(this.shade.hex).hsl();
        const primeSaturation = primeHsl[1];
        const maxSaturation = Math.max(primeSaturation, 1);
        const ihsl = chroma(newRGB).hsl();
        let change: number;
        let newSaturation: number;
        const primeIdx = this.prime / 100;
        if (primeIdx == i) {
            change = 1;
            newSaturation = primeSaturation * change;
        } else if (primeIdx <= 7) {
            if (i <= 7) {
                change = i / primeIdx;
            } else {
                change = (7 - (i - 7) - 2) / primeIdx;
            }
            newSaturation = primeSaturation * change;
        } else {
            const base = (7 - (i - 7) - 2);
            const seven = base * primeSaturation;
            change = i <= 7 ? i / 7 : base / 7;
            newSaturation = seven * change;
        }
        newSaturation = Math.min(newSaturation, maxSaturation);
        const hex = chroma.hsl(ihsl[0], newSaturation, ihsl[2]).hex();
        return Shade.fromHex(hex);
    }

    private checkContrast(theme, color, mode) {
        // Determine the contrast of "color" to both a light text background and dark text background
        var lightTextArray = hextoRGBArray(lightText);
        var rgbArray       = hextoRGBArray(rgb2hex(color));
        var shade = theme.split('-')[2];
        var newRGB = "rgb(" + rgbArray +")"
        var lightArray = lightTextArray
        var light = contrast(lightArray, rgbArray);
        var dark  = contrast(darkTextArray, rgbArray);
        var text_color, textTint, contrastRatio
        var contrastRatio = contrast(lightArray, rgbArray);
        var elevationHex;
        if ( light > dark ) { // The contrast is greater on a light text background
          text_color = lightArray; // white
          var textTint = 'light';
          if (mode == 'dark') { 
            var colorHex = rgb2hex(color)
            /// for dark mode - lighten color light text ///
            var newText = lighten(colorHex,mixer)
            var newArray = hextoRGBArray(colorHex);
            var lightArray = hextoRGBArray(newText)
            var elevationHex, textHex
            contrastRatio = contrast(lightArray, newArray);
            var i = .00
            // Darken the shade until the contrast ratio to light text background meets WCAG
            while (contrastRatio < wcagContrast) {
              var hex = (chroma(color).darken(i)).toString()
              var textHex =  (mixColors(hex,'#ffffff',mixer )).toString();
              var textArray = hextoRGBArray(textHex);
              var newArray = hextoRGBArray(hex);
              var contrastRatio = contrast(newArray, textArray);
              i = i + .01
            }
            var newHex   = (chroma(rgb2hex(color)).darken(i)).toString()
            var rgbArray = hextoRGBArray(newHex);
            var textTint = 'light';
            buildColor(theme,mode,rgbArray,text_color,contrastRatio)
            return false;
          }
        } else { // The contrast is greater on a dark text background
          text_color = darkTextArray; // dark
          var textTint = 'dark';
          contrastRatio = contrast(text_color, rgbArray);
        }
        if (textTint == 'light') {
          var buildText = lightTextArray
        } else {
          var buildText =  darkTextArray
        }
        contrastRatio  = contrastRatio.toFixed(2)
        if (contrastRatio < wcagContrast) {
          var darkCount      = adjustDarkerCount(theme, newRGB, lightArray, contrastRatio, mode)
          var lightCount     = adjustLighterCount(theme, newRGB, darkTextArray, contrastRatio, mode)
          if (darkCount < lightCount || shade >= 600) {
            adjustColorDarker(theme, newRGB, lightArray, contrastRatio, mode)
          } else {
            adjustColorLighter(theme, newRGB, darkTextArray, contrastRatio, mode)
          }
        } else {
          console.log('theme: ' + theme + ' ,text color:' + text_color + ', rgbArray' +  rgbArray  + ', contrastRatio: ' + contrastRatio)
          buildColor(theme,mode,rgbArray,buildText,contrastRatio)
        }
      }

}