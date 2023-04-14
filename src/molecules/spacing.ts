/*
 * Copyright (c) 2023 Discover Financial Services
 * Licensed under MIT License. See License.txt in the project root for license information
 */
import { Molecule } from "./molecule";
import { IMolecules } from "../interfaces";
import { PropertyNumberSelectable } from "../common/props";

/**
 * The spacing molecule.
 * @category Molecules
 */
export class Spacing extends Molecule {
    
    /** The section padding property */
    public sectionPadding: PropertyNumberSelectable;
    /** The paragraph padding property */
    public paragraphPadding: PropertyNumberSelectable;

    constructor(molecules: IMolecules) {
        super("Spacing", molecules);
        this.sectionPadding = new PropertyNumberSelectable("Section Padding", false, this, [1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 3);
        this.paragraphPadding = new PropertyNumberSelectable("Paragraph Padding", false, this, [1, 2, 3, 4, 5], 2);
    }

    public deserialize(obj: any) {
        if (!obj) return;
        super.deserialize(obj);
        this.sectionPadding.deserialize(obj.sectionPadding);
        this.paragraphPadding.deserialize(obj.paragraphPadding);
    }

    public serialize(): any {
        const obj: any = {};
        obj.sectionPadding = this.sectionPadding.serialize();
        obj.paragraphPadding = this.paragraphPadding.serialize();
        return obj;
    }
}