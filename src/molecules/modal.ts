/*
 * Copyright (c) 2023 Discover Financial Services
 * Licensed under MIT License. See License.txt in the project root for license information
 */
import { Molecule } from "./molecule";
import { Atoms, Shade } from "../atoms/index";
import { IMolecules } from "../interfaces";
import { PropertyNumberSelectable, PropertyShadowSelectable, PropertyColorShade } from "../common/props";

/**
 * The modal molecule.
 * @category Molecules
 */
export class Modal extends Molecule {
    
    /** The modal color shade property */
    public color: PropertyColorShade;
    /** The modal border radius property */
    public borderRadius: PropertyNumberSelectable;
    /** The modal shadow property */
    public shadow: PropertyShadowSelectable;
    private atoms: Atoms

    constructor(molecules: IMolecules) {
        super("Modal", molecules);
        this.atoms = this.getDesignSystem().atoms as Atoms;
        this.color = new PropertyColorShade("Color", false, this, {
            getSelectables: this.getColorSelectables.bind(this),
            defaultValue: Shade.BLACK,
        });
        this.borderRadius = new PropertyNumberSelectable("Border Radius", false, this, [0,1,2,3,4,5,6,7,8], 3);
        this.shadow = new PropertyShadowSelectable("Modal Shadow", false, this);
    }

    public getColorSelectables(): Shade[][] {
        const ct = this.atoms.colorThemes.getDefaultTheme();
        if (!ct) throw new Error("There is no default theme");
        const rtn: Shade[][] = [];
        // Black, white, and primary colors
        rtn.push([Shade.BLACK]);
        rtn.push([Shade.WHITE]);
        rtn.push([this.getPrimary()]);
        return rtn;
    }

    private getPrimary(): Shade {
        const ct = this.atoms.colorThemes.getDefaultTheme();
        if (!ct) throw new Error("The default color theme was not found");
        const shade = ct.primary.getValue();
        if (!shade) throw new Error(`Color theme ${ct.name} does not have a primary color`);
        return shade;
    }

    public deserialize(obj: any) {
        if (!obj) return;
        super.deserialize(obj);
        this.borderRadius.deserialize(obj.borderRadius);
        this.shadow.deserialize(obj.shadow);
    }

    public serialize(): any {
        const obj: any = {};
        obj.borderRadius = this.borderRadius.serialize();
        obj.shadow = this.shadow.serialize();
        return obj;
    }

}