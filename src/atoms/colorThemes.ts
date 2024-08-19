/*
 * Copyright (c) 2023 Discover Financial Services
 * Licensed under Apache-2.0 License. See License.txt in the project root for license information
 */
/* eslint-disable */
import * as chroma from "chroma-js";
import { Atom } from "./atom";
import { ColorPalette } from "./colorPalette";
import { Node } from "../common/node";
import { IAtoms, IColorThemes, IColorTheme, EventValueChange, ShadeFilter } from "../interfaces";
import { MyMap } from "../util/myMap";
import { Shade } from "../common/shade";
import { Logger } from "../util/logger";
import { ShadeGroup } from "../common/shade";
import {
    PropertyBoolean,
    PropertySelectableOpts,
    PropertyStringSelectable,
    PropertyColorShade,
    PropertyColorPair,
    ColorPair,
} from "../common/props";

export interface BackgroundVariables {
    primary: Shade;
    secondary: Shade;
    colorDrop: Shade;
    borderColor: Shade;
    chip: Shade;
    onChip: Shade;
    groupButton: Shade;
    lineColor: Shade;
    surface: Shade;
}

export interface ModeShadeGroups {
    default: ShadeGroup;
    white: ShadeGroup;
    black: ShadeGroup;
    tertiary: ShadeGroup;
    gradient1: ShadeGroup;
    gradient2: ShadeGroup;
    gradient3: ShadeGroup;
}

export interface ShadeGroups {
    lm: ModeShadeGroups;
    dm: ModeShadeGroups;
}

export interface DarkBGShades {
    primary: Shade;
    secondary: Shade;
}

const log = new Logger("colorThemes");

/**
 * The color themes atom.
 * @category Atoms
 */
export class ColorThemes extends Atom implements IColorThemes {

    public readonly atoms: IAtoms;
    private readonly themes: MyMap<string,ColorTheme> = new MyMap<string,ColorTheme>();
    /** The default theme name property */
    public readonly defaultTheme: PropertyStringSelectable;

    constructor(atoms: IAtoms) {
        super("Color Themes", true, atoms);
        this.atoms = atoms;
        this.addDependency(atoms.colorPalette);
        this.defaultTheme = new PropertyStringSelectable("Default Theme", true, this, {
            getSelectables: this.getThemeNames.bind(this),
        });
    }

    /**
     * Create a new color theme.
     * @param name The name of the theme to create.
     * @param skipInitDefault If true, do not attempt to set this as the default theme if there is not yet a default theme.
     * @returns The newly created theme.
     */
    public createTheme(name: string, skipInitDefault?: boolean): ColorTheme {
        log.debug(`Creating color theme: name=${name}, skipInitDefault=${skipInitDefault}`);
        if (this.themes.has(name)) {
            throw new Error(`Theme '${name}' already exists`);
        }
        const colorTheme = this.newTheme(name);
        if (!skipInitDefault && !this.defaultTheme.isInitialized()) {
            this.setDefaultTheme(colorTheme);
        }
        log.debug(`Created color theme: name=${name}, skipInitDefault=${skipInitDefault}`);
        return colorTheme;
    }

    private newTheme(name: string): ColorTheme {
        const colorTheme = new ColorTheme(name, this);
        this.themes.set(colorTheme.name, colorTheme);
        return colorTheme;
    }

    /**
     * Get the names of all themes.
     * @returns The names of all existing themes.
     */
    public getThemeNames(): string[] {
        return this.themes.getKeys();
    }

    /**
     * Get a theme by name.
     * @param name The name of the theme to retrieve.
     * @returns The theme.
     */
    public getTheme(name: string): ColorTheme {
        const theme = this.themes.get(name);
        if (!theme) {
            throw new Error(`Color Theme '${name}' was not found`);
        }
        return theme;
    }

    /**
     * Get all themes.
     * @returns All theme objects.
     */
    public getThemes(): ColorTheme[] {
        return this.themes.getValues();
    }

    /**
     * Get the default theme (if any).
     * @returns The default theme (if any).
     */
    public getDefaultTheme(): ColorTheme | undefined {
        const name = this.getDefaultThemeName();
        if (name) {
            return this.getTheme(name);
        }
        return undefined;
    }

    /**
     * Get the default theme name (if any).
     * @returns The default theme name (if any).
     */
    public getDefaultThemeName(): string | undefined {
        return this.defaultTheme.getValue();
    }

    /**
     * Set the default theme.
     * @param theme The new default theme.
     */
    public setDefaultTheme(theme: ColorTheme | undefined) {
        const name = theme ? theme.name : undefined;
        log.debug(`Setting color theme ${name} as the default`);
        return this.defaultTheme.setValue(name);
    }

    public serialize(): any {
        const obj = super.serialize();
        obj.themes = {};
        for (const name of this.getThemeNames()) {
            obj.themes[name] = this.getTheme(name).serialize();
        }
        obj.defaultTheme = this.defaultTheme.serialize();
        return obj;
    }

    public deserialize(obj: any) {
        if (!obj) return;
        super.deserialize(obj);
        const themes = obj.themes;
        for (const name of Object.keys(themes)) {
            this.newTheme(name).deserialize(themes[name]);
        }
        this.defaultTheme.setValue(obj.defaultTheme);
    }

}

/**
 * The color theme.
 * @category Atoms
 */
export class ColorTheme extends Node implements IColorTheme {

    // Color Pair titles
    public static CP_WHITE_OFFWHITE = "White/Off White";
    public static CP_BLACK_OFFBLACK = "Black/Off Black";
    public static CP_HALF_QUARTER = "Primary O-Half/Quarter";
    public static CP_800_900 = "Primary-800/Primary-900";

    public readonly themes: ColorThemes;
    /** The primary color shade property */
    public readonly primary: PropertyColorShade;
    /** The secondary color shade property */
    public readonly secondary: PropertyColorShade;
    /** The tertiary color shade property */
    public readonly tertiary: PropertyColorShade;
    /** The lightmode background properties */
    public lightModeBackground: PropertyColorPair;
    /** The darkmode background properties */
    public darkModeBackground: PropertyColorPair;
    /** The gradient1 shade properties */
    public gradient1: GradientColors;
    /** The gradient2 shade properties */
    public gradient2: GradientColors;
    /** The button shade property */
    public button: PropertyColorShade;
    /** The icon shade property */
    public icon: PropertyColorShade;
    /** The gradient header text shade property */
    public gradientHeaderText: GradientColors2;
    /** The accent shade property */
    public accent: PropertyColorShade;
    public addTheme: PropertyBoolean;
    private primary100?: Shade;
    private readonly lname = "_tb.ColorTheme";

    constructor(name: string, themes: ColorThemes) {
        super(name, themes);
        this.themes = themes;
        const opts = { getSelectables: this.getColorShadeSelectables.bind(this) };
        this.primary = new PropertyColorShade("Primary", true, this, opts);
        this.secondary = new PropertyColorShade("Secondary", true, this, opts);
        this.tertiary = new PropertyColorShade("Tertiary", true, this, opts);
        this.secondary.addDependency(this.primary);
        this.tertiary.addDependency(this.secondary);
        this.lightModeBackground = new PropertyColorPair("Light Mode Background", true, this, []);
        this.lightModeBackground.addDependency(this.primary);
        this.darkModeBackground = new PropertyColorPair("Dark Mode Background", true, this, []);
        this.darkModeBackground.addDependency(this.primary);
        // Gradient color selections
        this.gradient1 = new GradientColors(this, "Gradient 1");
        this.gradient2 = new GradientColors(this, "Gradient 2");
        // Shade selections depend upon the primary, secondary, tertiary, and light mode background selections.
        const selOpts = {
            getSelectables: this.getShadeSelections.bind(this),
            dependentProps: [this.primary, this.secondary, this.tertiary, this.lightModeBackground],
        };
        this.button = new PropertyColorShade("Button", true, this, selOpts);
        this.icon = new PropertyColorShade("Icon", true, this, selOpts);
        this.gradientHeaderText = new GradientColors2(this, "Gradient Header Text", selOpts);
        // Accent color
        this.accent = new PropertyColorShade("Accent", true, this, opts);
        this.addTheme = new PropertyBoolean("Add Theme", false, this);
        this.addTheme.addDependency(this);
        this.accent.addDependency(this.primary);
        this.addTheme = new PropertyBoolean("Add Theme", false, this);
        this.addTheme.addDependency(this);
        // Start listening
        this.start();
    }

    public start() {
        this.primary.setPropertyListener(this.lname, this.primaryListener.bind(this));
        for (let prop of [this.secondary, this.tertiary]) {
            prop.setPropertyListener(`${this.lname}.colorChange`, this.secondaryAndTertiaryListener.bind(this));
        }
        for (let prop of [this.lightModeBackground, this.darkModeBackground]) {
            prop.setPropertyListener(`${this.lname}.backgroundChange`, this.backgroundListener.bind(this));
        }
    }

    public stop() {
        this.primary.removeListener(this.name);
        this.button.stop();
        this.icon.stop();
        this.gradientHeaderText.from.stop();
        this.gradientHeaderText.to.stop();
        for (let prop of [this.primary, this.secondary, this.tertiary]) {
            prop.removeListener(`${this.lname}.colorChange`);
        }
    }

    public getColorShadeSelectables(filter?: ShadeFilter): Shade[][] {
        return this.getColorPalette().getLightColorShades(filter);
    }

    public getColorShadeSelectablesByOnHex(onHex: string): Shade[][] {
        return this.getColorShadeSelectables((shade: Shade) => shade.onHex === onHex);
    }

    public primaryListener(vc: EventValueChange<Shade>) {
        this.setPrimary(vc.newValue);
    }

    public buttonListener() {
        this.button.setSelectableValues;
    }

    private setPrimary(primary?: Shade) {
        log.debug(`ColorTheme.setPrimary: enter: name=${this.name}, value=${primary?primary.hex:"no primary"}`);
        if (!primary) return;
        const sb = primary.getBuilder();
        const shades = sb.build(primary);
        this.primary100 = shades[1];
        // Get white/offWhite
        const whiteOffWhite: ColorPair = new ColorPair(
            ColorTheme.CP_WHITE_OFFWHITE,
            Shade.WHITE.clone().setBuilder(sb), 
            Shade.OFF_WHITE.clone().setBuilder(sb),
            true,
        );
        // Get black/offBlack
        const blackOffBlack = new ColorPair(
            ColorTheme.CP_BLACK_OFFBLACK,
            Shade.BLACK.clone().setBuilder(sb),
            Shade.OFF_BLACK.clone().setBuilder(sb),
            false,
        );
        // Get primary half/quarter
        const shade0 = shades[0];
        const bgScale = chroma.scale(['#FFFFFF',shade0.hex]).correctLightness(true).colors(5);
        const primaryHalf = Shade.fromHex(bgScale[1]).setBuilder(sb);
        const primaryQuarter = Shade.fromHex(bgScale[2]).setBuilder(sb);
        const primaryHalfQuarter = new ColorPair(ColorTheme.CP_HALF_QUARTER, primaryHalf, primaryQuarter, true);
        // Get primary-800/primary-900
        const darkBGShades = this.getDarkBGShades();
        if (!darkBGShades) throw new Error(`Could not get dark background shades`);
        const primary800900 = new ColorPair(ColorTheme.CP_800_900, darkBGShades.primary, darkBGShades.secondary, false);
        // Update light background selectable values
        this.lightModeBackground.setSelectableValues([whiteOffWhite, blackOffBlack, primaryHalfQuarter, primary800900 ]);
        this.lightModeBackground.setValue(undefined);
        // Update dark background selectable values
        this.darkModeBackground.setSelectableValues([blackOffBlack, primary800900 ]);
        this.darkModeBackground.setValue(undefined);
        // Clear the values of all other props
        this.clearColorDependentProps();
        log.debug(`ColorTheme.setPrimary: exit: name=${this.name}, value=${primary.hex}`);
    }

    public getDarkBGShades(): DarkBGShades | undefined {
        const primary = this.primary.getValue();
        if (!primary) return undefined;
        const sb = primary.getBuilder();
        const shades = sb.build(primary);
        const shade900 = shades[9];
        const bgScale = chroma.scale([shade900.hex,'#000000']).correctLightness(true).colors(5);
        return {
            primary: Shade.fromHex(bgScale[2]).setBuilder(sb),
            secondary: Shade.fromHex(bgScale[3]).setBuilder(sb),
        };
    }

    public findLightModeShade(shade: Shade): Shade {
        const lmShade = this.getLightModeShade(shade);
        if (!lmShade) throw new Error(`No light mode shade found for ${shade.hex}`);
        return lmShade;
    }

    public getLightModeShade(shade: Shade): Shade | undefined {
        log.debug(`getLightModeShade enter shade=${shade.hex}`);
        const lmbg = this.lightModeBackground.getValue();
        if (!lmbg) {
            log.debug(`getLightModeShade exit (no light mode background)`);
            return undefined;
        }
        return shade.getLMShade([lmbg.primary,lmbg.secondary], 3.1);
    }

    public findDarkModeShade(shade: Shade): Shade {
        const dmShade = this.getDarkModeShade(shade);
        if (!dmShade) throw new Error(`No dark mode shade found for ${shade.hex}`);
        return dmShade;
    }

    public getDarkModeShade(shade: Shade): Shade | undefined {
        log.debug(`getDarkModeShade enter shade=${shade.hex}`);
        const dmbg = this.darkModeBackground.getValue();
        if (!dmbg) {
            log.debug(`getDarkModeShade exit (no dark background)`);
            return undefined;
        }
        return shade.getDMShade([dmbg.primary,dmbg.secondary], 3.1);
    }

    private secondaryAndTertiaryListener(vc: EventValueChange<Shade>) {
        this.clearColorDependentProps();
    }

    private backgroundListener(vc: EventValueChange<ColorPair>) {
        this.clearColorDependentProps();
    }

    private clearColorDependentProps() {
        log.debug("Begin clearing color dependent properties");
        this.gradient1.from.setValue(undefined);
        this.gradient1.to.setValue(undefined);
        this.gradient2.from.setValue(undefined);
        this.gradient2.to.setValue(undefined);
        this.button.setValue(undefined);
        this.icon.setValue(undefined);
        this.gradientHeaderText.from.setValue(undefined);
        this.gradientHeaderText.to.setValue(undefined);
        this.accent.setValue(undefined);
        log.debug("End clearing color dependent properties");
    }

    public getBackgroundVariables(pcp: PropertyColorPair): BackgroundVariables | undefined {
        const bg = pcp.getValue();
        if (!bg) {
            log.debug(`ColorTheme.getBackgroundVariables: no value found for ${pcp.key}`);
            return undefined;
        }
        const primary = bg.primary;
        const secondary = bg.secondary;
        let colorDrop: Shade;
        let borderColor: Shade;
        let chip: Shade;
        let onChip: Shade;
        let groupButton: Shade;
        let lineColor: Shade;
        let surface: Shade;
        switch(bg.title) {
            case ColorTheme.CP_WHITE_OFFWHITE:
            case ColorTheme.CP_HALF_QUARTER:
                if (!this.primary100) {
                    log.debug("ColorTheme.getPrimaryBackgroundVariables: no primary100");
                    return undefined;
                }
                colorDrop = this.primary100;
                borderColor = Shade.fromRGBAString('rgba(0,0,0,.25)');
                chip = Shade.fromRGBAString('rgba(0,0,0,.25)');
                onChip = Shade.BLACK;
                const inputBG = this.themes.atoms.inputBackground.overlayColor.getValue();
                if (!inputBG) {
                    log.debug("ColorTheme.getPrimaryBackgroundVariables: no input background");
                    return undefined;
                }
                groupButton = inputBG.shade;
                lineColor = Shade.fromRGBAString('rgba(0,0,0,.05)');
                surface = Shade.WHITE;
                break;
            case ColorTheme.CP_BLACK_OFFBLACK:
            case ColorTheme.CP_800_900:
                colorDrop = Shade.BLACK;
                borderColor = Shade.fromRGBAString('rgba(255,255,255,.25)');
                chip = Shade.fromRGBAString('rgba(255,255,255,.25)');
                onChip = Shade.WHITE;
                groupButton = Shade.fromRGBAString('rgba(255,255,255,.1)');
                lineColor = Shade.fromRGBAString('rgba(255,255,255,.05)');
                surface = primary;
                break;
            default:
                throw new Error(`Unexpected lightmode background selection for ${this.name} color theme: ${bg.title}`);
        }
        return { primary, secondary, colorDrop, borderColor, chip, onChip, groupButton, lineColor, surface };
    }

    public getShadeGroups(shade: Shade): ShadeGroups {
        const lm: ModeShadeGroups = this.getModeShadeGroups(shade, true);
        const dm: ModeShadeGroups = this.getModeShadeGroups(this.findDMShade(shade), false);
        return { lm, dm };
    }

    private getModeShadeGroups(shade: Shade, lm: boolean): ModeShadeGroups {
        let primaryShade = this.primary.getValue();
        const gradient1Shade = this.gradient1.from.getValue();
        const gradient2Shade = this.gradient2.from.getValue();
        if (!primaryShade) throw new Error(`No primary color has been set`);
        if (!gradient1Shade) throw new Error(`No gradient 1 color has been set`);
        if (!gradient2Shade) throw new Error(`No gradient 2 color has been set`);
        const buttonShadeGroup = {
            shade: shade,
            halfShade: Shade.fromHex(shade.hex).setOpacity(0.5).setBuilder(shade.getBuilder()),
            onShade: shade.getOnShade(),
        };
        const white = this.getShadeGroup(shade, Shade.WHITE, lm, lm? 1: 0.6);
        const black = this.getShadeGroup(shade, Shade.BLACK, lm, 1);
        const tertiary = lm ? 
            this.getShadeGroup(shade, primaryShade, lm, 1) : 
            // For dark mode, we get the 700 dark mode shade of the primary.
            primaryShade.buildShades(false)[7].getShadeGroup(lm);
        const gradient1 = gradient1Shade.getOnShade().getShadeGroup(lm);
        const gradient2 = gradient2Shade.getOnShade().getShadeGroup(lm);
        let gradient3 = this.getShadeGroup(shade, lm ? Shade.fromHex("#CDCDCD") : Shade.fromRGB(18,18,18), lm, 1);
        // The following line is a temp work around to force a white button to be black until we figure out why it is happening.
        //if (gradient3.shade.equals(Shade.WHITE)) gradient3 = Shade.NEAR_BLACK.getShadeGroup(lm);
        return {
            default: buttonShadeGroup, white, black, tertiary, gradient1, gradient2, gradient3
        }
    }

    public getShadeGroup(shade: Shade, compShade: Shade, lm: boolean, multiplier: number): ShadeGroup {
        return shade.getShadeOrOnShadeBasedOnContrast(compShade, lm).getShadeGroup(lm);
    }

    private findDMShade(shade: Shade): Shade {
        log.debug(`Enter ColorTheme.findDMShade shade=${shade.hex}, index=${shade.index}; searching backwards for shade >= 3.1`);
        // We first need to get the primary of selected dark mode background
        const dmbgValue = this.darkModeBackground.getValue();
        if (!dmbgValue) throw new Error(`The dark mode background has not been selected`);
        const bg = dmbgValue.primary;
        // Next, loop thru the dark mode shades, starting with the selected index and searching backwards until
        // we find the first shade with a contrast of >= 3.1 when compared with the primary of the selected
        // dark mode background.
        const shades = shade.buildShades(false);
        let startIndex = shade.index < 0 ? 4 : Math.min(shade.index,4);
        for (let i = startIndex; i >= 0; i--) {
            const tmpShade = shades[i];
            const contrast = tmpShade.getContrastRatio(bg);
            log.debug(`Contrast at index ${i} is ${contrast}`);
            if (contrast >= 3.1) {
                log.debug(`Found DM shade at index ${i}`);
                return tmpShade;
            }
        }
        throw new Error(`Did not find a dark mode shade with a contrast >= 3.1`);
    }

    private getShadeSelections(): Shade[][] {
        // Generation of the button selectables depends upon the primary, secondary, tertiary colors,
        // plus the light mode selectable background
        const val1 = this.primary.getValue();
        const val2 = this.secondary.getValue();
        const val3 = this.tertiary.getValue();
        const lmbg = this.lightModeBackground.getValue();
        if (val1 === undefined) throw new Error(`Primary has no value`);
        if (val2 === undefined) throw new Error(`Secondary has no value`);
        if (val3 === undefined) throw new Error(`Tertiary has no value`);
        if (lmbg === undefined) throw new Error(`Light Mode Background has no value`);
        // If a lighter background was chosen, compare to the secondary which is darker;
        // otherwise, if a darker backbround was chosen, compare to the primary which is lighter.
        const bgShade = lmbg.lighter ? lmbg.secondary : lmbg.primary;
        const rtn: Shade[][] = [];
        // For each of primary, secondary, and tertiary selected shades, find all shades
        // associated with that color whose contrast to the background shade is >= 3.1
        const processed: Shade[][] = [];
        for (const prop of [this.primary, this.secondary, this.tertiary]) {
            // For each shade associated with the selected shade
            const row: Shade[] = [];
            const shades = prop.getValue()?.buildShades();
            if (shades && processed.indexOf(shades) < 0) {
                shades.forEach((shade: Shade) => {
                    // If the contrast >= 3.1, add it to the selectable list
                    const contrast = shade.getContrastRatio(bgShade);
                    log.debug(`Button selectable contrast is ${contrast}`);
                    if (contrast >= 3.1) {
                        row.push(shade);
                    }
                });
                rtn.push(row);
                processed.push(shades);
            }
        }
        return rtn;
    }

    public getElevationShades(lm: boolean): Shade[] {
        const dmbg = this.darkModeBackground.getValue();
        if (!dmbg) return [];
        const shade = lm ? dmbg.primary : dmbg.secondary;
        return shade.getElevationShades();
    }

    public deserialize(obj: any) {
        if (!obj) return;
        super.deserialize(obj);
        this.primary.deserialize(obj.primary);
        this.setPrimary(this.primary.getValue());
        this.secondary.deserialize(obj.secondary);
        this.tertiary.deserialize(obj.tertiary);
        this.lightModeBackground.deserialize(obj.lightModeBackground);
        this.darkModeBackground.deserialize(obj.darkModeBackground);
        this.gradient1.deserialize(obj.gradient1);
        this.gradient2.deserialize(obj.gradient2);
        this.button.deserialize(obj.button);
        this.icon.deserialize(obj.icon);
        this.gradientHeaderText.deserialize(obj.gradientHeaderText);
        this.accent.deserialize(obj.accent);
    }

    public serialize(): any {
        const obj = super.serialize();
        obj.primary = this.primary.serialize();
        obj.secondary = this.secondary.serialize();
        obj.tertiary = this.tertiary.serialize();
        obj.lightModeBackground = this.lightModeBackground.serialize();
        obj.darkModeBackground = this.darkModeBackground.serialize();
        obj.gradient1 = this.gradient1.serialize();
        obj.gradient2 = this.gradient2.serialize();
        obj.button = this.button.serialize();
        obj.icon = this.icon.serialize();
        obj.gradientHeaderText = this.gradientHeaderText.serialize();
        obj.accent = this.accent.serialize();
        return obj;
    }

    private getColorPalette(): ColorPalette {
        return this.themes.atoms.colorPalette as ColorPalette;
    }
}

/**
 * Gradient colors.
 * @category Atoms
 */
export class GradientColors {

    public theme: ColorTheme;
    /** The from color shade for this gradient */
    public readonly from: PropertyColorShade;
    /** The to color shade for this gradient */
    public readonly to: PropertyColorShade;

    constructor(theme: ColorTheme, prefix: string) {
        this.theme = theme;
        this.from = new PropertyColorShade(`${prefix}From`, true, theme, {getSelectables: theme.getColorShadeSelectables.bind(theme)});
        this.to = new PropertyColorShade(`${prefix}To`, true, theme, {selectables: []});
        this.from.addDependency(theme.primary);
        this.to.addDependency(this.from);
        this.from.setPropertyListener('_tb.GradientColors', this.notify.bind(this));
    }

    public notify(event: EventValueChange<Shade>) {
        this.fromShadeChange(event.newValue);
    }

    private fromShadeChange(shade?: Shade) {
        if (!shade) return;
        this.to.setSelectableValues(this.theme.getColorShadeSelectablesByOnHex(shade.onHex));
    }

    public deserialize(obj: any) {
        if (!obj) return;
        this.from.deserialize(obj.from);
        this.to.deserialize(obj.to);
    }

    public serialize(): any {
        const obj: any = {};
        obj.from = this.from.serialize();
        obj.to = this.to.serialize();
        return obj;
    }

}

export class GradientColors2 {

    public theme: ColorTheme;
    public readonly from: PropertyColorShade;
    public readonly to: PropertyColorShade;

    constructor(theme: ColorTheme, prefix: string, selOpts: PropertySelectableOpts<Shade[][],Shade>) {
        this.theme = theme;
        this.from = new PropertyColorShade(`${prefix}From`, true, theme, selOpts);
        this.to = new PropertyColorShade(`${prefix}To`, true, theme, selOpts);
        this.from.addDependency(theme.primary);
    }

    public deserialize(obj: any) {
        if (!obj) return;
        this.from.deserialize(obj.from);
        this.to.deserialize(obj.to);
    }

    public serialize(): any {
        const obj: any = {};
        obj.from = this.from.serialize();
        obj.to = this.to.serialize();
        return obj;
    }
}