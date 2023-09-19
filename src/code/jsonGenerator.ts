/*
 * Copyright (c) 2023 Discover Financial Services
 * Licensed under MIT License. See License.txt in the project root for license information
 */
import { Atoms, Shade, Color, ColorTheme, GradientColors, StateSetting, BevelSettingsProps, HotlinkModeVariables } from "../atoms/index";
import { Molecules } from "../molecules/index";
import { Organisms } from "../organisms/index";
import { PropertyColorShade, PropertyShadowSelectable } from "../common/index";
import { IDesignSystem } from "../interfaces";

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

    public getJSONBase(): any {
        log.debug("getJSONBase enter");
        const theme = this.atoms.colorThemes.getDefaultTheme();
        if (!theme) {
            log.debug("getJSON exit (no default theme)");
            return undefined;
        }
        const json: any = {};
        json["fontFamilies"] = this.getFontFamilies();
        json["lineHeights"] = this.getLineHeights();
        json["baseFont"] = this.getBaseFont();
        json["fontWeights"] = this.getFontWeights();
        json["Typography-Info"] = this.getTypographyInfo();
        json["Sizing"] = this.getSizing();
        json["Spacing"] = this.getSpacing();
        json["Radius"] = this.getRadius();
        json["Border"] = this.getBorder();
        json["Shadows"] = this.getShadows();
        json["Elevation-Info"] = this.getElevationInfo();
        json["Glow-Info"] = this.getGlowInfo();
        json["Base-Info"] = this.getBaseInfo();
        json["Bevel-Info"] = this.getBevelInfoBase();
        json["Color-Name"] = this.getColorName();
        json["Show-Colors"] = this.getShowColors();
        json["Accessibility-Color-Sets"] = this.getAccessibilityColorSets();
        log.debug(`getJSONBase exit - ${JSON.stringify(json, null, 4)}`);
        return json;
    }

    public getJSONLM(): any {
        return this.getJSON(true);
    }

    public getJSONDM(): any {
        return this.getJSON(false);
    }

    public getJSON(lm: boolean): any {
        log.debug(`getJSON(lm:${lm}) enter`);
        const theme = this.atoms.colorThemes.getDefaultTheme();
        if (!theme) {
            log.debug("getJSON exit (no default theme)");
            return undefined;
        }
        const json: any = {};
        json["Core-Colors"] = this.getCoreColors(lm);
        json["Theme"] = this.getTheme(theme, lm);
        json["Theme-Colors"] = this.getThemeColors(theme, lm);
        json["All-Colors"] = this.getAllColors(lm);
        json["Solid-Backgrounds"] = this.getSolidBackgrounds(theme, lm);
        json["Gradient-Backgrounds"] = this.getGradientBackgrounds(theme, lm);
        json["Surface"] = this.getSurface(theme, lm);
        json["Elevations"] = this.getElevations(lm);
        json["Text"] = this.getText();
        json["Hotlinks"] = this.getHotlinks(theme, lm);
        json["States"] = this.getStates(lm);
        json["Buttons"] = this.getButtons(theme, lm);
        json["Icons"] = this.getIcons(theme, lm);
        json["Text-Decoration"] = this.getTextDecoration(theme, lm);
        json["Borders"] = this.getBorders(lm);
        json["Input Outlines"] = this.getInputOutlines(lm);
        json["Input-Backgrounds"] = this.getInputBackgrounds(lm);
        json["White-Glow"] = this.getWhiteGlow(lm);
        json["Bevel-Info"] = this.getBevelInfo(lm);
        json["Hotlink-Underline"] = this.getHotlinkUnderline(lm);
        log.debug(`getJSON(lm:${lm}) exit - ${JSON.stringify(json, null, 4)}`);
        return json;
    }

    public getDyslexiaAsObject(): Object {
        return {
            "fontFamilies": {
                "primary": {
                    "value": "OpenDyslexic",
                    "type": "fontFamilies"
                },
                "secondary": {
                    "value": "OpenDyslexic",
                    "type": "fontFamilies"
                }
            },
            "Headers": {
                "H1": {
                    "value": {
                        "fontFamily": "{fontFamilies.secondary}",
                        "fontWeight": "{fontWeights.font-weight-4}",
                        "lineHeight": "{lineHeights.sm}",
                        "fontSize": "$fontSize.14",
                        "letterSpacing": "{letterSpacing.0}",
                        "paragraphSpacing": "{paragraphSpacing.none}",
                        "textCase": "$textCase.none",
                        "textDecoration": "$textDecoration.none"
                    },
                    "type": "typography"
                },
                "H2": {
                    "value": {
                        "fontFamily": "{fontFamilies.secondary}",
                        "fontWeight": "{fontWeights.font-weight-4}",
                        "lineHeight": "{lineHeights.sm}",
                        "fontSize": "$fontSize.13",
                        "letterSpacing": "{letterSpacing.2}",
                        "paragraphSpacing": "{paragraphSpacing.none}",
                        "textCase": "$textCase.none",
                        "textDecoration": "$textDecoration.none"
                    },
                    "type": "typography"
                },
                "H3": {
                    "value": {
                        "fontFamily": "{fontFamilies.secondary}",
                        "fontWeight": "{fontWeights.font-weight-4}",
                        "lineHeight": "{lineHeights.sm}",
                        "fontSize": "$fontSize.11",
                        "letterSpacing": "{letterSpacing.2}",
                        "paragraphSpacing": "{paragraphSpacing.none}",
                        "textCase": "$textCase.none",
                        "textDecoration": "$textDecoration.none"
                    },
                    "type": "typography"
                },
                "H4": {
                    "value": {
                        "fontFamily": "{fontFamilies.secondary}",
                        "fontWeight": "{fontWeights.font-weight-4}",
                        "lineHeight": "{lineHeights.sm}",
                        "fontSize": "$fontSize.10",
                        "letterSpacing": "{letterSpacing.2}",
                        "paragraphSpacing": "{paragraphSpacing.none}",
                        "textCase": "$textCase.none",
                        "textDecoration": "$textDecoration.none"
                    },
                    "type": "typography"
                },
                "H5": {
                    "value": {
                        "fontFamily": "{fontFamilies.secondary}",
                        "fontWeight": "{fontWeights.font-weight-4}",
                        "lineHeight": "{lineHeights.sm}",
                        "fontSize": "$fontSize.7",
                        "letterSpacing": "{letterSpacing.6}",
                        "paragraphSpacing": "{paragraphSpacing.none}",
                        "textCase": "$textCase.none",
                        "textDecoration": "$textDecoration.none"
                    },
                    "type": "typography"
                },
                "H6": {
                    "value": {
                        "fontFamily": "{fontFamilies.secondary}",
                        "fontWeight": "{fontWeights.font-weight-4}",
                        "lineHeight": "{lineHeights.sm}",
                        "fontSize": "$fontSize.6",
                        "letterSpacing": "{letterSpacing.3}",
                        "paragraphSpacing": "{paragraphSpacing.none}",
                        "textCase": "$textCase.none",
                        "textDecoration": "$textDecoration.none"
                    },
                    "type": "typography"
                }
            },
            "Stats": {
                "Stat": {
                    "value": {
                        "fontFamily": "{fontFamilies.primary}",
                        "fontWeight": "{fontWeights.font-weight-4}",
                        "lineHeight": "$lineHeights.lg",
                        "fontSize": "$fontSize.13",
                        "letterSpacing": "{letterSpacing.11}",
                        "paragraphSpacing": "$paragraphSpacing.none",
                        "textCase": "$textCase.none",
                        "textDecoration": "$textDecoration.none"
                    },
                    "type": "typography"
                }
            },
            "BreadCrumbs": {
                "Historic": {
                    "value": {
                        "fontFamily": "{fontFamilies.secondary}",
                        "fontWeight": "{fontWeights.font-weight-1}",
                        "lineHeight": "$lineHeights.lg",
                        "fontSize": "$fontSize.1",
                        "letterSpacing": "{letterSpacing.3}",
                        "paragraphSpacing": "$paragraphSpacing.none",
                        "textCase": "$textCase.none",
                        "textDecoration": "$textDecoration.underline"
                    },
                    "type": "typography"
                },
                "Current": {
                    "value": {
                        "fontFamily": "{fontFamilies.primary}",
                        "fontWeight": "$fontWeights.font-weight-1",
                        "lineHeight": "$lineHeights.lg",
                        "fontSize": "$fontSize.1",
                        "letterSpacing": "{letterSpacing.3}",
                        "paragraphSpacing": "$paragraphSpacing.none",
                        "textCase": "$textCase.none",
                        "textDecoration": "$textDecoration.none"
                    },
                    "type": "typography"
                }
            },
            "Display": {
                "Display 1": {
                    "value": {
                        "fontFamily": "{fontFamilies.secondary}",
                        "fontWeight": "{fontWeights.font-weight-4}",
                        "lineHeight": "$lineHeights.sm",
                        "fontSize": "$fontSize.15",
                        "letterSpacing": "$letterSpacing.11",
                        "paragraphSpacing": "$paragraphSpacing.none",
                        "textCase": "$textCase.none",
                        "textDecoration": "$textDecoration.none"
                    },
                    "type": "typography"
                },
                "Display 2": {
                    "value": {
                        "fontFamily": "{fontFamilies.secondary}",
                        "fontWeight": "{fontWeights.font-weight-4}",
                        "lineHeight": "$lineHeights.lg",
                        "fontSize": "$fontSize.14",
                        "letterSpacing": "{letterSpacing.1}",
                        "paragraphSpacing": "$paragraphSpacing.none",
                        "textCase": "$textCase.none",
                        "textDecoration": "$textDecoration.none"
                    },
                    "type": "typography"
                }
            },
            "Body": {
                "Body1": {
                    "value": {
                        "fontFamily": "{fontFamilies.secondary}",
                        "fontWeight": "{fontWeights.font-weight-1}",
                        "lineHeight": "{lineHeights.lg}",
                        "fontSize": "$fontSize.5",
                        "letterSpacing": "{letterSpacing.9}",
                        "paragraphSpacing": "{paragraphSpacing.md}",
                        "textCase": "$textCase.none",
                        "textDecoration": "$textDecoration.none"
                    },
                    "type": "typography"
                },
                "Body1 - Bold": {
                    "value": {
                        "fontFamily": "{fontFamilies.secondary}",
                        "fontWeight": "{fontWeights.font-weight-4}",
                        "lineHeight": "{lineHeights.lg}",
                        "fontSize": "$fontSize.5",
                        "letterSpacing": "{letterSpacing.9}",
                        "paragraphSpacing": "{paragraphSpacing.md}",
                        "textCase": "$textCase.none",
                        "textDecoration": "$textDecoration.none"
                    },
                    "type": "typography"
                },
                "Body2": {
                    "value": {
                        "fontFamily": "{fontFamilies.secondary}",
                        "fontWeight": "{fontWeights.font-weight-1}",
                        "lineHeight": "{lineHeights.lg}",
                        "fontSize": "$fontSize.4",
                        "letterSpacing": "{letterSpacing.7}",
                        "paragraphSpacing": "{paragraphSpacing.sm}",
                        "textCase": "$textCase.none",
                        "textDecoration": "$textDecoration.none"
                    },
                    "type": "typography"
                },
                "Body2 - Bold": {
                    "value": {
                        "fontFamily": "{fontFamilies.secondary}",
                        "fontWeight": "{fontWeights.font-weight-4}",
                        "lineHeight": "$lineHeights.lg",
                        "fontSize": "$fontSize.4",
                        "letterSpacing": "{letterSpacing.7}",
                        "paragraphSpacing": "{paragraphSpacing.sm}",
                        "textCase": "$textCase.none",
                        "textDecoration": "$textDecoration.none"
                    },
                    "type": "typography"
                },
                "Body 3": {
                    "value": {
                        "fontFamily": "{fontFamilies.secondary}",
                        "fontWeight": "{fontWeights.font-weight-1}",
                        "lineHeight": "{lineHeights.lg}",
                        "fontSize": "$fontSize.6",
                        "letterSpacing": "{letterSpacing.9}",
                        "paragraphSpacing": "{paragraphSpacing.md}",
                        "textCase": "$textCase.none",
                        "textDecoration": "$textDecoration.none"
                    },
                    "type": "typography"
                },
                "Body3 - Bold": {
                    "value": {
                        "fontFamily": "{fontFamilies.secondary}",
                        "fontWeight": "{fontWeights.font-weight-4}",
                        "lineHeight": "{lineHeights.lg}",
                        "fontSize": "$fontSize.6",
                        "letterSpacing": "{letterSpacing.9}",
                        "paragraphSpacing": "{paragraphSpacing.md}",
                        "textCase": "$textCase.none",
                        "textDecoration": "$textDecoration.none"
                    },
                    "type": "typography"
                }
            },
            "fontWeights": {
                "font-weight-0": {
                    "value": "400",
                    "type": "fontWeights"
                },
                "font-weight-1": {
                    "value": "400",
                    "type": "fontWeights"
                },
                "font-weight-2": {
                    "value": "400",
                    "type": "fontWeights"
                },
                "font-weight-3": {
                    "value": "400",
                    "type": "fontWeights"
                },
                "font-weight-4": {
                    "value": "700",
                    "type": "fontWeights"
                }
            },
            "lineHeights": {
                "sm": {
                    "value": "150%",
                    "type": "lineHeights"
                },
                "lg": {
                    "value": "170%",
                    "type": "lineHeights"
                }
            }
        };
    }

    public getMotionSensitivityAsObject(): Object {
        return {};
    }

    public getDyslexiaAsString(): string {
        return JSON.stringify(this.getDyslexiaAsObject(), null, 2);
    }

    public getMotionSensitivityAsString(): string {
        return JSON.stringify(this.getMotionSensitivityAsObject(), null, 2);
    }

    private getAllColors(lm: boolean): any {
        const rtn: any = {};
        this.atoms.colorPalette.getColors().forEach(color => {
            const colorObj: any = {};
            const onColorObj: any = {};
            rtn[this.getColorId(color)] = { "Color": colorObj, "On-Color": onColorObj };
            const shades = lm ? color.light.shades : color.dark.shades;
            shades.forEach(shade => {
                const id = this.getShadeId(shade);
                colorObj[id] = this.getColor(shade.getRGB());
                onColorObj[id] = this.getColor(shade.getOnShade2(lm).getRGBA());
            });
        });
        return rtn;
    }

    private getThemeColors(theme: ColorTheme, lm: boolean): any {
        const self = this;
        const fcn = function (prop: PropertyColorShade, lm: boolean) {
            let shade = prop.getValue();
            if (!shade) return;
            if (!lm) shade = theme.findDarkModeShade(shade);
            // Set theme colors
            if (!shade.hasMode()) return;
            const color: any = {};
            const onColor: any = {};
            shade.getMode().shades.forEach(shade => {
                const colorId = self.getColorIdForShade(shade);
                const shadeId = self.getShadeId(shade);
                color[shadeId] = self.getColor(`{All-Colors.${colorId}.Color.${shadeId}}`);
                onColor[shadeId] = self.getColor(`{All-Colors.${colorId}.On-Color.${shadeId}}`);
            });
            return {
                "Color": color,
                "On-Color": onColor,
            };
        };
        return {
            Primary: fcn(theme.primary, lm),
            Secondary: fcn(theme.secondary, lm),
            Tertiary: fcn(theme.tertiary, lm),
        };
    }

    private getTheme(theme: ColorTheme, lm: boolean): any {
        const self = this;
        const fcn = function (prop: PropertyColorShade, lm: boolean, name: string): any {
            let shade = prop.getValue();
            if (!shade) return;
            const id = self.getShadeId(shade);
            // Set theme
            return {
                "Color": {
                    value: `{Theme-Colors.${name}.Color.${id}}`,
                    type: "color",
                },
                "On-Color": {
                    value: `{Theme-Colors.${name}.On-Color.${id}}`,
                    type: "color",
                },
            };
        };
        return {
            Primary: fcn(theme.primary, lm, "Primary"),
            Secondary: fcn(theme.secondary, lm, "Secondary"),
            Tertiary: fcn(theme.tertiary, lm, "Tertiary"),
        };
    }

    private getSolidBackgrounds(theme: ColorTheme, lm: boolean): any {
        log.debug("getSolidBackgrounds enter");
        const bg = lm ? theme.lightModeBackground : theme.darkModeBackground;
        const colorPair = bg.getValue();
        if (!colorPair) {
            log.debug("getSolidBackgrounds exit (no background color pair)");
            return {};
        }
        let tertiaryShade = theme.tertiary.getValue();
        if (!tertiaryShade) {
            log.debug("getSolidBackgrounds exit (no tertiary shade)");
            return {};
        }
        let buttonShade = theme.button.getValue();
        if (!buttonShade) {
            log.debug("getSolidBackgrounds exit (no button shade)");
            return {};
        }
        let iconShade = theme.icon.getValue();
        if (!iconShade) {
            log.debug("getSolidBackgrounds exit (no icon shade)");
            return {};
        }
        if (!lm) {
            tertiaryShade = theme.findDarkModeShade(tertiaryShade);
            buttonShade = theme.findDarkModeShade(buttonShade);
            iconShade = theme.findDarkModeShade(iconShade);
        }
        const buttonVars = theme.getShadeGroups(buttonShade);
        const buttonSG = lm ? buttonVars.lm : buttonVars.dm;
        const hotlinkVars = this.atoms.hotlinks.findHotlinkVariables2(lm);
        const hotlinkShade = hotlinkVars.default.unvisited.shade;
        if (!hotlinkShade) {
            log.debug("getSolidBackgrounds exit (no hotlink shade)");
            return {};
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
            onPrimary = '{Text.Dark}';
            onSecondary = '{Text.Dark}';
            // tertiary BG //
            tertiary = '{Theme.Primary.Color}';
            onTertiary = '{Theme.Primary.On-Color}';
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
            const iconOnTertiary = iconShade.getShadeOrOnShadeBasedOnContrast(tertiaryShade, lm);
            if (iconOnTertiary.equals(iconShade)) {
                tertiaryIcon = '{Icons.Colored.Color}';
            } else if (iconOnTertiary.equals(Shade.BLACK)) {
                tertiaryIcon = '{Icons.Dark.Color}';
            } else {
                tertiaryIcon = '{Icons.White.Color}';
            }
            const hotlinkOnTertiary = hotlinkVars.onTertiary.unvisited.shade;
            if (hotlinkOnTertiary.equals(hotlinkShade)) {
                tertiaryHotlink = '{Hotlinks.Colored.Link}';
            } else if (hotlinkOnTertiary === Shade.BLACK) {
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
        const Black = this.getSolidColor(lm, buttonShade, iconShade, hotlinkShade, Shade.BLACK, "White");
        const White = this.getSolidColor(lm, buttonShade, iconShade, hotlinkShade, Shade.WHITE, "Dark");
        return { Primary, Secondary, Tertiary, Black, White };
    }

    private getSolidColor(lm: boolean, button: Shade, icon: Shade, hotlink: Shade, compShade: Shade, other: string): any {
        let Button, OnButton: any;
        const buttonOn = button.getShadeOrOnShadeBasedOnContrast(compShade, lm);
        if (buttonOn.equals(button)) {
            Button = this.getColor("{Buttons.Colored.Color}");
            OnButton = this.getColor("{Buttons.Colored.On-Color}");
        } else {
            Button = this.getColor(`{Buttons.${other}.Color}`);
            OnButton = this.getColor(`{Buttons.${other}.On-Color}`);
        }
        let Icon: any;
        const iconOn = icon.getShadeOrOnShadeBasedOnContrast(compShade, lm);
        if (iconOn.equals(icon)) {
            Icon = this.getColor('{Icons.Colored.Color}');
        } else {
            Icon = this.getColor(`{Icons.${other}.Color}`);
        }
        let Hotlink;
        const hotlinkOn = hotlink.getShadeOrOnShadeBasedOnContrast(compShade, lm);
        if (hotlinkOn.equals(hotlink)) {
            Hotlink = this.getColor('{Hotlinks.Colored.Link}');
        } else {
            Hotlink = this.getColor(`{Hotlinks.${other}.Link}`);
        }
        return { Button, OnButton, Icon, Hotlink };
    }

    private getGradientBackgrounds(theme: ColorTheme, lm: boolean): any {
        const self = this;
        const getShadeName = function (prop: PropertyColorShade, lm: boolean): string | undefined {
            const shade = prop.getValue();
            if (shade) {
                return self.getShadeName(shade, lm, theme);
            }
        };
        const fcn2 = function (lm: boolean, fromName?: string, toName?: string): any {
            let color, onColor, button, onButton, icon, hotlink: string | undefined;
            if (fromName && toName) {
                color = `linear-gradient(90deg, ${fromName} 0%, ${toName} 100%)`;
                onColor = fromName;
            }
            button = self.getPropShadeName(theme.button, lm, theme);
            onButton = self.getPropShadeName(theme.button, lm, theme, true);
            icon = self.getPropShadeName(theme.icon, lm, theme);
            const hlVars = self.atoms.hotlinks.getHotlinkVariables2(lm);
            if (hlVars) {
                hotlink = self.getShadeName(hlVars.default.unvisited.shade, lm, theme);
            }
            return {
                "Color": self.getColor(color),
                "On-Color": self.getColor(onColor),
                "Button": self.getColor(button),
                "On-Button": self.getColor(onButton),
                "Icon": self.getColor(icon),
                "Hotlink": self.getColor(hotlink),
            }
        };
        const fcn = function (gc: GradientColors, lm: boolean): any {
            return fcn2(lm, getShadeName(gc.from, lm), getShadeName(gc.to, lm));
        };
        const gradient3FromName = lm ? "{Core-Colors.White.Color}" : "{Core-Colors.Gray.Color.900}";
        const gradient3ToName = lm ? "{Core-Colors.Gray.Color.200}" : "{Core-Colors.Gray.Color.900}";
        return {
            "Gradient-1": fcn(theme.gradient1, lm),
            "Gradient-2": fcn(theme.gradient2, lm),
            "Gradient-3": fcn2(lm, gradient3FromName, gradient3ToName),
        };
    }

    private getFontFamilies(): any {
        const primary = this.atoms.fontsSettings.primaryFont.getValue();
        const secondary = this.atoms.fontsSettings.secondaryFont.getValue();
        const fcn = function (value?: string) { return { type: "fontFamilies", value: value || "" } };
        return {
            primary: fcn(primary),
            secondary: fcn(secondary),
        };
    }

    private getLineHeights(): any {
        const sm = this.atoms.fontsSettings.smallLineHeight.getValue();
        const lg = this.atoms.fontsSettings.standardLineHeight.getValue();
        const fcn = function (value?: number) { return { type: "fontFamilies", value: value + "%" || "" } };
        return {
            primary: fcn(sm),
            secondary: fcn(lg),
        };
    }

    private getBaseFont(): any {
        const fontSize = this.atoms.fontsSettings.baseFontSize.getValue();
        return { type: "fontSizes", value: fontSize };
    }

    private getFontWeights(): any {
        const rtn: any = {};
        const fws = this.atoms.fontsSettings.fontWeights;
        for (let i = 0; i < fws.length; i++) {
            const weight = fws[i].getValue() || 0;
            rtn[`font-weight-${i}`] = {
                type: "fontWeights",
                value: `${weight}`,
            };
        }
        rtn['secondary-font-weight'] = {
            type: "fontWeights",
            value: `${this.atoms.fontsSettings.secondaryFontWeight.getValue() || 0}`,
        }
        const headerWeight = this.atoms.displayAndHeaderStyles.headingDisplayFontWeight.getValue() || 0;
        rtn["Header-Weight"] = {
            type: "fontWeights",
            value: `${headerWeight}`,
        };
        return rtn;
    }

    private getTypographyInfo(): any {
        let headerChange = this.atoms.displayAndHeaderStyles.percentChangeInHeaderDisplaySizes.getValue() || 0;
        if (headerChange > 0) headerChange /= 100;
        return {
            "Header-Change": {
                type: "other",
                value: `${headerChange}`,
            },
        };
    }

    private getSizing(): any {
        const type = "sizing";
        const sizing = this.atoms.gridSettings.grid.getValue() || 0;
        const minTarget = this.atoms.minimumTarget.minHeight.getValue() || 0;
        const buttonMinWidth = this.molecules.standardButtons.minWidth.getValue() || 0;
        const smallButtonHeight = this.molecules.smallButtons.visibleHeight.getValue() || 0;
        const chipHeight = this.molecules.chips.visibleHeight.getValue() || 0;
        const chipMinWidth = this.molecules.chips.minWidth.getValue() || 0;
        const sliderHandleHeight = this.molecules.sliders.visibleHeight.getValue() || 0;
        const imageHeight = this.molecules.images.listImageHeight.getValue() || 0;
        const fcn = function (size: number) { return { type, value: `{Sizing.Size-1} * ${size}` }; };
        return {
            "Size-1": { type, value: `${sizing}px` },
            "min-target": { type: "sizing", value: `${minTarget}px` },
            "Button-MinWidth": `${buttonMinWidth}px`,
            "Sm-Button-Height": fcn(smallButtonHeight),
            "Chip-Height": fcn(chipHeight),
            "Chip-MinWidth": fcn(chipMinWidth),
            "Slider-Handle-Height": fcn(sliderHandleHeight),
            "Image-Height": fcn(imageHeight),
        };
    }

    private getSpacing(): any {
        const type = "sizing";
        const spacing = this.atoms.gridSettings.grid.getValue() || 0;
        const buttonPadding = this.molecules.standardButtons.horizontalPadding.getValue() || 0;
        const smallButtonPadding = this.molecules.smallButtons.horizontalPadding.getValue() || 0;
        const chipPadding = this.molecules.chips.horizontalPadding.getValue() || 0;
        const cardPadding = this.molecules.standardCards.padding.getValue() || 0;
        const cardGap = this.molecules.standardCards.contentGap.getValue() || 0;
        const heroGap = this.organisms.hero.verticalGap.getValue() || 0;
        const sectionPadding = this.molecules.spacing.sectionPadding.getValue() || 0;
        const paragraphPadding = this.molecules.spacing.paragraphPadding.getValue() || 0;
        const tableHeaderPadding = this.organisms.dataTables.padding.getValue() || 0;
        const primaryNavPadding = this.organisms.primaryNav.horizontalTabPadding.getValue() || 0;
        const secondaryNavPadding = this.organisms.secondaryNav.horizontalTabPadding.getValue() || 0;
        const fcn = function (size: number) { return { type, value: `{Spacing.spacing-1} * ${size}` }; };
        return {
            "Spacing-1": { type, value: `${spacing}px` },
            "Button-Padding": fcn(buttonPadding),
            "Sm-Button-Padding": fcn(smallButtonPadding),
            "Chip-Padding": fcn(chipPadding),
            "Card-Padding": fcn(cardPadding),
            "Card-Gap": fcn(cardGap),
            "Hero-Gap": fcn(heroGap),
            "Hero-Padding": fcn(3),
            "Section-Padding": fcn(sectionPadding),
            "Paragraph-Padding": fcn(paragraphPadding),
            "TableHeader-Padding": fcn(tableHeaderPadding),
            "TableBody-Padding": fcn(1),
            "PrimaryNav-Padding": fcn(primaryNavPadding),
            "SecondaryNav-Padding": fcn(secondaryNavPadding),
            "Toast-Padding": fcn(1),
            "Tooltip-Padding": fcn(1),
            "Modal-Padding": fcn(3),
        };
    }

    private getRadius(): any {
        const type = "borderRadius";
        const radius = this.atoms.borderSettings.baseBorderRadius.getValue() || 0;
        const buttonRadius = this.molecules.standardButtons.radius.getValue() || 0;
        const chipRadius = this.molecules.chips.radius.getValue() || 0;
        const cardRadius = this.molecules.standardCards.borderRadius.getValue() || 0;
        const imageRadius = this.molecules.images.generalImageBorderRadius.getValue() || 0;
        const inlineImageRadius = this.molecules.images.listImageBorderRadius.getValue() || 0;
        const sliderHandleRadius = this.molecules.sliders.handleBorderRadius.getValue() || 0;
        const modalRadius = this.molecules.modal.borderRadius.getValue() || 0;
        const toastRadius = this.molecules.toasts.handleBorderRadius.getValue() || 0;
        const fcn = function (size: number) { return { type, value: `{Radius.Border-Radius-1} * ${size}` }; };
        return {
            "Border-Radius-1": { type, value: `${radius}px` },
            "Button-Radius": fcn(buttonRadius),
            "Chip-Radius": fcn(chipRadius),
            "Card-Radius": fcn(cardRadius),
            "Image-Radius": fcn(imageRadius),
            "Inline-Image-Radius": fcn(inlineImageRadius),
            "Input-Radius": fcn(radius),
            "SliderHandle-Radius": fcn(sliderHandleRadius),
            "Modal-Radius": fcn(modalRadius),
            "ToolTip-Radius": fcn(1),
            "Toast-Radius": fcn(toastRadius),
        };
    }

    private getBorder(): any {
        const type = "borderWidth";
        const border = this.atoms.borderSettings.baseBorderWidth.getValue() || 0;
        const buttonBorder = this.molecules.standardButtons.secondaryBorder.getValue() || 0;
        const largeAvatarBorder = this.molecules.avatars.extraLargeBorder.getValue() || 0;
        const smallAvatarBorder = this.molecules.avatars.mediumBorder.getValue() || 0;
        const imageBorder = this.molecules.images.generalImageBorderRadius.getValue() || 0;
        const cardBorder = this.molecules.standardCards.minWidth.getValue() || 0;
        const fcn = function (size: number) { return { type, value: `{Border.border-1} * ${size}` }; };
        return {
            "border-1": { type, value: `${border}px` },
            "Button-Border": fcn(buttonBorder),
            "Lg-Avatar-Border": fcn(largeAvatarBorder),
            "Sm-Avatar-Border": fcn(smallAvatarBorder),
            "Image-Border": fcn(imageBorder),
            "Card-Border": fcn(cardBorder),
        };
    }

    private getBorders(lm: boolean): any {
        const defaultColor = lm ? "ffffff40" : "";
        const bottomLine = `linear-gradient(0deg, , 1px, ${defaultColor} 1px)`;
        return {
            "Default": this.getColor(defaultColor),
            "Bottom Line": this.getColor(bottomLine),
        };
    }

    private getStates(lm: boolean): any {
        log.debug(`getStates enter`);
        const self = this;
        const ss = this.atoms.stateSettings;
        const fcn = function (ss: StateSetting, lm: boolean) {
            const shade = lm ? ss.lmShade : ss.dmShade;
            if (!shade) return undefined;
            const rtn = self.getColorPair(shade.getRGB(), shade.getOnShade2(lm).getRGB());
            log.debug(`getStates name=${ss.name}, shade=${shade.hex}`);
            return rtn;
        };
        const rtn = {
            Info: fcn(ss.info, lm),
            Success: fcn(ss.success, lm),
            Warning: fcn(ss.warning, lm),
            Error: fcn(ss.danger, lm),
        };
        log.debug(`getStates exit`);
        return rtn;
    }

    private getElevations(lm: boolean): any {
        log.debug(`getElevations enter`);
        const rtn: any = {};
        const theme = this.atoms.colorThemes.getDefaultTheme();
        if (!theme) {
            log.debug("getElevations exit (no default theme)");
            return undefined;
        }
        const shades = theme.getElevationShades(lm);
        for (let i = 0; i < shades.length; i++) {
            rtn[`Elevation-${i + 1}`] = lm ? "{Solid-Backgrounds.Primary.Color}" : this.getShadeColor(shades[i], lm);
        }
        log.debug(`getElevations exit`);
        return rtn;
    }

    private getChips(theme: ColorTheme, lm: boolean): any {
        log.debug(`getChips enter`);
        const val = theme.lightModeBackground.getValue();
        if (!val) {
            log.debug(`getChips exit (no lightModeBackground value)`);
            return;
        }
        log.debug(`getChips title=${val.title}, lighter=${val.lighter}, lm=${lm}`);
        const color = lm && val.lighter ? "Black" : "White";
        const rtn = {
            "Color": this.getColor("{Core-Colors." + color + ".Color-Half}"),
            "Colorhalf": this.getColor("{Core-Colors." + color + ".Color-Quarter}"),
            "On-Color": this.getColor("{Core-Colors." + color + ".On-Color}"),
        };
        log.debug(`getChips exit`);
        return rtn;
    }

    private getTextDecoration(theme: ColorTheme, lm: boolean): any {
        log.debug(`getTextDecoration enter`);
        let textGradient, colorDropshadow: any;
        // Get text gradient
        const from = theme.gradientHeaderText.from.getValue();
        const to = theme.gradientHeaderText.to.getValue();
        if (from && to) {
            const fromName = lm ? this.getShadeName(from, lm, theme) : "{Theme-Colors.Primary.Color.100}";
            const toName = lm ? this.getShadeName(to, lm, theme) : "{Theme-Colors.Primary.Color.400}";
            textGradient = `linear-gradient(90deg, ${fromName} 0%, ${toName} 100%)`;
        }
        if (lm) {
            const bg = theme.lightModeBackground.getValue();
            colorDropshadow = bg && bg.lighter ? "{Theme-Colors.Primary.Color.100}" : "{Core-Colors.Black.Color}80";
        } else {
            colorDropshadow = "transparent";
        }
        const rtn = {
            "Text-Gradient": this.getColor(textGradient),
            "Color-Dropshadow": this.getColor(colorDropshadow),
        };
        log.debug(`getTextDecoration exit`);
        return rtn;
    }

    private getHotlinks(theme: ColorTheme, lm: boolean): any {
        log.debug(`getHotlinks enter`);
        const vars = this.atoms.hotlinks.getHotlinkVariables2(lm);
        if (!vars) {
            log.debug(`getHotlinks exit (no variables)`);
            return;
        }
        const shade = vars.default.unvisited.shade;
        const rtn = {
            Colored: {
                Link: this.getShadeColor(shade, lm, theme),
                Visited: this.getColor("{Hotlinks.Colored.Link}B3"),
            },
        };
        log.debug(`getHotlinks exit`);
        return rtn;
    }

    private getSurface(theme: ColorTheme, lm: boolean): any {
        log.debug(`getSurface entry - lm=${lm}`);
        if (!lm) {
            return this.getColorPair("{Elevations.Elevation-1}", "{Text.White}");
        }
        const bg = lm ? theme.lightModeBackground : theme.darkModeBackground;
        const bgVal = bg.getValue();
        if (!bgVal) {
            log.debug(`getSurface exit (no background value)`);
            return undefined;
        }
        const title = bgVal.title;
        log.debug(`getSurface: title=${title}`);
        let surface, onSurface;
        if (title === ColorTheme.CP_WHITE_OFFWHITE) {
            surface = '{Core-Colors.White.Color}';
            onSurface = '{Core-Colors.White.On-Color}';
        } else if (title === ColorTheme.CP_BLACK_OFFBLACK) {
            surface = '{Core-Colors.Near-Black.Color}';
            onSurface = '{Text.White}';
        } else if (title === ColorTheme.CP_800_900) {
            surface = bgVal.primary.getRGB();
            onSurface = '{Text.White}';
        } else if (title === ColorTheme.CP_HALF_QUARTER) {
            surface = '{Core-Colors.White.Color}';
            onSurface = '{Core-Colors.White.On-Color}';
        } else {
            throw new Error(`Invalid title: ${title}`);
        }
        log.debug(`getSurface exit - surface=${surface}, onSurface=${onSurface}`);
        return this.getColorPair(surface, onSurface);
    }

    private getShadows(): any {
        const buttonShadow = this.molecules.standardButtons.buttonShadow;
        const chipShadow = this.molecules.chips.shadow;
        const avatarShadow = this.molecules.avatars.shadow;
        const cardShadow = this.molecules.standardCards.shadow;
        const imageShadow = this.molecules.images.imageShadow;
        const sliderHandleShadow = this.molecules.sliders.handleShadow;
        const sliderBarShadow = this.molecules.sliders.barShadow;
        const modalShadow = this.molecules.modal.shadow;
        const toastShadow = this.molecules.toasts.shadow;
        const dropDownShadow = this.molecules.dropdowns.menuShadow;
        const fcn = function (prop: PropertyShadowSelectable): any {
            const ci = prop.getCategoryAndIndex();
            const value = ci && ci.category.json && ci.memberIndex >= 0 ? `${ci.category.json}-${ci.memberIndex+1}` : undefined;
            return { type: "boxShadow", value };
        };
        return {
            "Button-Shadow": fcn(buttonShadow),
            "Chip-Shadow": fcn(chipShadow),
            "Avatar-Shadow": fcn(avatarShadow),
            "Card-Shadow": fcn(cardShadow),
            "Image-Shadow": fcn(imageShadow),
            "SliderHandle-Shadow": fcn(sliderHandleShadow),
            "SliderBar-Shadow": fcn(sliderBarShadow),
            "Modal-Shadow": fcn(modalShadow),
            "Tooltip-Shadow": { type: "boxShadow", value: undefined },
            "Toast-Shadow": fcn(toastShadow),
            "Dropdown-Shadow": fcn(dropDownShadow),
        };
    }

    private getElevationInfo(): any {
        let change, horizontal, vertical, spread, blur, opacity, rgb, baseBlur, baseSpread, baseOpacity: any;
        const es = this.atoms.elevationSettings;
        const changeVal = es.percentageChange.getValue();
        if (changeVal) change = `${changeVal / 100}`;
        const horizontalVal = es.horizontalShadowLength.getValue();
        if (horizontalVal) horizontal = `${horizontalVal}px`;
        const verticalVal = es.verticalShadowLength.getValue();
        if (vertical) vertical = `${verticalVal}px`;
        const spreadVal = es.spreadRadius.getValue();
        if (spreadVal) spread = `${spreadVal}px`;
        const blurVal = es.blurRadius.getValue();
        if (blurVal) blur = `${blurVal}px`;
        const opacityVal = es.colorOpacity.getValue();
        if (opacityVal) opacity = `${opacityVal / 100}`;
        const rgbVal = es.shadowColor.getValue();
        if (rgbVal) {
            const s = Shade.fromHex(rgbVal);
            rgb = `${s.R}, ${s.G}, ${s.B}`;
        }
        return {
            "Change": this.getOther(change),
            "Horizontal": this.getOther(horizontal),
            "Vertical": this.getOther(vertical),
            "Spread": this.getOther(spread),
            "Blur": this.getOther(blur),
            "Opacity": this.getOther(opacity),
            "RGB": this.getOther(rgb),
        };
    }

    private getGlowInfo(): any {
        let rgb, spread, blur, opacity, change: any;
        const gs = this.atoms.glowSettings;
        const rgbVal = gs.color.getValue();
        if (rgbVal) {
            const s = Shade.fromHex(rgbVal);
            rgb = `${s.R}, ${s.G}, ${s.B}`;
        }
        const spreadVal = gs.spreadRadius.getValue();
        if (spreadVal) spread = `${spreadVal}px`;
        const blurVal = gs.blurRadius.getValue();
        if (blurVal) blur = `${blurVal}px`;
        const opacityVal = gs.colorOpacity.getValue();
        if (opacityVal) opacity = `${opacityVal / 100}`;
        const changeVal = gs.percentageChange.getValue();
        if (changeVal) change = `${changeVal / 100}`;
        return {
            "RGB": this.getOther(rgb),
            "Spread": this.getOther(spread),
            "Blur": this.getOther(blur),
            "Opacity": this.getOther(opacity),
            "Change": this.getOther(change),
        };
    }

    private getBaseInfo(): any {
        let spread, blur, opacity: any;
        const es = this.atoms.elevationSettings;
        const spreadVal = es.spreadRadius.getValue();
        if (spreadVal) spread = `${spreadVal}px`;
        const blurVal = es.blurRadius.getValue();
        if (blurVal) blur = `${blurVal}px`;
        const opacityVal = es.colorOpacity.getValue();
        if (opacityVal) opacity = `${opacityVal / 100}`;
        return {
            "Spread": this.getOther(spread),
            "Blur": this.getOther(blur),
            "Opacity": this.getOther(opacity),
        };
    }

    private getBevelInfo(lm: boolean): any {
        if (lm) {
            return {
                "Light-Opacity": {
                    "value": ".4",
                    "type": "other"
                }
            }
        } else {
            return {
                "Light-Opacity": {
                    "value": ".2",
                    "type": "other"
                }
            }
        }
    }

    private getBevelInfoBase(): any {
        return this.getBevelInfo2(this.atoms.bevelSettings.standard);
    }

    private getBevelInfo2(props: BevelSettingsProps): any {
        let change, horizontal, vertical, spread, blur, lightOpacity, darkOpacity: any;
        const changeVal = props.percentageChange.getValue();
        if (changeVal) change = `${changeVal / 100}`;
        const horizontalVal = props.horizontalShadowLength.getValue();
        if (horizontalVal) horizontal = `${horizontalVal}px`;
        const verticalVal = props.verticalShadowLength.getValue();
        if (verticalVal) vertical = `${verticalVal}px`;
        const spreadVal = props.spreadRadius.getValue();
        if (spreadVal) spread = `${spreadVal}px`;
        const blurVal = props.blurRadius.getValue();
        if (blurVal) blur = `${blurVal}px`;
        const lightOpacityVal = props.lightGlowOpacity.getValue();
        if (lightOpacityVal) lightOpacity = `${lightOpacityVal}%`;
        const darkOpacityVal = props.darkShadowOpacity.getValue();
        if (darkOpacityVal) darkOpacity = `${darkOpacityVal}%`;
        return {
            "Bevel-Change": this.getOther(change),
            "Bevel-Horizontal": this.getOther(horizontal),
            "Bevel-Vertical": this.getOther(vertical),
            "Bevel-Spread": this.getOther(spread),
            "Bevel-Blur": this.getOther(blur),
            "Bevel-Light-Opacity": this.getOther(lightOpacity),
            "Bevel-Dark-Opacity": this.getOther(darkOpacity),
        };
    }

    private getButtons(theme: ColorTheme, lm: boolean): any {
        let button = theme.button.getValue();
        if (!button) {
            log.debug("getButtons exit (no button)");
            return;
        }
        if (!lm) button = theme.findDarkModeShade(button);
        const bgVars = theme.getBackgroundVariables(lm ? theme.lightModeBackground : theme.darkModeBackground);
        if (!bgVars) {
            log.debug("getButtons exit (no background variables)");
            return;
        }
        const gb = bgVars.groupButton;
        var groupButtonBG = lm ? this.getShadeName(gb, true, theme, false) : "{Core-Colors.White.Color}1f";
        var onGroupButtonBG = lm ? this.getShadeName(gb, false, theme, true) : "{Core-Colors.Black.Color}";
        return {
            Colored: {
                "Color": this.getShadeColor(button, lm, theme),
                "On-Color": this.getShadeColor(button, lm, theme, true),
                "Color-Half": this.getColor("{Buttons.Colored.Color}80"),
            },
            GroupButton: {
                Background: this.getColor(groupButtonBG),
                OnBackground: this.getColor(onGroupButtonBG),
            },
        };
    }

    private getIcons(theme: ColorTheme, lm: boolean): any {
        const icon = theme.icon.getValue();
        if (!icon) {
            log.debug("getIcons exit (no icon)");
            return;
        }
        return { Colored: { "Color": this.getShadeColor(icon, lm, theme) } };
    }

    private getInputOutlines(lm: boolean): any {
        if (lm) {
            return {
                "Default": {
                    "value": "{Borders.Default}",
                    "type": "color",
                    "description": "--border"
                },
                "Focus": {
                    "value": "{Buttons.Colored.Color}",
                    "type": "color"
                },
                "Hover": {
                    "value": "{Input Outlines.Focus}80",
                    "type": "color"
                }
            }
        } else {
            return {
                "Default": {
                    "value": "{Borders.Default}",
                    "type": "color"
                },
                "Focus": {
                    "value": "{Buttons.Colored.Color}",
                    "type": "color"
                },
                "Hover": {
                    "value": "{Input Outlines.Focus}80",
                    "type": "color"
                }
            }
        }
    }

    private getInputBackgrounds(lm: boolean): any {
        const vars = this.atoms.inputBackground.getVariables();
        if (!vars) return {};
        const inputDefault = lm ? vars.inputDefault : vars.dmInputDefault;
        return {
            Default: this.getColor(inputDefault.getRGBA()),
        };
    }

    private getWhiteGlow(lm: boolean): any {
        if (lm) {
            return {
                "Bright": {
                    "value": "{Core-Colors.White.Color}",
                    "type": "color"
                },
                "Dim": {
                    "value": "{Core-Colors.White.Color}",
                    "type": "color",
                    "$extensions": {
                        "studio.tokens": {
                            "modify": {
                                "type": "alpha",
                                "value": ".50",
                                "space": "lch"
                            }
                        }
                    }
                }
            }
        } else {
            return {
                "Bright": {
                    "value": "#ffffff30",
                    "type": "color"
                },
                "Dim": {
                    "value": "#ffffff20",
                    "type": "color"
                }
            }
        }
    }

    private getShadeColor(shade: Shade, lm: boolean, theme?: ColorTheme, onShade?: boolean): string {
        return this.getColor(this.getShadeName(shade, lm, theme, onShade));
    }

    private getPropShadeName(prop: PropertyColorShade, lm: boolean, theme?: ColorTheme, onShade?: boolean): string | undefined {
        const shade = prop.getValue();
        if (shade) return this.getShadeName(shade, lm, theme, onShade);
    }

    private getShadeName(shade: Shade, lm: boolean, theme?: ColorTheme, onColor?: boolean): string | undefined {
        let coreShadeName = shade.coreShadeName;
        if (coreShadeName && onColor) {
            shade = shade.getOnShade2(lm);
            coreShadeName = shade.coreShadeName;
        }
        if (coreShadeName) {
            return "{Core-Colors." + coreShadeName + ".Color}";
        }
        if (theme) {
            const ref = this.getShadeRef(shade, theme);
            if (ref && shade.index != undefined) {
                return "{Theme-Colors." + ref + (onColor ? ".On-Color." : ".Color.") + this.getShadeId(shade) + "}";
            }
        }
        return shade.getRGBA();
    }

    /*
     * Return Primary, Secondary, or Tertiary based upon being of the same color
     * with the selected primary, secondary, or tertiary.
     */
    private getShadeRef(shade: Shade, theme: ColorTheme): string | undefined {
        const primary = theme.primary.getValue();
        if (primary && shade.isSameColor(primary)) return "Primary";
        const secondary = theme.secondary.getValue();
        if (secondary && shade.isSameColor(secondary)) return "Secondary";
        const tertiary = theme.tertiary.getValue();
        if (tertiary && shade.isSameColor(tertiary)) return "Tertiary";
    }

    private getColorPair(value: string, onValue: string) {
        return {
            "Color": this.getColor(value),
            "On-Color": this.getColor(onValue),
        };
    }

    private getColor(value?: string): any {
        const color: any = { type: "color" };
        if (value) color.value = value;
        return color;
    }

    private getOther(value?: string): any {
        const other: any = { type: "other" };
        if (value) other.value = value;
        return other;
    }

    private getColorIdForShade(shade: Shade): string {
        return this.getColorId(shade.getMode().color as Color);
    }

    private getColorId(color: Color): string {
        return `Color-${color.index + 1}`;
    }

    private getShadeId(shade: Shade): string {
        if (shade.id === "0") return "050";
        return shade.id;
    }

    private getCoreColors(lm: boolean): any {
        if (lm) {
            return {
                "White": {
                    "Color": {
                        "value": "#ffffff",
                        "type": "color"
                    },
                    "Color-Half": {
                        "value": "{Core-Colors.White.Color}80",
                        "type": "color"
                    },
                    "Color-Quarter": {
                        "value": "{Core-Colors.White.Color}20",
                        "type": "color"
                    },
                    "On-Color": {
                        "value": "{Text.Dark}",
                        "type": "color"
                    }
                },
                "Black": {
                    "Color": {
                        "value": "#121212",
                        "type": "color"
                    },
                    "Color-Half": {
                        "value": "{Core-Colors.Black.Color}80",
                        "type": "color"
                    },
                    "Color-Quarter": {
                        "value": "{Core-Colors.Black.Color}40",
                        "type": "color"
                    },
                    "On-Color": {
                        "value": "{Text.White}",
                        "type": "color"
                    }
                },
                "Near-Black": {
                    "Color": {
                        "value": "#181818",
                        "type": "color"
                    }
                },
                "Gray": {
                    "Color": {
                        "100": {
                            "value": "rgb(228, 228, 228)",
                            "type": "color"
                        },
                        "200": {
                            "value": "rgb(205, 205, 205)",
                            "type": "color"
                        },
                        "300": {
                            "value": "rgb(183, 183, 183)",
                            "type": "color"
                        },
                        "400": {
                            "value": "rgb(160, 160, 160)",
                            "type": "color"
                        },
                        "500": {
                            "value": "rgb(138, 138, 138)",
                            "type": "color"
                        },
                        "600": {
                            "value": "rgb(115, 115, 115)",
                            "type": "color"
                        },
                        "700": {
                            "value": "rgb(93, 93, 93)",
                            "type": "color"
                        },
                        "800": {
                            "value": "rgb(70, 70, 70)",
                            "type": "color"
                        },
                        "900": {
                            "value": "rgb(48, 48, 48)",
                            "type": "color"
                        },
                        "050": {
                            "value": "rgb(250, 250, 250)",
                            "type": "color"
                        },
                        "Half": {
                            "value": "rgb(253, 253, 253)",
                            "type": "color"
                        },
                        "Quarter": {
                            "value": "rgb(254, 254, 254)",
                            "type": "color"
                        }
                    },
                    "On-Color": {
                        "100": {
                            "value": "{Text.Dark}",
                            "type": "color",
                            "description": "Contrast ratio: 13.24"
                        },
                        "200": {
                            "value": "{Text.Dark}",
                            "type": "color",
                            "description": "Contrast ratio: 10.59"
                        },
                        "300": {
                            "value": "{Text.Dark}",
                            "type": "color",
                            "description": "Contrast ratio: 8.39"
                        },
                        "400": {
                            "value": "{Text.Dark}",
                            "type": "color",
                            "description": "Contrast ratio: 6.44"
                        },
                        "500": {
                            "value": "{Text.Dark}",
                            "type": "color",
                            "description": "Contrast ratio: 4.88"
                        },
                        "600": {
                            "value": "{Text.White}",
                            "type": "color",
                            "description": "Contrast ratio: 4.74"
                        },
                        "700": {
                            "value": "{Text.White}",
                            "type": "color",
                            "description": "Contrast ratio: 6.58"
                        },
                        "800": {
                            "value": "{Text.White}",
                            "type": "color",
                            "description": "Contrast ratio: 9.44"
                        },
                        "900": {
                            "value": "{Text.White}",
                            "type": "color",
                            "description": "Contrast ratio: 13.20"
                        },
                        "050": {
                            "value": "{Text.Dark}",
                            "type": "color",
                            "description": "Contrast ratio: 16.12"
                        },
                        "Half": {
                            "value": "{Text.Dark}",
                            "type": "color",
                            "description": "Contrast ratio: "
                        },
                        "Quarter": {
                            "value": "{Text.Dark}",
                            "type": "color",
                            "description": "Contrast ratio: "
                        }
                    }
                },
                "Transparent": {
                    "value": "#00000000",
                    "type": "color"
                },
                "Image-Overlay": {
                    "value": "rgba(0,0,0,.25)",
                    "type": "color"
                }
            }
        } else {
            return {
                "White": {
                    "Color": {
                        "value": "rgba(255,255,255,0.6)",
                        "type": "color"
                    },
                    "Color-Half": {
                        "value": "{Core-Colors.White.Color}",
                        "type": "color",
                        "$extensions": {
                            "studio.tokens": {
                                "modify": {
                                    "type": "alpha",
                                    "value": ".5",
                                    "space": "lch"
                                }
                            }
                        }
                    },
                    "Color-Quarter": {
                        "value": "{Core-Colors.White.Color}",
                        "type": "color",
                        "$extensions": {
                            "studio.tokens": {
                                "modify": {
                                    "type": "alpha",
                                    "value": ".25",
                                    "space": "lch"
                                }
                            }
                        }
                    },
                    "On-Color": {
                        "value": "{Text.Dark}",
                        "type": "color"
                    }
                },
                "Black": {
                    "Color": {
                        "value": "#121212",
                        "type": "color"
                    },
                    "Color-Half": {
                        "value": "{Core-Colors.Black.Color}80",
                        "type": "color"
                    },
                    "Color-Quarter": {
                        "value": "{Core-Colors.Black.Color}40",
                        "type": "color"
                    },
                    "On-Color": {
                        "value": "{Text.White}",
                        "type": "color"
                    }
                },
                "Near-Black": {
                    "Color": {
                        "value": "rgb(24,24,24)",
                        "type": "color"
                    }
                },
                "Gray": {
                    "Color": {
                        "100": {
                            "value": "#C8C8C8",
                            "type": "color"
                        },
                        "200": {
                            "value": "#B1B1B1",
                            "type": "color"
                        },
                        "300": {
                            "value": "#9B9B9B",
                            "type": "color"
                        },
                        "400": {
                            "value": "#858585",
                            "type": "color"
                        },
                        "500": {
                            "value": "#6A6A6A",
                            "type": "color"
                        },
                        "600": {
                            "value": "#505050",
                            "type": "color"
                        },
                        "700": {
                            "value": "#383838",
                            "type": "color"
                        },
                        "800": {
                            "value": "#212121",
                            "type": "color"
                        },
                        "900": {
                            "value": "#181818",
                            "type": "color"
                        },
                        "050": {
                            "value": "#DFDFDF",
                            "type": "color"
                        }
                    },
                    "On-Color": {
                        "100": {
                            "value": "{Text.Dark}",
                            "type": "color",
                            "description": "Contrast ratio: 13.24"
                        },
                        "200": {
                            "value": "{Text.Dark}",
                            "type": "color",
                            "description": "Contrast ratio: 10.59"
                        },
                        "300": {
                            "value": "{Text.Dark}",
                            "type": "color",
                            "description": "Contrast ratio: 8.39"
                        },
                        "400": {
                            "value": "{Text.Dark}",
                            "type": "color",
                            "description": "Contrast ratio: 6.44"
                        },
                        "500": {
                            "value": "{Text.Dark}",
                            "type": "color",
                            "description": "Contrast ratio: 4.88"
                        },
                        "600": {
                            "value": "{Text.White}",
                            "type": "color",
                            "description": "Contrast ratio: 4.74"
                        },
                        "700": {
                            "value": "{Text.White}",
                            "type": "color",
                            "description": "Contrast ratio: 6.58"
                        },
                        "800": {
                            "value": "{Text.White}",
                            "type": "color",
                            "description": "Contrast ratio: 9.44"
                        },
                        "900": {
                            "value": "{Text.White}",
                            "type": "color",
                            "description": "Contrast ratio: 13.20"
                        },
                        "050": {
                            "value": "{Text.Dark}",
                            "type": "color",
                            "description": "Contrast ratio: 16.12"
                        },
                        "Half": {
                            "value": "{Text.Dark}",
                            "type": "color",
                            "description": "Contrast ratio: "
                        },
                        "Quarter": {
                            "value": "{Text.Dark}",
                            "type": "color",
                            "description": "Contrast ratio: "
                        }
                    }
                },
                "Transparent": {
                    "value": "#00000000",
                    "type": "color"
                },
                "Image-Overlay": {
                    "value": "rgba(0,0,0,.25)",
                    "type": "color"
                }
            }
        }
    }

    private getText(): any {
        return {
            "Dark": {
                "value": "#121212",
                "type": "color"
            },
            "White": {
                "value": "{Core-Colors.White.Color}",
                "type": "color"
            }
        };
    }

    private getHotlinkUnderline(lm: boolean): any {
        const vars = this.atoms.hotlinks.getHotlinkVariables2(lm);
        if (!vars) return undefined;
        return {
            "On-Colored": this.getHotlinkUnderlineSection(vars.onTertiary),
            "On-White": this.getHotlinkUnderlineSection(vars.onWhite),
            "On-Black": this.getHotlinkUnderlineSection(vars.onBlack),
            "Default": this.getHotlinkUnderlineSection(vars.default),
        }
    }

    private getHotlinkUnderlineSection(vars: HotlinkModeVariables): any {
        return {
            "Default": {
                "type": "other",
                "value": vars.unvisited.decoration,
            },
            "Hover": {
                "type": "other",
                "value": vars.unvisited.hoverDecoration,
            }
        }
    }

    private getColorName(): any {
        const colors = this.atoms.colorPalette.getColors();
        const rtn: any = {};
        for (let i = 0; i < colors.length; i++) {
            rtn[`Color-${i+1}`] = {
                "type": "text",
                "value": colors[i].name,
            }
        }
        return rtn;
    }

    private getShowColors(): any {
        const rtn: any = {
            "Secondary": {
                "value": "true",
                "type": "boolean"
            },
            "Tertiary": {
                "value": "true",
                "type": "boolean"
            },
        };
        const colors = this.atoms.colorPalette.getColors();
        for (let i = 0; i < Math.max(colors.length,12); i++) {
            rtn[`Color-${i+1}`] = {
                "type": "boolean",
                "value": i < colors.length ? "true" : "false",
            }
        }
        return rtn;
    }

    private getAccessibilityColorSets(): any {
        return {
            "Primary-Background": {
                "Hotlink-Color": {
                    "ColoredHotlinks": {
                        "value": "true",
                        "type": "boolean"
                    },
                    "BlackHotlinks": {
                        "value": "false",
                        "type": "boolean"
                    },
                    "WhiteHotlinks": {
                        "value": "false",
                        "type": "boolean"
                    }
                },
                "Button-Color": {
                    "ColoredButtons": {
                        "value": "true",
                        "type": "boolean"
                    },
                    "BlackButtons": {
                        "value": "false",
                        "type": "boolean"
                    },
                    "WhiteButtons": {
                        "value": "false",
                        "type": "boolean"
                    }
                },
                "Icon-Color": {
                    "ColoredIcons": {
                        "value": "true",
                        "type": "boolean"
                    },
                    "BlackIcons": {
                        "value": "false",
                        "type": "boolean"
                    },
                    "WhiteIcons": {
                        "value": "false",
                        "type": "boolean"
                    }
                }
            },
            "Black-Background": {
                "Hotlink-Color": {
                    "ColoredHotlinks": {
                        "value": "true",
                        "type": "boolean"
                    },
                    "BlackHotlinks": {
                        "value": "false",
                        "type": "boolean"
                    },
                    "WhiteHotlinks": {
                        "value": "false",
                        "type": "boolean"
                    }
                },
                "Button-Color": {
                    "ColoredButtons": {
                        "value": "true",
                        "type": "boolean"
                    },
                    "BlackButtons": {
                        "value": "false",
                        "type": "boolean"
                    },
                    "WhiteButtons": {
                        "value": "false",
                        "type": "boolean"
                    }
                },
                "Icon-Color": {
                    "ColoredIcons": {
                        "value": "true",
                        "type": "boolean"
                    },
                    "BlackIcons": {
                        "value": "false",
                        "type": "boolean"
                    },
                    "WhiteIcons": {
                        "value": "false",
                        "type": "boolean"
                    }
                }
            },
            "White-Background": {
                "Hotlink-Color": {
                    "ColoredHotlinks": {
                        "value": "true",
                        "type": "boolean"
                    },
                    "BlackHotlinks": {
                        "value": "false",
                        "type": "boolean"
                    },
                    "WhiteHotlinks": {
                        "value": "false",
                        "type": "boolean"
                    }
                },
                "Button-Color": {
                    "ColoredButtons": {
                        "value": "true",
                        "type": "boolean"
                    },
                    "BlackButtons": {
                        "value": "false",
                        "type": "boolean"
                    },
                    "WhiteButtons": {
                        "value": "false",
                        "type": "boolean"
                    }
                },
                "Icon-Color": {
                    "ColoredIcons": {
                        "value": "true",
                        "type": "boolean"
                    },
                    "BlackIcons": {
                        "value": "false",
                        "type": "boolean"
                    },
                    "WhiteIcons": {
                        "value": "false",
                        "type": "boolean"
                    }
                }
            },
            "Colored-Background": {
                "Hotlink-Color": {
                    "ColoredHotlinks": {
                        "value": "false",
                        "type": "boolean"
                    },
                    "BlackHotlinks": {
                        "value": "false",
                        "type": "boolean"
                    },
                    "WhiteHotlinks": {
                        "value": "true",
                        "type": "boolean"
                    }
                },
                "Button-Color": {
                    "ColoredButtons": {
                        "value": "false",
                        "type": "boolean"
                    },
                    "BlackButtons": {
                        "value": "false",
                        "type": "boolean"
                    },
                    "WhiteButtons": {
                        "value": "true",
                        "type": "boolean"
                    }
                },
                "Icon-Color": {
                    "ColoredIcons": {
                        "value": "false",
                        "type": "boolean"
                    },
                    "BlackIcons": {
                        "value": "false",
                        "type": "boolean"
                    },
                    "WhiteIcons": {
                        "value": "true",
                        "type": "boolean"
                    }
                }
            }
        }
    }

}