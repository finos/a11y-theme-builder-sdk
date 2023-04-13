/*
 * Copyright (c) 2023 Discover Financial Services
 * Licensed under MIT License. See License.txt in the project root for license information
 */
import { Color } from "./colorPalette";
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
    lm: HotlinkModeVariables;
    dm: HotlinkModeVariables;
    onWhite: OnHotlinkWithDecoration;
    onBlack: OnHotlinkWithDecoration;
    onTertiary: OnHotlinkWithDecoration;
    onGradient3: OnHotlink;
    onDMGradient3: OnHotlink;
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
        const vars = this.getHotlinkVariables();
        if (!vars) {
            throw new Error("Failed to get hotlink variables");
        }
        return vars;
    }

    public getHotlinkVariables(): HotlinkVariables | undefined {
        log.debug(`Hotlinks.getHotlinkVariables enter`)
        const underline = this.underlineHotlinksInLightMode.getValue();
        if (underline === undefined) {
            log.debug(`Hotlinks.getHotlinkVariables exit (underline not set)`)
            return undefined;
        }
        const ct = this.getDefaultColorTheme();
        const button = ct.button.getValue();
        if (!button) {
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
        const primary = ct.primary.getValue();
        if (primary === undefined) {
            log.debug(`Hotlinks.getHotlinkVariables exit (primary not set)`)
            return undefined;
        }
        const lmBackground = lmbg.primary;
        const dmBackground = dmbg.primary;
        const lm = this.getHotlinkModeVariables(button, lmBackground, underline, true);
        const dm = this.getHotlinkModeVariables(button, dmBackground, underline, false);
        const onWhite = this.getOnHotlinkWithDecoration(lm, Shade.WHITE);
        const onBlack = this.getOnHotlinkWithDecoration(lm, Shade.BLACK);
        const onTertiary = this.getOnHotlinkWithDecoration(lm, primary);
        const onGradient3 = this.getOnGradient3(lm, 138, Shade.BLACK, Shade.HALF_BLACK);
        const onDMGradient3 = this.getOnGradient3(dm, 24, Shade.WHITE_DM, Shade.HALF_WHITE_DM);
        this.variables = {
            lm,
            dm,
            onWhite,
            onBlack,
            onTertiary,
            onGradient3,
            onDMGradient3,
        };
        return this.variables;
    } 

    private getOnHotlinkWithDecoration(vars: HotlinkModeVariables, comp: Shade): OnHotlinkWithDecoration {
        let unvisited, visited: Shade;
        let decorate: boolean;
        const shade = vars.unvisited.shade;
        const underline = vars.underline;
        const onComp = comp.getOnShade2(true);
        let contrast = shade.getContrastRatio(comp);
        if (contrast >= 3.1) {
            unvisited = shade;      
            visited = vars.visited.shade;       
            decorate = !underline || shade.getContrastRatio(onComp) < 3.1;
        } else {
            unvisited = onComp;
            visited = onComp.clone().setOpacity(0.8);
            decorate = !underline;
        }
        const decoration = decorate ? "underline" : "none";
        const hoverDecoration = decorate ? "none" : "underline";
        return { unvisited, visited, decoration, hoverDecoration};
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

    private getHotlinkModeVariables(button: Shade, background: Shade, underline: boolean, lm: boolean): HotlinkModeVariables {
        const onBackground = background.getOnShade2(lm);
        let shade1:Shade | undefined;
        let shade2:Shade | undefined;
        log.debug(`Hotlinks.getHotlinkModeVariables enter: button=${button.toString()}, underline=${underline}, lm=${lm}`);
        const shades = button.getMode().shades;
        let cmpShade: Shade | undefined = button;
        let count = 0;
        while (cmpShade) {
            count++;
            let contrast = cmpShade.getContrastRatio(background);
            log.debug(`Hotlinks.getHotlinkModeVariables backgroundContrast=${contrast}, index=${cmpShade.index}`);
            if (contrast >= 4.5) {
                // Found a shade meeting the minimum requirements which is acceptable with underline
                if (!shade1) shade1 = cmpShade;
                const contrast2 = cmpShade.getContrastRatio(onBackground);
                log.debug(`Hotlinks.getHotlinkModeVariables onBackgroundContrast=${contrast2}, index=${cmpShade.index}`);
                if (contrast2 >= 3.1) {
                    // Found a shade meeting both requirements which is allows no underline
                    if (!shade2) shade2 = cmpShade;
                    break;
                }
            }
            // Advance to the next shade, to higher indices (darker) for light mode and lower indices (lighter) for dark mode.
            if (lm) cmpShade = shades.length > cmpShade.index+1 ? shades[cmpShade.index+1] : undefined;
            else cmpShade = cmpShade.index > 0 ? shades[cmpShade.index-1] : undefined;
        }
        // Underlining is required if we couldn't find a shade which meets both contrast requirements
        const underlineRequired = shade2 === undefined;
        // Switch to underline if they requested no underline but underline is required
        underline = underline || underlineRequired;
        const unvisitedShade = underline ? shade1 : shade2;
        if (!unvisitedShade) throw new Error(`No hotlink shade was found for ${lm?"light":"dark"} mode`);
        const visitedShade = unvisitedShade.clone().setOpacity(0.9);
        log.debug(`Hotlinks.getHotlinkModeVariables exit count=${count}, shade1=${shade1}, shade2=${shade2}`);
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