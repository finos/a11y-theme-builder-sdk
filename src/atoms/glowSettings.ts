/*
 * Copyright (c) 2023 Discover Financial Services
 * Licensed under Apache-2.0 License. See License.txt in the project root for license information
 */
import { Atom } from "./atom";
import { IAtoms } from "../interfaces";
import { PropertyString, PropertyNumberRange, PropertyPercentage } from "../common/props";
import { Logger } from "../util/logger";
import { ColorTheme } from "./colorThemes";

const log = new Logger("glow");

/**
 * The elevation settings atom.
 * @category Atoms
 */
export class GlowSettings extends Atom {

    /** The glow color property */
    public color: PropertyString;
    /** The base blur radius property */
    public blurRadius: PropertyNumberRange;
    /** The base spread radius property */
    public spreadRadius: PropertyNumberRange;
    /** The base color opacity property */
    public colorOpacity: PropertyNumberRange;
    /** The percentage change property */
    public percentageChange: PropertyPercentage;

    constructor(atoms: IAtoms) {
        super("Glow Settings", false, atoms);
        this.addDependency(atoms.colorThemes);
        this.color = new PropertyString("Color", false, this, { getDefaultValue: this.getDefaultColor.bind(this) });
        this.blurRadius = new PropertyNumberRange("Blur Radius", false, this, 0, 10, 2);
        this.spreadRadius = new PropertyNumberRange("Spread Radius", false, this, 0, 10, 2);
        this.colorOpacity = new PropertyNumberRange("Color Opacity", false, this, 0, 100, 4);
        this.percentageChange = new PropertyPercentage("Percentage Change", false, this, 20);
    }

    private getDefaultColor(): string {
        let defColor = "#000000";
        const ct = this.atoms.colorThemes.getDefaultTheme() as ColorTheme;
        if (ct) {
            defColor = ct.primary.getValue()?.hex as string;
        }
        log.debug(`glowSettings.getDefaultColor: ${defColor}`);
        return defColor;
    }

    public deserialize(obj: any) {
        if (!obj) return;
        super.deserialize(obj);
        this.color.deserialize(obj.shadowColor);
        this.blurRadius.deserialize(obj.blurRadius);
        this.spreadRadius.deserialize(obj.spreadRadius);
        this.colorOpacity.deserialize(obj.colorOpacity);
        this.percentageChange.deserialize(obj.percentageChange);
    }

    public serialize(): any {
        const obj: any = {};
        obj.color = this.color.serialize();
        obj.blurRadius = this.blurRadius.serialize();
        obj.spreadRadius = this.spreadRadius.serialize();
        obj.colorOpacity = this.colorOpacity.serialize();
        obj.percentageChange = this.percentageChange.serialize();
        return obj;
    }
}