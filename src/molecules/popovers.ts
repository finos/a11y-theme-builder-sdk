/*
 * Copyright (c) 2023 Discover Financial Services
 * Licensed under MIT License. See License.txt in the project root for license information
 */
import { Molecule } from "./molecule";
import { IMolecules } from "../interfaces";
import { PropertyNumberSelectable, PropertyShadowSelectable} from "../common/props";

/**
 * The popovers molecule.
 * @category Molecules
 */
export class Popovers extends Molecule {
    
    /** The border radius property */
    public borderRadius: PropertyNumberSelectable;
    /** The shadow property */
    public shadow: PropertyShadowSelectable;

    constructor(molecules: IMolecules) {
        super("Popovers", molecules);
        this.borderRadius = new PropertyNumberSelectable("Border Radius", false, this, [0, 1, 2, 3], 1);
        this.shadow = new PropertyShadowSelectable("Popover Shadow", false, this);
    }

    public deserialize(obj: any) {
        if (!obj) return;
        super.deserialize(obj);
        this.borderRadius.deserialize(obj.borderRadius);
        this.shadow.deserialize(obj.shadow);
    }

    public serialize(): any {
        const obj: any = {};
        obj.borderRadius = this.borderRadius.serialize();
        obj.shadow = this.shadow.serialize();
        return obj;
    }
}