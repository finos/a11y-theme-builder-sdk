/*
 * Copyright (c) 2024 Discover Financial Services
 * Licensed under Apache-2.0 License. See License.txt in the project root for license information
 */
import * as chroma from "chroma-js";
import { Logger } from "../util/logger";
import { Node } from "./node";
import { Property, PropertyNumber, PropertyString, PropertyGroupListener } from "./props";
import { Shade } from "./shade";
import { ShadeUtil } from "./shadeUtil";
import { WCAGLevel } from "./wcag";
import { IColor } from "../interfaces";

const log = new Logger("shb");

export class ShadeBuilderCfg {

    private lightMode;

    constructor(lightMode: boolean) {
        this.lightMode = lightMode;
    }

    public isLightMode(): boolean {
        return this.lightMode;
    }

    public getWCAGLevel(): WCAGLevel {
        return WCAGLevel.AA;
    }

    public getLightText(): string {
        return Shade.WHITE.hex;   
    }

    public getDarkText(): string {
        return Shade.DARK_TEXT.hex;   
    }

    public getLightModeLightTextOpacity(): number {
        return 1;
    }

    public getDarkModeLightTextOpacity(): number {
        return 0.6;
    }

    public getLightModeMaxChroma(): number {
        return 80;
    }

    public getDarkModeMaxChroma(): number {
        return 60;
    }

    public getCSSPrefix(): string {
        return "";
    }
}

export class ShadeBuilder {

    public static lmDefault = new ShadeBuilder("lmDefault", new ShadeBuilderCfg(true));
    public static dmDefault = new ShadeBuilder("dmDefault", new ShadeBuilderCfg(false));
    static {
        const all = [this.lmDefault, this.dmDefault];
        this.lmDefault.setAll(all);
        this.dmDefault.setAll(all);
    }

    public readonly name: string;
    public readonly cfg: ShadeBuilderCfg;
    public readonly color?: IColor;
    private all?: ShadeBuilder[];
    private other?: ShadeBuilder;

    constructor(name: string, cfg: ShadeBuilderCfg, color?: IColor) {
        this.name = name;
        this.cfg = cfg;
        this.color = color;
    }

    public getAll(): ShadeBuilder[] {
        if (this.all) return this.all;
        throw new Error("'all' has not been set");
    }

    public getOther(): ShadeBuilder {
        if (this.other) return this.other;
        throw new Error("No other has been set");
    }

    public setAll(all: ShadeBuilder[]) {
        this.all = all;
        const lm = this.isLightMode();
        const wcag = this.getWCAGLevel();
        for (const sb of all) {
            if (wcag == sb.getWCAGLevel() && lm != sb.isLightMode()) {
                this.other = sb;
                break;
            }
        }
        if (!this.other) throw new Error("'other' was not found");
    }

    public build(inputShade: Shade): Shade[] {
        log.debug(`sb: begin building ${this.name} shades for ${inputShade.toString()}`);
        const prime = inputShade.getLabel();
        // calculate how many lighter shades need to get built //
        const numLighterShades = (prime / 100) + 1;
        // calculate how many darker shades need to get built //
        const numDarkerShades = ((900 - prime) / 100) + 1
        log.debug(`sb: prime=${prime}, numLighterShades=${numLighterShades}`);
        // build hex values for lighter shades
        let lightScale: string[];
        if (numLighterShades > 1) {
            lightScale = chroma.scale(['#FFFFFF', inputShade.hex]).correctLightness(true).colors(numLighterShades);
        } else {
            lightScale = [inputShade.hex]
        }
        log.debug(`sb: lightScale=${JSON.stringify(lightScale)}`);
        // build hex values for darker shades
        let darkScale: string[];
        if (numDarkerShades > 1) {
            const endShade = inputShade.mix(Shade.FULL_BLACK, this.isLightMode() ? .95 : .98);
            darkScale = chroma.scale([inputShade.hex, endShade.hex]).correctLightness(true).colors(numDarkerShades);
        } else {
            darkScale = [inputShade.hex]
        }
        log.debug(`sb: darkScale=${JSON.stringify(darkScale)}`);
        // remove the final lighter shade because it is pure white
        if (lightScale.length > 0) {
            lightScale.splice(-1)
        }
        // Merge light and dark scale values into a single colorScale
        const colorScale = [...lightScale, ...darkScale];
        // Generate a shade for each color scale
        const outputShades: Shade[] = [];
        for (let i = 0; i < colorScale.length; i++) {
            let newHex: string;
            if (i == 0) {
                const fcn = chroma.scale(['#FFFFFF', inputShade.hex]);
                const scale = this.isLightMode() ? 100 / (prime * 2) : (100 / (prime * 4)) * 3;
                newHex = fcn(scale).toString();
            } else {
                newHex = colorScale[i];
            }
            let newShade = Shade.fromHex(newHex);
            newShade.setIndex(i);
            // Triangularize the shade 
            log.debug(`i=${i} before triangularize: ${JSON.stringify(newShade)}`);
            newShade = this.triangularize(inputShade, newShade);
            log.debug(`i=${i} after triangularize: ${JSON.stringify(newShade)}`);
            newShade.setIndex(i);
            // based on the mode light or dark - run the appropriate check to see if the color and on color meet the contrast ratio of wcagContrast or
            // if the shade needs to be lighted or darked
            newShade = this.adjustShadeToMeetRequirements(newShade);
            newShade.setIndex(i);
            log.debug(`i=${i} after adjustToMeetRequirements: ${JSON.stringify(newShade)}`);
            outputShades.push(newShade);
        }
        if (this.getWCAGLevel().shouldSmoothTransition(this.cfg.isLightMode())) {
            this.smoothTransition(outputShades);
        }
        for (let i = 0; i < outputShades.length; i++) {
            let shade = outputShades[i];
            log.debug(`buildShades: adjusted i=${i} to ${shade.hex}`);
            const id = (i * 100).toString();
            shade.id = id;
            shade.index = i;
            shade.setBuilder(this);
            if (this.color) shade.setColor(this.color);
        }
        log.debug(`sb: finished building ${this.name} shades: ${JSON.stringify(outputShades)}`);
        return outputShades;
    }

    // Smooth the transition between the last shade with dark text background and the first shade with light text background
    private smoothTransition(shades: Shade[]): Shade[] {
        // Divide the list of shades into two groups: those with dark text and those with light text backgrounds
        log.debug(`sb: smoothing transition for ${this.name}`);
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
        log.debug(`sb: smoothed transition for ${this.name}`);
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
        shade = this.getOnShade(shade, this.cfg.isLightMode());
        return shade.hex == Shade.BLACK.hex;
    }

    public getOnShade(shade: Shade, lm: boolean): Shade {
        return this.getContrastShade(shade, lm);
    }

    public getContrastShade(shade: Shade, lm: boolean): Shade {
        log.debug(`getContrastShade - enter shade=${JSON.stringify(shade)}, lm=${lm}`);
        if (shade.onHex) {
            shade = Shade.fromHex(shade.onHex);
            if (!lm && shade.onHex === this.getLightTextShade().hex) {
                shade.setOpacity(this.getDarkModeLightTextOpacity());
            }
            log.debug(`getContrastShade - exit shade=${JSON.stringify(shade)}, lm=${lm}`);
            return shade;
        }
        // Get contrast with black and white & return best ratio
        const blackRatio = shade.getContrastRatio(Shade.BLACK);
        let whiteRatio = shade.getContrastRatio(Shade.WHITE);
        if (!lm) whiteRatio = whiteRatio * this.getDarkModeLightTextOpacity();
        if (blackRatio > whiteRatio) {
            log.debug(`getContrastShade - exit black`);
            return Shade.BLACK;
        } else {
            if (lm) {
                log.debug(`getContrastShade - exit white`);
                return Shade.WHITE;
            }
            else {
                log.debug(`getContrastShade - exit white DM`);
                return Shade.WHITE_DM;
            }
        }
    }

    // Increases the chroma or saturation of a color until about 700 and then comes back down.
    // This is most significant for the way it looks in light mode.
    // See https://colorspace.r-forge.r-project.org/articles/hcl_palettes.html for more info.
    private triangularize(shade1: Shade, shade2: Shade): Shade {
        const primeHsl = chroma.hex(shade1.hex).hsl();
        log.debug(`triangulatize: primeHsl=${JSON.stringify(primeHsl)}`);
        const primeSaturation = primeHsl[1];
        const maxSaturation = Math.max(primeSaturation, this.getMaxChroma());
        const ihsl = chroma.hex(shade2.hex).hsl();
        let newSaturation: number;
        const shade1Index = shade1.getLabel()/100;
        const shade2Index = shade2.getLabel()/100;
        if (shade1Index == shade2Index) {
            newSaturation = primeSaturation;
        } else if (shade1Index <= 7) {
            let change: number;
            if (shade2Index <= 7) {
                change = shade2Index / shade1Index;
            } else {
                change = (7 - (shade2Index - 7) - 2) / shade1Index;
            }
            newSaturation = primeSaturation * change;
        } else {
            const base = (7 - (shade2Index - 7) - 2);
            const seven = base * primeSaturation;
            const change = shade2Index <= 7 ? shade2Index / 7 : base / 7;
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
                //shade = this.darkenToMeetWCAG(shade);
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

    /*
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
    */
    private darkenToMeetWCAG(shade: Shade): Shade {
        log.debug(`shb: enter darkenToMeetWCAG shade=${shade.toString()}`);
        const lightenedShade = shade.lighten(this.getDarkModeLightTextOpacity());
        let contrastRatio = shade.getContrastRatio(lightenedShade)
        let background: Shade = shade;
        let amount = 0.01;
        const minContrastRatio = this.getMinContrastRatioForSmallText();
        const mixer = this.getMixer();
        log.debug(`shb: minContrastRatio=${minContrastRatio}, mixer=${mixer}`);
        for (let i = 0; contrastRatio < minContrastRatio; i++) {
            if (i > 100) throw new Error(`too many iterations`);
            background = Shade.fromHex(ShadeUtil.darken(background.hex, amount));
            const text = Shade.fromHex(ShadeUtil.mixColors(background.hex, "#FFFFFF", this.getMixer()));
            contrastRatio = background.getContrastRatio(text);
            log.debug(`shb: contrastRatio=${contrastRatio}, text=${text.hex}, background=${background.hex}`);
        }
        log.debug(`shb: exit darkenToMeetWCAG shade=${background.toString()}`);
        return background;
    }

    public isLightMode(): boolean {
        return this.cfg.isLightMode();
    }

    public isDarkMode(): boolean {
        return !this.isLightMode();
    }

    public getWCAGLevel(): WCAGLevel {
        return this.cfg.getWCAGLevel();
    }

    public getMaxChroma(): number {
        if (this.isLightMode()) return this.cfg.getLightModeMaxChroma();
        else return this.cfg.getDarkModeMaxChroma();
    }

    public getLightTextShade(): Shade {
        return Shade.fromHex(this.cfg.getLightText()).setBuilder(this);
    }

    public getDarkTextShade(): Shade {
        return Shade.fromHex(this.cfg.getDarkText()).setBuilder(this);
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
        return this.cfg.getDarkModeLightTextOpacity();
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

    public getCSSPrefix(): string {
        return this.cfg.getCSSPrefix();
    }

}

export class ShadeBuilderViewCfg extends ShadeBuilderCfg {

    public readonly wcagLevel: WCAGLevel;
    public readonly cssPrefix: string;
    public readonly lightText: PropertyString;
    public readonly darkText: PropertyString;
    public readonly lightModeLightTextOpacity: PropertyNumber;
    public readonly darkModeLightTextOpacity: PropertyNumber;
    public readonly lightModeMaxChroma: PropertyNumber;
    public readonly darkModeMaxChroma: PropertyNumber;
    public readonly allProps: Property<any>[];

    constructor(lm: boolean, wcagLevel: WCAGLevel, cssPrefix: string, node: Node) {
        super(lm);
        this.wcagLevel = wcagLevel;
        this.cssPrefix = cssPrefix;
        this.lightText = node.findProperty("lightText");
        this.darkText = node.findProperty("darkText");
        this.lightModeLightTextOpacity = node.findProperty("lightModeLightTextOpacity");
        this.darkModeLightTextOpacity = node.findProperty("darkModeLightTextOpacity");
        this.lightModeMaxChroma = node.findProperty("lightModeMaxChroma");
        this.darkModeMaxChroma = node.findProperty("darkModeMaxChroma");
        this.allProps = [this.lightText, this.darkText, this.lightModeLightTextOpacity, this.darkModeLightTextOpacity, this.lightModeMaxChroma, this.darkModeMaxChroma];
    }

    public getWCAGLevel(): WCAGLevel {
        return this.wcagLevel;
    }

    public getLightText(): string {
        return this.lightText.getValue() || super.getLightText();
    }

    public getDarkText(): string {
        return this.darkText.getValue() || super.getDarkText();
    }

    public getLightModeLightTextOpacity(): number {
        return this.lightModeLightTextOpacity.getValue() || super.getLightModeLightTextOpacity();
    }

    public getDarkModeLightTextOpacity(): number {
        return this.darkModeLightTextOpacity.getValue() || super.getDarkModeLightTextOpacity();
    }

    public getLightModeMaxChroma(): number {
        return this.lightModeMaxChroma.getValue() || super.getLightModeMaxChroma();
    }

    public getDarkModeMaxChroma(): number {
        return this.darkModeMaxChroma.getValue() || super.getDarkModeMaxChroma();
    }

    public getCSSPrefix(): string {
        return this.cssPrefix;
    }

}

export type ShadeBuilderViewListener = () => void;

export interface ShadeBuilderViewShades {
    light: Shade[];
    dark: Shade[];
}

/**
 * ShadeBuilderView contains 4 shade builders:
 * 1) light mode AA
 * 2) dark mode AA
 * 3) light mode AAA
 * 4) dark mode AAA
 * In this case, lightMode and wcagLevel are static variables and all other variables are dynamic properties.
 */
export class ShadeBuilderView {

    public node: Node;
    public shade: Shade;
    public color?: IColor;
    public readonly lmAA: ShadeBuilder;
    public readonly dmAA: ShadeBuilder;
    public readonly lmAAA: ShadeBuilder;
    public readonly dmAAA: ShadeBuilder;
    public readonly all: ShadeBuilder[];

    private readonly listeners: ShadeBuilderViewListener[] = [];
    private readonly pgl: PropertyGroupListener;

    constructor(node: Node, shade: Shade, color?: IColor) {
        this.node = node;
        this.shade = shade;
        this.color = color;
        this.lmAA = this.newShadeBuilder("lmAA", true, WCAGLevel.AA, "");
        this.dmAA = this.newShadeBuilder("dmAA", false, WCAGLevel.AA, "dm-");
        this.lmAAA = this.newShadeBuilder("lmAAA", true, WCAGLevel.AAA, "aaa-");
        this.dmAAA = this.newShadeBuilder("dmAAA", false, WCAGLevel.AAA, "dm-aaa-");
        this.all = [this.lmAA, this.dmAA, this.lmAAA, this.dmAAA];
        const ds = node.getDesignSystem();
        for (const sb of this.all) {
            sb.setAll(this.all);
            ds.registerByKey(node.getChildKey(sb.name), sb);
        }
        const cfg = new ShadeBuilderViewCfg(true, WCAGLevel.AA, "", node);
        this.pgl = new PropertyGroupListener(`ShadeBuilderView.${node.key}`, cfg.allProps, () => this.notifyListeners.bind(this));
    }

    public getShades(wcagLevel: WCAGLevel): ShadeBuilderViewShades {
        log.debug(`sbv: getting shades for WCAG ${wcagLevel.name}`);
        let rtn: ShadeBuilderViewShades;
        if (wcagLevel == WCAGLevel.AA) {
            rtn = {
                light: this.lmAA.build(this.shade),
                dark: this.dmAA.build(this.shade),
            };
        } else if (wcagLevel == WCAGLevel.AAA) {
            rtn = {
                light: this.lmAAA.build(this.shade),
                dark: this.dmAAA.build(this.shade),
            };
        } else {
            throw new Error(`Invalid WCAG level: ${wcagLevel.name}`);
        }
        log.debug(`sbv: finished getting shades for WCAG ${wcagLevel.name}`);
        return rtn;
    }

    public addListener(listener: ShadeBuilderViewListener) {
        this.listeners.push(listener);
    }

    private notifyListeners() {
        log.debug(`sbv: notifying ${this.listeners.length} listeners`);
        for (const l of this.listeners) l();
    }

    public getShadeBuilder(lm: boolean, wcagLevel: WCAGLevel): ShadeBuilder {
        if (wcagLevel == WCAGLevel.AA) {
            if (lm) return this.lmAA;
            else return this.dmAA;
        } else if (wcagLevel == WCAGLevel.AAA) {
            if (lm) return this.lmAAA;
            else return this.dmAAA;
        } else {
            throw new Error(`Invalid WCAGLevel: ${wcagLevel.name}`);
        }
    }

    public updateColor(color: Shade) {
        this.shade = color;
        this.notifyListeners();
    }

    private newShadeBuilder(name: string, lm: boolean, wcagLevel: WCAGLevel, cssPrefix: string): ShadeBuilder {
        return new ShadeBuilder(this.node.getChildKey(name), new ShadeBuilderViewCfg(lm, wcagLevel, cssPrefix, this.node), this.color);
    }

}