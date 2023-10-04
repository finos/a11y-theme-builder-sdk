/*
 * Copyright (c) 2023 Discover Financial Services
 * Licensed under Apache-2.0 License. See License.txt in the project root for license information
 */
import { Molecule } from "./molecule";
import { IMolecules } from "../interfaces";
import { PropertyStringSelectable, PropertyNumberSelectable, PropertyShadowSelectable } from "../common/props";

/**
 * The dropdowns molecule.
 * @category Molecules
 */
export class Dropdowns extends Molecule {
    
    public static readonly FULL_COLOR = "Full Color";
    public static readonly LEFT_BORDER_ONLY = "Left border only";

    /** The menu focus state property */
    public menuFocusState: PropertyStringSelectable;
    /** The menu shadow property */
    public menuShadow: PropertyShadowSelectable;
    /** The border radius property */
    public borderRadius: PropertyNumberSelectable;

    constructor(molecules: IMolecules) {
        super("Dropdowns", molecules);
        this.menuFocusState = new PropertyStringSelectable("Dropdown Menu Focus State", true, this, {
            selectables: [Dropdowns.LEFT_BORDER_ONLY, Dropdowns.FULL_COLOR],
            defaultValue: Dropdowns.LEFT_BORDER_ONLY,
        });
        this.menuShadow = new PropertyShadowSelectable("Open Dropdown Menu Shadow", true, this, { defaultValue: "Elevation 1"});
        this.borderRadius = new PropertyNumberSelectable("Dropdown Border Radius", true, this, [0, 0.5, 1, 2], 1);
    }

    public deserialize(obj: any) {
        if (!obj) return;
        super.deserialize(obj);
        this.menuFocusState.deserialize(obj.menuFocusState);
        this.borderRadius.deserialize(obj.borderRadius);
        this.menuShadow.deserialize(obj.menuShadow);
    }

    public serialize(): any {
        const obj: any = {};
        obj.menuFocusState = this.menuFocusState.serialize();
        obj.borderRadius = this.borderRadius.serialize();
        obj.menuShadow = this.menuShadow.serialize();
        return obj;
    }
}