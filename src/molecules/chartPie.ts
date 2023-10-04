/*
 * Copyright (c) 2023 Discover Financial Services
 * Licensed under Apache-2.0 License. See License.txt in the project root for license information
 */
import { Molecule } from "./molecule";
import { IMolecules } from "../interfaces";
import { 
    PropertyBoolean,
    PropertyPixelSelectable,
    PropertyShadowSelectable,
} from "../common/props";

/**
 * The chart pie molecule.
 * @category Molecules
 */
export class ChartPie extends Molecule {
    
    /** The segment radius property */
    public segmentRadius: PropertyPixelSelectable;
    /** The space between segments property */
    public spaceBetweenSegments: PropertyPixelSelectable;
    /** The progress shadow property */
    public progressShadow: PropertyShadowSelectable;
    /** The container display property */
    public containerDisplay: PropertyBoolean;
    /** The container padding property */
    public containerPadding: PropertyPixelSelectable;
    /** The container shadow property */
    public containerShadow: PropertyShadowSelectable;

    constructor(molecules: IMolecules) {
        super("Pie Chart", molecules);
        this.segmentRadius = new PropertyPixelSelectable("Segment Radius", false, this, [0, 4, 8, 16]);
        this.spaceBetweenSegments = new PropertyPixelSelectable("Space between segments", false, this, [2, 4, 8, 16]);
        this.progressShadow = new PropertyShadowSelectable("Progress Shadow", false, this);
        this.containerDisplay = new PropertyBoolean("Container Display", false, this);
        this.containerPadding = new PropertyPixelSelectable("Container Padding", false, this, [4, 8, 16, 24, 32]);
        this.containerShadow = new PropertyShadowSelectable("Container Shadow", false, this);
    }

    public deserialize(obj: any) {
        if (!obj) return;
        super.deserialize(obj);
        this.segmentRadius.deserialize(obj.segmentRadius);
        this.spaceBetweenSegments.deserialize(obj.spaceBetweenSegments);
        this.progressShadow.deserialize(obj.progressShadow);
        this.containerDisplay.deserialize(obj.containerDisplay);
        this.containerPadding.deserialize(obj.containerPadding);
        this.containerShadow.deserialize(obj.containerShadow);
    }

    public serialize(): any {
        const obj: any = {};
        obj.segmentRadius = this.segmentRadius.serialize();
        obj.spaceBetweenSegments = this.spaceBetweenSegments.serialize();
        obj.progressShadow = this.progressShadow.serialize();
        obj.containerDisplay = this.containerDisplay.serialize();
        obj.containerPadding = this.containerPadding.serialize();
        obj.containerShadow = this.containerShadow.serialize();
        return obj;
    }
}