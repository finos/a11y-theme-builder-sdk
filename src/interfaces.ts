/*
 * Copyright (c) 2023 Discover Financial Services
 * Licensed under Apache-2.0 License. See License.txt in the project root for license information
 */
import { Storage } from "./storage/index";
import { Shade } from "./common/shade";
import { ShadeBuilderView } from "./common/shadeBuilder";
import { PropertyTitledShade, PropertyStringSelectable, PropertyString } from "./common";

/**
 * The node interface, representing the node of a tree.
 */
export interface INode {
    /** The unique key of the node */
    key: string;
    /**
     * Set a listener for events on this node.
     * @param name  The listener name
     * @param callback The callback for each event.
     * @param eventTypes The event types requiring notification, or undefined if all event types.
     */
    setListener(name: string, callback: EventCallback, eventTypes?: EventType[]): IListenerSubscription;
    /**
     * Remove a listener from this node.
     * @param name Name of the listener to remove.
     */
    removeListener(name: string): void;
    notifyListeners(event: Event): void;
}

export interface IListenerSubscription {
    cancel(): void;  // Same as calling removeListener above
}

export interface IProperty extends INode {
    required: boolean;
    getDefaultValue(): any;
    isInitialized(): boolean;
}

export interface IAtoms extends INode {
    colorPalette: IColorPalette;
    colorThemes: IColorThemes;
    gridSettings: IGridSettings;
    inputBackground: IInputBackground;
    fontsSettings: IFontsSettings;
    addAtom(atom: IAtom): void;
}

export interface IColorPalette extends IAtom {
    setColorListener(name: string, listener: ColorListener): void;
}

export interface IColorThemes extends IAtom {
    defaultTheme: PropertyStringSelectable;
    getDefaultTheme(): IColorTheme | undefined;
    atoms: IAtoms;
}

export interface IGridSettings extends IAtom {}

export interface IInputBackground extends IAtom {
    overlayColor: PropertyTitledShade;
}

export interface IFontsSettings {
    primaryFont: PropertyString;
    secondaryFont: PropertyString;
}

export interface IAtom extends INode {}

export interface IMolecules extends INode {}

export interface IMolecule extends INode {}

export interface IOrganisms extends INode {}

export interface IOrganism extends INode {}

export interface IColorTheme extends IAtom {}

export enum EventType { 
    NodeEnabled = "NodeEnabled",
    NodeDisabled = "NodeDisabled",
    NodeDeleted = "NodeDeleted",
    ValueChanged = "ValueChanged",
    ValueDeleted = "ValueDeleted",
    SelectablesChanged = "SelectablesChanged",
}

export interface Event {
    type: EventType
    node: INode;
}

export interface EventValueChange<T> extends Event {
    oldValue?: T;
    newValue?: T;
}

export type EventCallback = (event: Event) => void;

export type EventValueChangeCallback<T> = (event: EventValueChange<T>) => void;

export interface EventListener {
    eventTypes?: EventType[];
    callback: EventCallback;
}

export type IVarGroupListener = (group: IVarGroup) => void;

export interface IVarGroup {
    vars: {[name: string]: string};
    setListener(name: string, listener: IVarGroupListener): void;
}

export interface IDesignSystemMetadata {
    /** Denotes whether or not this is a sample design system */
    sample: boolean;
    /** Time stamps */
    time: {
        /** The created time in milliseconds */
        createdInMs: number;
        /** The last update time in milliseconds */
        lastUpdateInMs: number;
    };
    /** Colors */
    colors: {
        /** The hex or RGBA string for the primary color */
        primary: string;
        /** The hex or RGBA string for the secondary color */
        secondary: string;
        /** The hex or RGBA string for the tertiary color */
        tertiary: string;
        /** The hex or RGBA string for the background color */
        background: string;
    };
}

export interface IDesignSystem extends INode {
    atoms: IAtoms;
    molecules: IMolecules;
    organisms: IOrganisms;
    registerByKey(key: string, val: any): void;
    getByKey(key: string): any;
    registerNode(node: INode): void;
    getNode(key: string): INode | undefined;
    registerShade(key: string, shade: Shade): void;
    getShade(key: string): Shade | undefined;
    findShade(key: string): Shade;
    getCSSVarGroup(node: INode): IVarGroup;
    listProperties(): IProperty[];
}

export interface IThemeBuilder {
    storage: Storage;
}

export type VarListener = (name: string, value?: string) => void;

export type ShadeFilter = (shade: Shade) => boolean;

export type ColorListener = (name: string, color?: IColor) => void;

export interface IColor {
    name: string;
    index: number;
    hex: IProperty;
    shades: ShadeBuilderView;
}

export interface IGeneratedVar {
    name: string;
    unit: string;
    props: IProperty[];
}