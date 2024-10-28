/*
 * Copyright (c) 2023 Discover Financial Services
 * Licensed under Apache-2.0 License. See License.txt in the project root for license information
 */
import { TypographyStyling } from "./typographyStyling";
import { Atom } from "./atom";
import { IAtoms } from "../interfaces";

/**
 * The stat styles atom.
 * @category Atoms
 */
export class StatStyles extends Atom {

    /** The stat typography styling properties */
    public stat: TypographyStyling;

    constructor(atoms: IAtoms) {
        super("Stat Styles", false, atoms);
        this.addDependency(atoms.colorThemes);
        this.stat = new TypographyStyling("Stat", this, true, atoms.fontsSettings, 48, 700, 110, 0.013*48);
    }

    public deserialize(obj: any) {
        if (!obj) return;
        super.deserialize(obj);
        this.stat.deserialize(obj.stat);
    }

    public serialize(): any {
        const obj: any = {};
        obj.stat = this.stat.serialize();
        return obj;
    }
}