/*
 * Copyright (c) 2023 Discover Financial Services
 * Licensed under Apache-2.0 License. See License.txt in the project root for license information
 */
import * as chroma from "chroma-js";
import { Logger } from "../util/logger";
import { Node } from "./node";
import { PropertyString, PropertyStringSelectable, PropertyNumber, PropertyNumberRange } from "./props";
import { Shade } from "./shade";
import { ShadeUtil } from "./shadeUtil";
import { WCAGLevel } from "./wcag";

const log = new Logger("shb");

/**
 * A shade builder.
 * 
 * @category Utilities
 */
export class ShadeBuilder {

    public readonly lm: boolean;
    public readonly designSystemCfg: ShadeBuilderCfgPerDesignSystem;
    public readonly colorCfg: ShadeBuilderCfgPerColor;

    constructor(lm: boolean, designSystemCfg: ShadeBuilderCfgPerDesignSystem, colorCfg: ShadeBuilderCfgPerColor) {
        this.lm = lm;
        this.designSystemCfg = designSystemCfg;
        this.colorCfg = colorCfg;
    }

    public buildShades(shade: Shade): Shade[] {
        const prime = shade.getLabel();
        // calculate how many lighter shades need to get built //
        const numLighterShades = (prime / 100) + 1;
        // calculate how many darker shades need to get built //
        const numDarkerShades = ((900 - prime) / 100) + 1
        // build hex values for lighter shades
        let lightScale: string[];
        if (numLighterShades > 1) {
            lightScale = chroma.scale(['#FFFFFF', shade.hex]).correctLightness(true).colors(numLighterShades);
        } else {
            lightScale = [shade.hex]
        }
        // build hex values for darker shades
        let darkScale: string[];
        if (numDarkerShades > 1) {
            const endShade = shade.mix(Shade.FULL_BLACK, this.isLightMode() ? .95 : .98);
            darkScale = chroma.scale([shade.hex, endShade.hex]).correctLightness(true).colors(numDarkerShades);
        } else {
            darkScale = [shade.hex]
        }
        // remove the final lighter shade because it is pure white
        if (lightScale.length > 0) {
            lightScale.splice(-1)
        }
        // Merge light and dark scale values into a single colorScale
        const colorScale = [...lightScale, ...darkScale];
        // Generate a shade for each color scale
        const shades: Shade[] = [];
        for (let i = 0; i < colorScale.length; i++) {
            let newHex: string;
            if (i == 0) {
                const fcn = chroma.scale(['#FFFFFF', shade.hex]);
                const scale = this.isLightMode() ? 100 / (prime * 2) : (100 / (prime * 4)) * 3;
                newHex = fcn(scale).toString();
            } else {
                newHex = colorScale[i];
            }
            let newShade = Shade.fromHex(newHex);
            // Triangularize the shade 
            newShade = this.triangularize(shade, newShade);
            // based on the mode light or dark - run the appropriate check to see if the color and on color meet the contrast ratio of wcagContrast or
            // if the shade needs to be lighted or darked
            newShade = this.adjustShadeToMeetRequirements(newShade);
            newShade.setIndex(i);
            shades.push(newShade);
        }
        if (this.getWCAGLevel().shouldSmoothTransition(this.lm)) {
            this.smoothTransition(shades);
        }
        for (const shade of shades) {
            shade.setShadeBuilder(this);
        }
        return shades;
    }

    // Smooth the transition between the last shade with dark text background and the first shade with light text background
    private smoothTransition(shades: Shade[]): Shade[] {
        // Divide the list of shades into two groups: those with dark text and those with light text backgrounds
        const firstLight = this.findFirstShadeWithLightText(shades);
        const lastDark = shades[firstLight.index - 1] as Shade;
        const first = shades[0] as Shade;
        const last = shades[shades.length - 1] as Shade;
        const darkCount = lastDark.index + 1;
        const lightCount = shades.length - darkCount;
        // Scale the dark ones
        const darkScale = chroma.scale([first.hex, lastDark.hex]).correctLightness(true).colors(darkCount);
        // Scale the light ones
        const lightScale = chroma.scale([firstLight.hex, last.hex]).correctLightness(true).colors(lightCount);
        // Merge
        const scale = [...darkScale, ...lightScale];
        // Recreate shade objects for the newly scaled hex values
        for (let i = 0; i < shades.length; i++) {
            const shade = Shade.fromHex(scale[i]);
            shades[i] = shade;
            shade.setIndex(i);
        }
        return shades;
    }

    private findFirstShadeWithLightText(shades: Shade[]): Shade {
        for (const shade of shades) {
            if (!this.isOnShadeBlack(shade)) {
                return shade;
            }
        }
        throw new Error(`No first shade was found`);
    }

    private isOnShadeBlack(shade: Shade): boolean {
        shade = this.getOnShade(shade, this.lm);
        return shade.hex == Shade.BLACK.hex;
    }

    public getOnShade(shade: Shade, lm: boolean): Shade {
        return this.getContrastShade(shade, lm);
    }

    public getContrastShade(shade: Shade, lm: boolean): Shade {
        if (shade.onHex) {
            shade = Shade.fromHex(shade.onHex);
            if (!lm && shade.onHex === this.getLightTextShade().hex) {
                shade.setOpacity(this.getDarkModeLightTextOpacity());
            }
            return shade;
        }
        // Get contrast with black and white & return best ratio
        const blackRatio = shade.getContrastRatio(Shade.BLACK);
        let whiteRatio = shade.getContrastRatio(Shade.WHITE);
        if (!lm) whiteRatio = whiteRatio * this.getDarkModeLightTextOpacity();
        if (blackRatio > whiteRatio) {
            return Shade.BLACK;
        } else {
            if (lm) {
                return Shade.WHITE;
            }
            else {
                return Shade.WHITE_DM;
            }
        }
    }

    // Increases the chroma or saturation of a color until about 700 and then comes back down.
    // This is most significant for the way it looks in light mode.
    // See https://colorspace.r-forge.r-project.org/articles/hcl_palettes.html for more info.
    private triangularize(shade1: Shade, shade2: Shade): Shade {
        const primeHsl = chroma.hex(shade1.hex).hsl();
        const primeSaturation = primeHsl[1];
        const maxSaturation = Math.max(primeSaturation, this.getMaxChroma());
        const ihsl = chroma.hex(shade2.hex).hsl();
        let newSaturation: number;
        if (shade1.index == shade2.index) {
            newSaturation = primeSaturation;
        } else if (shade1.index <= 7) {
            let change: number;
            if (shade2.index <= 7) {
                change = shade2.index / shade1.index;
            } else {
                change = (7 - (shade2.index - 7) - 2) / shade1.index;
            }
            newSaturation = primeSaturation * change;
        } else {
            const base = (7 - (shade2.index - 7) - 2);
            const seven = base * primeSaturation;
            const change = shade2.index <= 7 ? shade2.index / 7 : base / 7;
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
        const lightContrastRatio = shade.getContrastRatio(this.getLightTextShade());
        const darkContrastRatio = shade.getContrastRatio(this.getDarkTextShade());
        if (lightContrastRatio > darkContrastRatio) {
            // The contrast ratio is larger on a light text background
            if (this.isDarkMode()) {
                shade = this.darkenToMeetWCAG(shade);
            }
        } else {
            shade = this.adjustShadeByContrastRatio(shade);
        }
        return shade;
    }

    private adjustShadeByContrastRatio(shade: Shade): Shade {
        let darkerShade: Shade = shade;
        let lighterShade: Shade = shade;
        const baseColor = this.isLightMode() ? Shade.WHITE : darkerShade.getElevationShade(this.getDarkModeLightTextOpacity());
        const minContrastRatio = this.getMinContrastRatioForSmallText();
        for (let count = 0; count <= 200; count++) {
            const darkerRatio = darkerShade.getContrastRatio(baseColor);
            const lighterRatio = lighterShade.getContrastRatio(Shade.BLACK);
            if (darkerRatio > lighterRatio) {
                if (darkerRatio >= minContrastRatio) {
                    if (this.isLightMode()) {
                        darkerShade.onHex = Shade.WHITE.hex;
                    } else {
                        darkerShade.onHex = Shade.WHITE_DM.hex;
                    }
                    log.debug(`Found shade after ${count} darken adjustments (ratio=${darkerRatio})`);
                    return darkerShade;
                }
            } else {
                if (lighterRatio >= minContrastRatio) {
                    lighterShade.onHex = Shade.BLACK.hex;
                    log.debug(`Found shade after ${count} lighten adjustments (ratio=${lighterRatio})`);
                    return lighterShade;
                }
            }
            darkerShade = darkerShade.adjust(Shade.DARKEN_MULTIPLIER);
            lighterShade = lighterShade.adjust(Shade.LIGHTEN_MULTIPLIER);
        }
        throw new Error(`Unable to find a shade for ${shade.hex} with a ratio of ${minContrastRatio} or greater`)
    }

    private darkenToMeetWCAG(shade: Shade): Shade {
        const lightenedShade = shade.lighten(this.getDarkModeLightTextOpacity());
        let contrastRatio = shade.getContrastRatio(lightenedShade)
        let background: Shade = shade;
        let amount = 0.01;
        const minContrastRatio = this.getMinContrastRatioForSmallText();
        while (contrastRatio < minContrastRatio) {
            // hex = background, textHex is text color
            background = Shade.fromHex(ShadeUtil.darken(background.hex, amount));
            const text = Shade.fromHex(ShadeUtil.mixColors(background.hex, "#FFFFFF", this.getMixer()));
            contrastRatio = background.getContrastRatio(text);
        }
        return background;
    }

    public isLightMode(): boolean {
        return this.lm;
    }

    public isDarkMode(): boolean {
        return !this.lm;
    }

    public getWCAGLevel(): WCAGLevel {
        return this.designSystemCfg.getWCAGLevel();
    }

    public getMaxChroma(): number {
        return this.colorCfg.getMaxChroma(this.lm);
    }

    public getLightTextShade(): Shade {
        return this.designSystemCfg.getLightTextShade();
    }

    public getDarkTextShade(): Shade {
        return this.designSystemCfg.getDarkTextShade();
    }

    public getMinContrastRatioForSmallText(): number {
        return this.getWCAGLevel().minContrastRatioForSmallText;
    }

    public getMinContrastRatioForLargeText(): number {
        return this.getWCAGLevel().minContrastRatioForLargeText;
    }

    public getMinContrastRatioForNonText(): number {
        return this.getWCAGLevel().minContrastRatioForNonText;
    }

    public getDarkModeLightTextOpacity(): number {
        return this.designSystemCfg.getDarkModeLightTextOpacity();
    }

    public getMixer(): number {
        return 1 - this.getDarkModeLightTextOpacity();
    }

    /**
     * Determine if AA
     */
    public isAA(): boolean {
        return this.getWCAGLevel().isAA();
    }

    /**
     * Determine if AAA
     */
    public isAAA(): boolean {
        return this.getWCAGLevel().isAAA();
    }

}

export class ShadeBuilderCfgPerDesignSystem {

    public wcagLevel: PropertyStringSelectable;
    public lightText: PropertyString;
    public darkText: PropertyString;
    public lmLightTextOpacity: PropertyNumber;
    public dmLightTextOpacity: PropertyNumber;

    constructor(parent: Node) {
        this.wcagLevel = new PropertyStringSelectable("WCAG level", true, parent, { selectables: ["AA", "AAA"], defaultValue: "AA" });
        this.lightText = new PropertyString("Light Text - Light Mode", true, parent, { defaultValue: Shade.WHITE.hex });
        this.darkText = new PropertyString("Dark text - Light Mode", true, parent, { defaultValue: Shade.DARK_TEXT.hex });
        this.lmLightTextOpacity = new PropertyNumberRange("Light Text Opacity in Light Mode", true, parent, 0, 1, 1);
        this.dmLightTextOpacity = new PropertyNumberRange("Light Text Opacity in Dark Mode", true, parent, 0, 1, 0.6);
    }

    /**
     * Get the WCAG level
     * @returns Returns "AA" or "AAA"
     */
    public getWCAGLevel(): WCAGLevel {
        const name = this.wcagLevel.getValue() as string;
        const wl = WCAGLevel.findByName(name);
        if (!wl) throw new Error(`Invalid value for WCAG level: ${name}`);
        return wl;
    }

    /**
     * Get the min contrast ratio for small text
     * @returns the min contrast ratio
     */
    public getMinContrastRatioForSmallText(): number {
        return this.getWCAGLevel().minContrastRatioForSmallText;
    }

    /**
     * Get the min contrast ratio for large text
     * @returns the min contrast ratio
     */
    public getMinContrastRatioForLargeText(): number {
        return this.getWCAGLevel().minContrastRatioForLargeText;
    }

    /**
     * Get the min contrast ratio for non text
     * @returns the min contrast ratio
     */
    public getMinContrastRatioForNonText(): number {
        return this.getWCAGLevel().minContrastRatioForNonText;
    }

    /**
     * Get the light text shade
     */
    public getLightTextShade(): Shade {
        return Shade.fromHex(this.lightText.getValue() as string);
    }

    /**
     * Get the dark text shade
     */
    public getDarkTextShade(): Shade {
        return Shade.fromHex(this.darkText.getValue() as string);
    }

    /**
     * Get the dark mode opacity for light text as a value from [0,1].
     */
    public getDarkModeLightTextOpacity(): number {
       return this.dmLightTextOpacity.getValue() as number;
    }

    /**
     * Determine if AA
     */
    public isAA(): boolean {
        return this.getWCAGLevel().isAA();
    }

    /**
     * Determine if AAA
     */
    public isAAA(): boolean {
        return this.getWCAGLevel().isAAA();
    }

}

export class ShadeBuilderCfgPerColor {
    public lmMaxChroma: PropertyNumber;
    public dmMaxChroma: PropertyNumber;

    constructor(parent: Node) {
        this.lmMaxChroma = new PropertyNumberRange("Max Chroma in Light Mode", true, parent, 0, 100, 80);
        this.dmMaxChroma = new PropertyNumberRange("Max Chroma in Dark Mode", true, parent, 0, 100, 60);
    }

    /**
     * Get the max chroma setting
     * @param lm True if light mode; false if dark mode.
     */
    public getMaxChroma(lm: boolean): number {
        if (lm) return this.lmMaxChroma.getValue() as number;
        return this.dmMaxChroma.getValue() as number;
    }

}