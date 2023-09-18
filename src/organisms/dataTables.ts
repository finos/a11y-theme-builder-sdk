/*
 * Copyright (c) 2023 Discover Financial Services
 * Licensed under MIT License. See License.txt in the project root for license information
 */
import { IOrganisms } from "../interfaces";
import { Organism } from "./organism";
import { 
    PropertyStringSelectable,
    PropertyPixelSelectable,
    PropertyShadowSelectable,
    PropertyButtonText,
} from "../common/props";

/**
 * The data tables organism.
 * @category Organisms
 */
export class DataTables extends Organism {
    
    /** The available colors property */
    public availableColors: PropertyStringSelectable;
    /** The padding property */
    public padding: PropertyPixelSelectable;
    /** The header text property */
    public headerText: PropertyButtonText;
    /** The shadow property */
    public shadow: PropertyShadowSelectable;

    constructor(organisms: IOrganisms) {
        super("Data Tables", organisms);
        this.availableColors = new PropertyStringSelectable("Available Colors", false, this, {selectables: ["Colored", "Black", "White"]});
        this.padding = new PropertyPixelSelectable("Table Padding", false, this, [4, 8, 16]);
        this.headerText = new PropertyButtonText("Table Header Text", false, this);
        this.shadow = new PropertyShadowSelectable("Avatar Shadow", false, this);
    }

    public deserialize(obj: any) {
        if (!obj) return;
        super.deserialize(obj);
        this.availableColors.deserialize(obj.availableColors);
        this.padding.deserialize(obj.padding);
        this.headerText.deserialize(obj.headerText);
        this.shadow.deserialize(obj.shadow);
    }

    public serialize(): any {
        const obj: any = {};
        obj.availableColors = this.availableColors.serialize();
        obj.padding = this.padding.serialize();
        obj.headerText = this.headerText.serialize();
        obj.shadow = this.shadow.serialize();
        return obj;
    }
}