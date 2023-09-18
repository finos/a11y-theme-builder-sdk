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
 * The Chart Bar molecule.
 * @category Molecules
 */
export class ChartBar extends Molecule {
    
    /** The chart bar background color property  */
    public barBackgroundColor: PropertyBackgroundColorStyle;
    /** The chart bar width property  */
    public barWidth: PropertyPixelSelectable;
    /** The chart bar radius property  */
    public barRadius: PropertyPixelSelectable;
    /** The chart border property  */
    public chartBorder: PropertyPixelSelectable;
    /** The bar shadow property  */
    public barShadow: PropertyShadowSelectable;
    /** The chart line display property  */
    public chartLinesDisplay: PropertyBoolean;
    /** The Y labels display property  */
    public yLabelsDisplay: PropertyBoolean;

    constructor(molecules: IMolecules) {
        super("Bar Chart", molecules);
        this.barBackgroundColor = new PropertyBackgroundColorStyle("Line Background Color", false, this);
        this.barWidth = new PropertyPixelSelectable("Bar Width", false, this, [8, 16, 24, 32, 40, 48, 56]);
        this.barRadius = new PropertyPixelSelectable("Bar Radius", false, this, [0, 4, 8, 16, 24, 32, 40, 48, 56]);
        this.chartBorder = new PropertyPixelSelectable("Chart Border", false, this, [1, 2, 3, 4]);
        this.barShadow = new PropertyShadowSelectable("Bar Shadow", false, this);
        this.chartLinesDisplay = new PropertyBoolean("Chart Lines Display", false, this);
        this.yLabelsDisplay = new PropertyBoolean("Y Labels Display", false, this);
    }

    public deserialize(obj: any) {
        if (!obj) return;
        super.deserialize(obj);
        this.barBackgroundColor.deserialize(obj.barBackgroundColor);
        this.barWidth.deserialize(obj.barWidth);
        this.barRadius.deserialize(obj.barRadius);
        this.chartBorder.deserialize(obj.chartBorder);
        this.barShadow.deserialize(obj.barShadow);
        this.chartLinesDisplay.deserialize(obj.chartLinesDisplay);
        this.yLabelsDisplay.deserialize(obj.yLabelsDisplay);
    }

    public serialize(): any {
        const obj: any = {};
        obj.barBackgroundColor = this.barBackgroundColor.serialize();
        obj.barWidth = this.barWidth.serialize();
        obj.barRadius = this.barRadius.serialize();
        obj.chartBorder = this.chartBorder.serialize();
        obj.barShadow = this.barShadow.serialize();
        obj.chartLinesDisplay = this.chartLinesDisplay.serialize();
        obj.yLabelsDisplay = this.yLabelsDisplay.serialize();
        return obj;
    }
}