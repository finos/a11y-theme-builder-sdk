/*
 * Copyright (c) 2023 Discover Financial Services
 * Licensed under MIT License. See License.txt in the project root for license information
 */
import { Node } from "../common/node";
import { IFontsSettings } from "../interfaces";
import {
    PropertyStringSelectable,
    PropertyNumberSelectable,
    PropertyFontRange,
    PropertyPixelRange,
    PropertyPercentageSelectable,
} from "../common/props";

/**
 * Typography styling properties used by multiple atoms.
 * 
 * @category Atoms
 */
export class TypographyStyling extends Node {

    /** The font family property */
    public fontFamily: PropertyStringSelectable;
    /** The font size property */
    public fontSize: PropertyFontRange;
    /** The font weight property */
    public fontWeight: PropertyNumberSelectable;
    /** The line height property */
    public lineHeight: PropertyPercentageSelectable;
    /** The character spacing property */
    public letterSpacing: PropertyPixelRange;

    private readonly primaryFont: boolean;
    private readonly fontsSettings: IFontsSettings;

    constructor(
        name: string, 
        parent: Node, 
        primaryFont: boolean,
        fontsSettings: IFontsSettings,
        defaultFontSize: number,
        defaultFontWeight: number,
        defaultLineHeight: number,
        defaultLetterSpacing: number,
    ) {
        super(name, parent);
        this.primaryFont = primaryFont;
        this.fontsSettings = fontsSettings;
        this.fontFamily = new PropertyStringSelectable("Font Family", false, this, {
            getSelectables: this.getFontFamilySelectables.bind(this),
            getDefaultValue: this.getFontFamilyDefaultSelectableValue.bind(this),
        });
        this.fontSize = new PropertyFontRange("Font Size", false, this, 0, 128, defaultFontSize);
        this.fontWeight = new PropertyNumberSelectable("Font Weight", false, this, [100, 300, 400, 500, 600, 700, 800, 900, 1000], defaultFontWeight);
        this.lineHeight = new PropertyPercentageSelectable("Line Height", false, this, [130, 160], defaultLineHeight);
        this.letterSpacing = new PropertyPixelRange("Character Spacing", false, this, -2, 10, defaultLetterSpacing);
    }

    private getFontFamilySelectables(): string[] {
        const primary = this.getFontFamilySelectableValue(true);
        const secondary = this.getFontFamilySelectableValue(false);
        return [primary, secondary];
    }

    private getFontFamilyDefaultSelectableValue(): string {
        return this.getFontFamilySelectableValue(this.primaryFont);
    }

    private getFontFamilySelectableValue(getPrimary: boolean): string {
        if (getPrimary) {
            return `${this.fontsSettings.primaryFont.getValue()}`;
        } else {
            return `${this.fontsSettings.secondaryFont.getValue()}`;
        }
    }

    private getFontFamilyValue(getPrimary: boolean): string {
        if (getPrimary) {
            return `${this.fontsSettings.primaryFont.getValue()}`;
        } else {
            return `${this.fontsSettings.secondaryFont.getValue()}`;
        }
    }

    public deserialize(obj: any) {
        if (!obj) return;
        super.deserialize(obj);
        this.fontFamily.deserialize(obj.fontFamily);
        this.fontSize.deserialize(obj.fontSize);
        this.fontWeight.deserialize(obj.fontWeight);
        this.lineHeight.deserialize(obj.lineHeight);
        this.letterSpacing.deserialize(obj.letterSpacing);
    }

    public serialize(): any {
        const obj: any = {};
        obj.fontFamily = this.fontFamily.serialize();
        obj.fontSize = this.fontSize.serialize();
        obj.fontWeight = this.fontWeight.serialize();
        obj.lineHeight = this.lineHeight.serialize();
        obj.letterSpacing = this.letterSpacing.serialize();
        return obj;
    }
}