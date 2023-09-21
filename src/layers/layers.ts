/*
 * Copyright (c) 2023 Discover Financial Services
 * Licensed under MIT License. See License.txt in the project root for license information
 */
import { Node } from "../common/node";
import { PropertyBoolean, PropertyStringSelectable } from "../common/props";

/**
 * Accessibility layers.
 * @category Layers
 */
export class Layers extends Node {

    public static readonly DT_DESKTOP = "desktop";
    public static readonly DT_TABLET = "tablet";
    public static readonly DT_MOBILE = "mobile";

    /** Color blind property */
    public readonly colorBlind: PropertyBoolean;
    /** Dyslexia property */
    public readonly dyslexia: PropertyBoolean;
    /** Motion sensitivity property */
    public readonly motionSensitivity: PropertyBoolean;
    /** All accessbility layer properties */
    public readonly properties: PropertyBoolean[];
    /** The device target property */
    public readonly deviceTarget: PropertyStringSelectable;

    constructor(parent: Node) {
        super("layers", parent);
        this.colorBlind = new PropertyBoolean("Color Blind", false, this, {defaultValue: false});
        this.dyslexia = new PropertyBoolean("Dyslexia", false, this, {defaultValue: false});
        this.motionSensitivity = new PropertyBoolean("Motion Sensitivity", false, this, {defaultValue: false});
        this.properties = [this.colorBlind, this.dyslexia, this.motionSensitivity];
        this.deviceTarget = new PropertyStringSelectable("Devices", true, this, {
            selectables: [Layers.DT_DESKTOP, Layers.DT_TABLET, Layers.DT_MOBILE],
            defaultValue: Layers.DT_DESKTOP,
        });
    }

    public deserialize(obj: any) {
        if (!obj) return;
        super.deserialize(obj);
        this.colorBlind.deserialize(obj.colorBlind);
        this.dyslexia.deserialize(obj.dyslexia);
        this.motionSensitivity.deserialize(obj.motionSensitivity);
        this.deviceTarget.deserialize(obj.deviceTarget);
    }

    public serialize(): any {
        const obj: any = {};
        obj.colorBlind = this.colorBlind.serialize();
        obj.dyslexia = this.dyslexia.serialize();
        obj.motionSensitivity = this.motionSensitivity.serialize();
        obj.deviceTarget = this.deviceTarget.serialize();
        return obj;
    }
}