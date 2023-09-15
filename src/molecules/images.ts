/*
 * Copyright (c) 2023 Discover Financial Services
 * Licensed under MIT License. See License.txt in the project root for license information
 */
import { Molecule } from "./molecule";
import { IMolecules } from "../interfaces";
import { PropertyNumberSelectable, PropertyShadowSelectable } from "../common/props";

/**
 * The images molecule.
 * @category Molecules
 */
export class Images extends Molecule {
    
    /** The list image height property */
    public listImageHeight: PropertyNumberSelectable;
    /** The list image border radius property */
    public listImageBorderRadius: PropertyNumberSelectable;
    /** The general image border radius property */
    public generalImageBorderRadius: PropertyNumberSelectable;
    /** The image shadow property */
    public imageShadow: PropertyShadowSelectable;

    constructor(molecules: IMolecules) {
        super("Images And Videos", molecules);
        this.listImageHeight = new PropertyNumberSelectable("List Image Height", false, this, [6, 7, 8, 9], 7);
        this.listImageBorderRadius = new PropertyNumberSelectable("List Image Border Radius", false, this, [0, 0.5, 1, 2], 1);
        this.generalImageBorderRadius = new PropertyNumberSelectable("General Image Border Radius", false, this, [0, 0.5, 1, 2, 3, 4], 2);
        this.imageShadow = new PropertyShadowSelectable("Image Shadow", false, this);
    }

    public deserialize(obj: any) {
        if (!obj) return;
        super.deserialize(obj);
        this.listImageHeight.deserialize(obj.listImageHeight);
        this.listImageBorderRadius.deserialize(obj.listImageBorderRadius);
        this.generalImageBorderRadius.deserialize(obj.generalImageBorderRadius);
        this.imageShadow.deserialize(obj.imageShadow);
    }

    public serialize(): any {
        const obj: any = {};
        obj.listImageHeight = this.listImageHeight.serialize();
        obj.listImageBorderRadius = this.listImageBorderRadius.serialize();
        obj.generalImageBorderRadius = this.generalImageBorderRadius.serialize();
        obj.imageShadow = this.imageShadow.serialize();
        return obj;
    }
}