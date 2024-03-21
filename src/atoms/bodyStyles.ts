/*
 * Copyright (c) 2023 Discover Financial Services
 * Licensed under Apache-2.0 License. See License.txt in the project root for license information
 */
import { TypographyStyling } from "./typographyStyling";
import { Atom } from "./atom";
import { IAtoms } from "../interfaces";

/**
 * The body styles atom.
 * @category Atoms
 */
export class BodyStyles extends Atom {

    /** The body1 topography styling properties */
    public body1: TypographyStyling;
    /** The body1 bold topography styling properties */
    public body1Bold: TypographyStyling;
    /** The body2 topography styling properties */
    public body2: TypographyStyling;
    /** The body2 bold topography styling properties */
    public body2Bold: TypographyStyling;
    /** The body3 topography styling properties */
    public body3: TypographyStyling;
    /** The body3 bold topography styling properties */
    public body3Bold: TypographyStyling;

    constructor(atoms: IAtoms) {
        super("Body Styles", false, atoms);
        this.addDependency(atoms.colorThemes);
        const fs = atoms.fontsSettings;
        this.body1 = new TypographyStyling("Body 1", this, true, fs, 16, 500, 160, 0.02*16);
        this.body1Bold = new TypographyStyling("Body 1 - Bold", this, true, fs, 16, 700, 160, 0.02*16);
        this.body2 = new TypographyStyling("Body 2", this, true, fs, 14, 600, 160, 0.0175*14);
        this.body2Bold = new TypographyStyling("Body 2 - Bold", this, true, fs, 14, 700, 160, 0.0175*14);
        this.body3 = new TypographyStyling("Body 3", this, true, fs, 18, 500, 160, 0.0225*18);
        this.body3Bold = new TypographyStyling("Body 3 - Bold", this, true, fs, 18, 700, 160, 0.0225*18);
    }

    public deserialize(obj: any) {
        if (!obj) return;
        super.deserialize(obj);
        this.body1.deserialize(obj.body1);
        this.body1Bold.deserialize(obj.body1Bold);
        this.body2.deserialize(obj.body2);
        this.body2Bold.deserialize(obj.body2Bold);
        this.body3.deserialize(obj.body3);
        this.body3Bold.deserialize(obj.body3Bold);
    }

    public serialize(): any {
        const obj: any = {};
        obj.body1 = this.body1.serialize();
        obj.body1Bold = this.body1Bold.serialize();
        obj.body2 = this.body2.serialize();
        obj.body2Bold = this.body2Bold.serialize();
        obj.body3 = this.body3.serialize();
        obj.body3Bold = this.body3Bold.serialize();
        return obj;
    }
}