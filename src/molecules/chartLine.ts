/*
 * Copyright (c) 2023 Discover Financial Services
 * Licensed under MIT License. See License.txt in the project root for license information
 */
import { Molecule } from "./molecule";
import { IMolecules } from "../interfaces";
import { 
    PropertyBoolean,
    PropertyPixelSelectable,
    PropertyBackgroundColorStyle,
    PropertyShadowSelectable,
} from "../common/props";

/**
 * The chart line molecule.
 * @category Molecules
 */
export class ChartLine extends Molecule {
    
    /** The line background color style property */
    public lineBackgroundColor: PropertyBackgroundColorStyle;
    /** The line width property */
    public lineWidth: PropertyPixelSelectable;
    /** The line shadow property */
    public lineShadow: PropertyShadowSelectable;
    /** The chart lines display property */
    public chartLinesDisplay: PropertyBoolean;
    /** The Y labels display property */
    public yLabelsDisplay: PropertyBoolean;

    constructor(molecules: IMolecules) {
        super("Line Chart", molecules);
        this.lineBackgroundColor = new PropertyBackgroundColorStyle("Line Background Color", false, this);
        this.lineWidth = new PropertyPixelSelectable("Line Width", false, this, [1, 2, 3, 4]);
        this.lineShadow = new PropertyShadowSelectable("Line Shadow", false, this);
        this.chartLinesDisplay = new PropertyBoolean("Chart Lines Display", false, this);
        this.yLabelsDisplay = new PropertyBoolean("Y Labels Display", false, this);
    }

    public deserialize(obj: any) {
        if (!obj) return;
        super.deserialize(obj);
        this.lineBackgroundColor.deserialize(obj.lineBackgroundColor);
        this.lineWidth.deserialize(obj.lineWidth);
        this.lineShadow.deserialize(obj.lineShadow);
        this.chartLinesDisplay.deserialize(obj.chartLinesDisplay);
        this.yLabelsDisplay.deserialize(obj.yLabelsDisplay);
    }

    public serialize(): any {
        const obj: any = {};
        obj.lineBackgroundColor = this.lineBackgroundColor.serialize();
        obj.lineWidth = this.lineWidth.serialize();
        obj.lineShadow = this.lineShadow.serialize();
        obj.chartLinesDisplay = this.chartLinesDisplay.serialize();
        obj.yLabelsDisplay = this.yLabelsDisplay.serialize();
        return obj;
    }
}