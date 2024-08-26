/*
 * Copyright (c) 2023 Discover Financial Services
 * Licensed under Apache-2.0 License. See License.txt in the project root for license information
 */
import { Atom } from "./atom";
import { ColorTheme } from "./colorThemes";
import { IDesignSystem, IAtoms, EventValueChange, IColor } from "../interfaces";
import { Shade } from "../common/shade";
import { PropertyString, PropertyWCAGSelectable, PropertyBoolean, PropertyNumberRange, PropertyGroupListener } from "../common/props";
import { Logger } from "../util/logger";
import { WCAGLevel } from "../common/wcag";
import { Util } from "../util";
import { ShadeBuilderView } from "../common/shadeBuilder";

const log = new Logger("ss");

/**
 * The state settings atom.
 * @category Atoms
 */
export class StateSettings extends Atom {

    /** The info state setting properties */
    public readonly info: StateSetting;
    /** The success state setting properties */
    public readonly success: StateSetting;
    /** The warning state setting properties */
    public readonly warning: StateSetting;
    /** The danger state setting properties */
    public readonly danger: StateSetting;
    /** All state setting properties */
    public readonly all: StateSetting[] = [];
    /** Property set to true when everything is ready */
    public readonly ready: PropertyBoolean;
    /** Design system */
    public designSystem: IDesignSystem;
    /** Color specific Shade builder config */
    public wcagLevel: PropertyWCAGSelectable;
    public lightModeMaxChroma: PropertyNumberRange;
    public darkModeMaxChroma: PropertyNumberRange;

    constructor(atoms: IAtoms) {
        super("State Settings", false, atoms);
        this.designSystem = this.getDesignSystem();
        this.wcagLevel = new PropertyWCAGSelectable(this);
        this.lightModeMaxChroma = new PropertyNumberRange("Max Chroma in Light Mode", true, this, 0, 100, 80);
        this.darkModeMaxChroma = new PropertyNumberRange("Max Chroma in Dark Mode", true, this, 0, 100, 60);
        this.addDependency(atoms.colorThemes);
        const firstIndex = 10000;
        this.info = new StateSetting("info", firstIndex, "#0066EF", this);
        this.success = new StateSetting("success", firstIndex+1, "#327D35", this);
        this.warning = new StateSetting("warning", firstIndex+2, "#A06B1A", this);
        this.danger = new StateSetting("danger", firstIndex+3, "#D62B2B", this);
        this.ready = new PropertyBoolean("ready", false, this, {defaultValue: false});
        this.atoms.colorThemes.defaultTheme.setPropertyListener(`_tb.StateSettings`, this.setDefaultTheme.bind(this));
    }

    private setDefaultTheme(_: EventValueChange<string>) {
        log.debug("StateSettings default theme was set");
        this.init();
    }

    private init() {
        log.debug("StateSettings.init enter");
        const self = this;
        const theme = this.atoms.colorThemes.getDefaultTheme() as ColorTheme;
        if (!theme) {
            log.debug("StateSettings.init - exit (no default theme)");
            return;
        }
        new PropertyGroupListener("stateSettings", [theme.lightModeBackground, theme.darkModeBackground], function(_: PropertyGroupListener){
            log.debug("StateSettings light and dark mode are set in theme");
            for (const ss of self.all) {
                ss.setShades();
            }
            self.ready.setValue(true);
        });
        log.debug("StateSettings.init exit");
    }

    public getWCAGLevel(): WCAGLevel {
        const val = this.getPropValueByName<string>("wcagLevel");
        if (!val) throw new Error("No WCAG level found");
        const rtn = WCAGLevel.findByName(val);
        if (!rtn) throw new Error(`Invalid WCAG level: '${val}'`);
        return rtn;
    }

    public deserialize(obj: any) {
        if (!obj) return;
        super.deserialize(obj);
        this.info.hex.deserialize(obj.information);
        this.success.hex.deserialize(obj.success);
        this.warning.hex.deserialize(obj.warning);
        this.danger.hex.deserialize(obj.danger);
        this.init();
    }

    public serialize(): any {
        const obj: any = {};
        obj.information = this.info.hex.serialize();
        obj.success = this.success.hex.serialize();
        obj.warning = this.warning.hex.serialize();
        obj.danger = this.danger.hex.serialize();
        return obj;
    }

}

export class StateSetting implements IColor {

    public readonly name: string;
    public readonly index: number;
    public readonly hex: PropertyString;
    public readonly prop: PropertyString;
    public readonly ss: StateSettings;
    public lmShade: Shade = new Shade({hex: Shade.WHITE.hex});
    public dmShade: Shade = new Shade({hex: Shade.BLACK.hex});
    public shades: ShadeBuilderView;
    private atoms: IAtoms;

    constructor(name: string, index: number, defaultValue: string, ss: StateSettings) {
        this.name = name;
        this.index = index;
        this.atoms = ss.atoms;
        this.ss = ss;
        this.shades = new ShadeBuilderView(ss, Shade.fromHex(defaultValue), this);
        this.hex = new PropertyString(name, false, ss, {defaultValue});
        this.prop = this.hex;  // Duplicate variable for backwards compatibility
        this.hex.setPropertyListener(`_tb.StateSetting.${name}`, this.setShadesListener.bind(this));
        ss.all.push(this);
    }

    private setShadesListener(_: EventValueChange<string>) {
        this.setShades();
    }

    private getDiffColor = function(hex1:string, hex2:string) {
        const a = Util.hexToRgbArray(hex1);
        const b = Util.hexToRgbArray(hex2);
        return Math.sqrt(Math.pow((a[0] - b[0]),2) + Math.pow((a[1] - b[1]),2) + Math.pow((a[2] - b[2]),2));
      }

    public setShades() {
        log.debug(`StateSettings.setShades enter: name=${this.name}`);
        const hex = this.hex.getValue() || "";
        this.shades.updateColor(Shade.fromHex(hex));
        const wcagLevel = this.ss.wcagLevel.getValue() as WCAGLevel;
        const shades = this.shades.getShades(wcagLevel);
        const lmShades = shades.light;
        const dmShades = shades.dark;
        // Find the lm shade for hex value & get corresponding dm shade
        let index = -1;
        let min = 9999999;
        for (var i = 0; i < lmShades.length; i++) {
            const diff = this.getDiffColor(lmShades[i].hex, hex);
            if (diff < min) {
                min = diff;
                index = i;
                if (diff == 0) break;
            }
        }
        if (index == -1) {
            log.debug(`StateSettings.setShades could not find ${hex} in built lmShades`);
            return;
        }
        const lmStart = lmShades[index];
        const dmStart = dmShades[index];
        const theme = this.atoms.colorThemes.getDefaultTheme() as ColorTheme;
        if (!theme) {
            log.debug(`StateSettings.setShades exit (no default theme): name=${this.name}`);
            return;
        }
        this.setLMShade(theme, lmStart);
        this.setDMShade(theme, dmStart);
        log.debug(`StateSettings.setShades exit: name=${this.name}`);
    }

    private setLMShade(theme: ColorTheme, shade: Shade) {
        log.debug(`StateSettings.setLMShade enter - name=${this.name}`);
        this.lmShade = theme.findLightModeShade(shade);
        log.debug(`StateSettings.setLMShade exit: name=${this.name}, shade=${JSON.stringify(this.lmShade)}`);
    }

    private setDMShade(theme: ColorTheme, shade: Shade) {
        log.debug("StateSettings.setDMShade enter");
        this.dmShade = theme.findDarkModeShade(shade);
        log.debug(`StateSettings.setDMShade exit: ${JSON.stringify(this.dmShade)}`);
    }

}