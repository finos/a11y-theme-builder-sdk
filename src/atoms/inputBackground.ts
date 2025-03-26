/*
 * Copyright (c) 2023 Discover Financial Services
 * Licensed under Apache-2.0 License. See License.txt in the project root for license information
 */
import { TitledShade, PropertyTitledShade } from "../common/props";
import { ColorTheme } from "./colorThemes";
import { Atom } from "./atom";
import { IAtoms, IInputBackground } from "../interfaces";
import { Shade } from "../common/shade";
import { Logger } from "../util/logger";

export interface InputBackgroundVariables {
    inputDefault: Shade;
    onInputDefault: Shade;
    dmInputDefault: Shade;
}

const log = new Logger("ib");

/**
 * The input backbround atom.
 * @category Atoms
 */
export class InputBackground extends Atom implements IInputBackground {

    /** The overlay shade property */
    public readonly overlayColor: PropertyTitledShade;
    private readonly whiteBackground: TitledShade;

    constructor(atoms: IAtoms) {
        super("Input Background", false, atoms);
        this.addDependency(atoms.colorThemes);
        this.whiteBackground = new TitledShade("White Background", Shade.WHITE);
        this.overlayColor = new PropertyTitledShade("Overlay Color", false, this, {
            getSelectables: this.getSelectables.bind(this),
            defaultValue: this.whiteBackground,
        });
    }

    private getSelectables(): TitledShade[] {
        const ct = this.getDefaultColorTheme();
        const primary = ct.primary.getValue();
        if (!primary) throw new Error(`The primary of the default theme has not been set`);
        // Use the 100 value (i.e. index 1 below) for the primary overlay
        const primaryBackground = new TitledShade("Primary Background", primary.buildShades()[1]);
        return [this.whiteBackground, primaryBackground];
    }

    public getVariables(): InputBackgroundVariables | undefined {
        const overlay = this.overlayColor.getValue();
        if (!overlay) {
            log.debug(`InputBackground.getVariables: no overlay`);
            return undefined;
        }
        const theme = this.getDefaultColorTheme();
        if (!theme) {
            log.debug(`InputBackground.getVariables: no default theme`);
            return undefined;
        }
        const lmbg = theme.lightModeBackground.getValue();
        if (!lmbg) {
            log.debug(`InputBackground.getVariables: no lightmode background`);
            return undefined;
        }
        const dmbg = theme.darkModeBackground.getValue();
        if (!dmbg) {
            log.debug(`InputBackground.getVariables: no darkmode background`);
            return undefined;
        }
        const primaryDarkShade = dmbg.primary.buildShades()[4];
        // Set light mode variables
        let inputDefault: Shade;
        let onInputDefault: Shade;
        const inputOverlayIsWhite = overlay === this.whiteBackground;
        if (lmbg.title === ColorTheme.CP_BLACK_OFFBLACK || lmbg.title === ColorTheme.CP_800_900) {
            if (inputOverlayIsWhite) {
                inputDefault = lmbg.primary.mixShade(overlay.shade,.03);
            } else {
                inputDefault = lmbg.primary.mixShade(overlay.shade,.1);
            }
            onInputDefault = Shade.WHITE;
        } else if (lmbg.title === ColorTheme.CP_WHITE_OFFWHITE || lmbg.title === ColorTheme.CP_HALF_QUARTER) {
            if (inputOverlayIsWhite) {
                inputDefault = lmbg.primary.mixShade(Shade.WHITE,.1);
            } else {
                inputDefault = lmbg.primary.mixShade(overlay.shade,.3);
            }
            onInputDefault = Shade.BLACK;
        } else {
            throw new Error(`Invalid light mode background title: ${lmbg.title}`);
        }
        // Set dark mode variables
        let dmInputDefault: Shade;
        if (dmbg.title === ColorTheme.CP_BLACK_OFFBLACK) {
            if (inputOverlayIsWhite) {
                dmInputDefault = dmbg.primary.mixShade(Shade.fromRGB(255,255,255), 0.2);
            } else {
                dmInputDefault = dmbg.primary.mixShade(primaryDarkShade, 0.2);
            }
        } else if (dmbg.title === ColorTheme.CP_800_900) {
            if (inputOverlayIsWhite) {
                dmInputDefault = dmbg.primary.mixShade(overlay.shade,0.2);
            } else {
                dmInputDefault = dmbg.primary.mixShade(overlay.shade,0.2);
            }
        } else {
            throw new Error(`Invalid title for dark mode background: ${dmbg.title}`)
        }
        const vars: InputBackgroundVariables = {
            inputDefault,
            onInputDefault,
            dmInputDefault,
        };
        log.debug(`InputBackground variables: ${JSON.stringify(vars,null,4)}`);
        return vars;
    }

    private getDefaultColorTheme(): ColorTheme {
        return this.atoms.colorThemes.getDefaultTheme() as ColorTheme;
    }

    public deserialize(obj: any) {
        if (!obj) return;
        super.deserialize(obj);
        this.overlayColor.deserialize(obj.background);
        this.whiteBackground.deserialize(obj.whiteBackground);
    }

    public serialize(): any {
        const obj: any = {};
        obj.background = this.overlayColor.serialize();
        obj.whiteBackground = this.whiteBackground.serialize();
        return obj;
    }
}