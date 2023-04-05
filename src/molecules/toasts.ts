/*
 * Copyright (c) 2023 Discover Financial Services
 * Licensed under MIT License. See License.txt in the project root for license information
 */
import { Molecule } from "./molecule";
import { IMolecules } from "../interfaces";
import { PropertyPixelSelectable, PropertyNumberSelectable, PropertyElevationSelectable, PropertyShadowSelectable } from "../common/props";

/**
 * The toasts molecule.
 * @category Molecules
 */
export class Toasts extends Molecule {
    
    /** The handle border radius property */
    public handleBorderRadius: PropertyNumberSelectable;
    /** The gap property */
    public gap: PropertyPixelSelectable;
    /** The elevation property */
    public elevation: PropertyElevationSelectable;

    constructor(molecules: IMolecules) {
        super("Toasts", molecules);
        this.handleBorderRadius = new PropertyNumberSelectable("Handle Border Radius", false, this, [0,1,2,3,4,5,6,7,8], 1);
        this.gap = new PropertyPixelSelectable("Gap", false, this, [8,16,24,32,40,44], 24);
        this.elevation = new PropertyElevationSelectable("Toast Elevation", false, this, 0, 9);
    }

    public deserialize(obj: any) {
        if (!obj) return;
        super.deserialize(obj);
        this.handleBorderRadius.deserialize(obj.handleBorderRadius);
        this.gap.deserialize(obj.gap);
        this.elevation.deserialize(obj.elevation);
    }

    public serialize(): any {
        const obj: any = {};
        obj.handleBorderRadius = this.handleBorderRadius.serialize();
        obj.gap = this.gap.serialize();
        obj.elevation = this.elevation.serialize();
        return obj;
    }
}