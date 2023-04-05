/*
 * Copyright (c) 2023 Discover Financial Services
 * Licensed under MIT License. See License.txt in the project root for license information
 */
import { IOrganisms } from "../interfaces";
import { Organism } from "./organism";
import { PropertyBoolean, PropertyNumberSelectable, PropertyButtonText } from "../common/props";

/**
 * The secondary nav organism.
 * @category Organisms
 */
export class SecondaryNav extends Organism {
    
    /** The sticky property */
    public sticky: PropertyBoolean;
    /** The vertical padding property */
    public verticalPadding: PropertyNumberSelectable;
    /** The horizontal tab padding property */
    public horizontalTabPadding: PropertyNumberSelectable;
    /** The nav text property */
    public navText: PropertyButtonText;

    constructor(organisms: IOrganisms) {
        super("Secondary Nav", organisms);
        this.sticky = new PropertyBoolean("Sticky", false, this);
        this.verticalPadding = new PropertyNumberSelectable("Vertical Padding", false, this, [0.5,1,2,3], 1);
        this.horizontalTabPadding = new PropertyNumberSelectable("Horizontal Tab Padding", false, this, [0.5,1,2,3], 1);
        this.navText = new PropertyButtonText("Nav Text", false, this);
    }

    public deserialize(obj: any) {
        if (!obj) return;
        super.deserialize(obj);
        this.sticky.deserialize(obj.sticky);
        this.verticalPadding.deserialize(obj.verticalPadding);
        this.horizontalTabPadding.deserialize(obj.horizontalTabPadding);
        this.navText.deserialize(obj.navText);
    }

    public serialize(): any {
        const obj: any = {};
        obj.sticky = this.sticky.serialize();
        obj.verticalPadding = this.verticalPadding.serialize();
        obj.horizontalTabPadding = this.horizontalTabPadding.serialize();
        obj.navText = this.navText.serialize();
        return obj;
    }
}