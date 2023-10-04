/*
 * Copyright (c) 2023 Discover Financial Services
 * Licensed under Apache-2.0 License. See License.txt in the project root for license information
 */
import { IOrganisms } from "../interfaces";
import { Organism } from "./organism";
import { PropertyStringSelectable, PropertyNumberSelectable } from "../common/props";

/**
 * The hero organism.
 * @category Organisms
 */
export class Hero extends Organism {
    
    public static DISPLAY1 = "Display 1";
    public static DISPLAY2 = "Display 2";
    public static H1 = "H1";
    public static BODY1 = "Body 1";
    public static BODY2 = "Body 2";
    public static BODY3 = "Body 3";
    public static BODY1BOLD = "Body 1 - Bold";
    public static BODY2BOLD = "Body 2 - Bold";
    public static BODY3BOLD = "Body 3 - Bold";

    /** The hero available colors property */
    public availableColors: PropertyStringSelectable;
    /** The hero vertical gap property */
    public verticalGap: PropertyNumberSelectable;
    /** The hero vertical spacing property */
    public verticalPadding: PropertyNumberSelectable;
    /** The hero title property */
    public title: PropertyStringSelectable;
    /** The hero body property */
    public body: PropertyStringSelectable;

    constructor(organisms: IOrganisms) {
        super("Hero", organisms);
        this.availableColors = new PropertyStringSelectable("Available Colors", false, this, {selectables: ["Colored", "Black", "White"]});
        this.verticalGap = new PropertyNumberSelectable("Hero Vertical Gap", false, this, [1,2,3,4,5], 2);
        this.verticalPadding = new PropertyNumberSelectable("Hero Vertical Padding", false, this, [1,2,3,4,5], 2);
        this.title = new PropertyStringSelectable("Hero Title", false, this, {
            selectables: [Hero.DISPLAY1, Hero.DISPLAY2, Hero.H1],
            defaultValue: Hero.DISPLAY1,
        });
        this.body = new PropertyStringSelectable("Hero Body", false, this, {
            selectables: [Hero.BODY1, Hero.BODY2, Hero.BODY3, Hero.BODY1BOLD, Hero.BODY2BOLD, Hero.BODY3BOLD],
            defaultValue: Hero.BODY1,
        });
    }

    public deserialize(obj: any) {
        if (!obj) return;
        super.deserialize(obj);
        this.availableColors.deserialize(obj.availableColors);
        this.verticalGap.deserialize(obj.verticalGap);
        this.title.deserialize(obj.title);
        this.body.deserialize(obj.body);
    }

    public serialize(): any {
        const obj: any = {};
        obj.availableColors = this.availableColors.serialize();
        obj.verticalGap = this.verticalGap.serialize();
        obj.title = this.title.serialize();
        obj.body = this.body.serialize();
        return obj;
    }
}