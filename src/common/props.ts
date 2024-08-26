/*
 * Copyright (c) 2023 Discover Financial Services
 * Licensed under Apache-2.0 License. See License.txt in the project root for license information
 */
import { Node, ListenerSubscription } from "./node";
import { Event, EventType, EventValueChange, EventCallback, EventValueChangeCallback, IProperty } from "../interfaces";
import { Shade } from "./shade";
import { WCAGLevel } from "./wcag";
import { Logger } from "../util/logger";

const log = new Logger("prop");

export interface PropertyOpts<T> {
    defaultValue?: T;
    getDefaultValue?: () => T | undefined;
}

export interface Category<T> {
    display: string;
    css: string;
    json: string;
    members: T[];
}

/**
 * A property of a generic type.
 * @category Utilities
 */
export class Property<T> extends Node implements IProperty {

    public readonly required: boolean;
    protected value?: T;
    private opts: PropertyOpts<T>;

    constructor(name: string, required: boolean, parent: Node, opts?: PropertyOpts<T>) {
        super(name, parent);
        this.required = required;
        this.opts = opts || {};
        parent.addProperty(this);
    }

    public isInitialized(): boolean {
        if (!this.required || this.getValue() !== undefined) {
            return true;
        } else {
            return false;
        }
    }

    public hasValue(): boolean {
        return this.value !== undefined;
    }

    public getValue(): T | undefined {
        if (this.hasValue()) {
            return this.value;
        }
        return this.getDefaultValue();
    }

    public setValue(newValue: T | undefined) {
        const oldValue = this.value;
        if (oldValue !== newValue) {
            log.debug(`Changing value of ${this.key} from ${oldValue} to ${JSON.stringify(newValue)}`);
            // Get the old node state before changing the property value
            const oldNodeState = this.getNodeState();
            // Change the property value
            this.value = newValue;
            // Send the value change event
            this.sendValueChangeNotification(oldValue, newValue);
            // Compare the current node state to the old state and send
            // any node enabled/disabled events which should be sent.
            this.compareNodeState(oldNodeState);
        }
    }

    public sendValueChangeNotification(oldValue: any, newValue: any) {
        const event: EventValueChange<T> = {
            type: EventType.ValueChanged,
            node: this,
            oldValue,
            newValue,
        };
        this.notifyListeners(event);
    }

    public getDefaultValue(): T | undefined {
        if (this.opts.getDefaultValue) {
            return this.opts.getDefaultValue();
        } else {
            return this.opts.defaultValue;
        }
    }

    public setListener( name: string, listener: EventCallback, eventTypes?: EventType[] ): ListenerSubscription {
        const ls = super.setListener(name, listener, eventTypes);
        const val = this.getValue();
        if (val !== undefined) {
            // Go ahead and notify the listener of the current value
            const event: EventValueChange<T> = {
                type: EventType.ValueChanged,
                node: this,
                oldValue: undefined,
                newValue: val,
            };
            listener(event);
        }
        return ls;
    }

    public setPropertyListener(name: string, callback: EventValueChangeCallback<T>): ListenerSubscription {
        return this.setListener(name, callback as EventCallback, [EventType.ValueChanged]);
    }

    public serialize(): any {
        const obj: any = this.value;
        if (obj && typeof obj.serialize === 'function') {
            return obj.serialize();
        }
        return this.value;
    }

    public deserialize(obj: any): void {
        this.value = obj;
    }

    public toJSON(): Object {
        return { value: this.value };
    }

    protected getShadeRef(shade?: Shade): any {
        if (!shade) return undefined;
        if (shade.coreShadeName) return {coreShadeName: shade.coreShadeName};
        if (shade.key) return {key: shade.key};
        return {hex: shade.hex, opacity: shade.opacity, builder: shade.hasBuilder() ? shade.getBuilder().name : undefined};
    }

    protected getShadeFromRef(ref: any): Shade | undefined {
        if (!ref) return undefined;
        if (ref.coreShadeName) return Shade.getCoreShade(ref.coreShadeName);
        const ds = this.getDesignSystem();
        if (ref.key) return ds.findShade(ref.key);
        if (ref.hex) {
            const shade = Shade.fromHex(ref.hex);
            if (ref.opacity) shade.setOpacity(ref.opacity);
            if (ref.builder) shade.setBuilder(ds.getByKey(ref.builder));
            return shade;
        }
        throw new Error(`Invalid shade reference: ${JSON.stringify(ref)}`);
    }

    protected _addProperties(props: IProperty[]) {
        props.push(this);
    }

}

/**
 * Register a single listener for a group of properties and call the callback
 * when all of the properties have values and any of their values change.
 * @category Utilities
 */
export class PropertyGroupListener {

    private props: Property<any>[];
    private cb: (pgl: PropertyGroupListener) => void;
    private or: boolean;
    private lname: string;
    private started = false; 

    constructor(name: string, props: Property<any>[], cb: (pgl: PropertyGroupListener) => void, opts?: { or?: boolean}) {
        this.props = props;
        opts = opts || {};
        this.or = opts.or || false;
        this.cb = cb;
        this.lname = `_tb.PropertyGroupListener.${name}`;
        this.start();
    }

    public start() {
        log.debug(`Starting property group listener for ${this.lname}`);
        this.props.forEach(prop => {
            prop.setListener(this.lname, this.callback.bind(this));
        });
        this.started = true;
        if (this.or || this.allPropsHaveValues()) {
            this.cb(this);
        }
    }

    public stop() {
        log.debug(`Stopping property group listener for ${this.lname}`);
        this.props.forEach(prop => prop.removeListener(this.lname));
        this.started = false;
    }

    private callback(event: Event) {
        if (this.started && (this.or || this.allPropsHaveValues())) {
            log.debug(`Calling the listener for property group ${this.lname} because it is ready`);
            this.cb(this);
        }
    }

    private allPropsHaveValues(): boolean {
        for (let i = 0; i < this.props.length; i++) {
            const p = this.props[i];
            if (p.getValue() === undefined) {
                log.debug(`Property group ${this.lname} is not ready because property ${p.key} has no value`);
                return false;
            }
        }
        return true;
    }

}

export class PropertyString extends Property<string> {

}

export class PropertyNumber extends Property<number> {

}

export class PropertyBoolean extends Property<boolean> {

}

export class PropertyPixel extends Property<number> {

}

export class PropertyTime extends Property<number> {

}

export class PropertyShade extends Property<Shade> {

}

/**
 * A range of numeric values property.
 * @category Utilities
 */
export class PropertyRange extends Property<number> {

    public min: number;
    public max: number;

    constructor(name: string, min: number, max: number, required: boolean, parent: Node, opts?: PropertyOpts<number>) {
        super(name, required, parent, opts);
        this.min = min;
        this.max = max;
    }

    public deserialize(obj: any) {
        this.min = obj.min;
        this.max = obj.max;
    }

    public serialize(): any {
        return {
            min: this.min,
            max: this.max,
        };
    }
}

export class PropertySelectable<S,T> extends Property<T> {

    private sopts: PropertySelectableOpts<S,T>;
    private propertyGroupListener?: PropertyGroupListener;

    constructor(name: string, required: boolean, parent: Node, opts: PropertySelectableOpts<S,T>) {
        super(name, required, parent, opts);
        this.sopts = opts;
        if (!opts.getSelectables && !opts.selectables) {
            throw new Error(`Either 'getSelectables' or 'selectables' must be defined for ${this.key}`);
        }
        const dp = opts.dependentProps;
        if (dp) {
            dp.forEach(prop => this.addDependency(prop));
            this.propertyGroupListener = new PropertyGroupListener(this.key, dp, this.sendSelectablesChangedNotification.bind(this));
        }
    }

    public setDefault(defaultValue: T) {
        this.sopts.defaultValue = defaultValue;
    }

    public stop() {
        if (this.propertyGroupListener) {
            this.propertyGroupListener.stop();
            this.propertyGroupListener = undefined;
        }
    }

    public getSelectableValues(): S {
        if (this.sopts.getSelectables) {
            return this.sopts.getSelectables();
        } else if (this.sopts.selectables) {
            return this.sopts.selectables;
        } else {
            throw new Error(`Should be unreachable`);
        }
    }

    public setSelectableValues(s: S) {
        if (this.sopts.getSelectables) {
            throw new Error(`Can't call setSelectableValues if function getSelectables is set`);
        } else if (this.sopts.selectables) {
            this.sopts.selectables = s;
            this.sendSelectablesChangedNotification();
        } else {
            throw new Error(`Should be unreachable`);
        }
    }

    public getDefaultValue(): T | undefined {
        if (this.sopts.getDefaultValue) {
            return this.sopts.getDefaultValue();
        } else if (this.sopts.defaultValue !== undefined) {
            return this.sopts.defaultValue;
        } else {
            return undefined;
        }
    }

    private sendSelectablesChangedNotification() {
        this.notifyListeners({type: EventType.SelectablesChanged, node: this});
    }

}

export class PropertyStringSelectable extends PropertySelectable<string[],string> {

}

export interface PropertySelectableOpts<S,T> extends PropertyOpts<T> {
    selectables?: S;
    getSelectables?: () => S;
    dependentProps?: Property<any>[];
}

export class PropertyNumberSelectable extends PropertySelectable<number[],number> {

    constructor(name: string, required: boolean, parent: Node, numbers: number[], defaultValue?: number) {
        super(name, required, parent, { selectables: numbers, defaultValue });
    }

}

export class PropertyPercentageSelectable extends PropertyNumberSelectable {

    constructor(name: string, required: boolean, parent: Node, percentages: number[], defaultPercentage: number) {
        super(name, required, parent, percentages, defaultPercentage);
    }

}

export class PropertyPixelSelectable extends PropertySelectable<number[],number> {

    constructor(name: string, required: boolean, parent: Node, pixels: number[], defaultValue?: number) {
        super(name, required, parent, { selectables: pixels, defaultValue });
    }

}

export class PropertyWCAGSelectable extends PropertySelectable<WCAGLevel[],WCAGLevel> {

    constructor(parent: Node) {
        super("WCAG Level", false, parent, { selectables: [WCAGLevel.AA, WCAGLevel.AAA], defaultValue: WCAGLevel.AA});
    }

}

export class PropertyIndexSelectable extends PropertyStringSelectable {

    private readonly none: string;
    private readonly prefix: string;
    private readonly inversePrefix: string;

    constructor(name: string, required: boolean, parent: Node, min: number, max: number, none: string, prefix: string, inversePrefix: string, defIdx?: number) {
        super(name, required, parent, { 
            selectables: PropertyIndexSelectable.toStrings(min, max, none, prefix, inversePrefix),
            defaultValue: PropertyIndexSelectable.indexToString(defIdx || 0, none, prefix, inversePrefix),
        });
        this.none = none;
        this.prefix = prefix;
        this.inversePrefix = inversePrefix;
    }

    public toIndex(): number {
        const val = this.getValue() || this.none;
        if (val === this.none) return 0;
        if (val.startsWith(this.prefix)) return parseInt(val.substring(this.prefix.length));
        if (val.startsWith(this.inversePrefix)) return -parseInt(val.substring(this.inversePrefix.length));
        throw new Error(`Invalid ${this.name} value: '${val}'`);
    }

    private static indexToString(idx: number, none: string, prefix: string, inversePrefix: string): string {
        if (idx == 0) return none;
        if (idx > 0) return `${prefix}${idx}`;
        return `${inversePrefix}${-idx}`;
    }

    private static toStrings(min: number, max: number, none: string, prefix: string, inversePrefix: string): string[] {
        const strs = [none];
        for (let i = 1; i <= max; i++) strs.push(PropertyIndexSelectable.indexToString(i, none, prefix, inversePrefix));
        for (let i = 1; i <= min; i++) strs.push(PropertyIndexSelectable.indexToString(-i, none, prefix, inversePrefix));
        return strs;
    }

}

export interface CategoryAndIndex<T> {
    category: Category<T>;
    categoryIndex: number;
    memberIndex: number;
}

export class PropertyStringCategorySelectable extends PropertySelectable<Category<string>[],string> {

    constructor(name: string, required: boolean, parent: Node, opts: PropertySelectableOpts<Category<string>[],string>) {
        super(name, required,  parent, opts);
    }

    public getCategoryAndIndex(): CategoryAndIndex<string> | undefined {
        const value = this.getValue();
        if (!value) return undefined;
        const sv = this.getSelectableValues();
        for (let categoryIndex = 0; categoryIndex < sv.length; categoryIndex++) {
            const category = sv[categoryIndex];
            if (category.display === value) {
                return { category, categoryIndex, memberIndex: -1};
            }
            const mems = category.members;
            for (let memberIndex = 0; memberIndex < mems.length; memberIndex++) {
                if (mems[memberIndex] === value) {
                    return { category, categoryIndex, memberIndex};
                }
            }
        }
        return undefined;
    }
}

export class PropertyShadowSelectable extends PropertyStringCategorySelectable {

    constructor(name: string, required: boolean, parent: Node, opts?: {defaultValue?: string}) {
        super(name, required,  parent, { 
            selectables: [
                newStringCategory("None", "", "", "", 0),
                newStringCategory("Elevations", "Elevation", "elevation", "Elevation-Shadows.elevation", 9),
                newStringCategory("Bevels", "Bevel", "bevel", "Bevels.bevel", 9),
                newStringCategory("Inset Bevels", "Inset Bevel", "reverse-bevel", "Inverted-Bevels.bevel", 9),
                newStringCategory("Grooves", "Groove", "groove", "Grooves.groove", 9),
                newStringCategory("Ridges", "Ridge", "ridge", "Ridges.ridge", 9),
                newStringCategory("Recesses", "Recess", "recessed", "Recesses.recess", 9),
                newStringCategory("Glows", "Glow", "glow", "Glow-Shadows.glow", 8),
            ],
            defaultValue: opts ? opts.defaultValue : "None" 
        });
    }

}

export class PropertyButtonText extends PropertyStringSelectable {

    constructor(name: string, required: boolean, node: Node) {
        super(name, required, node, { selectables: ["CTA LARGE", "CTA Small"]});
    }

}

export class PropertyBackgroundColorStyle extends PropertyStringSelectable {

    constructor(name: string, required: boolean, node: Node) {
        super(name, required, node, { selectables: ["Solid", "Opaque", "Gradient"]});
    }

}

export const defaultPrimaryFont = "Open Sans";
export const defaultSecondaryFont = "Open Sans";

export class PropertyFontFamily extends PropertyStringSelectable {

    constructor(name: string, required: boolean, node: Node) {
        super(name, required, node, { selectables: [defaultPrimaryFont, defaultSecondaryFont], defaultValue: defaultPrimaryFont});
    }

}
export class PropertyNumberRange extends PropertyNumber {

    public min: number;
    public max: number;

    constructor(name: string, required: boolean, node: Node, min: number, max: number, def: number) {
        super(name, required, node, { defaultValue: def});
        this.min = min;
        this.max = max;
    }

    public setValue(num: number) {
        if (num < this.min || num > this.max) {
            throw new Error(`Can't set value to ${num} for property '${this.key}' which has a range of [${this.min},${this.max}]`);
        }
        super.setValue(num);
    }

}

export class PropertyPercentage extends PropertyNumberRange {

    constructor(name: string, required: boolean, parent: Node, defaultPercentage: number) {
        super(name, required, parent, 0, 100, defaultPercentage);
    }

}

export class PropertyFontRange extends PropertyNumberRange {}

export class PropertyPixelRange extends PropertyNumberRange {}

export class PropertyColorShade extends PropertySelectable<Shade[][],Shade> {

    /*
     * All PropertyColorShade objects are references to Shade objects built by the color palette.
     * The info in the serialization is the key to lly serializing a reference to the
     * shade so that it be looked up.  The reason is that a sh
     */
    public serialize(): any {
        return this.getShadeRef(this.value);
    }

    public deserialize(obj: any) {
        this.value = this.getShadeFromRef(obj);
    }

}

export class PropertyColorPair extends PropertySelectable<ColorPair[],ColorPair> {

    constructor(name: string, required: boolean, theme: Node, selectables: ColorPair[]) {
        super(name, required, theme, {selectables});
    }

    public serialize(): any {
        if (!this.value) return undefined;
        return {
            title: this.value.title,
            primary: this.getShadeRef(this.value.secondary),
            secondary: this.getShadeRef(this.value.primary),
            lighter: this.value.lighter,
        };
    }

    public deserialize(obj: any) {
        if (!obj) return;
        this.value = new ColorPair(
            obj.title,
            this.getShadeFromRef(obj.primary) as Shade,       
            this.getShadeFromRef(obj.secondary) as Shade,       
            obj.lighter, 
        );
    }

}

export class PropertyTitledShade extends PropertySelectable<TitledShade[],TitledShade> {

    public serialize(): any {
        if (!this.value) return undefined;
        return {
            title: this.value.title,
            shade: this.getShadeRef(this.value.shade),
        };
    }

    public deserialize(obj: any) {
        if (!obj) return;
        this.value = new TitledShade(
            obj.title,
            this.getShadeFromRef(obj.shade) as Shade,       
        );
    }

}

export class ColorPair {

    public title: string;
    public readonly primary: Shade;
    public readonly secondary: Shade;
    public lighter: boolean;

    constructor(title: string, primary: Shade, secondary: Shade, lighter: boolean) {
        this.title = title;
        this.primary = primary;
        this.secondary = secondary;
        this.lighter = lighter;
    }

    public deserialize(obj: any) {
        if (!obj) return;
        this.title = obj.title;
        this.primary.deserialize(obj.primary);
        this.secondary.deserialize(obj.secondary);
        this.lighter = obj.lighter;
    }

    public serialize(): any {
        const obj: any = {};
        obj.title = this.title;
        obj.primary = this.primary;
        obj.secondary = this.secondary.serialize();
        obj.lighter = this.lighter;
        return obj;
    }
}

export class TitledShade {

    public readonly title: string;
    public shade: Shade;

    constructor(title: string, shade: Shade) {
        this.title = title;
        this.shade = shade;
    }

    public deserialize(obj: any) {
        if (!obj) return;
        this.shade.deserialize(obj.shade);
    }

    public serialize(): any {
        const obj: any = {};
        obj.shade = this.shade.serialize();
        return obj;
    }
}

function newStringCategory(display: string, prefix: string, css: string, json: string, count: number): Category<string> {
    const members: string[] = [];
    for (let i = 1; i <= count; i++) {
        members.push(`${prefix} ${i}`);
    }
    return {display,css,json,members};
}