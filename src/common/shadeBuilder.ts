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
    lightMode: boolean;
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
export class ShadeBuilder {

    public static build(shade: Shade, lightMode: boolean, settings: Settings): Shade[] {
        const sb = new ShadeBuilder(shade, lightMode, settings);
        return sb.build();
    }

    private shade: Shade;
    private lightMode: boolean;
    private settings: Settings;
    private prime: number;

    constructor(shade: Shade, lightMode: boolean, settings: Settings) {
        this.shade = shade;
        this.lightMode = lightMode;
        this.settings = settings;
        this.prime = shade.getLabel();
    }

    public build(): Shade[] {
        // calculate how many lighter shades need to get built //
        const numLighterShades = (this.prime / 100) + 1;
        // calculate how many darker shades need to get built //
        const numDarkerShades = ((900 - this.prime) / 100) + 1
        // build hex values for lighter shades
        let lightScale: string[];
        if (numLighterShades > 1) {
            lightScale = chroma.scale(['#FFFFFF', this.shade.hex]).correctLightness(true).colors(numLighterShades);
        } else {
            lightScale = [this.shade.hex]
        }
        // build hex values for darker shades
        let darkScale: string[];
        if (numDarkerShades > 1) {
            const endShade = this.shade.mix(Shade.FULL_BLACK, this.isLightMode() ? .95 : .98);
            darkScale = chroma.scale([this.shade.hex, endShade.hex]).correctLightness(true).colors(numDarkerShades);
        } else {
            darkScale = [this.shade.hex]
        }
        // remove the final lighter shade because it is pure white
        if (lightScale.length > 0) {
            lightScale.splice(-1)
        }
        // Merge light and dark scale values into a single colorScale
        const colorScale = [...lightScale, ...darkScale];
        // Generate a shade for each color scale
        const rtn: Shade[] = [];
        for (let i = 0; i < colorScale.length; i++) {
            let newHex: string;
            if (i == 0) {
                const fcn = chroma.scale(['#FFFFFF', this.shade.hex]);
                const scale = this.isLightMode() ? 100 / (this.prime * 2) : (100 / (this.prime * 4)) * 3;
                newHex = fcn(scale);
            } else {
                newHex = colorScale[i];
            }
            let shade = Shade.fromHex(newHex);
            // Triangularize the shade 
            shade = this.triangularize(shade);
            // based on the mode light or dark - run the appropriate check to see if the color and on color meet the contrast ratio of wcagContrast or
            // if the shade needs to be lighted or darked
            shade = this.adjustShadeToMeetRequirements(shade);
            shade.setIndex(i);
            rtn.push(shade);
            rtn.push(this.buildShade(args.lm));
        }
        if (this.isDarkMode()) {
            // HERE: 'theme' is the name of the color
            this.rescale(theme, args.lm) // args don't match up
        }
        return rtn;
    }

    // Increases the chroma or saturation of a color until about 700 and then comes back down.
    // This is most significant for the way it looks in light mode.
    // See https://colorspace.r-forge.r-project.org/articles/hcl_palettes.html for more info.
    private triangularize(shade: Shade): Shade {
        const primeHsl = chroma(this.shade.hex).hsl();
        const primeSaturation = primeHsl[1];
        const maxSaturation = Math.max(primeSaturation, this.isLightMode() ? this.settings.lmMaxChroma : this.settings.dmMaxChroma);
        const ihsl = chroma(shade.rgbArray).hsl();
        let newSaturation: number;
        const primeIdx = this.prime / 100;
        if (primeIdx == shade.index) {
            newSaturation = primeSaturation;
        } else if (primeIdx <= 7) {
            let change: number;
            if (shade.index <= 7) {
                change = shade.index / primeIdx;
            } else {
                change = (7 - (shade.index - 7) - 2) / primeIdx;
            }
            newSaturation = primeSaturation * change;
        } else {
            const base = (7 - (shade.index - 7) - 2);
            const seven = base * primeSaturation;
            const change = shade.index <= 7 ? shade.index / 7 : base / 7;
            newSaturation = seven * change;
        }
        newSaturation = Math.min(newSaturation, maxSaturation);
        const hex = chroma.hsl(ihsl[0], newSaturation, ihsl[2]).hex();
        return Shade.fromHex(hex);
    }

    /**
     * Adjust the shade (if needed) to meet the WCAG requirements
     * @param shade The shade to be adjusted
     * @returns The adjusted shade
     */
    private adjustShadeToMeetRequirements(shade: Shade): Shade {
        // Determine the contrast of "color" to both a light text background and dark text background
        const lightContrastRatio = this.shade.getContrastRatio(this.settings.lightText);
        const darkContrastRatio = this.shade.getContrastRatio(this.sett