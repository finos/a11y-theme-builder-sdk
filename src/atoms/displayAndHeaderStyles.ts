/*
 * Copyright (c) 2023 Discover Financial Services
 * Licensed under Apache-2.0 License. See License.txt in the project root for license information
 */
import { Atom } from "./atom";
import { TypographyStyling } from "./typographyStyling";
import { PropertyNumber, PropertyRange } from "../common/props";
import { IAtoms } from "../interfaces";

/**
 * The Display and Header Styles atom.
 * @category Atoms
 */
export class DisplayAndHeaderStyles extends Atom {

    /** The heading display font weight property */
    public headingDisplayFontWeight: PropertyNumber;
    /** The percent change in header display sizes property */
    public percentChangeInHeaderDisplaySizes: PropertyRange;
    /** The display styles typography styling properties */
    public readonly displayStyles: TypographyStyling[] = [];
    /** The headers styles typography styling properties */
    public readonly headerStyles: TypographyStyling[] = [];

    constructor(atoms: IAtoms) {
        super("Display And Header Styles", false, atoms);
        this.headingDisplayFontWeight = new PropertyNumber("Heading/Display Font Weight", false, this, {defaultValue: 700});
        this.percentChangeInHeaderDisplaySizes = new PropertyRange("Percent Change in Header/Display Sizes", 0, 100, false, this, {defaultValue: 42});
        const fs = atoms.fontsSettings;
        this.displayStyles.push(new TypographyStyling(`Display 1`, this, false, fs, 76.48, 400, 130, -1.5));
        this.displayStyles.push(new TypographyStyling(`Display 2`, this, false, fs, 69.76, 400, 130, -0.5));
        this.headerStyles.push(new TypographyStyling(`Header 1`, this, false, fs, 56.32, 400, 130, -0.5));
        this.headerStyles.push(new TypographyStyling(`Header 2`, this, false, fs, 49.6, 400, 130, -0.5));
        this.headerStyles.push(new TypographyStyling(`Header 3`, this, false, fs, 42.88, 400, 130, -0.5));
        this.headerStyles.push(new TypographyStyling(`Header 4`, this, false, fs, 36.16, 400, 130, -0.5));
        this.headerStyles.push(new TypographyStyling(`Header 5`, this, false, fs, 29.44, 400, 130, -0.5));
        this.headerStyles.push(new TypographyStyling(`Header 6`, this, false, fs, 25.72, 400, 130, -0.5));
        this.addDependency(atoms.colorThemes);
    }

    public deserialize(obj: any) {
        if (!obj) return;
        super.deserialize(obj);
        this.headingDisplayFontWeight.deserialize(obj.headingDisplayFontWeight);
        this.percentChangeInHeaderDisplaySizes.deserialize(obj.percentChangeInHeaderDisplaySizes);
        this.displayStyles.forEach((_,idx) => this.displayStyles[idx].deserialize(obj.displayStyles[idx]));
        this.headerStyles.forEach((_,idx) => this.headerStyles[idx].deserialize(obj.headerStyles[idx]));
    }

    public serialize(): any {
        const obj: any = {};
        obj.headingDisplayFontWeight = this.headingDisplayFontWeight.serialize();
        obj.percentChangeInHeaderDisplaySizes = this.percentChangeInHeaderDisplaySizes.serialize();
        obj.displayStyles = this.displayStyles.map((val) => val.serialize());
        obj.headerStyles = this.headerStyles.map((val) => val.serialize());
        return obj;
    }
}