/*
 * Copyright (c) 2023 Discover Financial Services
 * Licensed under Apache-2.0 License. See License.txt in the project root for license information
 */
import { Molecule } from "./molecule";
import { IMolecules } from "../interfaces";
import { 
    PropertyStringSelectable,
    PropertyPixel,
    PropertyShadowSelectable,
    PropertyNumber,
    PropertyNumberSelectable,
} from "../common/props";

/**
 * The chips molecule.
 * @category Molecules
 */
export class Chips extends Molecule {
    
    /** The minimum width property */
    public minWidth: PropertyNumber;
    /** The visible height property */
    public visibleHeight: PropertyNumberSelectable;
    /** The radius property */
    public radius: PropertyNumberSelectable;
    /** The horizontal padding property */
    public horizontalPadding: PropertyNumberSelectable;
    /** The text property */
    public text: PropertyStringSelectable;
    /** The shadow property */
    public shadow: PropertyShadowSelectable;

   constructor(molecules: IMolecules) {
        super("Chips", molecules);
        this.minWidth = new PropertyPixel("Chip Min Width", false, this, {defaultValue: 80});
        this.visibleHeight = new PropertyNumberSelectable("Visible Height", false, this, [4, 5, 6, 7, 8], 5);
        this.radius = new PropertyNumberSelectable("Chip Radius", false, this, [0, 1, 2, 3, 4, 5, 6, 7, 8], 2);
        this.horizontalPadding = new PropertyNumberSelectable("Horizontal Padding", false, this, [1, 2, 3, 4, 5], 2);
        this.text = new PropertyStringSelectable("Chip Text", false, this, {
            selectables: ["Caption", "Caption Bold"],
            defaultValue: "Caption",
        });
        this.shadow = new PropertyShadowSelectable("Chip Elevation", false, this, {defaultValue: "Elevation 2"});
    }

    public deserialize(obj: any) {
        if (!obj) return;
        super.deserialize(obj);
        this.minWidth.deserialize(obj.minWidth);
        this.visibleHeight.deserialize(obj.visibleHeight);
        this.radius.deserialize(obj.radius);
        this.horizontalPadding.deserialize(obj.horizontalPadding);
        this.text.deserialize(obj.text);
        this.shadow.deserialize(obj.shadow);
    }

    public serialize(): any {
        const obj: any = {};
        obj.minWidth = this.minWidth.serialize();
        obj.visibleHeight = this.visibleHeight.serialize();
        obj.radius = this.radius.serialize();
        obj.horizontalPadding = this.horizontalPadding.serialize();
        obj.text = this.text.serialize();
        obj.shadow = this.shadow.serialize();
        return obj;
    }
}