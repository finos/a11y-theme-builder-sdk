/*
 * Copyright (c) 2023 Discover Financial Services
 * Licensed under Apache-2.0 License. See License.txt in the project root for license information
 */
import { Molecule } from "./molecule";
import { IMolecules } from "../interfaces";
import { PropertyPixel, 
    PropertyShadowSelectable, 
    PropertyNumberSelectable,
} from "../common/props";

/**
 * The cards molecule.
 * @category Molecules
 */
export class Cards extends Molecule {
    
    /** The card minimum width property */
    public minWidth: PropertyPixel;
    /** The card minimum height property */
    public minHeight: PropertyPixel;
    /** The card border radius property */
    public borderRadius: PropertyNumberSelectable;
    /** The card padding property */
    public padding: PropertyNumberSelectable;
    /** The card content gap property */
    public contentGap: PropertyNumberSelectable;
    /** The card shadow property */
    public shadow: PropertyShadowSelectable;

    constructor(molecules: IMolecules) {
        super("Cards", molecules);
        this.minWidth = new PropertyPixel("Min Width", false, this, {defaultValue: 80});
        this.minHeight = new PropertyPixel("Min Height", false, this, {defaultValue: 80});
        this.borderRadius = new PropertyNumberSelectable("Border Radius", false, this, [4/8, 1, 2, 3, 4, 5, 6, 7], 3);
        this.padding = new PropertyNumberSelectable("Padding", false, this, [2, 3, 4, 5], 2);
        this.contentGap = new PropertyNumberSelectable("Content Gap", false, this, [1, 2, 3, 4, 5], 2);
        this.shadow = new PropertyShadowSelectable("Card Shadow", false, this);
    }

    public deserialize(obj: any) {
        if (!obj) return;
        super.deserialize(obj);
        this.minWidth.deserialize(obj.minWidth);
        this.minHeight.deserialize(obj.minHeight);
        this.borderRadius.deserialize(obj.borderRadius);
        this.padding.deserialize(obj.padding);
        this.contentGap.deserialize(obj.contentGap);
        this.shadow.deserialize(obj.shadow);
    }

    public serialize(): any {
        const obj: any = {};
        obj.minWidth = this.minWidth.serialize();
        obj.minHeight = this.minHeight.serialize();
        obj.borderRadius = this.borderRadius.serialize();
        obj.padding = this.padding.serialize();
        obj.contentGap = this.contentGap.serialize();
        obj.shadow = this.shadow.serialize();
        return obj;
    }
}