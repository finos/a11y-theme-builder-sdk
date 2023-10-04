/*
 * Copyright (c) 2023 Discover Financial Services
 * Licensed under Apache-2.0 License. See License.txt in the project root for license information
 */
import { Molecule } from "./molecule";
import { IMolecules } from "../interfaces";
import { 
    PropertyRange,
    PropertyStringSelectable,
    PropertyPixelSelectable,
    PropertyShadowSelectable,
} from "../common/props";

/**
 * The chart progress molecule.
 * @category Molecules
 */
export class ChartProgress extends Molecule {
    
    /** The cutout thickness range property */
    public cutoutThickness: PropertyRange;
    /** The segment shadow property */
    public segmentShadow: PropertyShadowSelectable;
    /** The container padding property */
    public containerPadding: PropertyPixelSelectable;
    /** The container reverse padding property */
    public containerShadow: PropertyShadowSelectable;
    /** The starting position property */
    public startingPosition: PropertyStringSelectable;

    constructor(molecules: IMolecules) {
        super("Progress Charts", molecules);
        this.cutoutThickness = new PropertyRange("Cut out thickness", 0, 100, false, this);
        this.segmentShadow = new PropertyShadowSelectable("Segment Shadow", false, this);
        this.containerPadding = new PropertyPixelSelectable("Container Padding", false, this, [0, 2, 4, 8, 16, 24, 32]);
        this.containerShadow = new PropertyShadowSelectable("Container Shadow", false, this);
        this.startingPosition = new PropertyStringSelectable("Starting position", false, this, {selectables: ["Top", "Bottom"]});
    }

    public deserialize(obj: any) {
        if (!obj) return;
        super.deserialize(obj);
        this.cutoutThickness.deserialize(obj.cutoutThickness);
        this.segmentShadow.deserialize(obj.segmentShadow);
        this.containerPadding.deserialize(obj.containerPadding);
        this.containerShadow.deserialize(obj.containerShadow);
        this.startingPosition.deserialize(obj.startingPosition);
    }

    public serialize(): any {
        const obj: any = {};
        obj.cutoutThickness = this.cutoutThickness.serialize();
        obj.segmentShadow = this.segmentShadow.serialize();
        obj.containerPadding = this.containerPadding.serialize();
        obj.containerShadow = this.containerShadow.serialize();
        obj.startingPosition = this.startingPosition.serialize();
        return obj;
    }
}