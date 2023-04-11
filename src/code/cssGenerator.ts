/*
 * Copyright (c) 2023 Discover Financial Services
 * Licensed under MIT License. See License.txt in the project root for license information
 */
import { Atoms, Shade, ColorTheme, ShadeGroup, ModeShadeGroups, StateSetting, BevelSettingsProps, HotlinkModeVariables, OnHotlink, OnHotlinkWithDecoration, TypographyStyling} from "../atoms/index";
import { Molecules, Dropdowns } from "../molecules/index";
import { Organisms } from "../organisms/index";
import { PropertyColorShade, PropertyPercentage, PropertyGroupListener, PropertyColorPair, Property, ListenerSubscription, ColorPair } from "../common/index";
import { IDesignSystem, EventValueChange, VarListener, IVarGroup, IColor, EventType } from "../interfaces";

import { Logger } from "../util/logger";

const log = new Logger("css");

/**
 * The CSS code generator.
 * @category Generators
 */
export class CSSGenerator {

    public readonly ds: IDesignSystem;
    public readonly atoms: Atoms;
    public readonly molecules: Molecules;
    public readonly organisms: Organisms;
    private readonly cssVars: {[key:string]: string} = {};
    private readonly cssVarListeners: {[key:string]: VarListener} = {};
    private readonly varGroups: {[key:string]: CSSVarGroup} = {};
    private readonly cssColors: {[name: string]: CSSColor} = {};
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

    public getVars(): {[name: string]: string} {
        return this.cssVars;
    }

    public getVarGroupKeys(): string[] {
        return Object.keys(this.varGroups);
    }

    private setStaticVars() {
        const vk = new CSSVariableKind("static","",[], this);
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
            "primaryDarkBG": "var(--black)",
            "secondaryDarkBG": "var(--black)",
            "on-background-secondary":  "var(--on-gray-0)",
            "dm-on-background-secondary":  "var(--dm-white)",
            "background-tertiary": "var(--primary)",
            "on-background-tertiary":  "var(--on-primary)",
            "dm-background-tertiary": "var(--dm-primary-800)",
            "dm-on-background-tertiary":  "var(--dm-white)",
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
            "dm-on-surface":  "var(--dm-on-background)",
            "white-bg": "#ffffff",
            "quiet": "68%",
            "disabled": "38%",
            "hover": "50%",
            "input-hover": "rgba(255,255,255,.9)",
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
            "buttonCharacterSpacing": "var(--CTALetterSpacing)",
            "sm-buttonCharacterSpacing": "var(--CTALetterSpacing)",
        });
    }

    private setAtomVars() {
        const self = this;
        const atoms = this.atoms;

        // Listen for the addition of colors or removal of colors from the color palette.
        atoms.colorPalette.setColorListener(this.lkey("colorPalette"), this.colorListener.bind(this));

        // Listen for default theme changes
        atoms.colorThemes.defaultTheme.setPropertyListener(this.lkey("colorTheme"), this.defaultThemeListener.bind(this));

        this.coreSystemSettings();

        // Listen for changes to the input background
        this.addPropVar("myInputBackground", "", atoms.inputBackground.overlayColor, this.generateInputBackgroundVariables.bind(this));

        // Listen for the state settings changes
        atoms.stateSettings.all.forEach(ss => this.addPropVar(ss.name, "", ss.prop, this.setStateSettingVar.bind(this, ss)));

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
        this.addPropVar("standard-LineHeight", "%", fs.standardLineHeight);
        this.addPropVar("header-LineHeight", "%", fs.headerLineHeight);
        this.addPropVar("sm-LineHeight", "%", fs.smallLineHeight);

        // Display and header styles
        const dhs = atoms.displayAndHeaderStyles;
        this.addPropVar("headerChange", "", dhs.percentChangeInHeaderDisplaySizes); //, function(vk) {
        this.addPropVar("headerWeight", "", dhs.headingDisplayFontWeight);
        for (var i=0; i<dhs.displayStyles.length; i++) {
            this.generateTypographyVars(dhs.displayStyles[i], "Display"+(i+1));
        }
        for (var i=0; i<dhs.headerStyles.length; i++) {
            this.generateTypographyVars(dhs.headerStyles[i], "h"+(i+1));
        }

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
        this.addPropVar(prefix+"FontSize", "px", typography.fontSize);
        this.addPropVar(prefix+"FontWeight", "", typography.fontWeight);
        this.addPropVar(prefix+"FontFamily", "", typography.fontFamily);
        this.addPropVar(prefix+"LetterSpacing", "%", typography.letterSpacing);
    }

    private setMoleculeVars() {
        const ms = this.molecules;
        const vk = new CSSVariableKind("molecules","",[], this);
        // dropdowns
        const dd = ms.dropdowns;
        this.addPropVar("dropdown-elevation", "", dd.menuElevation, elevationToCSS);
        this.addPropVar("dropdown-radius", "", dd.borderRadius);
        vk.setVars({
            "dropdown-focus-bg": "linear-gradient(90deg, var(--button) var(--dropdown-focus-theme), var(--transparent) var(--dropdown-focus-theme))",
            "on-dropdown-focus-bg": "#ffffff",
            "dm-dropdown-focus-bg": "linear-gradient(90deg, var(--dm-button) var(--dropdown-focus-theme), var(--transparent) var(--dropdown-focus-theme))",
            "dm-on-dropdown-focus-bg": "rgba(255,255,255,.6)",
            "dropdown-hover-style": "100%",
            "dropdown-hover-bg": "linear-gradient(90deg, var(--button-half) var(--dropdown-focus-theme), var(--transparent) var(--dropdown-focus-theme)) !important",
            "dm-dropdown-hover-bg": "linear-gradient(90deg, var(--button-half) var(--dropdown-focus-theme), var(--transparent) var(--dropdown-focus-theme))",
            "dm-on-dropdown-hover-bg": "rgba(255,255,255,.6)",
            "dropdown-bottom-hover-bg": "linear-gradient(0deg, var(--button-half) var(--dropdown-focus-theme), var(--transparent) var(--dropdown-focus-theme)) !important",
            "dm-dropdown-bottom-hover-bg": "linear-gradient(0deg, var(--dm-button) var(--dropdown-focus-theme), var(--transparent) var(--dropdown-focus-theme)) !important",
        });
        // standard button
        const stb = ms.standardButtons;
        stb.buttonText.setListener(this.lkey("stb.buttonText"), function(event) {
            const ctaSize = (stb.buttonText.getValue() === "CTA Small") ? "CTA-Small" : "CTA"
            vk.setVars({
                "buttonTypography": `var(--${ctaSize}FontWeight) var(--${ctaSize}FontSize) / var(--${ctaSize}LineHeight) var(--${ctaSize}FontFamily)`,
                "buttonTextDecoration": `var(--${ctaSize}TextDecoration)`,
                "buttonTextTransform": `var(--${ctaSize}TextTransform)`,
                "buttonLetterSpacing": `var(--${ctaSize}LetterSpacing)`,
            });    
        })
        this.addPropVar("button-padding", "", stb.horizontalPadding);
        this.addPropVar("button-border", "", stb.secondaryBorder);
        this.addPropVar("button-radius", "", stb.radius);
        this.addPropVar("button-minwidth", "", stb.minWidth);
        this.addPropVar("button-height", "", stb.height);
        this.addPropVar("button-elevation", "", stb.buttonElevation, elevationToCSS);
        this.addPropVar("button-bevel", "", stb.buttonBevel, bevelToCSS);
        vk.setVars({
            "button-shadow": "var(--button-elevation), var(--button-bevel)",
        });
        // small button
        const smb = ms.smallButtons;
        this.addPropVar("sm-button-height", "", smb.visibleHeight);
        this.addPropVar("sm-button-padding", "", smb.horizontalPadding);
        smb.buttonText.setListener(this.lkey("smb.buttonText"), function(event) {
            const ctaSize = (smb.buttonText.getValue() == "CTA Small") ? "CTA-Small" : "CTA"
            vk.setVars({
                "sm-buttonTypography": `var(--${ctaSize}FontWeight) var(--${ctaSize}FontSize) / var(--${ctaSize}LineHeight) var(--${ctaSize}FontFamily)`,
                "sm-buttonTextDecoration": `var(--${ctaSize}TextDecoration)`,
                "sm-buttonTextTransform": `var(--${ctaSize}TextTransform)`,
                "sm-buttonLetterSpacing": `var(--${ctaSize}LetterSpacing)`,
            });    
        })
        vk.setVars({
            "groupButton-radius": "calc(var(--radius-1) * var(--button-radius) * 1.6)",
            "groupButtonBG": "#ffffff", // TODO: This should be dynamic
            "on-groupButtonBG": "var(--textDark)",
            "dm-groupButtonBG": "rgba(0,0,0,.6)",
            "dm-on-groupButtonBG": "var(--dm-dmwhite)",
        });
        // chip
        const chip = ms.chips;
        this.addPropVar("chip-minwidth", "px", chip.minWidth);
        this.addPropVar("chip-height", "", chip.visibleHeight);
        this.addPropVar("chip-radius", "", chip.radius);
        this.addPropVar("chip-padding", "", chip.horizontalPadding);
        this.addPropVar("chip-elevation", "", chip.elevation, elevationToCSS);
        this.addPropVar("chip-bevel", "", chip.bevel, bevelToCSS);
        this.addPropVar("chip-text", "", chip.text, function(vk: CSSVariableKind) {
            const typography = (chip.text.getValue() === "Caption") ? "caption" : "caption-bold";
            vk.setVars({
                "chipTypography": `var(--${typography}FontWeight) var(--${typography}FontSize) / var(--${typography}LineHeight) var(--${typography}FontFamily)`,
                "chipTextTransform": `var(--${typography}TextTransform)`,
                "chipLetterSpacing": `var(--${typography}LetterSpacing)`,
            });    
        });
        // switch - TODO - part of charts?
        vk.setVars({
           "switch-height": "var(--spacing-3)",  // TODO: should be dynamic
           "switch-radius": "3", // TODO: should be dynamic
           "switch-bar-height": "0.5", // TODO: should be dynamic
           "switch-bar-radius": "0.5", // TODO: should be dynamic
        });
        // cards
        const card = ms.standardCards;
        this.addPropVar("card-padding", "", card.padding);
        this.addPropVar("card-gap", "", card.contentGap);
        this.addPropVar("card-radius", "", card.borderRadius);
        this.addPropVar("card-elevation", "", card.elevation, elevationToCSS);
        this.addPropVar("card-bevel", "", card.bevel, bevelToCSS);
        vk.setVars({
            "card-border": "var(--border-1)",
            "card-border-color": "var(--border)",
            "card-shadow": "var(--card-elevation), var(--card-bevel)",
        });
        // modals - TODO: modal-overlay comes modal molecule
        const modal = ms.modal;
        this.addPropVar("modal-radius", "px", modal.borderRadius);
        this.addPropVar("modal-elevation", "", modal.elevation, elevationToCSS);
        vk.setVars({
            "modal-padding": "2",
            "modal-border": "var(--spacing-2)",
            "modal-shadow": "var(--spacing-2)",
            "modal-overlay": "var(--spacing-2)",
        });
        vk.setVars({
            // TODO: Need to set tooltip-color & tooltip-oncolor for lm & dm 
            // The tooltip on-color should always the opposite of the background (dark vs white)
            "dmtooltip": "", // TODO: There should be a tooltip color and on-color for both lm and dm
            "tooltip-padding": "2",
            "tooltip-border": "var(--border-1)",
            "tooltip-elevation": "0",
        });
        const toast = ms.toasts;
        this.addPropVar("toast-radius", "", toast.handleBorderRadius);
        this.addPropVar("toast-elevation", "", toast.elevation, elevationToCSS);
        vk.setVars({
            "toast-padding": "2",
            "toast-bevel": "var(--bevel-0)",
            "toast-boxshadow": "var(--toast-elevation), var(--toast-bevel)",
        });
        // Images
        const image = ms.images;
        this.addPropVar("image-elevation", "", image.imageElevation, elevationToCSS);
        this.addPropVar("image-radius", "", image.generalImageBorderRadius);
        this.addPropVar("inline-image-height", "", image.listImageHeight);
        this.addPropVar("inline-image-image-radius", "", image.listImageBorderRadius);
        // TODO: How do I get values for image-border && image-shadow?
        // Avatar Images
        const avatar = ms.avatars;
        this.addPropVar("avatar-border", "px", avatar.mediumBorder);
        this.addPropVar("avatar-border-lg", "px", avatar.extraLargeBorder);
        this.addPropVar("avatar-elevation", "", avatar.elevation, elevationToCSS);
        vk.setVar("avatar-shadow", "var(--avatar-elevation)");
        // sliders
        const slider = ms.sliders;
        this.addPropVar("sliderhandleHeight", "", slider.visibleHeight);
        this.addPropVar("sliderhandleRadius", "", slider.handleBorderRadius);
        this.addPropVar("sliderhandleElevation", "px", slider.handleElevation);
        this.addPropVar("sliderbarHeight", "", slider.barHeight);
        this.addPropVar("barInBevel", "", slider.barInsetShadow);
        // popover
        const popover = ms.popovers;
        this.addPropVar("popoverRadius", "", popover.borderRadius);
        this.addPropVar("popoverElevation", "", popover.elevation, elevationToCSS);
        this.addPropVar("popoverBevel", "", popover.bevel, bevelToCSS);
        vk.setVar("popoverShadow", "var(--popoverElevation), var(--popoverBevel)");
    }

    private setOrganismVars() {
        const org = this.organisms;
        const vk = new CSSVariableKind("organism","",[], this);
        vk.setVars({
          "leftNav": "var(--gray-100)",
          "on-leftNav": "var(--on-gray-100)",
          "leftNavPadding": "var(--spacing-2)",
        });
        const fc = org.footerAndCopyright;
        this.addPropVar("footer-padding", "", fc.footerVerticalPadding);
        this.addPropVar("copyright-padding", "", fc.copyrightVerticalPadding);
        vk.setVars({
            "footer": "var(--gray-900)",
            "on-footer": "var(--on-gray-900)",
            "dm-footer": "var(--dm-gray-900)",
            "dm-on-footer": "var(--dm-on-gray-900)",
        });
        vk.setVars({
            "copyright": "var(--nearblack)",
            "on-copyright": "var(--on-nearblack)",
            "dm-copyright": "var(--nearblack)",
            "dm-on-copyright": "var(--dm-on-nearblack)",
        });
        vk.setVar("p-padding", "1");
        vk.setVar("section-padding", "3");
        // navbar primary
        const pnav = org.primaryNav;
        this.addPropVar("navbarPrimary-padding", "", pnav.verticalPadding);
        this.addPropVar("navbarPrimary-position", "", pnav.fixed, function(vk: CSSVariableKind) {
            vk.setVar(vk.name, pnav.fixed.getValue() ? "fixed" : "relative");
        });
        // navbar secondary /
        const snav = org.secondaryNav;
        this.addPropVar("navbarSecondary-padding", "", snav.verticalPadding);
        this.addPropVar("navbarSecondary-position", "", snav.sticky, function(vk: CSSVariableKind) {
            vk.setVar(vk.name, snav.sticky.getValue() ? "sticky" : "fixed");
        });
        vk.setVar("navbarSecondary-stickyTop", "0"); // TODO: should be dynamic
        // hero
        const hero = org.hero;
        this.addPropVar("hero-gap", "px", hero.verticalGap);
        vk.setVars({
            "hero-padding": "3",
            "hero-heroTitleTypography": "var(--Display1FontWeight) var(--Dislay1FontSize) / var(--Display1LineHeight) var(--Display1FontFamily)",
            "hero-heroTitleTransform": "var(--Display1TextTransform)",
            "hero-heroTitleSpacing": "var(--Dislay1LetterSpacing)",
            "hero-heroBodyTypography": "var(--body1FontWeight) var(--body1FontSize) / var(--body1LineHeight) var(--body1FontFamily)",
            "hero-heroBodyTransform": "var(--body1TextTransform)",
            "hero-heroBodySpacing": "var(--body1LetterSpacing)",
            "hero-title-gap": "16px",
            "hero-justify-content": "flex-start",
        });
        // tables
        vk.setVars({
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
        let vk = new CSSVariableKind("", "", [], this);
        // targets
        this.addPropVar("min-target", "px", atoms.minimumTarget.minHeight);
        this.addPropVar("mobile-target", "px", atoms.minimumTarget.minHeight);
        this.addPropVar("animation-speed", "ms", atoms.animationSettings.animationTiming);
        this.addPropVar("animation-distance", "px", atoms.animationSettings.hoverAndFocusAnimationDistance);
        this.addPropVar("animation-focus-distance", "px", atoms.animationSettings.hoverAndFocusAnimationDistance);
        // radius
        vk = new CSSVariableKind("", "", [atoms.borderSettings.baseBorderRadius], this);
        vk.setVar("radius-0", "0px");
        this.addPropVar("radius-1", "px", atoms.borderSettings.baseBorderRadius);
        for (let i = 2; i <= 10; i++) vk.setVar(`radius-${i}`, `calc(var(--radius-1) * ${i})`);
        vk.setVar(`radius-quarter`, `calc(var(--radius-1 / 4)`);
        vk.setVar(`radius-half`, `calc(var(--radius-1 / 2)`);
        // spacing
        vk = new CSSVariableKind("", "", [atoms.gridSettings.grid], this);
        vk.setVar("spacing-0", "0px");
        this.addPropVar("spacing-1", "px", atoms.gridSettings.grid);
        for (let i = 2; i <= 10; i++) vk.setVar(`spacing-${i}`, `calc(var(--spacing-1) * ${i})`);
        vk.setVar(`spacing-quarter`, `calc(var(--spacing-1 / 4)`);
        vk.setVar(`spacing-half`, `calc(var(--spacing-1 / 2)`);
        vk.setVar(`negative-size-half`, `calc(0 - var(--spacing-1 / 2)`);
        // borders
        vk = new CSSVariableKind("", "", [atoms.borderSettings.baseBorderWidth], this);
        vk.setVar("border-0", "0px");
        this.addPropVar("border-1", "px", atoms.borderSettings.baseBorderWidth);
        for (let i = 2; i <= 4; i++) vk.setVar(`border-${i}`, `calc(var(--border-1) * ${i})`);
        // elevation settings
        vk = new CSSVariableKind("", "", [atoms.elevationSettings.percentageChange], this);
        this.addPercentToDecimal("elevation-change", atoms.elevationSettings.percentageChange);
        for (let i = 2; i <= 9; i++) vk.setVar(`change-${i}`, `calc(1 + calc(var(--elevation-change) * ${i}))`);
        const emitChangeVars = function(name: string) {
            for (let i = 2; i <= 9; i++) vk.setVar(`${name}-${i}`, `calc(var(--${name}) * var(--change-${i}))`);
        }
        atoms.elevationSettings.horizontalShadowLength.setListener("css.coreSystemSettings", function(vc: EventValueChange<number>) {
            vk.setVar(`elevation-horizontal`, `${vc.newValue}px`);
            vk.setVar(`reverse-elevation-horizontal`, `-${vc.newValue}px`);
        }, [EventType.ValueChanged]);
        atoms.elevationSettings.verticalShadowLength.setListener("css.coreSystemSettings", function(vc: EventValueChange<number>) {
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
        vk.setVar("elevation-0", "0 0 0 0 rgba(0,0,");
        for (let i = 1; i <= 9; i++) {
            const vc = `var(--change-${i})`;
            vk.setVar( `elevation-${i}`, 
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

        this.addPropsVar("focusBlur", "px", [atoms.gridSettings.grid, atoms.focusStates.addFocusBlur], this.generateFocusBlurVariables.bind(this));
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
        const vk = new CSSVariableKind(p, "", [], this);
        if (props.standard) {
            vk.setVar("bevel-0", "0 0 0 0 rgba(0,0,0,0)");
            vk.setVar("bevel-1", "inset var(--bevel-horizontal) var(--bevel-vertical) var(--bevel-blur) var(--bevel-spread) rgba(255, 255, 255, var(--bevel-light-opacity)), inset calc(0px-var(--bevel-horizontal)) calc(0px - var(--bevel-vertical)) var(--bevel-blur) var(--bevel-spread) rgba(0,0,0,var(--bevel-dark-opacity))");
            for (let i = 2; i <= 9; i++) {
                const bc = `calc(1 + calc(var(--bevel-change) * ${i}))`;
                vk.setVar(`bevel-${i}`, 
                    `inset calc(var(--bevel-horizontal) * ${bc}) ` +
                    `calc(var(--bevel-vertical) * ${bc}) ` +
                    `var(--bevel-blur) ` +
                    `var(--bevel-spread) ` +
                    `rgba(255, 255, 255, var(--bevel-light-opacity)), ` +
                    `inset calc(0px - calc(var(--bevel-horizontal) * ${bc}) ` +
                    `calc(0px - calc(var(--bevel-vertical) * ${bc}) ` +
                    `var(--bevel-blur) ` +
                    `var(--bevel-spread) ` +
                    `rgba(0,0,0,calc(var(--bevel-dark-opacity) * ${bc}))`);
            }
        } else {
            vk.setVar("reverse-bevel-1", "inset var(--inbevel-horizontal) var(--inbevel-vertical) var(--inbevel-blur) var(--inbevel-spread) rgba(0,0,0,calc(var(--inbevel-dark-opacity)*(1+var(--inbevel-change))))");
            for (let i = 2; i <= 9; i++) {
                const bc = `calc(1-calc(var(--inbevel-change) * ${i-1}))`;
                const m = Math.round((1 - ((i-1)/10)) * 10) / 10;
                vk.setVar(`reverse-bevel-${i}`,
                    `inset calc(var(--inbevel-horizontal) * ${bc}) ` +
                    `calc(var(--inbevel-vertical) * ${bc}) ` +
                    `calc(var(--inbevel-blur) * ${m}) ` +
                    `calc(var(--inbevel-spread) * ${m}) ` +
                    `rgba(0,0,0,calc(var(--inbevel-dark-opacity)*${bc}))`);
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
            vk.setVar(varName, `${val/100}`);
        }
    }

    private generateFocusBlurVariables(vk: CSSVariableKind) {
        const name = "focusBlur";
        const unit = "px";
        const focusBlur = this.atoms.focusStates.addFocusBlur.getValue();
        const grid = this.atoms.gridSettings.grid.getValue();
        if (focusBlur === undefined || grid === undefined) {
            this.setVar(name, unit, vk);
            return;
        }
        if (focusBlur) {
            this.setVar(name, unit, vk, `${grid/2}`);
        } else {
            this.setVar(name, unit, vk, '0');
        }
    }

    private generateInputBackgroundVariables(vk: CSSVariableKind) {
        const vars = this.atoms.inputBackground.getVariables();
        if (!vars) return;
        this.setVar(`input`, "", vk, vars.inputDefault.getHexOrRGBA());
        this.setVar(`input-disabled`, "", vk, vars.inputDisabled.getHexOrRGBA());
        this.setVar(`on-input`, "", vk, vars.onInputDefault.getHexOrRGBA());
        this.setVar(`on-input-disabled`, "", vk, vars.onInputDisabled.getHexOrRGBA());
        this.setVar(`dm-input`, "", vk, vars.dmInputDefault.getHexOrRGBA());
        this.setVar(`dm-on-input`, "", vk, vars.dmInputDefault.getOnShade().getHexOrRGBA());
        this.setVar(`dm-input-disabled`, "", vk, vars.dmInputDisabled.getHexOrRGBA());
        this.setVar("dm-input-hover", "", vk, "rgba(255,255,255,.12)");
    }

    private setStateSettingVar(ss: StateSetting, vk: CSSVariableKind) {
        const hex = vk.props[0].getValue();
        if (hex !== undefined) {
            this.setVar(ss.name, "", vk, ss.lmShade.hex);
            this.setVar(`on-${ss.name}`, "", vk, ss.lmShade.getOnShade().hex);
            this.setVar(`dm-${ss.name}`, "", vk, ss.dmShade.hex);
            this.setVar(`dm-on-${ss.name}`, "", vk, ss.dmShade.getOnShade().hex);
        }
    }

    public generateHotlinkVariables(vk: CSSVariableKind) {
        const vars = this.atoms.hotlinks.getHotlinkVariables();
        if (vars) {
            log.debug(`CSS: hotlink variables: found`);
            this.generateHotlinkModeVariables(vars.lm, "", vk);
            this.generateHotlinkModeVariables(vars.dm, "dm-", vk);
            this.generateOnHotlinkWithDecorationVariables("White", vk, vars.onWhite);
            this.generateOnHotlinkWithDecorationVariables("Black", vk, vars.onBlack);
            this.generateOnHotlinkWithDecorationVariables("Tertiary", vk, vars.onTertiary);
            this.generateOnHotlinkVariables("Gradient3", vk, vars.onGradient3);
            this.generateOnHotlinkVariables("dm-gradient3", vk, vars.onDMGradient3);
        } else {
            log.debug(`CSS: hotlink variables: not found`);
        }
    }

    private generateHotlinkModeVariables(vars: HotlinkModeVariables, prefix: string, vk: CSSVariableKind) {
        vk.setShadeVar(`${prefix}hotlink`, vars.unvisited.shade);
        vk.setShadeVar(`${prefix}hotlink-visited`, vars.visited.shade);
        vk.setVar(`${prefix}hotlink-decoration`, vars.unvisited.decoration);
        vk.setVar(`${prefix}hotlink-hover-decoration`, vars.unvisited.hoverDecoration);
    }

    private generateOnHotlinkWithDecorationVariables(color: string, vk: CSSVariableKind, vars: OnHotlinkWithDecoration) {
        this.generateOnHotlinkVariables(color, vk, vars);
        vk.setVar(`hotlinkOn${color}-decoration`, vars.decoration);
        vk.setVar(`hotlinkOn${color}-hover-decoration`, vars.hoverDecoration);
    }

    private generateOnHotlinkVariables(color: string, vk: CSSVariableKind, vars: OnHotlink) {
        vk.setShadeVar(`hotlinkOn${color}`, vars.unvisited);
        vk.setShadeVar(`hotlinkOn${color}-visited`, vars.visited);
    }

    public setShadeListener(args: ShadeListenerArgs): ListenerSubscription {
        return args.pcs.setListener(this.lkey(args.name), this.shadeListener.bind(this, args));
    }

    private shadeListener(args: ShadeListenerArgs, vc: EventValueChange<Shade>) {
        log.debug(`shadeListener entry: ${args.name}`);
        const shade = vc.newValue;
        if (shade) {
            const name = args.name;
            const pcs = args.pcs;
            const vk = new CSSVariableKind(name,"", [pcs], this);
            const dmPrefix = args.dmPrefix || "dm-";
            this.setShadeVars(name, "", args, shade, vk);
            if (args.dm) {
                const dmShade = shade.getDarkModeShade();
                this.setShadeVars(name, dmPrefix, args, dmShade, vk);
            }
            if (args.palette) {
                const color = shade.getMode().color;
                this.setPaletteVars(name, "", args, color.light.shades, vk);
                if (args.dm) this.setPaletteVars(name, dmPrefix, args, color.dark.shades, vk);
            }
        }
    }

    private setShadeVars(name: string, prefix: string, args: ShadeListenerArgs, shade: Shade, vk: CSSVariableKind) {
        vk.setShadeVar(`${prefix}${name}`, shade);
        if (args.half) vk.setShadeVar(`${prefix}${name}-half`, shade.getHalfShade());
        if (args.quarter) vk.setShadeVar(`${prefix}${name}-quarter`, shade.getQuarterShade());
        if (args.on) {
            const onShade = shade.getOnShade();
            vk.setShadeVar(`${prefix}on-${name}`, onShade);
            if (args.half) vk.setShadeVar(`${prefix}on-${name}-half`, onShade.getHalfShade());
            if (args.quarter) vk.setShadeVar(`${prefix}on-${name}-quarter`, onShade.getQuarterShade());
        }
    }

    private setPaletteVars(name: string, prefix: string, args: ShadeListenerArgs, shades: Shade[], vk: CSSVariableKind) {
        shades.forEach(shade => {
            vk.setShadeVar(`${prefix}${name}-${shade.id}`, shade);
            if (args.on) vk.setShadeVar(`${prefix}on-${name}-${shade.id}`, shade.getOnShade());
        });
    }
    public setShadeVar(name: string, kind: CSSVariableKind, shade?: Shade) {
        if (shade) {
            this.setVar(name, "", kind, shade.getHexOrRGBA());
        } else {
            this.setVar(name, "", kind);
        }
    }

    private defaultThemeListener(vc: EventValueChange<string>) {
        const name = vc.newValue;
        if (name !== undefined) {
            if (this.defaultTheme) this.defaultTheme.stop();
            this.defaultTheme = new CSSTheme(this.atoms.colorThemes.getTheme(name), this);
        }
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
        let cssValue: string | undefined = undefined;
        if (value !== undefined && value !== null) {
            cssValue = `${value}${unit}`;
        }
        log.debug(`CSS variable: ${cssName}: ${cssValue}`);
        // For each of the component keys (e.g. keys of individual atoms, molecules, or organisms),
        // set the variable in the appropriate groups, one group for each atom, molecule, or organism.
        kind.componentKeys.forEach(key => this.getVarGroup(key).setVar(cssName, cssValue));
        if (cssValue !== undefined) {
            this.cssVars[cssName] = cssValue;
        } else {
            // Delete CSS variable
            delete this.cssVars[cssName];
        }
        // Notify listeners of change
        Object.values(this.cssVarListeners).forEach((l) => l(cssName,cssValue));
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
        new CSSDynamicVariableKind(name, unit, [prop], this, cb);
    }

    /**
     * Call this when there is a more complicated relationship between input properties
     * and output CSS variables.
     * 
     * @param name A unique name.
     * @param props Any number of properties which are monitored for changes before calling 'cb'.
     * @param cb  The callback called each time all 'props' are initialized and any values change.
     */
    public addPropsVar(name: string, unit: string, props: Property<any>[], cb: (propVar: CSSVariableKind) => void) {
        new CSSDynamicVariableKind(name, unit, props, this, cb);
    }

}

class CSSColor {

    private color: IColor;
    private cssGenerator: CSSGenerator;
    private lname: string = '_tb.CssColor';
    private varKind: CSSVariableKind;

    constructor(color: IColor, cssGenerator: CSSGenerator) {
        this.color = color;
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
        for (const shade of [...this.color.light.shades,...this.color.dark.shades]) {
            const name = getShadeVarName(shade);
            if (name) {
                this.cssGenerator.setShadeVar(name, this.varKind, shade);
                this.cssGenerator.setShadeVar(`on-${name}`, this.varKind, shade.getOnShade());
            } else {
                log.warn(`Unable to set CSS variable for shade ${shade.toString()} because no variable name can be determined`);
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

        const self = this;

        // Listen for changes to the primary, secondary, and tertiary shades
        this.setShadeListener({name: "primary", pcs: this.theme.primary, on: true, dm: true, palette: true, half: true, quarter: true});
        this.setShadeListener({name: "secondary", pcs: this.theme.secondary, on: true, dm: true, palette: true});
        this.setShadeListener({name: "tertiary", pcs: this.theme.tertiary, on: true, dm: true, palette: true});

        // light and dark mode backgrounds
        this.setBackgroundListener("lmbg", true, this.theme.lightModeBackground);
        this.setBackgroundListener("dmbg", false, this.theme.darkModeBackground);

        // gradients
        this.setShadeListener({name: "gradient1-a", pcs: this.theme.gradient1.from, on: true, dm: true});
        this.setShadeListener({name: "gradient1-b", pcs: this.theme.gradient1.to, on: true, dm: true});
        this.setShadeListener({name: "gradient2-a", pcs: this.theme.gradient2.from, on: true, dm: true});
        this.setShadeListener({name: "gradient2-b", pcs: this.theme.gradient2.to, on: true, dm: true});

        // button
        this.setShadeGroupListener("button", this.theme.button);

        // icon
        this.setShadeGroupListener("icon", this.theme.icon);

        // text gradient
        this.setShadeListener({name: "text-gradient-a", pcs: this.theme.gradientHeaderText.from, on: true, dm: true});
        this.setShadeListener({name: "text-gradient-b", pcs: this.theme.gradientHeaderText.to, on: true, dm: true});

        // accent
        this.setShadeListener({name: "accent", pcs: this.theme.accent, dm: true, palette: true, on: true});

        // dropdown related variables
        const molecules = this.cssGenerator.molecules;
        const props = [molecules.dropdowns.menuFocusState, this.theme.button];
        this.cssGenerator.addPropsVar("lm-dropdowns", "", [...props, this.theme.lightModeBackground], this.generateDropDownVars.bind(this, true));
        this.cssGenerator.addPropsVar("dm-dropdowns", "", [...props, this.theme.darkModeBackground], this.generateDropDownVars.bind(this, false));

        this.theme.addTheme.setListener("hotlinks", function(event) {
            if (event.type === EventType.NodeEnabled) {
                const vk = new CSSVariableKind("hotlinks","",[], self.cssGenerator);
                self.cssGenerator.generateHotlinkVariables(vk);
            }
        });
    }

    public stop() {
        // Cancel all of the listener subscriptions
        this.listenerSubscriptions.forEach(ls => ls.cancel());
    }

    private setShadeListener(args: ShadeListenerArgs) {
        const ls = this.cssGenerator.setShadeListener(args);
        this.listenerSubscriptions.push(ls);
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
        const vk = new CSSVariableKind(name,"", [pcp], this.cssGenerator);
        const prefix = lm ? "" : "dm-";
        vk.setShadeVarRef(`${prefix}background`, vars.primary);
        vk.setShadeVarRef(`${prefix}background-secondary`, vars.secondary);
        vk.setShadeVarRef(`${prefix}border`, vars.borderColor);
        vk.setShadeVarRef(`${prefix}chip`, vars.chip);
        vk.setShadeVarRef(`${prefix}on-chip`, vars.chip.getOnShade());
        vk.setShadeVarRef(`${prefix}color-drop`, vars.colorDrop);
        vk.setShadeVarRef(`${prefix}group-button-bg`, vars.groupButton);
        vk.setShadeVarRef(`${prefix}line-color`, vars.lineColor);
        vk.setShadeVarRef(`${prefix}surface`, vars.surface);
        if (lm) {
            vk.setShadeVarRef(`on-surface`, vars.surface.getOnShade());
            vk.setShadeVarRef("on-background", vars.primary.getOnShade());
        } else {
            vk.setVar("dm-on-background", "rgba(255,255,255,0.6)");
        }
        // Set elevation backgrounds
        const lmeShades = this.theme.getElevationShades(lm);
        for (let i = 0; i < lmeShades.length; i++) {
            vk.setShadeVarRef(`${prefix}elevation-bg-${i}`, lmeShades[i]);
            vk.setShadeVarRef(`${prefix}on-elevation-bg-${i}`, lmeShades[i].getOnShade());
        }
        log.debug(`backgroundListener exit - ${name}`);
    }

    private shadeGroupListener(type: string, prop: PropertyColorShade, vc: EventValueChange<Shade>): void {
        const shade = vc.newValue;
        if (!shade) return;
        log.debug(`shadeGroupListener entry: type=${type}`);
        const vars = this.theme.getShadeGroups(shade);
        const vk = new CSSVariableKind("button", "", [prop], this.cssGenerator);
        // Set light and dark mode button CSS variables
        vk.setModeVars(type, true, vars.lm);
        vk.setModeVars(type, false, vars.dm);
        log.debug(`shadeGroupListener exit: type=${type}`);
    }

    public setShadeVar(name: string, kind: CSSVariableKind, shade: Shade) {
        this.cssGenerator.setShadeVar(name, kind, shade);
    }

    private generateDropDownVars(lm: boolean, vk: CSSVariableKind) {
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
        const var3 = lm ? "on-dropdown-hover-bg" : "dm-on-dropdown-focus-bg";
        if (mfsVal === Dropdowns.FULL_COLOR) {
            vk.setVar(var1, "100%");
            vk.setVar(var2, buttonShade.getOnShade().hex);
            vk.setVar(var3, surfaceShade.mix(buttonShade,0.5).getContrastShade().hex);
        } else if (mfsVal === Dropdowns.LEFT_BORDER_ONLY) {
            vk.setVar(var1, "var(--spacing-half)");
            const onSurfaceHex = surfaceShade.getOnShade().hex;
            vk.setVar(var2, onSurfaceHex);
            vk.setVar(var3, onSurfaceHex);
        } else {
            throw new Error(`Invalid dropdown menu focus state: ${mfsVal}`);
        }
        log.debug(`generateDropDownVars exit - lm=${lm}`);
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

    public setVars(vars: {[name: string]: string}) {
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
        } else {
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

    constructor(name: string, unit: string, props: Property<any>[], cssGenerator: CSSGenerator, cb?: (propVar: CSSVariableKind) => void) {
        super(name, unit, props, cssGenerator);
        this.cb = cb;
        const listenerKey = cssGenerator.lkey(name);
        switch (props.length) {
            case 0:
                throw new Error('Empty property array');
            case 1:
                props[0].setListener(listenerKey, this.singlePropCallback.bind(this));
                break;
            default:
                if (!cb) throw new Error(`Multiple property variable requires a callback (${JSON.stringify(props)})`);
                new PropertyGroupListener(listenerKey, props, this.multiplePropCallback.bind(this));
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

interface ShadeListenerArgs {
    name: string;
    pcs: PropertyColorShade;
    half?: boolean;
    quarter?: boolean;   
    on?: boolean;   
    dm?: boolean;
    dmPrefix?: string;
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
    public readonly vars: {[name: string]: string} = {};
    private listeners: {[key: string]: CSSVarGroupListener} = {};

    constructor(name: string) {
        this.name = name;
    }

    public setListener(key: string, listener?: CSSVarGroupListener) {
        if (listener) {
            this.listeners[key] = listener;
        } else {
            delete this.listeners[key];
        }
    }

    public setVar(name: string, value?: string): void {
        if (value !== undefined) {
            this.vars[name] = value;
        } else {
            delete this.vars[name];
        }
        // Notify the listeners that something has changed in this var group
        Object.values(this.listeners).forEach(listener => {
            try {
                listener(this);
            } catch(e) {
                console.log(`ERROR: failed calling VarGroup listener`, e);
            }
        })
    }
}

function getShadeVarName(shade: Shade): string | undefined {
    if (shade.hasMode() && shade.index >= 0) {
        const mode = shade.getMode();
        const prefix = mode.name === 'dm' ? 'dm-' : '';
        const color = mode.color;
        return `${prefix}${color.name}-${shade.index*100}`;
    }
    return getCoreShadeVarName(shade);
}

function getCoreShadeVarName(shade: Shade): string | undefined {
    if (shade.coreShadeName) {
        return `color-${shade.coreShadeName}`;
    }
    return undefined;
}

function elevationToCSS(vk: CSSVariableKind) {
    const val = vk.props[0].getValue();
    if (val === "No Elevation") {
        vk.setVar(vk.name, "var(--elevation-0)");
    } else if (val.startsWith("Elevation-")) {
        const idx = parseInt(val.substring("Elevation-".length));
        vk.setVar(vk.name,`var(--elevation-${idx})`);
    } else if (val.startsWith("Reverse-Elevation-")) {
        const idx = parseInt(val.substring("Reverse-Elevation-".length));
        vk.setVar(vk.name, `var(--reverse-elevation-${idx})`);
    } else {
        throw new Error(`Invalid elevation: '${val}'`);
    }
}

function bevelToCSS(vk: CSSVariableKind) {
    const val = vk.props[0].getValue();
    if (val === "No Bevel") {
        vk.setVar(vk.name, "var(--bevel-0)");
    } else if (val.startsWith("Bevel-")) {
        const idx = parseInt(val.substring("Bevel-".length));
        vk.setVar(vk.name,`var(--bevel-${idx})`);
    } else if (val.startsWith("Reverse-Bevel-")) {
        const idx = parseInt(val.substring("Reverse-Bevel-".length));
        vk.setVar(vk.name, `var(--reverse-bevel-${idx})`);
    } else {
        throw new Error(`Invalid bevel: '${val}'`);
    }
}