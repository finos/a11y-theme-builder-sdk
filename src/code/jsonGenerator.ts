import { Atoms, Shade, ColorTheme, GradientColors, StateSetting, BevelSettingsProps } from "../atoms/index";
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
        json["Theme-Colors"] = this.getThemeColors(theme, lm);
        json["Theme"] = this.getTheme(theme, lm);
        json["Solid-Backgrounds"] = this.getSolidBackgrounds(theme, lm);
        json["Gradient-Backgrounds"] = this.getGradientBackgrounds(theme, lm);
        json["Input-Backgrounds"] = this.getInputBackgrounds(lm);
        json["Buttons"] = this.getButtons(theme, lm);
        json["Icons"] = this.getIcons(theme, lm);
        json["Surface"] = this.getSurface(theme, lm);
        json["Borders"] = this.getBorders(lm);
        json["States"] = this.getStates(lm);
        json["Elevations"] = this.getElevations(lm);
        json["Hotlinks"] = this.getHotlinks(theme, lm);
        json["Chips"] = this.getChips(theme, lm);
        json["Text-Decoration"] = this.getTextDecoration(theme, lm);
        if (lm) {
            json["fontFamilies"] = this.getFontFamilies();
            json["baseFont"] = this.getBaseFont();
            json["fontWeights"] = this.getFontWeights();
            json["Typography-Info"] = this.getTypographyInfo();
            json["Sizing"] = this.getSizing();
            json["Spacing"] = this.getSpacing();
            json["Radius"] = this.getRadius();
            json["Border"] = this.getBorder();
            json["Shadows"] = this.getShadows();
            json["Elevation-Info"] = this.getElevationInfo();
            json["Base-Info"] = this.getBaseInfo();
            json["Bevel-Info"] = this.getBevelInfo();
            json["Inverse-Bevel-Info"] = this.getInverseBevelInfo();
        }
        log.debug(`getJSON exit - ${JSON.stringify(json,null,4)}`);
        return json;
    }

    private getThemeColors(theme: ColorTheme, lm: boolean): any {
        const self = this;
        const fcn = function(prop: PropertyColorShade, lm: boolean) {
            let shade = prop.getValue();
            if (!shade) return;
            if (!lm) shade = shade.getDarkModeShade();
            // Set theme colors
            if (!shade.hasMode()) return;
            const color: any = {};
            const onColor: any = {};
            shade.getMode().shades.forEach(shade => {
                const id = self.getShadeId(shade);
                color[id] = { value: shade.getRGB(), type: "color" };
                onColor[id] = { value: shade.getOnShade().getRGB(), type: "color" };
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
            if (!lm) shade = shade.getDarkModeShade();
            const onShade = shade.getOnShade();
            // Set theme
            return {
                "Color": {
                    value: `{Theme-Colors.${name}.Color.${self.getShadeId(shade)}}`,
                    type: "color",
                },
                "On-Color": {
                    value: `{Theme-Colors.${name}.On-Color.${self.getShadeId(onShade)}}`,
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
            tertiaryShade = tertiaryShade.getDarkModeShade();
            buttonShade = buttonShade.getDarkModeShade();
            iconShade = iconShade.getDarkModeShade();
        }
        const buttonVars = theme.getButtonShadeGroups(buttonShade);
        const buttonSG = lm ? buttonVars.lm : buttonVars.dm;
        const hotlinkVars = this.atoms.hotlinks.findHotlinkVariables();
        const hotlinkShade = lm? hotlinkVars.lm.unvisited.shade : hotlinkVars.dm.unvisited.shade;
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
        return { Primary, Secondary, Tertiary, Black, White };
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

    private getGradientBackgrounds(theme: ColorTheme, lm: boolean): any {
        const self = this;
        const fcn2 = function(lm: boolean, from?: Shade, to?: Shade): any {
            let color, onColor, button, onButton, icon, hotlink: string | undefined;
            if (from && to) {
                const fromName = self.getShadeName(from, theme);
                const toName = self.getShadeName(to, theme);
                color = `linear-gradient(90deg, ${fromName} 0%, ${toName} 100%)`;
                onColor = self.getShadeName(from, theme, true);
            }
            button = self.getPropShadeName(theme.button, theme);
            onButton = self.getPropShadeName(theme.button, theme, true);
            icon = self.getPropShadeName(theme.icon, theme);
            const hlVars = self.atoms.hotlinks.getHotlinkVariables();
            if (hlVars) {
                const shades = lm ? hlVars.lm : hlVars.dm;
                hotlink = self.getShadeName(shades.unvisited.shade, theme);
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
            return fcn2(lm, gc.from.getValue(), gc.to.getValue());
        };
        return {
            "Gradient-1": fcn(theme.gradient1, lm),
            "Gradient-2": fcn(theme.gradient2, lm),
            "Gradient-3": fcn2(lm, Shade.GRAY, Shade.NEAR_BLACK),
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
        const modalPadding = this.molecules.modal.borderRadius.getValue() || 0;  // TODO: modalPadding from modal.borderRadius?
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
            "TableBody-Padding": fcn(1), // TODO: static?
            "PrimaryNav-Padding": fcn(primaryNavPadding),
            "SecondaryNav-Padding": fcn(secondaryNavPadding),
            "Toast-Padding": fcn(1), // TODO: static?
            "Tooltip-Padding": fcn(1), // TODO: static?
            "Modal-Padding": fcn(modalPadding),
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
        const defaultColor = lm ? "" : ""; // TODO: what is borderDefault && dmborderDefault
        const bottomLine = `linear-gradient(0deg, ${defaultColor}, 1px, #00000000 1px)`;
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
            const rtn = self.getColorPair(shade.getRGB(), shade.getOnShade().getRGB());
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
        if (lm) {
            for (let i = 1; i < 10; i++) {
                rtn[`Elevation-${i}`] = this.getColor("{Core-Colors.White.Color");
            }
        } else {
            const shades = Shade.WHITE.getElevationShades();
            for (let i = 0; i < shades.length; i++) {
                rtn[`Elevation-${i+1}`] = this.getShadeColor(shades[i]);
            }
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
            const fromName = this.getShadeName(from, theme);
            const toName = this.getShadeName(to, theme);
            textGradient = `linear-gradient(90deg, ${fromName} 0%, ${toName} 100%)`;
        }
        // Get color dropshadow
        const bg = lm ? theme.lightModeBackground : theme.darkModeBackground;
        const bgVal = bg.getValue();
        if (bgVal) {

        }
        if (lm) {
            const bg = theme.lightModeBackground.getValue();
            colorDropshadow = bg && bg.lighter ?  "{Theme-Colors.Primary.Color.100}" : "{Core-Colors.Black.Color}80";
        } else {
            const bg = theme.darkModeBackground.getValue();
            colorDropshadow = bg && bg.lighter ?  "{Theme-Colors.Primary.Color.900}" : "{Core-Colors.Black.Color}";
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
        const vars = this.atoms.hotlinks.getHotlinkVariables();
        if (!vars) {
            log.debug(`getHotlinks exit (no variables)`);
            return;
        }
        const mvars = lm ? vars.lm : vars.dm;
        const shade = mvars.unvisited.shade;
        const rtn = {
            Colored: {
                Link: this.getShadeColor(shade, theme),
                Visited: this.getColor("{Hotlinks.Colored.Link}B3"),
                Active: this.getColor("{Hotlinks.Colored.Link"),
            },
        };
        log.debug(`getHotlinks exit`);
        return rtn;
    }

    private getSurface(theme: ColorTheme, lm: boolean): any {
        log.debug(`getSurface entry - lm=${lm}`);
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
            surface =  '{Core-Colors.Near-Black.Color}';
            onSurface = '{Text.White}';
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
        const fcn = function(elevation: PropertyElevationSelectable, bevel?: PropertyBevelSelectable): any {
            let value: string = "{Elevation-Shadows.elevation-" + elevation.toIndex() + "}";
            if (bevel) {
                const idx = bevel.toIndex();
                if (idx >= 0) value = value + ",{Bevels.bevel-" + idx + "}";
                else value = value + ",{Inverse-Bevels.bevel-" + -idx + "}";
            }
            return { type: "boxShadow", value  };
        };
        const fcn2 = function(shadow: PropertyShadowSelectable): any {
            const idx = shadow.toIndex();
            const value = idx >= 0 ? "{Bevels.bevel-" + idx + "}": "{Inverse-Bevels.inbevel-" + -idx + "}";
            return { type: "boxShadow", value  };
        };
        return {
            "Button-Shadow": fcn(buttonElevation, buttonBevel),
            "Chip-Shadow": fcn(chipElevation),
            "Avatar-Shadow": fcn(avatarElevation),
            "Card-Shadow": fcn(cardElevation, cardBevel),
            "Image-Shadow": fcn(imageElevation),
            "SliderHandle-Shadow": fcn(sliderHandleElevation),
            "SliderBar-Shadow": fcn2(sliderBarShadow),
            "Modal-Shadow": fcn(modalElevation),
            // TODO: where from?  "Tooltip-Shadow": fcn(),
            "Toast-Shadow": fcn(toastElevation), // TODO: Where does toastBevel come from?
            "Dropdown-Shadow": fcn(dropDownElevation),
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
        const button = theme.button.getValue();
        if (!button) {
            log.debug("getButtons exit (no button)");
            return;
        }
        return {
            Colored: {
                "Color": this.getShadeColor(button, theme),
                "On-Color": this.getShadeColor(button, theme, true),
                "Color-Half": this.getColor("{Buttons.Colored.Color}80"),
            },
        };
    }

    private getIcons(theme: ColorTheme, lm: boolean): any {
        const icon = theme.icon.getValue();
        if (!icon) {
            log.debug("getIcons exit (no icon)");
            return;
        }
        return { Colored: { "Color": this.getShadeColor(icon, theme) } };
    }

    private getInputBackgrounds(lm: boolean): any {
        const vars = this.atoms.inputBackground.getVariables();
        if (!vars) return {};
        const inputDefault = lm ? vars.inputDefault : vars.dmInputDefault;
        const inputDisabled = lm ? vars.inputDisabled : vars.dmInputDisabled;
        return {
            Default: this.getColor(inputDefault.getRGBA()),
            Disabled: this.getColor(inputDisabled.getRGBA()),
        }; 
    }

    private getShadeColor(shade: Shade, theme?: ColorTheme, onShade?: boolean): string {
        return this.getColor(this.getShadeName(shade, theme, onShade));
    }

    private getPropShadeName(prop: PropertyColorShade, theme?: ColorTheme, onShade?: boolean): string | undefined {
        const shade = prop.getValue();
        if (shade) return this.getShadeName(shade, theme, onShade);
    }

    private getShadeName(shade: Shade, theme?: ColorTheme, onShade?: boolean): string | undefined {
        const coreShadeName = shade.coreShadeName;
        if (coreShadeName) {
            return "{Core-Colors." + coreShadeName + ".Color}";
        }
        if (theme) {
            const ref = this.getShadeRef(shade, theme);
            if (ref && shade.index != undefined) {
                return "{Theme-Colors." + ref + (onShade ? ".On-Color." : ".Color.") + this.getShadeId(shade) + "}";
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

    private getOther(value?: string): any {
        const other: any = {type: "other"};
        if (value) other.value = value;
        return other;
    }

}