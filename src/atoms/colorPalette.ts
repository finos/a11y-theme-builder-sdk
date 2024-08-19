/*
 * Copyright (c) 2023 Discover Financial Services
 * Licensed under Apache-2.0 License. See License.txt in the project root for license information
 */
import { Node } from "../common/node";
import { Atom } from "./atom";
import { MyMap } from "../util/myMap";
import { Shade } from "../common/shade";
import { WCAGLevel } from "../common/wcag";
import { Logger } from "../util/logger";
import { PropertyStringSelectable, PropertyString, PropertyNumberRange } from "../common/props";
import { IAtoms, IColorPalette, IColor, ColorListener, ShadeFilter, EventValueChange } from "../interfaces";
import { ShadeBuilderView } from "../common/shadeBuilder";

const log = new Logger("cp");

/**
 * The ColorPalette atom.
 * @category Atoms
 */
export class ColorPalette extends Atom implements IColorPalette {

    private readonly colors: MyMap<string, Color> = new MyMap<string, Color>();
    /** The default color name property */
    public readonly defaultColorName: PropertyStringSelectable;
    private readonly colorListeners: { [name: string]: ColorListener } = {};

    constructor(atoms: IAtoms) {
        super("Color Palette", true, atoms);
        this.defaultColorName = new PropertyStringSelectable("Default Color", true, this, {
            getSelectables: this.getColorNames.bind(this),
            defaultValue: this.getDefaultColorName(),
        });
    }

    /**
     * Add a color to the color palette.
     * @param name The name of the color to add to the palette
     * @param hex The hex value of the color to add to the palette
     * @returns The color added to the palette
     */
    public addColor(name: string, hex: string): Color {
        log.debug(`Adding color ${name} with hex ${hex}`);
        if (this.colors.get(name)) {
            throw Error(`Color ${name} already exists`);
        }
        const color = new Color(name, this.colors.size, hex, this);
        this.colors.set(name, color);
        if (!this.defaultColorName.isInitialized()) {
            this.defaultColorName.setValue(name);
        }
        // Notify color listeners
        Object.values(this.colorListeners).forEach((cl: ColorListener) => cl(color.name, color));
        log.debug(`Added color ${name} with hex ${hex}`);
        return color;
    }

    /**
     * Remove a color from the color palette.
     * @param name The name of the color to remove from the palette
     */
    public removeColor(name: string) {
        if (this.defaultColorName.getValue() === name) {
            throw new Error(`You can not remove the default color (${this.name})`);
        }
        const color = this.colors.get(name);
        if (!color) {
            throw new Error(`Color ${name} is not an existing color`);
        }
        this.colors.delete(name);
        // Notify color listeners
        Object.values(this.colorListeners).forEach((cl) => cl(color.name));
    }

    /**
     * Set a color listener which is called when a color is added or removed from the palette.
     * @param name The name of the color listener.
     * @param cb The callback function to call when a color is added or removed.
     */
    public setColorListener(name: string, cb: ColorListener) {
        this.colorListeners[name] = cb;
        // Notify caller of currently existing colors
        Object.values(this.colors).forEach((color: Color) => cb(color.name, color));
    }

    /**
     * Get a list of all color names in the palette.
     * @returns Return a list of string names for the colors.
     */
    public getColorNames(): string[] {
        return Object.keys(this.colors);
    }

    /**
     * Get a color by name, or throw an exception if not found.
     * @param colorName The name of the color to return.
     * @returns The color object
     */
    public getColor(colorName: string): Color {
        const color = this.colors.get(colorName);
        if (!color) {
            throw new Error(`'${colorName}' is an invalid color; must be one of ${JSON.stringify(this.getColorNames())}`);
        }
        return color;
    }

    /**
     * Get all light mode shades matching the filter
     * @param filter An optional filter which must be matched
     * @returns The matching light mode shades
     */
    public getLightColorShades(filter?: ShadeFilter): Shade[][] {
        const shades: Shade[][] = [];
        this.colors.forEach((color: Color) => {
            const colorShades: Shade[] = [];
            const hex = color.hex.getValue();
            if (hex) {
                color.shades.lmAA.build(Shade.fromHex(hex)).forEach((shade: Shade) => {
                    if (!filter || filter(shade)) {
                        colorShades.push(shade);
                    }
                });
            }
            shades.push(colorShades);
        });
        return shades;
    }

    /**
     * Returns the default color, if any.
     * @returns The default color (if any).
     */
    public getDefaultColor(): Color | undefined {
        const name = this.getDefaultColorName();
        if (name) {
            return this.getColor(name);
        }
    }

    /**
     * Get the default color name (if any).
     * @returns The default color name.
     */
    public getDefaultColorName(): string | undefined {
        const names = this.getColorNames();
        if (names.length > 0) {
            return names[0];
        }
    }

    /**
     * Get all colors in the palette.
     * @returns Returns all colors in the palette.
     */
    public getColors(): Color[] {
        return this.colors.getValues();
    }

    /**
     * Return a 1-based index for this color in the palette.
     * @param color A color
     * @returns A 1-based index for this color
     */
    public getColorIndex(color: Color): number {
        return Object.values(this.colors).indexOf(color);
    }

    public serialize(): any {
        const obj = super.serialize();
        obj.colors = [];
        for (const name of this.colors.getKeys()) {
            obj.colors.push({ name, hex: this.colors.get(name)?.hex.getValue() });
        }
        obj.defaultColorName = this.defaultColorName.serialize();
        return obj;
    }

    public deserialize(obj: any) {
        if (!obj) return;
        super.deserialize(obj);
        obj.colors.forEach((value: any) => this.addColor(value.name, value.hex));
        this.defaultColorName.setValue(obj.defaultColorName);
    }

}

/**
 * A color.
 * @category Atoms
 */
export class Color extends Node implements IColor {

    /** The 0-based index of the color, in the order in which it was added */
    public index: number;
    /** The hex value for the color */
    public hex: PropertyString;
    /** Color specific Shade builder config */
    public lightModeMaxChroma: PropertyNumberRange;
    public darkModeMaxChroma: PropertyNumberRange;
    /** Shades */
    public shades: ShadeBuilderView;
    // "light" and "dark" are temporary until UI changes to use "shades" above instead
    public light: { shades: Shade[] };
    public dark: { shades: Shade[] };

    private palette: ColorPalette;

    constructor(name: string, index: number, hex: string, palette: ColorPalette) {
        super(name, palette);
        this.palette = palette;
        this.index = index;
        this.lightModeMaxChroma = new PropertyNumberRange("Max Chroma in Light Mode", true, this, 0, 100, 80);
        this.darkModeMaxChroma = new PropertyNumberRange("Max Chroma in Dark Mode", true, this, 0, 100, 60);
        const shade = Shade.fromHex(hex);
        this.shades = new ShadeBuilderView(this, shade, this);
        this.light = { shades: this.shades.lmAA.build(shade) };
        this.dark = { shades: this.shades.dmAA.build(shade) };
        this.hex = new PropertyString("hex", false, this);
        this.hex.setValue(hex);
        this.hex.setListener("_tb.colorListener", this.buildShades.bind(this));
        log.debug(this.toString());
    }

    public getIndex(): number {
        return this.palette.getColorIndex(this);
    }

    private buildShades(vc: EventValueChange<string>) {
        const hex = vc.newValue;
        if (hex) this.shades.updateColor(Shade.fromHex(hex));
    }

    public toString(): string {
        return `Color name=${this.name}, hex=${this.hex}`;
    }

    public deserialize(obj: any) {
        throw new Error(`Shouldn't be here`);
    }

    public serialize(): any {
        throw new Error(`Shouldn't be here`);
    }

}