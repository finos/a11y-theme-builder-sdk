/*
 * Copyright (c) 2023 Discover Financial Services
 * Licensed under Apache-2.0 License. See License.txt in the project root for license information
 */
import { Molecule } from "./molecule";
import { IMolecules } from "../interfaces";
import { PropertyNumberSelectable, PropertyElevationSelectable, PropertyShadowSelectable } from "../common/props";

/**
 * The sliders molecule.
 * @category Molecules
 */
export class Sliders extends Molecule {
    
    /** The handle border radius property */
    public handleBorderRadius: PropertyNumberSelectable;
    /** The visible height property */
    public visibleHeight: PropertyNumberSelectable;
    /** The handle elevation property */
    public handleElevation: PropertyElevationSelectable;
    /** The bar height property */
    public barHeight: PropertyNumberSelectable;
    /** The bar inset shadow property */
    public barInsetShadow: PropertyShadowSelectable;

    constructor(molecules: IMolecules) {
        super("Sliders", molecules);
        this.handleBorderRadius = new PropertyNumberSelectable("Handle Border Radius", false, this, [0,1,2,3,4,5,6,7,8], 1);
        this.visibleHeight = new PropertyNumberSelectable("Visible Height", false, this, [3, 4, 5, 6], 3);
        this.handleElevation = new PropertyElevationSelectable("Handle Elevation", false, this, 0, 9);
        this.barHeight = new PropertyNumberSelectable("Bar Height", false, this, [0.5, 1, 2, 4], 1);
        this.barInsetShadow = new PropertyShadowSelectable("Bar Inset Shadow", false, this, 9, 0);
    }

    public deserialize(obj: any) {
        if (!obj) return;
        super.deserialize(obj);
        this.handleBorderRadius.deserialize(obj.handleBorderRadius);
        this.visibleHeight.deserialize(obj.visibleHeight);
        this.handleElevation.deserialize(obj.handleElevation);
        this.barHeight.deserialize(obj.barHeight);
        this.barInsetShadow.deserialize(obj.InsetShadow);
    }

    public serialize(): any {
        const obj: any = {};
        obj.handleBorderRadius = this.handleBorderRadius.serialize();
        obj.visibleHeight = this.visibleHeight.serialize();
        obj.handleElevation = this.handleElevation.serialize();
        obj.barHeight = this.barHeight.serialize();
        obj.barInsetShadow = this.barInsetShadow.serialize();
        return obj;
    }
}