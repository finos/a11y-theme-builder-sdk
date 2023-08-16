/*
 * Copyright (c) 2023 Discover Financial Services
 * Licensed under Apache-2.0 License. See License.txt in the project root for license information
 */
import { Atom } from "./atom";
import { IAtoms } from "../interfaces";
import { PropertyPixelSelectable } from "../common/props";

/**
 * The minimum target atom.
 * @category Atoms
 */
export class MinimumTarget extends Atom {

    /** The min height property */
    public minHeight: PropertyPixelSelectable;

    constructor(atoms: IAtoms) {
        super("Minimum Target", false, atoms);
        this.addDependency(atoms.colorThemes);
        this.minHeight = new PropertyPixelSelectable("Min Height", false, this, [24, 32, 40, 44], 44);
    }

    public deserialize(obj: any) {
        if (!obj) return;
        super.deserialize(obj);
        this.minHeight.deserialize(obj.minHeight);
    }

    public serialize(): any {
        const obj: any = {};
        obj.minHeight = this.minHeight.serialize();
        return obj;
    }

}