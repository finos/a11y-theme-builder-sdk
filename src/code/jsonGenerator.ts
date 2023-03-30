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
        this.setSolidBackgrounds(json, lm, theme);
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

    private setSolidBackgrounds(json: any, lm: boolean, theme: ColorTheme) {
        log.debug("setSolidBackgrounds enter");
        const bg = lm ? theme.lightModeBackground : theme.darkModeBackground;
        const colorPair = bg.getValue();
        if (!colorPair) {
            log.debug("setSolidBackgrounds exit (no background color pair)");
            return;
        }
        let tertiaryShade = theme.tertiary.getValue();
        if (!tertiaryShade) {
            log.debug("setSolidBackgrounds exit (no tertiary shade)");
            return;
        }
        let buttonShade = theme.button.getValue();
        if (!buttonShade) {
            log.debug("setSolidBackgrounds exit (no button shade)");
            return;
        }
        let iconShade = theme.icon.getValue();
        if (!iconShade) {
            log.debug("setSolidBackgrounds exit (no icon shade)");
            return;
        }
        if (!lm) {
            tertiaryShade = tertiaryShade.getDarkModeShade();
            buttonShade = buttonShade.getDarkModeShade();
            iconShade = iconShade.getDarkModeShade();
        }
        const buttonVars = theme.getButtonShadeGroups(buttonShade);
        const buttonSG = lm ? buttonVars.lm : buttonVars.dm;
        const hotlinkVars = this.atoms.hotlinks.getHotlinkVariables();
        const hotlinkShade = lm? hotlinkVars.lm.unvisited.shade : hotlinkVars.dm.unvisited.shade;
        if (!hotlinkShade) {
            log.debug("setSolidBackgrounds exit (no hotlink shade)");
            return;
        }
        let primary, secondary, tertiary, onPrimary, onSecondary, onTertiary: any;
        let tertiaryButton, tertiaryOnButton, tertiaryIcon, tertiaryHotlink: any;
        if (colorPair.lighter) {
            if (colorPair.title === ColorTheme.CP_HALF_QUARTER) {
                primary = '{Theme-Colors.Primary.Color.Half}';
                secondary = '{Theme-Colors.Primary.Color.Quarter}';
            } else {
                primary = '{Core-Colors.White.Color}';
                secondary = '{Core-Colors.Gray.Color.050}';
            }
            onPrimary = '{Theme-Colors.Primary.On-Color.Half}';
            onSecondary = '{Theme-Colors.Primary.On-Color.Quarter}';
            // tertiary BG //
            tertiary = '{Theme.Primary.Color}';
            onTertiary = '{Theme.Primary.OnColor}';
        } else {
            // else it is a dark color 
            // if the color is the primaryDarkBG
            if (colorPair.title === ColorTheme.CP_800_900) {
                primary = colorPair.primary.getRGB();
                secondary = colorPair.secondary.getRGB();
            } else {
                primary = '{Core-Colors.Near-Black.Color}';
                secondary = '{Core-Colors.Black.Color}';
            }
            onPrimary = '{Text.White}';
            onSecondary = '{Text.White}';
            // tertiary BG //
            tertiary = '{Theme-Colors.Primary.Color.700}';
            onTertiary = '{Text.White}';
            const buttonOnTertiary = buttonSG.tertiary.shade;
            if (buttonOnTertiary.equals(buttonShade)) {
                tertiaryButton = '{Buttons.Colored.Color}';
                tertiaryOnButton = '{Buttons.Colored.On-Color}';
            } else if (buttonOnTertiary.equals(Shade.BLACK)) {
                tertiaryButton = '{Buttons.Dark.Color}';
                tertiaryOnButton = '{Buttons.Dark.On-Color}';
            } else {
                tertiaryButton = '{Buttons.White.Color}';
                tertiaryOnButton = '{Buttons.White.On-Color}';
            }
            const iconOnTertiary = iconShade.getShadeOrOnShadeBasedOnContrast(tertiaryShade);
            if (iconOnTertiary.equals(iconShade)) {
                tertiaryIcon = '{Icons.Colored.Color}';
            }  else if (iconOnTertiary.equals(Shade.BLACK)) {
                tertiaryIcon = '{Icons.Dark.Color}';
            } else {
                tertiaryIcon = '{Icons.White.Color}';
            }
            const hotlinkOnTertiary = hotlinkVars.onTertiary.unvisited;
            if (hotlinkOnTertiary.equals(hotlinkShade)) {
                tertiaryHotlink = '{Hotlinks.Colored.Link}';
            }  else if (hotlinkOnTertiary === Shade.BLACK) {
                tertiaryHotlink = '{Hotlinks.Dark.Link}';
            } else {
                tertiaryHotlink = '{Hotlinks.White.Link}';
            }
        }
        const Primary = this.getColorPair(primary, onPrimary);
        const Secondary = this.getColorPair(secondary, onSecondary);
        const Tertiary: any = this.getColorPair(tertiary, onTertiary);
        Tertiary.Button = this.getColor(tertiaryButton);
        Tertiary["On-Button"] = this.getColor(tertiaryOnButton);
        Tertiary.Icon = this.getColor(tertiaryIcon);
        Tertiary.Hotlink = this.getColor(tertiaryHotlink);
        const Black = this.getSolidColor(buttonShade, iconShade, hotlinkShade, Shade.BLACK, "White");
        const White = this.getSolidColor(buttonShade, iconShade, hotlinkShade, Shade.WHITE, "Dark");
        json["Solid-Backgrounds"] = {
            Primary,
            Secondary,
            Tertiary,
            Black,
            White,
        };
    }

    private getSolidColor(button: Shade, icon: Shade, hotlink: Shade, compShade: Shade, other: string): any {
        let Button, OnButton: any;
        const buttonOn = button.getShadeOrOnShadeBasedOnContrast(compShade);
        if (buttonOn.equals(button)) {
            Button = this.getColor("{Buttons.Colored.Color}");
            OnButton = this.getColor("{Buttons.Colored.On-Color}");
        } else {
            Button = this.getColor(`{Buttons.${other}.Color}`);
            OnButton = this.getColor(`{Buttons.${other}.On-Color}`);
        }
        let Icon: any;
        const iconOn = icon.getShadeOrOnShadeBasedOnContrast(compShade);
        if (iconOn.equals(icon)) {
            Icon = this.getColor('{Icons.Colored.Color}');
        } else {
            Icon = this.getColor(`{Icons.${other}.Color}`);
        }
        let Hotlink;
        const hotlinkOn = hotlink.getShadeOrOnShadeBasedOnContrast(compShade);
        if (hotlinkOn.equals(hotlink)) {
            Hotlink = this.getColor('{Hotlinks.Colored.Link}');
        } else {
            Hotlink = this.getColor(`{Hotlinks.${other}.Link}`);
        }
        return { Button, OnButton, Icon, Hotlink };
    }

    private getShadeId(shade: Shade): string {
        if (shade.id === "0") return "050";
        return shade.id;
    }

    private getColorPair(value: string, onValue: string) {
        return {
            "Color": this.getColor(value),
            "On-Color": this.getColor(onValue),
        };
    }

    private getColor(value?: string): any {
        const color: any = {type: "color"};
        if (value) color.value = value;
        return color;
    }

    private set(json: any, name: string): any {
        json[name] = json[name] || {};
        return json[name];
    }

}