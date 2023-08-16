/*
 * Copyright (c) 2023 Discover Financial Services
 * Licensed under Apache-2.0 License. See License.txt in the project root for license information
 */
import { ColorTheme } from "./colorThemes";
import { Atom } from "./atom";
import { IAtoms } from "../interfaces";
import { Shade } from "../common/shade";
import { PropertyBoolean } from "../common/index";
import { Logger } from "../util/index";

const log = new Logger("hl");

export interface ShadeAndDecoration {
    shade: Shade;
    decoration: string;
    hoverDecoration: string;
}

export interface HotlinkModeVariables {
    unvisited: ShadeAndDecoration;
    visited: ShadeAndDecoration;
    underline: boolean;
    underlineRequired: boolean;
}

export interface OnHotlink {
    unvisited: Shade;
    visited: Shade;
}

export interface OnHotlinkWithDecoration extends OnHotlink {
    decoration: string,
    hoverDecoration: string,
}

export interface HotlinkVariables {
    default: HotlinkModeVariables;
    onWhite: HotlinkModeVariables;
    onBlack: HotlinkModeVariables;
    onTertiary: HotlinkModeVariables;
    onGradient3: OnHotlink;
}

/**
 * The hotlinks atom.
 * @category Atoms
 */
export class Hotlinks extends Atom {

    /** The underline hotlinks in light mode property */
    public underlineHotlinksInLightMode: PropertyBoolean;
    public variables?: HotlinkVariables;

    constructor(atoms: IAtoms) {
        super("Hotlinks", false, atoms);
        this.addDependency(atoms.colorThemes);
        this.underlineHotlinksInLightMode = new PropertyBoolean("Underline hotlinks in light mode", false, this, {defaultValue: true});
    }

    public findHotlinkVariables(): HotlinkVariables {
        return this.findHotlinkVariables2(true);
    }

    public getHotlinkVariables(): HotlinkVariables | undefined {
        return this.getHotlinkVariables2(true);
    }

    public findHotlinkVariables2(lm: boolean): HotlinkVariables {
        const vars = this.getHotlinkVariables2(lm);
        if (!vars) {
            throw new Error("Failed to get hotlink variables");
        }
        return vars;
    }

    public getHotlinkVariables2(lm: boolean): HotlinkVariables | undefined {
        log.debug(`Hotlinks.getHotlinkVariables enter`)
        const underline = this.underlineHotlinksInLightMode.getValue();
        if (underline === undefined) {
            log.debug(`Hotlinks.getHotlinkVariables exit (underline not set)`)
            return undefined;
        }
        const ct = this.getDefaultColorTheme();
        const shade = ct.button.getValue();
        if (!shade) {
            log.debug(`Hotlinks.getHotlinkVariables exit (button not set)`)
            return undefined;
        }
        const lmbg = ct.lightModeBackground.getValue();
        if (lmbg === undefined) {
            log.debug(`Hotlinks.getHotlinkVariables exit (lightModeBackground not set)`)
            return undefined;
        }
        const dmbg = ct.darkModeBackground.getValue();
        if (dmbg === undefined) {
            log.debug(`Hotlinks.getHotlinkVariables exit (darkModeBackground not set)`)
            return undefined;
        }
        let primary = ct.primary.getValue();
        if (primary === undefined) {
            log.debug(`Hotlinks.getHotlinkVariables exit (primary not set)`)
            return undefined;
        }
        const background = lm ? lmbg.primary : dmbg.secondary;
        log.debug("getHotlinkModeVariables (default)");
        const def = this.getHotlinkModeVariables("default", shade, background, underline, lm);
        if (!def) {
            log.debug(`Hotlinks.getHotlinkVariables exit (default variables not set)`)
            return undefined;
        }
        log.debug("getHotlinkModeVariables (onWhite)");
        const onWhite = this.getHotlinkModeVariables("onWhite", shade, Shade.WHITE, underline, lm);
        if (!onWhite) {
            log.debug(`Hotlinks.getHotlinkVariables exit (onWhite variables not set)`)
            return undefined;
        }
        log.debug("getHotlinkModeVariables (onBlack)");
        const onBlack = this.getHotlinkModeVariables("onBlack", shade, Shade.BLACK, underline, lm);
        if (!onBlack) {
            log.debug(`Hotlinks.getHotlinkVariables exit (onBlack variables not set)`)
            return undefined;
        }
        log.debug("getHotlinkModeVariables (onTertiary)");
        if (!lm) {
            // Use the dark primary 700 shade in dark mode
            primary = primary.getMode()?.color.dark.shades[7];
        }
        const onTertiary = this.getHotlinkModeVariables("onTertiary", shade, primary.getOnShade2(lm), underline, lm);
        if (!def) {
            log.debug(`Hotlinks.getHotlinkVariables exit (onBlack variables not set)`)
            return undefined;
        }
        log.debug("getHotlinkModeVariables (onTertiary)");
        let onGradient3: OnHotlink;
        if (lm) {
            onGradient3 = this.getOnGradient3(def, 138, Shade.BLACK, Shade.HALF_BLACK);
        } else {
            onGradient3 = this.getOnGradient3(def, 24, Shade.WHITE_DM, Shade.HALF_WHITE_DM);
        }
        this.variables = { default: def, onWhite, onBlack, onTertiary, onGradient3 };
        return this.variables;
    } 

    private getOnGradient3(vars: HotlinkModeVariables, rgb: number, elseShade: Shade, elseHalfShade: Shade): OnHotlink {
        const shade = vars.unvisited.shade;
        let contrast = shade.getContrastRatio(Shade.fromRGB(rgb,rgb,rgb));
        let unvisited, visited: Shade;
        if (contrast >= 3.1) {
            unvisited = shade;      
            visited = vars.visited.shade;       
        } else {
            unvisited = elseShade;
            visited = elseHalfShade;
        }
        return { unvisited, visited };
    }

    private getHotlinkModeVariables(type: string, shade: Shade, background: Shade, underline: boolean, lm: boolean): HotlinkModeVariables {
        const onBackground = background.getOnShade2(lm);
        let shade1:Shade | undefined;
        let shade2:Shade | undefined;
        const shades = shade.getShadesOrderedByNearness();
        let count = 0;
        log.debug(`hotlink begin search: type=${type}, shade=${shade.hex}, underline=${underline}, lm=${lm}, numShades=${shades.length}`);
        while (count < shades.length) {
            const cmpShade = shades[count];
            count++;
            let contrast = cmpShade.getContrastRatio(background);
            log.debug(`hotlink comparison1: count=${count}, index=${cmpShade.index}, shade=${cmpShade.hex}, background=${background.hex}, contrast=${contrast}`);
            if (contrast >= 4.5) {
                // Found a shade meeting the minimum requirements which is acceptable with underline
                if (!shade1) shade1 = cmpShade;
                const contrast2 = cmpShade.getContrastRatio(onBackground);
                log.debug(`hotlink comparison2: count=${count}, index=${cmpShade.index}, shade=${cmpShade.hex}, onBackground=${onBackground.hex}, contrast=${contrast2}`);
                if (contrast2 >= 3.1) {
                    // Found a shade meeting both requirements which is allows no underline
                    if (!shade2) shade2 = cmpShade;
                    break;
                }
            }
        }
        // Underlining is required if we couldn't find a shade which meets both contrast requirements
        const underlineRequired = shade2 === undefined;
        // Switch to underline if they requested no underline but underline is required
        underline = underline || underlineRequired;
        const unvisitedShade = underline ? shade1 : shade2;
        if (!unvisitedShade) throw new Error(`No hotlink shade was found for ${type} ${lm?"light":"dark"} mode, underline=${underline}, underlineRequired=${underlineRequired}`);
        const visitedShade = unvisitedShade.clone().setOpacity(0.7);
        log.debug(`hotlink end search: exit count=${count}, shade1=${shade1}, shade2=${shade2}`);
        return {
            unvisited: {
                shade: unvisitedShade,
                decoration: underline ? "underline" : "none",
                hoverDecoration: underline ? "none" : "underline",
            },
            visited: {
                shade: visitedShade,
                decoration: underline ? "none" : "underline",
                hoverDecoration: underline ? "underline" : "none",
            },
            underline,
            underlineRequired,
        };
    }

    private getDefaultColorTheme(): ColorTheme {
        return this.atoms.colorThemes.getDefaultTheme() as ColorTheme;
    }

    public deserialize(obj: any) {
        if (!obj) return;
        super.deserialize(obj);
        this.underlineHotlinksInLightMode.deserialize(obj.underlineHotlinksInLightMode);
    }

    public serialize(): any {
        const obj: any = {};
        obj.underlineHotlinksInLightMode = this.underlineHotlinksInLightMode.serialize();
        return obj;
    }

}