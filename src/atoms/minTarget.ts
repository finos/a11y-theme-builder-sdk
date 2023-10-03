/*
 * Copyright (c) 2023 Discover Financial Services
 * Licensed under Apache-2.0 License. See License.txt in the project root for license information
 */
import { Atom } from "./atom";
import { IAtoms } from "../interfaces";
import { PropertyNumber } from "../common/props";

/**
 * The minimum target atom.
 * @category Atoms
 */
export class MinimumTarget extends Atom {

    /** The min height property */
    public minHeight: PropertyNumber;
    /** The mobile min height property */
    public mobileMinHeight: PropertyNumber;

    constructor(atoms: IAtoms) {
        super("Minimum Target", false, atoms);
        this.addDependency(atoms.colorThemes);
        this.minHeight = new PropertyNumber("Min Height", false, this, {defaultValue: 44});
        this.mobileMinHeight = new PropertyNumber("Mobile Min Height", false, this, {defaultValue: 44});
    }

    public deserialize(obj: any) {
        if (!obj) return;
        super.deserialize(obj);
        this.minHeight.deserialize(obj.minHeight);
        this.mobileMinHeight.deserialize(obj.mobileTarget);
    }

    public serialize(): any {
        const obj: any = {};
        obj.minHeight = this.minHeight.serialize();
        obj.mobileTarget = this.mobileMinHeight.serialize();
        return obj;
    }

}