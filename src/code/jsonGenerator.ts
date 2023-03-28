import { Atoms, Shade, ColorTheme, ShadeGroup, ButtonModeShadeGroups, StateSetting, BevelSettingsProps, HotlinkModeVariables, OnHotlink, OnHotlinkWithDecoration} from "../atoms/index";
import { Molecules } from "../molecules/index";
import { Organisms } from "../organisms/index";
import { PropertyColorShade, PropertyPercentage, PropertyGroupListener, PropertyColorPair, Property, ListenerSubscription, ColorPair } from "../common/index";
import { IDesignSystem, EventValueChange, VarListener, IVarGroup, IColor } from "../interfaces";

import { Logger } from "../util/logger";

const log = new Logger("json");

/**
 * The JSON code generator.
 * @category Generators
 */
export class JSONGenerator {

    public readonly ds: IDesignSystem;
    public readonly atoms: Atoms;
    public readonly molecules: Molecules;
    public readonly organisms: Organisms;

    constructor(ds: IDesignSystem) {
        this.ds = ds;
        this.atoms = ds.atoms as Atoms;
        this.molecules = ds.molecules as Molecules;
        this.organisms = ds.organisms as Organisms;
    }

    public getJSON(lm: boolean): any {
        log.debug("getJSON enter");
        const theme = this.atoms.colorThemes.getDefaultTheme();
        if (!theme) {
            log.debug("getJSON exit (no default theme)");
            return undefined;
        }
        const json: any = {};
        this.setThemeAndThemeColors(json, lm, theme);
        log.debug(`getJSON exit - ${JSON.stringify(json,null,4)}`);
        return json;
    }

    private setThemeAndThemeColors(json: any, lm: boolean, ct: ColorTheme) {
        this.setThemeAndThemeColors2(json, lm, ct.primary, "Primary");
        this.setThemeAndThemeColors2(json, lm, ct.secondary, "Secondary");
        this.setThemeAndThemeColors2(json, lm, ct.tertiary, "Tertiary");
    }

    private setThemeAndThemeColors2(json: any, lm: boolean, prop: PropertyColorShade, name: string) {
        let shade = prop.getValue();
        if (!shade) return;
        if (!lm) shade = shade.getDarkModeShade();
        const theme = this.set(json, "Theme");
        const themeColors = this.set(json, "Theme-Colors");
        const onShade = shade.getOnShade();
        // Set theme
        theme[name] = {
            "Color": {
                value: `{Theme-Colors.${name}.Color.${this.getShadeId(shade)}}`,
                type: "color",
            },
            "On-Color": {
                value: `{Theme-Colors.${name}.On-Color.${this.getShadeId(onShade)}}`,
                type: "color",
            },
        };
        // Set theme colors
        if (!shade.hasMode()) return;
        const color: any = {};
        const onColor: any = {};
        shade.getMode().shades.forEach(shade => {
            const id = this.getShadeId(shade);
            color[id] = {
                value: shade.getRGB(),
                type: "color",
            };
            onColor[id] = {
                value: shade.getOnShade().getRGB(),
                type: "color",
            };
        });
        themeColors[name] = {
            "Color": color,
            "On-Color": onColor,
        };
    }

    private setSolidBackgrounds(json: any, theme: ColorTheme) {
        const sb = this.set(json, "Solid-Backgrounds");
        const bgvars = theme.getBackgroundVariables(theme.lightModeBackground);
        //bgvars?.primary.
    }

    private getShadeId(shade: Shade): string {
        if (shade.id === "0") return "050";
        return shade.id;
    }

    private set(json: any, name: string): any {
        json[name] = json[name] || {};
        return json[name];
    }

}