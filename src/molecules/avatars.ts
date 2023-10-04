/*
 * Copyright (c) 2023 Discover Financial Services
 * Licensed under Apache-2.0 License. See License.txt in the project root for license information
 */
import { Molecule } from "./molecule";
import { IMolecules } from "../interfaces";
import { PropertyNumberSelectable, PropertyShadowSelectable } from "../common/props";

/**
 * The avatars molecule.
 * @category Molecules
 */
export class Avatars extends Molecule {
    
    /** The medium border property */
    public mediumBorder: PropertyNumberSelectable;
    /** The extra large border property */
    public extraLargeBorder: PropertyNumberSelectable;
    /** The shadow property */
    public shadow: PropertyShadowSelectable;

    constructor(molecules: IMolecules) {
        super("Avatars", molecules);
        this.mediumBorder = new PropertyNumberSelectable("Medium Avatar Border", false, this, [0, 0.5, 1, 2, 3, 4], 2);
        this.extraLargeBorder = new PropertyNumberSelectable("Extra Large Avatar Border", false, this, [0, 0.5, 1, 2, 3, 4, 5, 6, 7, 8], 2);
        this.shadow = new PropertyShadowSelectable("Avatar Shadow", false, this);
    }

    public deserialize(obj: any) {
        if (!obj) return;
        super.deserialize(obj);
        this.mediumBorder.deserialize(obj.mediumBorder);
        this.extraLargeBorder.deserialize(obj.extraLargeBorder);
        this.shadow.deserialize(obj.shadow);
    }

    public serialize(): any {
        const obj: any = {};
        obj.mediumBorder = this.mediumBorder.serialize();
        obj.extraLargeBorder = this.extraLargeBorder.serialize();
        obj.shadow = this.shadow.serialize();
        return obj;
    }
}