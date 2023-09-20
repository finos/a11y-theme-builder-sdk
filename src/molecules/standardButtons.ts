/*
 * Copyright (c) 2023 Discover Financial Services
 * Licensed under MIT License. See License.txt in the project root for license information
 */
import { Molecule } from "./molecule";
import { IMolecules } from "../interfaces";
import { PropertyStringSelectable, PropertyShadowSelectable, PropertyNumberSelectable } from "../common/props";

/**
 * The standard button molecule.
 * @category Molecules
 */
export class StandardButtons extends Molecule {
    
    /** The minimum width property */
    public minWidth: PropertyNumberSelectable;
    /** The height property */
    public height: PropertyNumberSelectable;
    /** The radius property */
    public radius: PropertyNumberSelectable;
    /** The horizontal padding property */
    public horizontalPadding: PropertyNumberSelectable;
    /** The button text property */
    public buttonText: PropertyStringSelectable;
    /** The button shadow property */
    public buttonShadow: PropertyShadowSelectable;
    /** The secondary border property */
    public secondaryBorder: PropertyNumberSelectable;

    constructor(molecules: IMolecules) {
        super("Standard Buttons", molecules);
        this.minWidth = new PropertyNumberSelectable("Button Minimum Width", false, this, [40/8, 44/8, 48/8, 56/8], 44/8);
        this.height = new PropertyNumberSelectable("Button Height", false, this, [40/8, 44/8, 48/8, 56/8], 44/8);
        this.radius = new PropertyNumberSelectable("Button Radius", false, this, [0, 2/8, 4/8, 1, 2, 3, 4, 5, 6, 7, 8], 3);
        this.horizontalPadding = new PropertyNumberSelectable("Horizontal Padding", false, this, [2, 3, 4, 5], 3);
        this.buttonText = new PropertyStringSelectable("Button Text", false, this, {
            selectables: ["CTA LARGE", "CTA Small"],
            defaultValue: "CTA LARGE",
        });
        this.buttonShadow = new PropertyShadowSelectable("Button Shadow", false, this);
        this.secondaryBorder = new PropertyNumberSelectable("Secondary Border", false, this, [1, 2, 3, 4], 2);
    }

    public deserialize(obj: any) {
        if (!obj) return;
        super.deserialize(obj);
        this.minWidth.deserialize(obj.minWidth);
        this.radius.deserialize(obj.radius);
        this.horizontalPadding.deserialize(obj.horizontalPadding);
        this.buttonText.deserialize(obj.buttonText);
        this.buttonShadow.deserialize(obj.buttonShadow);
        this.secondaryBorder.deserialize(obj.secondaryBorder);
    }

    public serialize(): any {
        const obj: any = {};
        obj.minWidth = this.minWidth.serialize();
        obj.radius = this.radius.serialize();
        obj.horizontalPadding = this.horizontalPadding.serialize();
        obj.buttonText = this.buttonText.serialize();
        obj.buttonShadow = this.buttonShadow.serialize();
        obj.secondaryBorder = this.secondaryBorder.serialize();
        return obj;
    }
}