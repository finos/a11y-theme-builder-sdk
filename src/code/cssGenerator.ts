/*
 * Copyright (c) 2023 Discover Financial Services
 * Licensed under Apache-2.0 License. See License.txt in the project root for license information
 */
import { Atoms, Shade, ColorTheme, ShadeGroup, ModeShadeGroups, BevelSettingsProps, HotlinkModeVariables, OnHotlink, TypographyStyling } from "../atoms/index";
import { Molecules, Dropdowns } from "../molecules/index";
import { Organisms, Hero } from "../organisms/index";
import { PropertyColorShade, PropertyPercentage, PropertyGroupListener, PropertyShadowSelectable, PropertyColorPair, Property, ListenerSubscription, ColorPair } from "../common/index";
import { IDesignSystem, EventValueChange, VarListener, IVarGroup, IColor, EventType } from "../interfaces";
import { Color } from "../atoms/colorPalette";

import { Logger } from "../util/logger";

const log = new Logger("css");

/**
 * 
 * The CSS code generator.
 * @category Generators
 */
export class CSSGenerator {

    public readonly ds: IDesignSystem;
    public readonly atoms: Atoms;
    public readonly molecules: Molecules;
    public readonly organisms: Organisms;
    private readonly cssVars: { [key: string]: string } = {};
    private readonly cssVarListeners: { [key: string]: VarListener } = {};
    private readonly varGroups: { [key: string]: CSSVarGroup } = {};
    private readonly cssColors: { [name: string]: CSSColor } = {};
    private defaultTheme?: CSSTheme;

    constructor(ds: IDesignSystem) {
        this.ds = ds;
        this.atoms = ds.atoms as Atoms;
        this.molecules = ds.molecules as Molecules;
        this.organisms = ds.organisms as Organisms;
        this.generate();
    }

    public generate() {

        // Set all static CSS variables
        this.setStaticVars();

        // Set all atom CSS variables
        this.setAtomVars();

        // Set all molecule CSS variables
        this.setMoleculeVars();

        // Set all organism CSS variables
        this.setOrganismVars();

    }

    public getDyslexiaAsObject(): Object {
        return {
            "min-target": "44px",
            "primaryFont": "OpenDyslexic", // TODO: get correct font
            "secondaryFont": "OpenDyslexic", // TODO: get correct font
            "standard-LineHeight": "180%",
            "sm-LineHeight": "150%",
        };
    }

    public getMotionSensitivityAsObject(): Object {
        return {
            "animation-speed": "0s",
            "animation-focus-distance": "0px",
        };
    }

    public getDyslexiaAsString(): string {
        const str = this.convertObjectToString(this.getDyslexiaAsObject());
        log.debug(`Dylexia: ${str}`);
        return str;
    }

    public getMotionSensitivityAsString(): string {
        const str = this.convertObjectToString(this.getMotionSensitivityAsObject());
        log.debug(`Motion sensitivity: ${str}`);
        return str;
    }

    private convertObjectToString(obj: any): string {
        const r = [":root {"];
        Object.keys(obj).forEach(name => {
            r.push(`  --${name}: ${obj[name]};`)
        })
        r.push("}")
        return r.join("\n");
    }

    public getVars(): { [name: string]: string } {
        return this.cssVars;
    }

    public getVarGroupKeys(): string[] {
        return Object.keys(this.varGroups);
    }

    private setStaticVars() {
        const vk = new CSSVariableKind("static", "", [], this);
        vk.setVars({
            "zoom": "1",
            "meshSVGfill": "rgb(0,102,239)",
            "transparent": "rgba(0,0,0,0)",
            "white": "#ffffff",
            "white-half": "rgba(255, 255, 255, 0.5)",
            "on-white": "var(--black)",
            "black": "#121212",
            "black-half": "rgba(0,0,0, 0.5)",
            "nearblack": "#181818",
            "on-nearblack": "#ffffff",
            "dm-white": "rgba(255, 255, 255, 0.6)",
            "dm-white-bg": "var(--dm-midnight-600)",
            "dm-on-white": "#121212",
            "dm-on-white-bg": "var(--dm-on-midnight-600)",
            "on-black": "#ffffff",
            "dm-on-black": "rgba(255, 255, 255, 0.6)",
            "dm-nearblack": "rgba(255, 255, 255, 0.6)",
            "dm-on-nearblack": "rgba(255, 255, 255, 0.6)",
            "textLight": "var(--white)",
            "textDark": "var(--black)",
            "dm-textLight": "var(--dm-white)",
            "dm-textDark": "var(--black)",
            "gray-0": "#fafafa",
            "gray-100": "#e4e4e4",
            "gray-200": "#cdcdcd",
            "gray-300": "#b7b7b7",
            "gray-400": "#a0a0a0",
            "gray-500": "#8a8a8a",
            "gray-600": "#737373",
            "gray-700": "#5d5d5d",
            "gray-800": "#464646",
            "gray-900": "#303030",
            "on-gradient-1": "var(--on-gradient1-a)",
            "on-gradient-2": "var(--on-gradient2-a)",
            "on-gradient-3": "var(--on-gradient3-a)",
            "on-gradient3-a": "var(--on-gray-300)",
            "on-gradient3-b": "var(--dm-on-gray-700)",
            "gradient3-a": "var(--gray-0)",
            "gradient3-b": "var(--gray-700)",
            "dm-gradient3-a": "var(--dm-gray-700)",
            "dm-gradient3-b": "var(--black)",
            "on-gray-0": "var(--black)",
            "on-gray-100": "var(--black)",
            "on-gray-200": "var(--black)",
            "on-gray-300": "var(--black)",
            "on-gray-400": "var(--black)",
            "on-gray-500": "var(--white)",
            "on-gray-600": "var(--white)",
            "on-gray-700": "var(--white)",
            "on-gray-800": "var(--white)",
            "on-gray-900": "var(--white)",
            "dm-gray-0": "#dfdfdf",
            "dm-gray-100": "#c8c8c8",
            "dm-gray-200": "#b1b1b1",
            "dm-gray-300": "#9b9b9b",
            "dm-gray-400": "#858585",
            "dm-gray-500": "#6a6a6a",
            "dm-gray-600": "#505050",
            "dm-gray-700": "#383838",
            "dm-gray-800": "#212121",
            "dm-gray-900": "#070707",
            "dm-on-gray": "var(--black)",
            "dm-on-gray-0": "var(--black)",
            "dm-on-gray-100": "var(--black)",
            "dm-on-gray-200": "var(--black)",
            "dm-on-gray-300": "var(--black)",
            "dm-on-gray-400": "var(--black)",
            "dm-on-gray-500": "var(--white)",
            "dm-on-gray-600": "var(--white)",
            "dm-on-gray-700": "var(--white)",
            "dm-on-gray-800": "var(--white)",
            "dm-on-gray-900": "var(--white)",
            //"on-background-secondary":  "var(--on-gray-0)",
            //"dm-on-background-secondary":  "var(--dm-white)",
            "background-tertiary": "var(--primary)",
            "on-background-tertiary": "var(--on-primary)",
            "dm-background-tertiary": "var(--dm-primary-800)",
            "dm-on-background-tertiary": "var(--dm-white)",
            "gradient-1": "linear-gradient(45deg, var(--gradient1-a) 0%, var(--gradient1-b) 100%)",
            "gradient-2": "linear-gradient(45deg, var(--gradient2-a) 0%, var(--gradient2-b) 100%)",
            "gradient-3": "linear-gradient(45deg, var(--gradient3-a) 0%, var(--gradient3-b) 100%)",
            "dm-gradient-1": "linear-gradient(45deg, var(--dm-gradient1-a) 0%, var(--dm-gradient1-b) 100%)",
            "dm-gradient-2": "linear-gradient(45deg, var(--dm-gradient2-a) 0%, var(--dm-gradient2-b) 100%)",
            "dm-gradient-3": "linear-gradient(45deg, var(--dm-gradient3-a) 0%, var(--dm-gradient3-b) 100%)",
            "text-gradient": "linear-gradient(45deg, var(--text-gradient-a) 0%, var(--text-gradient-b) 100%)",
            "dm-on-gradient-1": "var(--dm-on-gradient1-a)",
            "dm-on-gradient-2": "var(--dm-on-gradient2-a)",
            "dm-on-gradient-3": "var(--dm-on-gradient3-a)",
            "dm-text-gradient": "linear-gradient(45deg, var(--dm-text-gradient-a) 0%, var(--dm-text-gradient-b) 100%)",
            "dm-on-surface": "var(--dm-on-background)",
            "white-bg": "#ffffff",
            "quiet": "68%",
            "disabled": "38%",
            "hover": "50%",
            "active": "100%",
            "inset-border-0": "0 0 0 0 rgba(0,0,0,0)",
            "inset-border-1": "0 0 0 var(--border-1) var(--icon)",
            "inset-border-2": "0 0 0 var(--border-2) var(--icon)",
            "inset-border-3": "0 0 0 var(--border-3) var(--icon)",
            "inset-border-4": "0 0 0 var(--border-4) var(--icon)",
            "dark-inset-border-1": "0 0 0 var(--border-1) var(--black)",
            "dark-inset-border-2": "0 0 0 var(--border-2) var(--black)",
            "dark-inset-border-3": "0 0 0 var(--border-3) var(--black)",
            "dark-inset-border-4": "0 0 0 var(--border-4) var(--black)",
            "white-inset-border-1": "0 0 0 var(--border-1) var(--white)",
            "white-inset-border-2": "0 0 0 var(--border-2) var(--white)",
            "white-inset-border-3": "0 0 0 var(--border-3) var(--white)",
            "white-inset-border-4": "0 0 0 var(--border-4) var(--white)",
        });
    }

    private setAtomVars() {
        const atoms = this.atoms;

        // Listen for the addition of colors or removal of colors from the color palette.
        atoms.colorPalette.setColorListener(this.lkey("colorPalette"), this.colorListener.bind(this));

        // Listen for default theme changes
        atoms.colorThemes.defaultTheme.setPropertyListener(this.lkey("colorTheme"), this.defaultThemeListener.bind(this));

        this.coreSystemSettings();

        // Listen for changes to the input background
        this.addPropVar("myInputBackground", "", atoms.inputBackground.overlayColor, this.generateInputBackgroundVariables.bind(this));

        // Listen for the state settings to be ready
        this.addPropVar("cssStateSettings", "", atoms.stateSettings.ready, this.setStateSettingsVars.bind(this));

        // Listen for changes affecting hotlinks calculations
        this.addPropsVar("hotlinks", "", [atoms.hotlinks.underlineHotlinksInLightMode, this.ds.atoms.colorThemes.defaultTheme], this.generateHotlinkVariables.bind(this));

        // Typography root
        const fs = atoms.fontsSettings;
        this.addPropVar("primaryFont", "", fs.primaryFont);
        this.addPropVar("secondaryFont", "", fs.secondaryFont);
        this.addPropVar("baseFont", "px", fs.baseFontSize);
        const fw = fs.fontWeights;
        for (let i = 0; i < fw.length; i++) {
            this.addPropVar(`fontWeight-${i}`, "", fw[i]);
        }
        this.addPropVar(`secondary-fontWeight`, "", fs.secondaryFontWeight);
        this.addPropVar("standard-LineHeight", "%", fs.standardLineHeight);
        this.addPropVar("header-LineHeight", "%", fs.headerLineHeight);
        this.addPropVar("sm-LineHeight", "%", fs.smallLineHeight);

        // Display and header styles
        const dhs = atoms.displayAndHeaderStyles;
        this.addPropVar("headerChange", "", dhs.percentChangeInHeaderDisplaySizes); //, function(vk) {
        this.addPropVar("headerWeight", "", dhs.headingDisplayFontWeight);
        for (var i = 0; i < dhs.displayStyles.length; i++) {
            this.generateTypographyVars(dhs.displayStyles[i], "Display" + (i + 1));
        }
        for (var i = 0; i < dhs.headerStyles.length; i++) {
            this.generateTypographyVars(dhs.headerStyles[i], "h" + (i + 1));
        }
        const dhsVK = new CSSVariableKind("_tb.dhs", "", [dhs.headingDisplayFontWeight], this);
        dhsVK.setVars({
            "headerFamily": "var(--secondaryFont)", // TODO: static?  If not, where from?
            "bodyFamily": "var(--primaryFont)", // TODO: static?  If not, where from?
        });

        // Body styles
        const bds = atoms.bodyStyles;
        this.generateTypographyVars(bds.body1, "body1");
        this.generateTypographyVars(bds.body1Bold, "body1-bold");
        this.generateTypographyVars(bds.body2, "body2");
        this.generateTypographyVars(bds.body2Bold, "body2-bold");
        this.generateTypographyVars(bds.body3, "body3");
        this.generateTypographyVars(bds.body3Bold, "body3-bold");

        // Small text styles
        const sts = atoms.smallTextStyles;
        this.generateTypographyVars(sts.subtitle1, "subtitle1");
        this.generateTypographyVars(sts.subtitle2, "subtitle2");
        this.generateTypographyVars(sts.caption, "caption");
        this.generateTypographyVars(sts.captionBold, "caption-bold");
        this.generateTypographyVars(sts.overline, "overline");
        this.generateTypographyVars(sts.overlineLarge, "overline-large");
        this.generateTypographyVars(sts.overlineExtraLarge, "overline-XL");
        this.generateTypographyVars(sts.label1, "label-1");
        this.generateTypographyVars(sts.label1AllCaps, "label-1-allCaps");
        this.generateTypographyVars(sts.label2, "label-2");
        this.generateTypographyVars(sts.label2AllCaps, "label-2-allCaps");
        this.generateTypographyVars(sts.labelSmall, "label-small");
        this.generateTypographyVars(sts.callToAction, "CTA");
        this.generateTypographyVars(sts.callToActionSmall, "CTA-Small");
        this.generateTypographyVars(sts.small, "small");
        this.generateTypographyVars(sts.smallSemibold, "small-semibold");

        // Stat styles
        this.generateTypographyVars(atoms.statStyles.stat, "stat");

    }

    private generateTypographyVars(typography: TypographyStyling, prefix: string) {
        this.addPropVar(prefix + "FontSize", "px", typography.fontSize);
        this.addPropVar(prefix + "FontWeight", "", typography.fontWeight);
        this.addPropVar(prefix + "FontFamily", "", typography.fontFamily);
        this.addPropVar(prefix + "LetterSpacing", "%", typography.letterSpacing);
        this.addPropVar(prefix + "LineHeight", "%", typography.lineHeight);
        const vk = new CSSVariableKind("molecules.topograpy", "", [typography.fontSize], this);
        vk.setVar(`${prefix}TextDecoration`, "none");   // TODO: if not static, where does this come from?
        vk.setVar(`${prefix}TextTransform`, "none");   // TODO: if not static, where does this come from?
    }

    private setMoleculeVars() {
        const ms = this.molecules;
        // dropdowns
        const dd = ms.dropdowns;
        const dropdownVk = new CSSVariableKind("dropdowns", "", [dd.menuShadow], this);
        this.addPropVar("dropdown-shadow", "", dd.menuShadow, shadowToCSS);
        this.addPropVar("dropdown-radius", "", dd.borderRadius);
        dropdownVk.setVars({
            "dropdown-focus-bg": "linear-gradient(90deg, var(--button) var(--dropdown-focus-theme), var(--transparent) var(--dropdown-focus-theme))",
            "dm-dropdown-focus-bg": "linear-gradient(90deg, var(--dm-button) var(--dropdown-focus-theme), var(--transparent) var(--dropdown-focus-theme))",
            "dropdown-hover-style": "100%",
            "dropdown-bottom-hover-bg": "linear-gradient(0deg, var(--button-half) var(--dropdown-focus-theme), var(--transparent) var(--dropdown-focus-theme)) !important",
            "dm-dropdown-bottom-hover-bg": "linear-gradient(0deg, var(--dm-button) var(--dropdown-focus-theme), var(--transparent) var(--dropdown-focus-theme)) !important",
        });
        // standard button
        const stb = ms.standardButtons;
        const buttonVk = new CSSVariableKind("stb", "", [stb.buttonText], this);
        stb.buttonText.setListener(this.lkey("stb.buttonText"), function (event) {
            const buttonText = stb.buttonText.getValue();
            let prefix, transform: string;
            if (buttonText === "CTA Small") {
                prefix = "CTA-Small";
                transform = "lowercase";
            } else {
                prefix = "CTA";
                transform = "uppercase";
            }
            buttonVk.setVars({
                "buttonTypography": `var(--${prefix}FontWeight) var(--${prefix}FontSize) / var(--${prefix}LineHeight) var(--${prefix}FontFamily)`,
                "buttonTextDecoration": `var(--${prefix}TextDecoration)`,
                "buttonTextTransform": `var(--${prefix}TextTransform)`,
                "buttonLetterSpacing": `var(--${prefix}LetterSpacing)`,
                "CTATextTransform": transform,
            });
        })
        this.addPropVar("button-padding", "", stb.horizontalPadding);
        this.addPropVar("button-border", "", stb.secondaryBorder);
        this.addPropVar("button-radius", "", stb.radius);
        this.addPropVar("button-minwidth", "", stb.minWidth);
        this.addPropVar("button-height", "", stb.height);
        this.addPropVar("button-shadow", "", stb.buttonShadow, shadowToCSS);
        // small button
        const smb = ms.smallButtons;
        const smbVK = new CSSVariableKind("smb", "", [smb.visibleHeight], this);
        this.addPropVar("sm-button-height", "", smb.visibleHeight);
        this.addPropVar("sm-button-padding", "", smb.horizontalPadding);
        smb.buttonText.setListener(this.lkey("smb.buttonText"), function (event) {
            const ctaSize = (smb.buttonText.getValue() == "CTA Small") ? "CTA-Small" : "CTA"
            smbVK.setVars({
                "sm-buttonTypography": `var(--${ctaSize}FontWeight) var(--${ctaSize}FontSize) / var(--${ctaSize}LineHeight) var(--${ctaSize}FontFamily)`,
                "sm-buttonTextDecoration": `var(--${ctaSize}TextDecoration)`,
                "sm-buttonTextTransform": `var(--${ctaSize}TextTransform)`,
                "sm-buttonLetterSpacing": `var(--${ctaSize}LetterSpacing)`,
            });
        });
        smbVK.setVars({
            "groupButton-radius": "calc(var(--radius-1) * var(--button-radius) * 1.6)",
        });
        // chip
        const chip = ms.chips;
        const chipVK = new CSSVariableKind("chip", "", [chip.minWidth], this);
        this.addPropVar("chip-minwidth", "px", chip.minWidth);
        this.addPropVar("chip-height", "", chip.visibleHeight);
        this.addPropVar("chip-radius", "", chip.radius);
        this.addPropVar("chip-padding", "", chip.horizontalPadding);
        this.addPropVar("chip-shadow", "", chip.shadow, shadowToCSS);
        this.addPropVar("chip-text", "", chip.text, function (vk: CSSVariableKind) {
            const typography = (chip.text.getValue() === "Caption") ? "caption" : "caption-bold";
            chipVK.setVars({
                "chipTypography": `var(--${typography}FontWeight) var(--${typography}FontSize) / var(--${typography}LineHeight) var(--${typography}FontFamily)`,
                "chipTextTransform": `var(--${typography}TextTransform)`,
                "chipLetterSpacing": `var(--${typography}LetterSpacing)`,
            });
        });
        // cards
        const card = ms.standardCards;
        const cardsVK = new CSSVariableKind("card", "", [card.padding], this);
        this.addPropVar("card-padding", "", card.padding);
        this.addPropVar("card-gap", "", card.contentGap);
        this.addPropVar("card-radius", "", card.borderRadius);
        this.addPropVar("card-shadow", "", card.shadow, shadowToCSS);
        cardsVK.setVars({
            "card-border": "var(--border-1)",
            "card-border-color": "var(--border)",
        });
        // modals
        const modal = ms.modal;
        const modalVK = new CSSVariableKind("modal", "", [modal.borderRadius], this);
        this.addPropVar("modal-radius", "", modal.borderRadius);
        this.addPropVar("modal-shadow", "", modal.shadow, shadowToCSS);
        this.addPropVar("modal-overlay", "", modal.color, colorToCSS);
        modalVK.setVars({
            "modal-padding": "2", // TODO: static?
            "modal-border": "var(--spacing-2)",
        });
        const ttVK = new CSSVariableKind("tooltip", "", [], this);
        ttVK.setVars({
            // TODO: Do I need to set tooltip-color & tooltip-oncolor for lm & dm?  If yes, how to determine them?
            "dmtooltip": "",
            "tooltip-padding": "2",
            "tooltip-border": "var(--border-1)",
            "tooltip-elevation": "0",
        });
        // Toasts
        const toast = ms.toasts;
        this.addPropVar("toast-radius", "", toast.handleBorderRadius);
        this.addPropVar("toast-padding", "", toast.padding);
        this.addPropVar("toast-shadow", "", toast.shadow, shadowToCSS);
        // Images
        const image = ms.images;
        this.addPropVar("image-shadow", "", image.imageShadow, shadowToCSS);
        this.addPropVar("image-radius", "", image.generalImageBorderRadius);
        this.addPropVar("inline-image-height", "", image.listImageHeight);
        this.addPropVar("inline-image-radius", "", image.listImageBorderRadius);
        // Avatar Images
        const avatar = ms.avatars;
        this.addPropVar("avatar-border", "", avatar.mediumBorder);
        this.addPropVar("avatar-border-lg", "", avatar.extraLargeBorder);
        this.addPropVar("avatar-shadow", "", avatar.shadow, shadowToCSS);
        // sliders
        const slider = ms.sliders;
        this.addPropVar("sliderhandleHeight", "", slider.visibleHeight);
        this.addPropVar("sliderhandleRadius", "", slider.handleBorderRadius);
        this.addPropVar("sliderhandle-shadow", "", slider.handleShadow, shadowToCSS);
        this.addPropVar("sliderbarHeight", "", slider.barHeight);
        this.addPropVar("sliderbar-shadow", "", slider.barShadow, shadowToCSS);
        // popover
        const popover = ms.popovers;
        this.addPropVar("popoverRadius", "", popover.borderRadius);
        this.addPropVar("popover-shadow", "", popover.shadow, shadowToCSS);
        // Spacing
        const spacing = ms.spacing;
        this.addPropVar("section-padding", "", spacing.sectionPadding);
        this.addPropVar("p-padding", "", spacing.paragraphPadding);
    }

    private setOrganismVars() {
        const org = this.organisms;
        const fc = org.footerAndCopyright;
        const footer = new CSSVariableKind("fc", "", [fc.footerVerticalPadding], this);
        this.addPropVar("footer-padding", "", fc.footerVerticalPadding);
        this.addPropVar("copyright-padding", "", fc.copyrightVerticalPadding);
        footer.setVars({
            "footer": "var(--gray-900)",
            "on-footer": "var(--on-gray-900)",
            "dm-footer": "var(--dm-gray-900)",
            "dm-on-footer": "var(--dm-on-gray-900)",
            "copyright": "var(--nearblack)",
            "on-copyright": "var(--on-nearblack)",
            "dm-copyright": "var(--nearblack)",
            "dm-on-copyright": "var(--dm-on-nearblack)",
        });
        // navbar primary
        const pnav = org.primaryNav;
        this.addPropVar("navbarPrimary-padding", "", pnav.verticalPadding);
        this.addPropVar("navbarPrimary-position", "", pnav.fixed, function (vk: CSSVariableKind) {
            vk.setVar(vk.name, pnav.fixed.getValue() ? "fixed" : "relative");
        });
        // navbar secondary /
        const snav = org.secondaryNav;
        this.addPropVar("navbarSecondary-padding", "", snav.verticalPadding);
        this.addPropVar("navbarSecondary-position", "", snav.sticky, function (vk: CSSVariableKind) {
            vk.setVar(vk.name, snav.sticky.getValue() ? "sticky" : "fixed");
        });
        const nbsVk = new CSSVariableKind("hero", "", [snav.horizontalTabPadding], this);
        nbsVk.setVars({
            "navbarSecondary-stickyTop": "0",
            "leftNav": "var(--gray-100)",
            "on-leftNav": "var(--on-gray-100)",
            "leftNavPadding": "var(--spacing-2)",
        });
        // hero
        const hero = org.hero;
        const heroVk = new CSSVariableKind("hero", "", [hero.verticalGap], this);
        this.addPropVar("hero-gap", "", hero.verticalGap);
        this.addPropVar("hero-padding", "", hero.verticalPadding);
        hero.title.setPropertyListener(this.lkey("heroTitle"), function (vc: EventValueChange<string>) {
            const val = vc.newValue;
            if (!val) return;
            let p: string;
            if (val === Hero.DISPLAY1) p = "Display1";
            else if (val === Hero.DISPLAY2) p = "Display2";
            else if (val === Hero.H1) p = "h1";
            else throw new Error(`Invalid hero title: ${val}`);
            heroVk.setVar("hero-titleTypography", `var(--${p}FontWeight) var(--${p}FontSize) / var(--${p}LineHeight) var(--${p}FontFamily)`);
            heroVk.setVar("hero-titleTransform", `var(--${p}TextTransform)`);
            heroVk.setVar("hero-titleSpacing", `var(--${p}LetterSpacing)`);
        });
        hero.body.setPropertyListener(this.lkey("heroBody"), function (vc: EventValueChange<string>) {
            const val = vc.newValue;
            if (!val) return;
            let p: string;
            if (val === Hero.BODY1) p = "body1";
            else if (val === Hero.BODY2) p = "body2";
            else if (val === Hero.BODY3) p = "body3";
            else if (val === Hero.BODY1BOLD) p = "body1-bold";
            else if (val === Hero.BODY2BOLD) p = "body2-bold";
            else if (val === Hero.BODY3BOLD) p = "body3-bold";
            else throw new Error(`Invalid hero body: ${val}`);
            heroVk.setVar("hero-bodyTypography", `var(--${p}FontWeight) var(--${p}FontSize) / var(--${p}LineHeight) var(--${p}FontFamily)`);
            heroVk.setVar("hero-bodyTransform", `var(--${p}TextTransform)`);
            heroVk.setVar("hero-bodySpacing", `var(--${p}LetterSpacing)`);
        });
        heroVk.setVars({
            "hero-justify-content": "flex-start",
        });
        // tables
        const tableVk = new CSSVariableKind("tables", "", [], this);
        tableVk.setVars({
            "tableheaderTypography": "var(--label-1FontWeight) var(--label-1FontSize) / var(--label-1LineHeight) var(--label-1FontFamily)",
            "tableheaderSpacing": "var(--label-1LetterSpacing)",
            "tableheaderTransform": "var(--label-1TextTransform)",
            "tablebodyTypography": "var(--body1FontWeight) var(--body1FontSize) / var(--body1LineHeight) var(--body1FontFamily)",
            "tablebodySpacing": "var(--body1LetterSpacing)",
            "tablebodyTransform": "var(--body1TextTransform)",
            "tableheaderPadding": "1",
            "tablebodyPadding": "1",
        });
    }

    // core system settings
    private coreSystemSettings() {
        const atoms = this.atoms;
        const self = this;
        let vk = new CSSVariableKind("", "", [], this);
        // targets
        this.addPropVar("min-target", "px", atoms.minimumTarget.minHeight);
        this.addPropVar("mobile-min-target", "px", atoms.minimumTarget.mobileMinHeight);
        this.addPropVar("animation-speed", "ms", atoms.animationSettings.animationTiming);
        this.addPropVar("animation-distance", "px", atoms.animationSettings.hoverAndFocusAnimationDistance);
        this.addPropVar("animation-focus-distance", "px", atoms.animationSettings.hoverAndFocusAnimationDistance);
        // radius
        vk = new CSSVariableKind("", "", [atoms.borderSettings.baseBorderRadius], this);
        vk.setVar("radius-0", "0px");
        this.addPropVar("radius-1", "px", atoms.borderSettings.baseBorderRadius);
        for (let i = 2; i <= 10; i++) vk.setVar(`radius-${i}`, `calc(var(--radius-1) * ${i})`);
        vk.setVar(`radius-quarter`, `calc(var(--radius-1) / 4)`);
        vk.setVar(`radius-half`, `calc(var(--radius-1) / 2)`);
        // spacing
        vk = new CSSVariableKind("", "", [atoms.gridSettings.grid], this);
        vk.setVar("spacing-0", "0px");
        this.addPropVar("spacing-1", "px", atoms.gridSettings.grid);
        for (let i = 2; i <= 10; i++) vk.setVar(`spacing-${i}`, `calc(var(--spacing-1) * ${i})`);
        vk.setVar(`spacing-quarter`, `calc(var(--spacing-1) / 4)`);
        vk.setVar(`spacing-half`, `calc(var(--spacing-1) / 2)`);
        vk.setVar(`negative-size-half`, `calc(0 - var(--spacing-1) / 2)`);
        // borders
        vk = new CSSVariableKind("", "", [atoms.borderSettings.baseBorderWidth], this);
        vk.setVar("border-0", "0px");
        this.addPropVar("border-1", "px", atoms.borderSettings.baseBorderWidth);
        for (let i = 2; i <= 4; i++) vk.setVar(`border-${i}`, `calc(var(--border-1) * ${i})`);
        // elevation settings
        vk = new CSSVariableKind("", "", [atoms.elevationSettings.percentageChange], this);
        this.addPercentToDecimal("elevation-change", atoms.elevationSettings.percentageChange);
        for (let i = 2; i <= 9; i++) vk.setVar(`change-${i}`, `calc(1 + calc(var(--elevation-change) * ${i}))`);
        const emitChangeVars = function (name: string) {
            for (let i = 2; i <= 9; i++) vk.setVar(`${name}-${i}`, `calc(var(--${name}) * var(--change-${i}))`);
        }
        atoms.elevationSettings.horizontalShadowLength.setListener("css.coreSystemSettings", function (vc: EventValueChange<number>) {
            vk.setVar(`elevation-horizontal`, `${vc.newValue}px`);
            vk.setVar(`reverse-elevation-horizontal`, `-${vc.newValue}px`);
        }, [EventType.ValueChanged]);
        atoms.elevationSettings.verticalShadowLength.setListener("css.coreSystemSettings", function (vc: EventValueChange<number>) {
            vk.setVar(`elevation-vertical`, `${vc.newValue}px`);
            vk.setVar(`reverse-elevation-vertical`, `-${vc.newValue}px`);
        }, [EventType.ValueChanged]);
        emitChangeVars("elevation-horizontal");
        emitChangeVars("elevation-vertical");
        emitChangeVars("reverse-elevation-horizontal");
        emitChangeVars("reverse-elevation-vertical");
        this.addPropVar("elevation-blur", "px", atoms.elevationSettings.blurRadius);
        emitChangeVars("elevation-blur");
        this.addPropVar("elevation-spread", "px", atoms.elevationSettings.spreadRadius);
        emitChangeVars("elevation-spread");
        vk.setVar("base-elevation-1", "0 0 var(--base-elevation-blur) var(--base-elevation-spread)");
        for (let i = 2; i <= 9; i++) vk.setVar(`base-elevation-${i}`, `0 0 var(--base-elevation-blur-${i}) var(--base-elevation-spread-${i})`);
        this.addPropVar("base-elevation-blur", "px", atoms.elevationSettings.baseBlurRadius);
        emitChangeVars("base-elevation-blur");
        this.addPropVar("base-elevation-spread", "px", atoms.elevationSettings.baseSpreadRadius);
        emitChangeVars("base-elevation-spread");
        this.addPropVar("elevation-rgb", "", atoms.elevationSettings.shadowColor, this.shadowColorListener.bind(this));
        this.addPercentToDecimal("elevation-opacity", atoms.elevationSettings.colorOpacity);
        this.addPercentToDecimal("base-elevation-opacity", atoms.elevationSettings.baseColorOpacity);
        // elevations
        vk.setVar("elevation-0", "0 0 0 0 rgba(0,0,0,0)");
        for (let i = 1; i <= 9; i++) {
            const vc = `var(--change-${i})`;
            vk.setVar(`elevation-${i}`,
                `calc(var(--elevation-horizontal) * ${vc}) ` +
                `calc(var(--elevation-vertical) * ${vc}) ` +
                `calc(var(--elevation-blur) * ${vc}) ` +
                `calc(var(--elevation-spread) * ${vc}) ` +
                `rgba(var(--elevation-rgb), calc(var(--elevation-opacity) * ${vc})), 0 0 ` +
                `calc(var(--base-elevation-blur) * ${vc}) ` +
                `calc(var(--base-elevation-spread) * ${vc}) ` +
                `rgba(var(--elevation-rgb), calc(var(--base-elevation-opacity) * ${vc}))`
            );
        }
        // bevel standard and inverse settings
        this.addBevelProps(atoms.bevelSettings.standard);
        this.addBevelProps(atoms.bevelSettings.inverse);
        this.addPropsVar("focusBlur", "", [atoms.gridSettings.grid, atoms.focusStates.addFocusBlur], this.generateFocusBlurVariable.bind(this));
        // glow settings
        this.addPropVar("glow-rgb", "", atoms.glowSettings.color, function (vk: CSSVariableKind) {
            log.debug(`glow-rgb callback`);
            const val = self.atoms.glowSettings.color.getValue();
            if (val !== undefined) {
                const shade = Shade.fromHex(val);
                vk.setVar("glow-rgb", `${shade.R}, ${shade.G}, ${shade.B}`);
            }
        });
        this.addPropVar("glow-blur", "px", atoms.glowSettings.blurRadius);
        this.addPropVar("glow-spread", "px", atoms.glowSettings.spreadRadius);
        this.addPercentToDecimal("glow-opacity", atoms.glowSettings.colorOpacity);
        this.addPercentToDecimal("glow-change", atoms.glowSettings.percentageChange);
    }

    private addBevelProps(props: BevelSettingsProps) {
        // bevel or inbevel settings
        const p = props.standard ? "bevel" : "inbevel";
        this.addPropVar(`${p}-horizontal`, "px", props.horizontalShadowLength);
        this.addPropVar(`${p}-vertical`, "px", props.verticalShadowLength);
        this.addPropVar(`${p}-spread`, "px", props.spreadRadius);
        this.addPropVar(`${p}-blur`, "px", props.blurRadius);
        this.addPercentToDecimal(`${p}-light-opacity`, props.lightGlowOpacity);
        this.addPercentToDecimal(`${p}-dark-opacity`, props.darkShadowOpacity);
        this.addPercentToDecimal(`${p}-change`, props.percentageChange);
        // bevels
        const vk = new CSSVariableKind(p, "", [props.blurRadius], this);
        if (props.standard) {
            vk.setVar("bevel-0", "0 0 0 0 rgba(0,0,0,0)");
            for (let i = 1; i <= 9; i++) {
                const bc = `calc(1 + calc(var(--bevel-change) * ${i}))`;
                vk.setVar(`bevel-${i}`,
                    `inset calc(var(--bevel-horizontal) * ${bc}) ` +
                    `calc(var(--bevel-vertical) * ${bc}) ` +
                    `var(--bevel-blur) ` +
                    `var(--bevel-spread) ` +
                    `rgba(255, 255, 255, var(--bevel-light-opacity)), ` +
                    `inset calc(0px - calc(var(--bevel-horizontal) * ${bc})) ` +
                    `calc(0px - calc(var(--bevel-vertical) * ${bc})) ` +
                    `var(--bevel-blur) ` +
                    `var(--bevel-spread) ` +
                    `rgba(0,0,0,calc(var(--bevel-dark-opacity) * ${bc}))`);
            }
        } else {
            for (let i = 1; i <= 9; i++) {
                vk.setVar(`reverse-bevel-${i}`,
                    `inset calc(var(--inbevel-horizontal) * calc(1 - calc(var(--inbevel-change) * ${i}))) ` +
                    `calc(var(--inbevel-vertical) * calc(1 - calc(var(--inbevel-change) * .${i}))) ` +
                    `calc(var(--inbevel-blur) * .${10 - i}) ` +
                    `calc(var(--inbevel-spread) * .${10 - i}) ` +
                    `rgba(0,0,0, calc(var(--inbevel-dark-opacity)  * calc(1 + calc(var(--inbevel-change) * .${i})) ))`);
            }
        }
    }

    public getVarGroup(name: string): CSSVarGroup {
        let vg = this.varGroups[name];
        if (!vg) {
            vg = new CSSVarGroup(name);
            this.varGroups[name] = vg;
        }
        return vg;
    }

    private colorListener(name: string, color?: IColor) {
        if (color) {
            const cssColor = new CSSColor(color, this);
            this.cssColors[name] = cssColor;
        } else {
            const cssColor = this.cssColors[name];
            cssColor.stop();
            delete this.cssColors[name];
        }
    }

    private shadowColorListener(vk: CSSVariableKind) {
        const val = this.atoms.elevationSettings.shadowColor.getValue();
        if (val !== undefined) {
            const shade = Shade.fromHex(val);
            vk.setVar("elevation-rgb", `${shade.R}, ${shade.G}, ${shade.B}`);
        }
    }

    private addPercentToDecimal(name: string, prop: PropertyPercentage) {
        this.addPropVar(name, "", prop, this.percentToDecimalListener.bind(this, name));
    }

    private percentToDecimalListener(varName: string, vk: CSSVariableKind) {
        const val = vk.props[0].getValue();
        if (val !== undefined) {
            // Convert from percentage to decimal value
            vk.setVar(varName, `${val / 100}`);
        }
    }

    private generateFocusBlurVariable(vk: CSSVariableKind) {
        const name = "focusBlur";
        const unit = "px";
        const focusBlur = this.atoms.focusStates.addFocusBlur.getValue();
        const grid = this.atoms.gridSettings.grid.getValue();
        if (focusBlur === undefined || grid === undefined) {
            this.setVar(name, unit, vk);
            return;
        }
        if (focusBlur) {
            this.setVar(name, unit, vk, `${grid / 2}`);
        } else {
            this.setVar(name, unit, vk, '0');
        }
    }

    private generateInputBackgroundVariables(vk: CSSVariableKind) {
        const vars = this.atoms.inputBackground.getVariables();
        if (!vars) return;
        this.setVar(`input`, "", vk, vars.inputDefault.getHexOrRGBA());
        this.setVar(`on-input`, "", vk, vars.onInputDefault.getHexOrRGBA());
        this.setVar(`dm-input`, "", vk, vars.dmInputDefault.getHexOrRGBA());
        this.setVar(`dm-on-input`, "", vk, vars.dmInputDefault.getOnShade2(false).getHexOrRGBA());
        this.setVar("input-hover", "", vk, "rgba(255,255,255,.9)");
        this.setVar("dm-input-hover", "", vk, "rgba(255,255,255,.12)");
    }

    private setStateSettingsVars(vk: CSSVariableKind) {
        log.debug(`Begin setting state settings variables`);
        if (this.atoms.stateSettings.ready) {
            this.atoms.stateSettings.all.forEach(ss => {
                const gen = this;
                this.addPropVar("ss" + ss.name, "", ss.hex, function (vk1: CSSVariableKind) {
                    gen.setVar(ss.name, "", vk, ss.lmShade.hex);
                    gen.setVar(`on-${ss.name}`, "", vk, ss.lmShade.getOnShade2(true).getRGBA());
                    gen.setVar(`dm-${ss.name}`, "", vk, ss.dmShade.hex);
                    gen.setVar(`dm-on-${ss.name}`, "", vk, ss.dmShade.getOnShade2(false).getRGBA());
                })
            });
        }
        else {
            log.debug(`StateSettings not ready, so don't set state css vars`);
        }
        log.debug(`Finished setting state settings variables`);
    }

    public generateHotlinkVariables(vk: CSSVariableKind) {
        this.generateHotlinkVariables2(true, vk);
        this.generateHotlinkVariables2(false, vk);
    }

    private generateHotlinkVariables2(lm: boolean, vk: CSSVariableKind) {
        const vars = this.atoms.hotlinks.getHotlinkVariables2(lm);
        if (vars) {
            log.debug(`CSS: hotlink variables: found`);
            this.generateHotlinkModeVariables(vars.default, lm, "", vk);
            this.generateHotlinkModeVariables(vars.onWhite, lm, "OnWhite", vk);
            this.generateHotlinkModeVariables(vars.onBlack, lm, "OnBlack", vk);
            this.generateHotlinkModeVariables(vars.onTertiary, lm, "OnTertiary", vk);
            this.generateOnHotlinkVariables("Gradient3", lm ? "" : "dm-", vk, vars.onGradient3);
        } else {
            log.debug(`CSS: hotlink variables: not found`);
        }
    }

    private generateHotlinkModeVariables(vars: HotlinkModeVariables, lm: boolean, onName: string, vk: CSSVariableKind) {
        const prefix = lm ? "" : "dm-";
        vk.setShadeVar(`${prefix}hotlink${onName}`, vars.unvisited.shade);
        vk.setShadeVar(`${prefix}hotlink${onName}-visited`, vars.visited.shade);
        vk.setVar(`${prefix}hotlink${onName}-decoration`, vars.unvisited.decoration);
        vk.setVar(`${prefix}hotlink${onName}-hover-decoration`, vars.unvisited.hoverDecoration);
    }

    private generateOnHotlinkVariables(color: string, prefix: string, vk: CSSVariableKind, vars: OnHotlink) {
        vk.setShadeVar(`${prefix}hotlinkOn${color}`, vars.unvisited);
        vk.setShadeVar(`${prefix}hotlinkOn${color}-visited`, vars.visited);
    }

    public setShadeVar(name: string, kind: CSSVariableKind, shade?: Shade) {
        if (shade) {
            this.setVar(name, "", kind, shade.getHexOrRGBA());
        } else {
            this.setVar(name, "", kind);
        }
    }

    private defaultThemeListener(vc: EventValueChange<string>) {
        log.debug("defaultThemeListener enter");
        const name = vc.newValue;
        if (name !== undefined) {
            if (this.defaultTheme) this.defaultTheme.stop();
            this.defaultTheme = new CSSTheme(this.atoms.colorThemes.getTheme(name), this);
        }
        log.debug("defaultThemeListener exit");
    }

    public setCSSVarListener(name: string, cb?: VarListener) {
        if (cb) {
            this.cssVarListeners[name] = cb;
            Object.keys(this.cssVars).forEach(name => {
                cb(name, this.cssVars[name]);
            });
        } else {
            delete this.cssVarListeners[name];
        }
    }

    public setVar(name: string, unit: string, kind: CSSVariableKind, value?: any) {
        const cssName = this.cssName(name);
        let cssValue = "unset";
        if (value !== undefined && value !== null) {
            cssValue = `${value}${unit}`;
        }
        log.debug(`CSS variable: ${cssName}: ${cssValue}`);
        // For each of the component keys (e.g. keys of individual atoms, molecules, or organisms),
        // set the variable in the appropriate groups, one group for each atom, molecule, or organism.
        kind.componentKeys.forEach(key => this.getVarGroup(key).setVar(cssName, cssValue));
        //if (cssValue !== undefined) {
        this.cssVars[cssName] = cssValue;
        //} else {
        // Delete CSS variable
        //    delete this.cssVars[cssName];
        //}
        // Notify listeners of change
        Object.values(this.cssVarListeners).forEach((l) => l(cssName, cssValue));
    }

    public lkey(name: string): string {
        return `_tb.cssGenerator.${name}`
    }

    private cssName(name: string): string {
        return `--${name}`;
    }

    /**
     * Call this if there is a 1-1 relationship between an input property 'prop' 
     * and a generated output CSS variable (varName).
     * There must be no computation involved in order to generate the CSS
     * variable value from the value of the property.
     * Note: this means that the CSS variables are dynamically updated when the 'prop'
     * property is updated.
     * @param name The CSS variable name (without the leading --);
     * @param unit The unit that is appended to the value of the variable.
     * @param prop The input property from which the CSS variable value is derived
     */
    public addPropVar(name: string, unit: string, prop: Property<any>, cb?: (propVar: CSSVariableKind) => void) {
        new CSSDynamicVariableKind(name, unit, [prop], this, { cb });
    }

    /**
     * Call this when there is a more complicated relationship between input properties
     * and output CSS variables.
     * 
     * @param name A unique name.
     * @param props Any number of properties which are monitored for changes before calling 'cb'.
     * @param cb  The callback called each time all 'props' are initialized and any values change.
     */
    public addPropsVar(name: string, unit: string, props: Property<any>[], cb: (propVar: CSSVariableKind) => void, opts?: { or?: boolean }) {
        opts = opts || {};
        const newOpts = { cb, or: opts.or };
        new CSSDynamicVariableKind(name, unit, props, this, newOpts);
    }

}

class CSSColor {

    private color: Color;
    private cssGenerator: CSSGenerator;
    private lname: string = '_tb.CssColor';
    private varKind: CSSVariableKind;

    constructor(color: IColor, cssGenerator: CSSGenerator) {
        this.color = color as Color;
        this.cssGenerator = cssGenerator;
        this.varKind = new CSSVariableKind("color", "", [color.hex as Property<string>], cssGenerator);
        this.start();
    }

    public start() {
        this.color.hex.setListener(this.lname, this.listener.bind(this));
    }

    public stop() {
        this.color.hex.removeListener(this.lname);
    }

    private listener(vc: EventValueChange<string>): void {
        const hex = this.color.hex.getValue();
        if (!hex) return;
        for (const sb of this.color.shades.all) {
            for (const shade of sb.build(Shade.fromHex(hex))) {
                const name = getShadeVarName(shade);
                log.debug(`Shade listener for light mode shade ${name} = ${shade.toString()}`);
                if (name) {
                    this.cssGenerator.setShadeVar(name, this.varKind, shade);
                    this.cssGenerator.setShadeVar(`on-${name}`, this.varKind, shade.getOnShade2(true));
                } else {
                    log.warn(`Unable to set CSS variable for shade ${shade.toString()} because no variable name can be determined`);
                }
            }
        }
    }

}

class CSSTheme {

    public readonly theme: ColorTheme;
    public readonly cssGenerator: CSSGenerator;
    private readonly listenerSubscriptions: ListenerSubscription[] = [];

    constructor(theme: ColorTheme, cssGenerator: CSSGenerator) {
        this.theme = theme;
        this.cssGenerator = cssGenerator;
        this.start();
    }

    public start() {

        log.debug(`CSSTheme.start enter: theme=${this.theme.name}`);

        const self = this;

        // Listen for changes to the primary, secondary, and tertiary shades
        const dm: DMShadeListenerArgs = { corresponding: true };
        this.setShadeListener({ name: "primary", pcs: this.theme.primary, on: true, dm, palette: true, half: true, quarter: true });
        this.cssGenerator.addPropVar("cssColorThemePrimary", "", this.theme.primary, function (vk: CSSVariableKind) {
            const vars = self.theme.getDarkBGShades();
            if (vars) {
                vk.setShadeVar("primaryDarkBG", vars.primary);
                vk.setShadeVar("secondaryDarkBG", vars.secondary);
            }
        });
        this.setShadeListener({ name: "secondary", pcs: this.theme.secondary, on: true, dm, palette: true });
        this.setShadeListener({ name: "tertiary", pcs: this.theme.tertiary, on: true, dm, palette: true });

        // light and dark mode backgrounds
        log.debug(`CSSTheme.start setting light and dark mode background listeners`);
        this.setBackgroundListener("lmbg", true, this.theme.lightModeBackground);
        this.setBackgroundListener("dmbg", false, this.theme.darkModeBackground);

        // elevations listener
        log.debug(`CSSTheme.start setting elevations listener`);
        this.setElevationsListener(true);

        // gradients
        log.debug(`CSSTheme.start setting gradients listeners`);
        this.setShadeListener({ name: "gradient1-a", pcs: this.theme.gradient1.from, on: true, dm: {} });
        this.setShadeListener({ name: "gradient1-b", pcs: this.theme.gradient1.to, on: true, dm: {} });
        this.setShadeListener({ name: "gradient2-a", pcs: this.theme.gradient2.from, on: true, dm: {} });
        this.setShadeListener({ name: "gradient2-b", pcs: this.theme.gradient2.to, on: true, dm: {} });

        // button
        log.debug(`CSSTheme.start setting button listener`);
        this.setShadeGroupListener("button", this.theme.button);

        // icon
        log.debug(`CSSTheme.start setting icon listener`);
        this.setShadeGroupListener("icon", this.theme.icon);

        // text gradient
        log.debug(`CSSTheme.start setting text gradient listeners`);
        this.setShadeListener({ name: "text-gradient-a", pcs: this.theme.gradientHeaderText.from, on: true, dm: {} });
        this.setShadeListener({ name: "text-gradient-b", pcs: this.theme.gradientHeaderText.to, on: true, dm: {} });

        // accent
        log.debug(`CSSTheme.start setting accent listener`);
        this.setShadeListener({ name: "accent", pcs: this.theme.accent, dm: {}, palette: true, on: true });

        // dropdown related variables
        log.debug(`CSSTheme.start setting dropdown listeners`);
        const molecules = this.cssGenerator.molecules;
        const props = [molecules.dropdowns.menuFocusState, this.theme.button];
        this.cssGenerator.addPropsVar("lm-dropdowns", "", [...props, this.theme.lightModeBackground], this.generateDropDownVars.bind(this, true));
        this.cssGenerator.addPropsVar("dm-dropdowns", "", [...props, this.theme.darkModeBackground], this.generateDropDownVars.bind(this, false));

        log.debug(`CSSTheme.start setting hotlinks listener`);
        this.theme.addTheme.setListener("hotlinks", function (event) {
            if (event.type === EventType.NodeEnabled) {
                const vk = new CSSVariableKind("hotlinks", "", [], self.cssGenerator);
                self.cssGenerator.generateHotlinkVariables(vk);
            }
        });

        // Charting color variables
        log.debug(`CSSTheme.start setting charting color listener`);
        const chartingVars = [this.theme.primary, this.theme.secondary, this.theme.tertiary, this.theme.lightModeBackground, this.theme.darkModeBackground];
        this.cssGenerator.addPropsVar("chartingColors", "", chartingVars, this.generateChartingVars.bind(this), { or: true });

        log.debug(`CSSTheme.start exit: theme=${this.theme.name}`);
    }

    public stop() {
        // Cancel all of the listener subscriptions
        this.listenerSubscriptions.forEach(ls => ls.cancel());
    }

    private setShadeListener(args: ShadeListenerArgs) {
        const ls = args.pcs.setListener(this.lkey(args.name), this.shadeListener.bind(this, args));
        this.listenerSubscriptions.push(ls);
    }

    private shadeListener(args: ShadeListenerArgs, vc: EventValueChange<Shade>) {
        log.debug(`shadeListener entry: ${args.name}`);
        const shade = vc.newValue;
        if (shade) {
            const name = args.name;
            const pcs = args.dm !== undefined ? [args.pcs, this.theme.darkModeBackground] : [args.pcs];
            const vk = new CSSVariableKind(name, "", pcs, this.cssGenerator);
            let sb = shade.getBuilder(true);
            const dmPrefix = args.dm ? args.dm.prefix || "dm-" : undefined;
            this.setShadeVars(name, true, sb.getCSSPrefix(), args, shade, vk);
            if (dmPrefix) {
                log.debug(`Getting dark mode shade for ${args.name}`);
                let dmShade = args.dm?.corresponding ? shade.buildShades(false)[shade.index] : this.theme.getDarkModeShade(shade);
                if (dmShade) {
                    log.debug(`Got dark mode shade for ${args.name}: ${dmShade.getHexOrRGBA()}`);
                    sb = dmShade.getBuilder(false);
                    this.setShadeVars(name, false, sb.getCSSPrefix(), args, dmShade, vk);
                } else {
                    log.debug(`Did not find dark mode shade for ${args.name}; therefore, not setting CSS variable ${name}`);
                }
            }
            if (args.palette) {
                let sb = shade.getBuilder(true);
                this.setPaletteVars(name, true, sb.getCSSPrefix(), args, sb.build(shade), vk);
                if (dmPrefix) {
                    sb = shade.getBuilder(false);
                    this.setPaletteVars(name, false, sb.getCSSPrefix(), args, sb.build(shade), vk);
                }
            }
        }
    }

    private setShadeVars(name: string, lm: boolean, prefix: string, args: ShadeListenerArgs, shade: Shade, vk: CSSVariableKind) {
        vk.setShadeVar(`${prefix}${name}`, shade);
        if (args.half) vk.setShadeVar(`${prefix}${name}-half`, shade.getHalfShade());
        if (args.quarter) vk.setShadeVar(`${prefix}${name}-quarter`, shade.getQuarterShade());
        if (args.on) {
            const onShade = shade.getOnShade2(lm);
            vk.setShadeVar(`${prefix}on-${name}`, onShade);
            if (args.half) vk.setShadeVar(`${prefix}on-${name}-half`, onShade.getHalfShade());
            if (args.quarter) vk.setShadeVar(`${prefix}on-${name}-quarter`, onShade.getQuarterShade());
        }
    }

    private setPaletteVars(name: string, lm: boolean, prefix: string, args: ShadeListenerArgs, shades: Shade[], vk: CSSVariableKind) {
        shades.forEach(shade => {
            vk.setShadeVar(`${prefix}${name}-${shade.id}`, shade);
            if (args.on) vk.setShadeVar(`${prefix}on-${name}-${shade.id}`, shade.getOnShade2(lm));
        });
    }

    private setShadeGroupListener(type: string, prop: PropertyColorShade) {
        const ls = prop.setListener(this.lkey(type), this.shadeGroupListener.bind(this, type, prop));
        this.listenerSubscriptions.push(ls);
    }

    private setBackgroundListener(name: string, lm: boolean, pcp: PropertyColorPair) {
        const ls = pcp.setListener(this.lkey(name), this.backgroundListener.bind(this, name, lm, pcp));
        this.listenerSubscriptions.push(ls);
    }

    private backgroundListener(name: string, lm: boolean, pcp: PropertyColorPair, _: EventValueChange<ColorPair>) {
        const vars = this.theme.getBackgroundVariables(pcp);
        if (!vars) return;
        log.debug(`backgroundListener entry - name=${name}`)
        const vk = new CSSVariableKind(name, "", [pcp], this.cssGenerator);
        const prefix = lm ? "" : "dm-";
        vk.setShadeVarRef(`${prefix}background`, vars.primary);
        vk.setShadeVarRef(`${prefix}background-secondary`, vars.secondary);
        vk.setShadeVarRef(`${prefix}on-background-secondary`, vars.secondary.getOnShade2(lm));
        vk.setShadeVarRef(`${prefix}border`, vars.borderColor);
        vk.setShadeVarRef(`${prefix}chip`, vars.chip);
        vk.setShadeVarRef(`${prefix}on-chip`, vars.onChip);
        vk.setShadeVarRef(`${prefix}color-drop`, vars.colorDrop);
        vk.setShadeVarRef(`${prefix}groupButtonBG`, vars.groupButton);
        vk.setShadeVarRef(`${prefix}on-groupButtonBG`, vars.groupButton.getOnShade2(lm));
        vk.setShadeVarRef(`${prefix}line-color`, vars.lineColor);
        vk.setShadeVarRef(`${prefix}surface`, vars.surface);
        if (lm) {
            vk.setShadeVarRef(`on-surface`, vars.surface.getOnShade2(lm));
            vk.setShadeVarRef("on-background", vars.primary.getOnShade2(lm));
        } else {
            vk.setVar("dm-on-background", "rgba(255,255,255,0.6)");
        }
        log.debug(`backgroundListener exit - ${name}`);
    }

    private setElevationsListener(lm: boolean) {
        const ls = this.theme.darkModeBackground.setListener(this.lkey("css.elevations"), this.elevationsListener.bind(this, lm));
        this.listenerSubscriptions.push(ls);
    }

    private elevationsListener(lm: boolean, _: EventValueChange<ColorPair>) {
        log.debug(`elevationsListener entry`)
        const pcp = this.theme.darkModeBackground;
        const vk = new CSSVariableKind("css.elevations", "", [pcp], this.cssGenerator);
        const prefix = lm ? "" : "dm-";
        // Set elevation backgrounds
        const lmeShades = this.theme.getElevationShades(lm);
        for (let i = 0; i < lmeShades.length; i++) {
            vk.setShadeVarRef(`${prefix}elevation-bg-${i}`, lmeShades[i]);
            vk.setShadeVarRef(`${prefix}on-elevation-bg-${i}`, lmeShades[i].getOnShade2(lm));
        }
        log.debug(`elevationsListener exit`);
    }

    private shadeGroupListener(type: string, prop: PropertyColorShade, vc: EventValueChange<Shade>): void {
        const shade = vc.newValue;
        if (!shade) return;
        log.debug(`shadeGroupListener entry: type=${type}`);
        const vars = this.theme.getShadeGroups(shade);
        const vk = new CSSVariableKind(type, "", [prop], this.cssGenerator);
        // Set light and dark mode button CSS variables
        vk.setModeVars(type, true, vars.lm);
        vk.setModeVars(type, false, vars.dm);
        log.debug(`shadeGroupListener exit: type=${type}`);
    }

    public setShadeVar(name: string, kind: CSSVariableKind, shade: Shade) {
        this.cssGenerator.setShadeVar(name, kind, shade);
    }

    private generateDropDownVars(lm: boolean, vk: CSSVariableKind): void {
        log.debug(`generateDropDownVars enter - lm=${lm}`);
        const mfs = this.cssGenerator.molecules.dropdowns.menuFocusState;
        const mfsVal = mfs.getValue();
        if (!mfsVal) {
            log.debug(`generateDropDownVars exit - lm=${lm} (no menu focus state)`);
            return;
        }
        const bg = lm ? this.theme.lightModeBackground : this.theme.darkModeBackground;
        const bgVars = this.theme.getBackgroundVariables(bg);
        if (!bgVars) {
            log.debug(`generateDropDownVars exit - lm=${lm} (no background variables)`);
            return;
        }
        const surfaceShade = bgVars.surface;
        const buttonShade = this.theme.button.getValue();
        if (!buttonShade) {
            log.debug(`generateDropDownVars exit - lm=${lm} (no button shade)`);
            return undefined;
        }
        // Set 3 CSS variables based on the dropdowns selection
        const var1 = lm ? "dropdown-focus-theme" : "dm-dropdown-focus-theme";
        const var2 = lm ? "on-dropdown-focus-bg" : "dm-on-dropdown-focus-bg";
        const var3 = lm ? "on-dropdown-hover-bg" : "dm-on-dropdown-hover-bg";
        if (mfsVal === Dropdowns.FULL_COLOR) {
            vk.setVar(var1, "100%");
            vk.setVar(var2, buttonShade.getOnShade2(lm).getRGBA());
            vk.setVar(var3, surfaceShade.mix(buttonShade, 0.5).getContrastShade(lm).hex);
        } else if (mfsVal === Dropdowns.LEFT_BORDER_ONLY) {
            vk.setVar(var1, "var(--spacing-half)");
            const onSurfaceHex = surfaceShade.getOnShade2(lm).getRGBA();
            vk.setVar(var2, onSurfaceHex);
            vk.setVar(var3, onSurfaceHex);
        } else {
            throw new Error(`Invalid dropdown menu focus state: ${mfsVal}`);
        }
        if (lm) {
            vk.setVars({
                "dropdown-hover-bg": "linear-gradient(90deg, var(--button-half) var(--dropdown-focus-theme), var(--transparent) var(--dropdown-focus-theme)) !important",
                "on-dropdown-hover-bg": "var(--on-surface)",
            });
        } else {
            vk.setVars({
                "dm-dropdown-hover-bg": "linear-gradient(90deg, var(--dm-button-half) var(--dm-dropdown-focus-theme), var(--transparent) var(--dm-dropdown-focus-theme)) !important",
                "dm-on-dropdown-hover-bg": "var(--dm-on-surface)",
            });
        }
        log.debug(`generateDropDownVars exit - lm=${lm}`);
    }

    /*
     * Generate the charting CSS variables
     */
    private generateChartingVars(vk: CSSVariableKind) {
        log.debug(`generateChartingVars enter`);
        const primary = this.theme.primary.getValue();
        const secondary = this.theme.secondary.getValue();
        const tertiary = this.theme.tertiary.getValue();
        const lmbg = this.theme.lightModeBackground.getValue();
        if (primary) {
            if (secondary) {
                if (tertiary) {
                    log.debug(`Primary, secondary, and tertiary are set`);
                    if (lmbg) {
                        if (lmbg.lighter) {
                            this.genCV3LM1(vk);
                        } else {
                            this.genCV3LM2(vk);
                        }
                    }
                    this.genCV3DM(vk);
                } else {
                    log.debug(`Primary, secondary, and not tertiary are set`);
                    if (lmbg) {
                        if (lmbg.lighter) {
                            this.genCV2LM1(vk);
                        } else {
                            this.genCV2LM2(vk);
                        }
                    }
                    this.genCV2DM(vk);
                }
            } else {
                log.debug(`Primary, but not secondary or tertiary are set`);
                if (lmbg) {
                    if (lmbg.lighter) {
                        this.genCV1LM1(vk);
                    } else {
                        this.genCV1LM2(vk);
                    }
                }
                this.genCV1DM(vk);
                this.genComplimentaryColors(vk, primary);
            }
        } else {
            log.debug(`Neither primary, secondary, nor tertiary are set`);
        }
        log.debug(`generateChartingVars exit`);
    }

    private genComplimentaryColors(vk: CSSVariableKind, primary: Shade) {
        log.debug(`Begin generating complimentary colors`);
        const shades = primary.buildComplimentaryShades();
        for (let i = 0; i < shades.length; i++) {
            const shade = shades[i];
            const shadeBuilders = shade.getBuilder().getAll();
            for (const sb of shadeBuilders) {
                this.genComplimentaryColors2(vk, `${sb.getCSSPrefix()}color${i + 1}`, sb.build(shade));
            }
        }
        log.debug(`End generating complimentary colors`);
    }

    private genComplimentaryColors2(vk: CSSVariableKind, prefix: string, shades: Shade[]) {
        this.setComplimentaryVar(vk, `${prefix}-050`, shades[0].getHalfShade());
        for (let i = 0; i < shades.length; i++) {
            const shade = shades[i];
            const name = `${prefix}-${(i + 1) * 100}`;
            this.setComplimentaryVar(vk, name, shade);
        }
    }

    private setComplimentaryVar(vk: CSSVariableKind, name: string, shade: Shade) {
        const value = shade.getHexOrRGBA();
        log.debug(`Setting complimentary var: ${name} = ${value}`);
        vk.setVar(name, value);
    }

    private genCV1LM1(vk: CSSVariableKind) {
        this.genCV(vk, true, [
            "1", "primary-400",
            "2", "primary-500",
            "3", "primary-700",
            "4", "primary-900",
            "5", "color1-500",
            "6", "color1-700",
            "7", "color1-900",
            "8", "color2-500",
            "9", "color2-700",
            "10", "color2-900",
        ]);
    }

    private genCV1LM2(vk: CSSVariableKind) {
        this.genCV(vk, true, [
            "1", "primary-050",
            "2", "primary-100",
            "3", "primary-300",
            "4", "primary-500",
            "5", "color1-050",
            "6", "color1-100",
            "7", "color1-300",
            "8", "color2-050",
            "9", "color2-100",
            "10", "color2-300",
        ]);
    }

    private genCV1DM(vk: CSSVariableKind) {
        this.genCV(vk, false, [
            "1", "primary-050",
            "2", "primary-100",
            "3", "primary-300",
            "4", "primary-500",
            "5", "color1-050",
            "6", "color1-100",
            "7", "color1-300",
            "8", "color2-050",
            "9", "color2-100",
            "10", "color2-300",
        ]);
    }

    private genCV2LM1(vk: CSSVariableKind) {
        this.genCV(vk, true, [
            "1", "primary-400",
            "2", "primary-500",
            "3", "primary-700",
            "4", "primary-900",
            "5", "secondary-400",
            "6", "secondary-500",
            "7", "secondary-700",
            "8", "secondary-900",
            "9", "gray-500",
            "10", "black",
        ]);
    }

    private genCV2LM2(vk: CSSVariableKind) {
        this.genCV(vk, true, [
            "1", "primary-050",
            "2", "primary-100",
            "3", "primary-300",
            "4", "primary-500",
            "5", "secondary-050",
            "6", "secondary-100",
            "7", "secondary-300",
            "8", "secondary-500",
            "9", "grey-300",
            "10", "white",
        ]);
    }

    private genCV2DM(vk: CSSVariableKind) {
        this.genCV(vk, false, [
            "1", "primary-050",
            "2", "primary-100",
            "3", "primary-300",
            "4", "primary-500",
            "5", "secondary-050",
            "6", "secondary-100",
            "7", "secondary-300",
            "8", "secondary-500",
            "9", "grey-300",
            "10", "white",
        ]);
    }

    private genCV3LM1(vk: CSSVariableKind) {
        this.genCV(vk, true, [
            "1", "primary-400",
            "2", "primary-500",
            "3", "primary-700",
            "4", "primary-900",
            "5", "secondary-500",
            "6", "secondary-700",
            "7", "secondary-900",
            "8", "tertiary-500",
            "9", "tertiary-700",
            "10", "tertiary-900",
        ]);
    }

    private genCV3LM2(vk: CSSVariableKind) {
        this.genCV(vk, true, [
            "1", "primary-050",
            "2", "primary-100",
            "3", "primary-300",
            "4", "primary-500",
            "5", "secondary-050",
            "6", "secondary-200",
            "7", "secondary-400",
            "8", "tertiary-050",
            "9", "tertiary-200",
            "10", "tertiary-400",
        ]);
    }

    private genCV3DM(vk: CSSVariableKind) {
        this.genCV(vk, false, [
            "1", "primary-050",
            "2", "primary-100",
            "3", "primary-300",
            "4", "primary-500",
            "5", "secondary-050",
            "6", "secondary-200",
            "7", "secondary-400",
            "8", "tertiary-050",
            "9", "tertiary-200",
            "10", "tertiary-400",
        ]);
    }

    private genCV(vk: CSSVariableKind, lm: boolean, args: string[]) {
        for (let i = 0; i < args.length; i += 2) {
            vk.setVar(`${lm ? "" : "dm-"}chart-${args[i]}`, `var(--${lm ? "" : "dm-"}${args[i + 1]})`);
        }
        for (let i = 0; i < args.length; i += 2) {
            vk.setVar(`${lm ? "" : "dm-"}on-chart-${args[i]}`, `var(--${lm ? "" : "dm-"}on-${args[i + 1]})`);
        }
    }

    private lkey(name: string): string {
        return this.cssGenerator.lkey(`CSSTheme.${name}`);
    }

}

export class CSSVariableKind {

    public readonly name: string;
    public readonly unit: string;
    public readonly props: Property<any>[] = [];
    public readonly cssGenerator: CSSGenerator;
    public readonly componentKeys: string[] = [];

    constructor(name: string, unit: string, props: Property<any>[], cssGenerator: CSSGenerator) {
        this.name = name;
        this.unit = unit;
        props.forEach(prop => this.addProp(prop));
        this.cssGenerator = cssGenerator;
    }

    public setVar(name: string, value?: any) {
        this.cssGenerator.setVar(name, this.unit, this, value);
    }

    public setVars(vars: { [name: string]: string }) {
        Object.keys(vars).forEach(key => this.setVar(key, vars[key]));
    }

    public setShadeVar(name: string, shade?: Shade) {
        if (shade) {
            this.setVar(name, shade.getHexOrRGBA());
        } else {
            this.setVar(name);
        }
    }

    public setModeVars(type: string, lm: boolean, bmsg: ModeShadeGroups) {
        this.setGroupVars("White", type, lm, bmsg.white);
        this.setGroupVars("Black", type, lm, bmsg.black);
        this.setGroupVars("Tertiary", type, lm, bmsg.tertiary);
        this.setGroupVars("Gradient1", type, lm, bmsg.gradient1);
        this.setGroupVars("Gradient2", type, lm, bmsg.gradient2);
        this.setGroupVars("Gradient3", type, lm, bmsg.gradient3);
        this.setGroupVars("Default", type, lm, bmsg.default);
    }

    private setGroupVars(name: string, type: string, lm: boolean, sg: ShadeGroup) {
        if (name === "Default") {
            const prefix = lm ? "" : "dm-";
            this.setShadeVarRef(`${prefix}${type}`, sg.shade);
            this.setShadeVarRef(`${prefix}on-${type}`, sg.onShade, true);
            this.setShadeVarRef(`${prefix}${type}-half`, sg.halfShade);
        }
        // Shade isn't correct, so hardcode for now
        else if (name === "Tertiary") {
            const vars = this.cssGenerator.getVars();

            if (lm) {
                const onPrimary = vars["--on-primary"];
                this.cssGenerator.setVar(`${type}OnTertiary`, "", this, onPrimary);
                const color = (onPrimary == "#121212") ? "#FFFFFF" : "#121212";
                this.cssGenerator.setVar(`on${type}OnTertiary`, "", this, color);
                const hColor = (onPrimary == "#121212") ? "rgba(255,255,255,0.5)" : "rgba(0,0,0,0.5)";
                this.cssGenerator.setVar(`on${type}HalfOnTertiary`, "", this, hColor);
            }
            else {
                this.cssGenerator.setVar(`dm${type}OnTertiary`, "", this, "rgba(255,255,255,0.6)");
                this.cssGenerator.setVar(`dmon${type}OnTertiary`, "", this, "#121212");
                this.cssGenerator.setVar(`dmHalf${type}HalfOnTertiary`, "", this, "rgba(255,255,255,0.3)");
            }
        }
        // Shade isn't correct, so hardcode for now
        else if (name === "Gradient3") {
            const vars = this.cssGenerator.getVars();

            if (lm) {
                this.cssGenerator.setVar(`${type}OnGradient3`, "", this, "#121212");
                this.cssGenerator.setVar(`on${type}OnGradient3`, "", this, "#FFFFFF");
                this.cssGenerator.setVar(`on${type}HalfOnGradient3`, "", this, "rgba(0,0,0,0.5)");
            }
            else {
                this.cssGenerator.setVar(`dm${type}OnGradient3`, "", this, "rgba(255,255,255,0.6)");
                this.cssGenerator.setVar(`dmon${type}OnGradient3`, "", this, "#121212");
                this.cssGenerator.setVar(`dmHalf${type}HalfOnGradient3`, "", this, "rgba(255,255,255,0.3)");
            }
        }
        else {
            const prefix = lm ? "" : "dm";
            this.setShadeVarRef(`${prefix}${type}On${name}`, sg.shade);
            this.setShadeVarRef(`${prefix}on${type}On${name}`, sg.onShade, true);
            this.setShadeVarRef(`${prefix}${type}HalfOn${name}`, sg.halfShade);
        }
    }

    public setShadeVarRef(name: string, shade: Shade, core?: boolean) {
        const varName = core ? getCoreShadeVarName(shade) : getShadeVarName(shade);
        if (varName) {
            this.cssGenerator.setVar(name, "", this, `var(--${varName})`);
        } else {
            this.setShadeVar(name, shade);
        }
    }

    private addProp(prop: Property<any>) {
        this.props.push(prop);
        let p = prop.getParent();
        let b = true;
        while (b && p) {
            const parent = p?.getParent();
            if (parent?.name == "atoms") b = false;
            else if (parent?.name == "molecules") b = false;
            else if (parent?.name == "organisms") b = false;
            else p = parent;
        }
        if (!p) throw new Error(`Property ${prop.name} has no parent`);
        if (this.componentKeys.indexOf(p.key) < 0) {
            this.componentKeys.push(p.key);
        }
    }

}

export class CSSDynamicVariableKind extends CSSVariableKind {

    private cb?: (propVar: CSSVariableKind) => void;

    constructor(name: string, unit: string, props: Property<any>[], cssGenerator: CSSGenerator, opts?: {
        or?: boolean,
        cb?: (propVar: CSSVariableKind) => void,
    }) {
        super(name, unit, props, cssGenerator);
        opts = opts || {};
        this.cb = opts.cb;
        const listenerKey = cssGenerator.lkey(name);
        switch (props.length) {
            case 0:
                throw new Error('Empty property array');
            case 1:
                props[0].setListener(listenerKey, this.singlePropCallback.bind(this));
                break;
            default:
                if (!this.cb) throw new Error(`Multiple property variable requires a callback (${JSON.stringify(props)})`);
                new PropertyGroupListener(listenerKey, props, this.multiplePropCallback.bind(this), opts);
                break;
        }
    }

    private singlePropCallback(vc: EventValueChange<any>): void {
        if (this.cb) {
            this.cb(this);
        } else {
            this.setValue(this.name, this.unit, vc.newValue);
        }
    }

    private multiplePropCallback(pgl: PropertyGroupListener): void {
        if (!this.cb) throw new Error('Multiple property variable requires a callback');
        this.cb(this);
    }

    private setValue(name: string, unit: string, value: any) {
        this.cssGenerator.setVar(name, unit, this, value);
    }

}

interface DMShadeListenerArgs {
    prefix?: string;
    corresponding?: boolean;
}

interface ShadeListenerArgs {
    name: string;
    pcs: PropertyColorShade;
    half?: boolean;
    quarter?: boolean;
    on?: boolean;
    dm?: DMShadeListenerArgs;
    palette?: boolean;
}

export class CSSVariable {

    public name: string;
    public unit: string;
    public value?: any;
    public kind: CSSVariableKind;

    constructor(name: string, unit: string, kind: CSSVariableKind, value?: any) {
        this.name = name;
        this.unit = unit;
        this.value = value;
        this.kind = kind;
    }

}

export type CSSVarGroupListener = (vg: CSSVarGroup) => void;

export class CSSVarGroup implements IVarGroup {

    public readonly name: string;
    public readonly vars: { [name: string]: string } = {};
    private listeners: { [key: string]: CSSVarGroupListener } = {};

    constructor(name: string) {
        this.name = name;
    }

    public setListener(key: string, listener?: CSSVarGroupListener) {
        if (listener) {
            this.listeners[key] = listener;
            listener(this);
        } else {
            delete this.listeners[key];
        }
    }

    public setVar(name: string, value?: string): void {
        log.debug(`CSSVarGroup ${this.name}: setVar ${name}=${value}`);
        if (value !== undefined) {
            this.vars[name] = value;
        } else {
            delete this.vars[name];
        }
        this.notifyListeners();
    }

    public notifyListeners() {
        // Notify the listeners that something has changed in this var group
        const listeners = Object.values(this.listeners);
        log.debug(`CSSVarGroup notifying ${listeners.length} listeners`);
        listeners.forEach(listener => {
            try {
                listener(this);
            } catch (e) {
                console.log(`ERROR: failed calling VarGroup listener`, e);
            }
        });
    }
}

function getShadeVarName(shade: Shade): string | undefined {
    if (shade.hasBuilder() && shade.hasColor() && shade.index >= 0 && shade.opacity === 1) {
        const builder = shade.getBuilder();
        const prefix = builder.getCSSPrefix();
        const color = shade.getColor();
        return `${prefix}${color.name}-${shade.index * 100}`;
    }
    return getCoreShadeVarName(shade);
}

function getCoreShadeVarName(shade: Shade): string | undefined {
    if (shade.coreShadeName) {
        return `${shade.coreShadeName.toLowerCase()}`;
    }
    return undefined;
}

function shadowToCSS(vk: CSSVariableKind) {
    const prop = vk.props[0] as PropertyShadowSelectable;
    const ci = prop.getCategoryAndIndex();
    if (!ci || !ci.category.css || ci.memberIndex < 0) {
        vk.setVar(vk.name, undefined);
    } else {
        vk.setVar(vk.name, `var(--${ci.category.css}-${ci.memberIndex + 1})`);
    }
}

function colorToCSS(vk: CSSVariableKind) {
    const val = vk.props[0].getValue();
    vk.setVar(vk.name, val.hex);
}
