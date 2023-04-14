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
    /** The padding property */
    public padding: PropertyNumberSelectable;
    /** The elevation property */
    public elevation: PropertyElevationSelectable;

    constructor(molecules: IMolecules) {
        super("Toasts", molecules);
        this.handleBorderRadius = new PropertyNumberSelectable("Handle Border Radius", false, this, [0,1,2,3,4,5,6,7,8], 1);
        this.padding = new PropertyNumberSelectable("Padding", false, this, [1,2,3], 1);
        this.elevation = new PropertyElevationSelectable("Toast Elevation", false, this, 0, 9);
    }

    public deserialize(obj: any) {
        if (!obj) return;
        super.deserialize(obj);
        this.handleBorderRadius.deserialize(obj.handleBorderRadius);
        this.padding.deserialize(obj.gap);
        this.elevation.deserialize(obj.elevation);
    }

    public serialize(): any {
        const obj: any = {};
        obj.handleBorderRadius = this.handleBorderRadius.serialize();
        obj.gap = this.padding.serialize();
        obj.elevation = this.elevation.serialize();
        return obj;
    }
}