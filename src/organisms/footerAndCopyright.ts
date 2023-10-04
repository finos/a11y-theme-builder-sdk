/*
 * Copyright (c) 2023 Discover Financial Services
 * Licensed under Apache-2.0 License. See License.txt in the project root for license information
 */
import { IOrganisms } from "../interfaces";
import { Organism } from "./organism";
import { PropertyStringSelectable, PropertyNumberSelectable } from "../common/props";

/**
 * The footer and copyright organism.
 * @category Organisms
 */
export class FooterAndCopyright extends Organism {
    
    /** The footer background property */
    public footerBackground: PropertyStringSelectable;
    /** The footer vertical padding property */
    public footerVerticalPadding: PropertyNumberSelectable;
    /** The copyright vertical padding property */
    public copyrightVerticalPadding: PropertyNumberSelectable;

    constructor(organisms: IOrganisms) {
        super("Footer And Copyright", organisms);
        this.footerBackground = new PropertyStringSelectable("Footer background", false, this, {
            selectables: ["Primary 800/Primary 900", "Primary 800/Primary 900"] // TODO: Shouldn't be duplicate selectable values
        });
        this.footerVerticalPadding = new PropertyNumberSelectable("Footer vertical padding", false, this, [0.5, 1, 2, 3, 4, 5, 6], 5);
        this.copyrightVerticalPadding = new PropertyNumberSelectable("Copyright vertical padding", false, this, [0.5, 1, 2, 3], 2);
    }

    public deserialize(obj: any) {
        if (!obj) return;
        super.deserialize(obj);
        this.footerBackground.deserialize(obj.footerBackground);
        this.footerVerticalPadding.deserialize(obj.footerVerticalPadding);
        this.copyrightVerticalPadding.deserialize(obj.copyrightVerticalPadding);
    }

    public serialize(): any {
        const obj: any = {};
        obj.footerBackground = this.footerBackground.serialize();
        obj.footerVerticalPadding = this.footerVerticalPadding.serialize();
        obj.copyrightVerticalPadding = this.copyrightVerticalPadding.serialize();
        return obj;
    }
}