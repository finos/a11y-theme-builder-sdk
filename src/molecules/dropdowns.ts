/*
 * Copyright (c) 2023 Discover Financial Services
 * Licensed under Apache-2.0 License. See License.txt in the project root for license information
 */
import { Molecule } from "./molecule";
import { IMolecules } from "../interfaces";
import { PropertyStringSelectable, PropertyNumberSelectable, PropertyElevationSelectable } from "../common/props";

/**
 * The dropdowns molecule.
 * @category Molecules
 */
export class Dropdowns extends Molecule {
    
    public static readonly FULL_COLOR = "Full Color";
    public static readonly LEFT_BORDER_ONLY = "Left border only";

    /** The menu focus state property */
    public menuFocusState: PropertyStringSelectable;
    /** The menu elevation property */
    public menuElevation: PropertyElevationSelectable;
    /** The border radius property */
    public borderRadius: PropertyNumberSelectable;

    constructor(molecules: IMolecules) {
        super("Dropdowns", molecules);
        this.menuFocusState = new PropertyStringSelectable("Dropdown Menu Focus State", true, this, {
            selectables: [Dropdowns.LEFT_BORDER_ONLY, Dropdowns.FULL_COLOR],
            defaultValue: Dropdowns.LEFT_BORDER_ONLY,
        });
        this.menuElevation = new PropertyElevationSelectable("Open Dropdown Menu Elevation", true, this, 0, 9, 2);
        this.borderRadius = new PropertyNumberSelectable("Dropdown Border Radius", true, this, [0, 0.5, 1, 2], 1);
    }

    public deserialize(obj: any) {
        if (!obj) return;
        super.deserialize(obj);
        this.menuFocusState.deserialize(obj.menuFocusState);
        this.borderRadius.deserialize(obj.borderRadius);
        this.menuElevation.deserialize(obj.menuElevation);
    }

    public serialize(): any {
        const obj: any = {};
        obj.menuFocusState = this.menuFocusState.serialize();
        obj.borderRadius = this.borderRadius.serialize();
        obj.menuElevation = this.menuElevation.serialize();
        return obj;
    }
}