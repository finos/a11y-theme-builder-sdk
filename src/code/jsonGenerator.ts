/*
 * Copyright (c) 2023 Discover Financial Services
 * Licensed under MIT License. See License.txt in the project root for license information
 */
import { Atoms, Shade, Color, ColorTheme, GradientColors, StateSetting, BevelSettingsProps } from "../atoms/index";
import { Molecules } from "../molecules/index";
import { Organisms } from "../organisms/index";
import { PropertyColorShade, PropertyElevationSelectable, PropertyBevelSelectable, PropertyShadowSelectable} from "../common/index";
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

    public getJSON(lm: boolean): any {
        log.debug("getJSON enter");
        const theme = this.atoms.colorThemes.getDefaultTheme();
        if (!theme) {
            log.debug("getJSON exit (no default theme)");
            return undefined;
        }
        const json: any = {};
        if (!lm) json["Core-Colors"] = this.getCoreColors();
        if (!lm) json["Image-Overlay"] = this.getImageOverlay();
        json["All-Colors"] = this.getAllColors(lm);
        json["Theme-Colors"] = this.getThemeColors(theme, lm);
        json["Theme"] = this.getTheme(theme, lm);
        json["Solid-Backgrounds"] = this.getSolidBackgrounds(theme, lm);
        json["Gradient-Backgrounds"] = this.getGradientBackgrounds(theme, lm);
        json["Input-Backgrounds"] = this.getInputBackgrounds(lm);
        json["Buttons"] = this.getButtons(theme, lm);
        json["Icons"] = this.getIcons(theme, lm);
        json["States"] = this.getStates(lm);
        json["Surface"] = this.getSurface(theme, lm);
        if (!lm) json["Elevations"] = this.getElevations(lm);
        json["Hotlinks"] = this.getHotlinks(theme, lm);
        json["Chips"] = this.getChips(theme, lm);
        if (!lm) json["Text"] = this.getText();
        json["Text-Decoration"] = this.getTextDecoration(theme, lm);
        if (lm) json["Borders"] = this.getBorders(lm);
        if (lm) json["fontFamilies"] = this.getFontFamilies();
        if (lm) json["baseFont"] = this.getBaseFont();
        if (lm) json["fontWeights"] = this.getFontWeights();
        if (lm) json["Typography-Info"] = this.getTypographyInfo();
        if (lm) json["Sizing"] = this.getSizing();
        if (lm) json["Spacing"] = this.getSpacing();
        if (lm) json["Radius"] = this.getRadius();
        if (lm) json["Border"] = this.getBorder();
        if (lm) json["Shadows"] = this.getShadows();
        if (lm) json["Elevation-Info"] = this.getElevationInfo();
        if (lm) json["Base-Info"] = this.getBaseInfo();
        if (lm) json["Bevel-Info"] = this.getBevelInfo();
        if (lm) json["Inverse-Bevel-Info"] = this.getInverseBevelInfo();
        if (!lm) json["Alert"] = this.getAlert();
        log.debug(`getJSON exit - ${JSON.stringify(json,null,4)}`);
        return json;
    }

    private getAllColors(lm: boolean): any {
        const rtn: any = {};
        this.atoms.colorPalette.getColors().forEach( color => {
            const colorObj: any = {};
            const onColorObj: any = {};
            rtn[this.getColorId(color)] = { "Color": colorObj, "On-Color": onColorObj };
            const shades = lm ? color.light.shades : color.dark.shades;
            shades.forEach( shade => {
                const id = this.getShadeId(shade);
                colorObj[id] = this.getColor(shade.getRGB());
                onColorObj[id] = this.getColor(shade.getOnShade2(lm).getRGBA());
            });
        });
        return rtn;
    }

    private getThemeColors(theme: ColorTheme, lm: boolean): any {
        const self = this;
        const fcn = function(prop: PropertyColorShade, lm: boolean) {
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
        const fcn = function(prop: PropertyColorShade, lm: boolean, name: string): any {
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
            onPrimary = '{Theme-Colors.Primary.On-Color.Half}';
            onSecondary = '{Theme-Colors.Primary.On-Color.Quarter}';
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
            }  else if (iconOnTertiary.equals(Shade.BLACK)) {
                tertiaryIcon = '{Icons.Dark.Color}';
            } else {
                tertiaryIcon = '{Icons.White.Color}';
            }
            const hotlinkOnTertiary = hotlinkVars.onTertiary.unvisited.shade;
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
        const getShadeName = function(prop: PropertyColorShade, lm: boolean): string | undefined {
            const shade = prop.getValue();
            if (shade) {
                return self.getShadeName(shade, lm, theme);
            }
        };
        const fcn2 = function(lm: boolean, fromName?: string, toName?: string): any {
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
        const fcn = function(gc: GradientColors, lm: boolean): any {
            return fcn2(lm, getShadeName(gc.from, lm), getShadeName(gc.to, lm));
        };
        const gradient3FromName = lm ? "{Core-Colors.White.Color}": "{Core-Colors.Gray.Color.900}";
        const gradient3ToName = lm ? "{Core-Colors.Gray.Color.200}": "{Core-Colors.Gray.Color.900}";
        return {
            "Gradient-1": fcn(theme.gradient1, lm),
            "Gradient-2": fcn(theme.gradient2, lm),
            "Gradient-3": fcn2(lm, gradient3FromName, gradient3ToName),
        };
    }

    private getFontFamilies(): any {
        const primary = this.atoms.fontsSettings.primaryFont.getValue();
        const secondary = this.atoms.fontsSettings.secondaryFont.getValue();
        const fcn = function(value?: string) { return { type: "fontFamilies", value: value || "" }};
        return {
            primary: fcn(primary),
            secondary: fcn(secondary),
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
        const fcn = function(size: number) { return {type, value: `{Sizing.Size-1} * ${size}`}; };
        return {
            "Size-1": {type, value: `${sizing}px`},
            "min-target": {type: "sizing", value: `${minTarget}px`},
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
        const fcn = function(size: number) { return {type, value: `{Spacing.spacing-1} * ${size}`}; };
        return {
            "Spacing-1": {type, value: `${spacing}px`},
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
        const fcn = function(size: number) { return {type, value: `{Radius.Border-Radius-1} * ${size}`}; };
        return {
            "Border-Radius-1": {type, value: `${radius}px`},
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
        const buttonBorder = this.molecules.standardButtons.minWidth.getValue() || 0;
        const largeAvatarBorder = this.molecules.avatars.extraLargeBorder.getValue() || 0;
        const smallAvatarBorder = this.molecules.avatars.mediumBorder.getValue() || 0;
        const imageBorder = this.molecules.images.generalImageBorderRadius.getValue() || 0;
        const cardBorder = this.molecules.standardCards.minWidth.getValue() || 0;
        const fcn = function(size: number) { return {type, value: `{Border.border-1} * ${size}`}; };
        return {
            "border-1": {type, value: `${border}px`},
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
        const fcn = function(ss: StateSetting, lm: boolean) {
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
            rtn[`Elevation-${i+1}`] = this.getShadeColor(shades[i], lm);
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
            "Color": this.getColor("{Core-Colors."+color+".Color-Half}"),
            "Colorhalf": this.getColor("{Core-Colors."+color+".Color-Quarter}"),
            "On-Color": this.getColor("{Core-Colors."+color+".On-Color}"),
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
            colorDropshadow = bg && bg.lighter ?  "{Theme-Colors.Primary.Color.100}" : "{Core-Colors.Black.Color}80";
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
            surface =  '{Core-Colors.White.Color}';
            onSurface = '{Core-Colors.White.On-Color}';
        } else {
            throw new Error(`Invalid title: ${title}`);
        }
        log.debug(`getSurface exit - surface=${surface}, onSurface=${onSurface}`);
        return this.getColorPair(surface, onSurface);
    }

    private getShadows(): any {
        const buttonElevation = this.molecules.standardButtons.buttonElevation;
        const buttonBevel = this.molecules.standardButtons.buttonBevel;
        const chipElevation = this.molecules.chips.elevation;
        const avatarElevation = this.molecules.avatars.elevation;
        const cardElevation = this.molecules.standardCards.elevation;
        const cardBevel = this.molecules.standardCards.bevel;
        const imageElevation = this.molecules.images.imageElevation;
        const sliderHandleElevation = this.molecules.sliders.handleElevation;
        const sliderBarShadow = this.molecules.sliders.barInsetShadow;
        const modalElevation = this.molecules.modal.elevation;
        const toastElevation = this.molecules.toasts.elevation;
        const dropDownElevation = this.molecules.dropdowns.menuElevation;
        const fcn = function(elevationIdx: number, bevelIdx?: number): any {
            let value: string = "{Elevation-Shadows.elevation-" + elevationIdx + "}";
            if (bevelIdx !== undefined) {
                if (bevelIdx >= 0) value = value + ",{Bevels.bevel-" + bevelIdx + "}";
                else value = value + ",{Inverse-Bevels.bevel-" + -bevelIdx + "}";
            }
            return { type: "boxShadow", value  };
        };
        const fcn1 = function(elevation: PropertyElevationSelectable, bevel?: PropertyBevelSelectable): any {
            if (bevel) return fcn(elevation.toIndex(), bevel.toIndex());
            return fcn(elevation.toIndex());
        };
        const fcn2 = function(shadow: PropertyShadowSelectable): any {
            const idx = shadow.toIndex();
            const value = idx >= 0 ? "{Bevels.bevel-" + idx + "}": "{Inverse-Bevels.inbevel-" + -idx + "}";
            return { type: "boxShadow", value  };
        };
        return {
            "Button-Shadow": fcn1(buttonElevation, buttonBevel),
            "Chip-Shadow": fcn1(chipElevation),
            "Avatar-Shadow": fcn1(avatarElevation),
            "Card-Shadow": fcn1(cardElevation, cardBevel),
            "Image-Shadow": fcn1(imageElevation),
            "SliderHandle-Shadow": fcn1(sliderHandleElevation),
            "SliderBar-Shadow": fcn2(sliderBarShadow),
            "Modal-Shadow": fcn1(modalElevation),
            "Tooltip-Shadow": fcn(0,0),
            "Toast-Shadow": fcn(toastElevation.toIndex(),0),
            "Dropdown-Shadow": fcn1(dropDownElevation),
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
        const baseBlurVal = es.baseBlurRadius.getValue();
        if (baseBlurVal) baseBlur = `${baseBlurVal}px`;
        const baseSpreadVal = es.baseSpreadRadius.getValue();
        if (baseSpreadVal) baseSpread = `${baseSpreadVal}px`;
        const baseOpacityVal = es.baseColorOpacity.getValue();
        if (baseOpacityVal) baseOpacity = `${baseOpacityVal / 100}`;
        return {
            "Change": this.getOther(change),
            "Horizontal": this.getOther(horizontal),
            "Vertical": this.getOther(vertical),
            "Spread": this.getOther(spread),
            "Blur": this.getOther(blur),
            "Opacity": this.getOther(opacity),
            "RGB": this.getOther(rgb),
            "BaseBlur": this.getOther(baseBlur),
            "BaseSpread": this.getOther(baseSpread),
            "BaseOpacity": this.getOther(baseOpacity),
        };
    }

    private getBaseInfo(): any {
        let change, spread, blur, opacity: any;
        const es = this.atoms.elevationSettings;
        const changeVal = es.percentageChange.getValue();
        if (changeVal) change = `${changeVal / 100}`;
        const spreadVal = es.spreadRadius.getValue();
        if (spreadVal) spread = `${spreadVal}px`;
        const blurVal = es.blurRadius.getValue();
        if (blurVal) blur = `${blurVal}px`;
        const opacityVal = es.colorOpacity.getValue();
        if (opacityVal) opacity = `${opacityVal / 100}`;
        return {
            "Change": this.getOther(change),
            "Spread": this.getOther(spread),
            "Blur": this.getOther(blur),
            "Opacity": this.getOther(opacity),
        };
    }

    private getBevelInfo(): any {
        return this.getBevelInfo2(this.atoms.bevelSettings.standard);
    }

    private getInverseBevelInfo(): any {
        return this.getBevelInfo2(this.atoms.bevelSettings.inverse);
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

    private getInputBackgrounds(lm: boolean): any {
        const vars = this.atoms.inputBackground.getVariables();
        if (!vars) return {};
        const inputDefault = lm ? vars.inputDefault : vars.dmInputDefault;
        return {
            Default: this.getColor(inputDefault.getRGBA()),
        }; 
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
        const color: any = {type: "color"};
        if (value) color.value = value;
        return color;
    }

    private getOther(value?: string): any {
        const other: any = {type: "other"};
        if (value) other.value = value;
        return other;
    }

    private getColorIdForShade(shade: Shade): string {
        return this.getColorId(shade.getMode().color as Color);
    }

    private getColorId(color: Color): string {
        return `Color-${color.index+1}`;
    }

    private getShadeId(shade: Shade): string {
        if (shade.id === "0") return "050";
        return shade.id;
    }

    private getCoreColors(): any {
        return {
              "White": {
                "Color": {
                  "value": "rgba(255,255,255,0.6)",
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
                    "value": "#070707",
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
              }
            };
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

    private getImageOverlay(): any {
        return {
              "value": "rgba(0,0,0,.25)",
              "type": "color"
        };
    }

    private getAlert(): any {
        return {
            "Button": {
              "value": {
                "fill": "{Core-Colors.White.Color}",
                "horizontalPadding": "{Spacing.spacing-2}"
              },
              "type": "composition"
            },
            "On-Button": {
              "value": {
                "fill": "{Core-Colors.Black.Color}",
                "typography": "{Small-Text.CTA-Small}"
              },
              "type": "composition"
            }
        };
    }

}