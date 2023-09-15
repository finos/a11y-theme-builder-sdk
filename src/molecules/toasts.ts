/*
 * Copyright (c) 2023 Discover Financial Services
 * Licensed under MIT License. See License.txt in the project root for license information
 */
import { Molecule } from "./molecule";
import { IMolecules } from "../interfaces";
import { PropertyNumberSelectable, PropertyShadowSelectable} from "../common/props";

/**
 * The toasts molecule.
 * @category Molecules
 */
export class Toasts extends Molecule {
    
    /** The handle border radius property */
    public handleBorderRadius: PropertyNumberSelectable;
    /** The padding property */
    public padding: PropertyNumberSelectable;
    /** The shadow property */
    public shadow: PropertyShadowSelectable;

    constructor(molecules: IMolecules) {
        super("Toasts", molecules);
        this.handleBorderRadius = new PropertyNumberSelectable("Handle Border Radius", false, this, [0,1,2,3,4,5,6,7,8], 1);
        this.padding = new PropertyNumberSelectable("Padding", false, this, [1,2,3], 1);
        this.shadow = new PropertyShadowSelectable("Toast Shadow", false, this);
    }

    public deserialize(obj: any) {
        if (!obj) return;
        super.deserialize(obj);
        this.handleBorderRadius.deserialize(obj.handleBorderRadius);
        this.padding.deserialize(obj.gap);
        this.shadow.deserialize(obj.shadow);
    }

    public serialize(): any {
        const obj: any = {};
        obj.handleBorderRadius = this.handleBorderRadius.serialize();
        obj.gap = this.padding.serialize();
        obj.shadow = this.shadow.serialize();
        return obj;
    }
}