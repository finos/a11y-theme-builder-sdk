/*
 * Copyright (c) 2023 Discover Financial Services
 * Licensed under MIT License. See License.txt in the project root for license information
 */
import { ThemeBuilder, ColorTheme, ColorPair, EventType, Event, EventValueChange, PropertyColorShade, PropertyColorPair, PropertyTitledShade, Shade, CSSVarGroup } from "../index";

let errCnt = 0;
let buttonSelectablesChangedCount = 0;
let themeInitializedCount = 0;

async function test() {

    console.log("Create the theme builder");
    const themeBuilder = await ThemeBuilder.create();

    console.log("TEST: Add a new design system");
    let ds = await themeBuilder.addDesignSystem("ds1", {sample: true});
    assert(ds.isSample(), "Should be a sample");
    console.log(`TEST: created: ${ds.getTimeOfCreationInMs()}, last update: ${ds.getTimeOfLastUpdateInMs()}`);

    let dsObj = ds.serialize();
    console.log("TEST: EMPTY DESIGN SYSTEM: ", dsObj);
    console.log("TEST: EMPTY DESIGN SYSTEM JSON: ", JSON.stringify(dsObj,null,4));

    console.log("TEST: Getting design system");
    ds = await themeBuilder.getDesignSystem("ds1");

    ds.atoms.colorThemes.setListener(`testListener`, notify);
    ds.atoms.fontsSettings.setListener(`testListener`, notify);
    ds.atoms.stateSettings.setListener(`testListener`, notify);
    ds.atoms.stateSettings.setListener(`testListener`, ssNotify);

    const prop = ds.atoms.gridSettings.grid;
    const prop2 = ds.getNode(prop.key);
    assert(prop === prop2, "DesignSystem.getNode failed");

    const designSystemNames = await themeBuilder.listDesignSystemNames();
    assert(designSystemNames.length === 1, "Number of design system names should be 1");
    assert(designSystemNames[0] === "ds1", "Design system name mismatch");

    console.log("TEST: Testing disablement");
    const colorPalette = ds.atoms.colorPalette;
    const colorThemes = ds.atoms.colorThemes;
    const states = ds.atoms.stateSettings;
    assert(colorPalette.isEnabled(), "ColorPalette atom is not editable");
    assert(!colorThemes.isEnabled(), "ColorTheme atom is editable");
    assert(!states.isEnabled(), "States atom is editable");
    assert(!ds.molecules.isEnabled(), "Molecules is editable");
    assert(!ds.organisms.isEnabled(), "Organisms is editable");

    let colorThemesAtomEnabled  = colorThemes.isEnabled();
    assert(!colorThemesAtomEnabled , "ColorThemes atom should not be enabled before adding a color");
    ds.setListener("dsListener", function(event: Event) {
        console.log(`TEST: node enabled: ${event.node.key}`);
        if (event.type === EventType.NodeEnabled && event.node === colorThemes) {
            colorThemesAtomEnabled = true;
        }
    }, [EventType.NodeEnabled]);
    console.log("TEST: Adding cobalt to the color palette");
    //const blue = colorPalette.addColor("cobalt","#0047AB");
    const blue = colorPalette.addColor("cobalt","#AB5D5D");
    //const blue = colorPalette.addColor("cobalt","#3ac324");
    console.log("TEST: Added blue to the color palette");
    assert(colorThemesAtomEnabled, "ColorThemes atom should be enabled after adding a color");
    ds.removeListener("dsListener");
    assert(colorPalette.isInitialized(), "The color palette atom is not initialized");
    // Add another color for good measure
    //console.log("TEST: Adding red to the color palette");
    //const red = colorPalette.addColor("red","#EE3A3A");
    //console.log("TEST: Added red to the color palette");
    //assert(red.light.shades.length === 10, `Incorrect number of light color shades: ${red.light.shades.length}`);
    assert(blue.dark.shades.length === 10, `Incorrect number of dark color shades: ${blue.dark.shades.length}`);
    assert(colorThemes.isEnabled(), "The color themes atom is not editable");
    assert(!states.isEnabled(), "States atom is editable");

    console.log("TEST: Initialize color themes");
    const ct = colorThemes.createTheme("colorTheme1");
    ct.setListener("ctNotify", notify);
    ct.button.setListener("colorTheme", buttonEventListener);
    ct.addTheme.setListener("colorThemeInitialized", themeInitializedEventListener);
    assert(!ct.isInitialized(), "Color theme should not be initialized");

    initTheme(ct);

    assert(buttonSelectablesChangedCount === 1, `Button selectables should be 1 but is ${buttonSelectablesChangedCount}`);
    assert(ct.isInitialized(), "Color theme should be initialized");
    assert(states.isEnabled(), "States atom should be editable");
    assert(themeInitializedCount === 1, "Theme initialized should be one");

    testChangingPrimary(ct);

    initTheme(ct);

    const hlVars = ds.atoms.hotlinks.getHotlinkVariables2(true);

    const bgVars = ct.getBackgroundVariables(ct.lightModeBackground);
    console.log(`TEST: Background variables: ${JSON.stringify(bgVars)}`);
    selectTitledShade(ds.atoms.inputBackground.overlayColor, 1);
    const bgVars2 = ct.getBackgroundVariables(ct.lightModeBackground);
    console.log(`TEST: Background variables: ${JSON.stringify(bgVars2)}`);
    selectColorShade(ds.molecules.modal.color, 0);

    ds.atoms.gridSettings.grid.setValue(10);

    ds.atoms.minimumTarget.minHeight.setValue(9);
    ds.molecules.avatars.mediumBorder.setValue(8);
    assert(ds.molecules.avatars.mediumBorder.getValue() === 8, "Avatar medium border is not 8");

    selectColorPair(ct.lightModeBackground, 2);

    console.log("TEST: Adding new color after primary was selected");
    colorPalette.addColor("newColor","#0047AB");
    assert(ct.primary.getValue() !== undefined, `Adding a color to the theme should not change the primary color`);
    console.log("TEST: Added new color after primary was selected");

    // list all properties
    console.log("TEST: BEGIN properties");
    const props = ds.listProperties();
    for (const prop of props) {
        console.log(`TEST: prop key=${prop.key}, required=${prop.required}, defaultValue=${prop.getDefaultValue()}`);
    }
    console.log("TEST: END properties");

    // test var groups
    console.log(`TEST: VarGroupKeys: ${JSON.stringify(ds.code.getCSSVarGroupKeys())}`);
    const bsg = ds.code.getCSSVarGroup(ds.organisms.hero);
    let bsCount = 0;
    console.log(`TEST: BSG: begin`);
    bsg.setListener("test", function(vg: CSSVarGroup) {
        bsCount++; 
        console.log(`TEST: BSG listener ${vg.name} was called (${bsCount})`);
    });
    console.log(`TEST: BSG: setting hero.verticalGap`);
    ds.organisms.hero.verticalGap.setValue(2);
    console.log(`TEST: BSG: setting hero.title`);
    ds.organisms.hero.title.setValue("H1");
    console.log(`TEST: BSG: setting hero.body`);
    ds.organisms.hero.body.setValue("Body 3");
    console.log(`TEST: BSG: bsCount=${bsCount}`);
    assert(bsCount === 4, `Should have received 4 BSG notifications but received ${bsCount}`);
    console.log(`TEST: BSG: ${JSON.stringify(bsg)}`);

    console.log(`TEST: create design system from string: ${JSON.stringify(dsObj,null,4)}`);
    const ds2 = await ds.copy("ds2");
    console.log(`TEST: deserializing design system 2`);
    const dsStr = JSON.stringify(ds2.serialize(),null,4);
    console.log(`TEST: finished deserializing design system 2: ${dsStr}`);
    assert(ds2.molecules.avatars.mediumBorder.getValue() !== undefined, "Deserialized avatar border");
    const num: any = ds2.molecules.avatars.mediumBorder.getValue();
    console.log("TEST: avatar border", typeof num, num.constructor.name, num, num.toString());

    const p1 = ds.atoms.colorThemes.getDefaultTheme()?.primary.getValue();
    const p2 = ds2.atoms.colorThemes.getDefaultTheme()?.primary.getValue();
    if (!p1) {
        console.log(`ERROR: serialization failure (no p1)`);
        errCnt++;
    } else if (!p2) {
        console.log(`ERROR: serialization failure (no p2)`);
        errCnt++;
    } else if (!p1 || !p2 || p1.hex !== p2.hex) {
        console.log(`ERROR: serialization failure: p1=${p1.hex}, p2=${p2.hex}`);
        errCnt++;
    }

    console.log("TEST: BEGIN BUTTON SELECTIONS");
    const sels = ct.button.getSelectableValues();
    for (let i = 0; i < sels.length; i++) {
        console.log(`TEST: BUTTON SELECTION ${i}`);
        selectColorShade(ct.button, 0);
    }
    console.log("TEST: END BUTTON SELECTIONS");

    const hero = ds.organisms.hero;
    hero.verticalGap.setValue(3);
    hero.verticalPadding.setValue(4);
    hero.title.setValue("Display 2");
    hero.body.setValue("Body 2 - Bold");
    console.log("TEST: BEGIN CSS VARIABLES")
    ds2.code.setCSSVarListener("test", cssVar);
    console.log("TEST: END CSS VARIABLES")

    const cssVars = ds.code.getCSSVars();
    const actualCssVars = Object.keys(cssVars);
    const missingCssVars: string[] = [];
    expectedCssVars.forEach(name => {
        if (actualCssVars.indexOf(name) < 0) missingCssVars.push(name);
    });
    const extraCssVars: string[] = [];
    actualCssVars.forEach(name => {
        if (expectedCssVars.indexOf(name) < 0) extraCssVars.push(name);
    });
    console.log(`TEST: CSS VARIABLES: ${JSON.stringify(cssVars,null,4)}`);
    console.log(`TEST: MISSING CSS VARIABLES: total=${missingCssVars.length}, ${JSON.stringify(missingCssVars,null,4)}`);
    console.log(`TEST: EXTRA CSS VARIABLES: total=${extraCssVars.length}, ${JSON.stringify(extraCssVars,null,4)}`);
    if (missingCssVars.length > 0) {
        console.log(`ERROR: missing CSS variables: ${JSON.stringify(missingCssVars)}`);
        //errCnt++;
    }

    console.log(`TEST: Shadow selectables: ${JSON.stringify(ds.molecules.standardCards.shadow.getSelectableValues(),null,4)}`);
    console.log(`TEST: Base JSON : ${JSON.stringify(ds.code.getJSONBase(),null,4)}`);
    console.log(`TEST: JSON lightmode: ${JSON.stringify(ds.code.getJSONLM(),null,4)}`);
    console.log(`TEST: JSON darkmode: ${JSON.stringify(ds.code.getJSONDM(),null,4)}`);

    await ds.store();
    const md = await themeBuilder.listMetadata();
    console.log(`TEST: metadata: ${JSON.stringify(md,null,4)}`);

    console.log("TEST: delete design system ds1")
    await themeBuilder.deleteDesignSystem("ds1");

    if (errCnt > 0) {
        console.log(`FAILED: ${errCnt} errors`);
    } else {
        console.log("PASSED");
    }
}

function initTheme(ct: ColorTheme) {
    selectColorShade(ct.primary, 5);
    selectColorShade(ct.secondary, 3);
    selectColorShade(ct.tertiary, 6);
    selectColorPair(ct.lightModeBackground, 0);
    selectColorPair(ct.darkModeBackground, 0);
    selectColorShade(ct.gradient1.from, 6);
    selectColorShade(ct.gradient1.to, 1);
    selectColorShade(ct.gradient2.from, 7);
    selectColorShade(ct.gradient2.to, 2);
    selectColorShade(ct.button, 2);
    selectColorShade(ct.icon, 2);
    selectColorShade(ct.gradientHeaderText.from, 4);
    selectColorShade(ct.gradientHeaderText.to, 0);
    selectColorShade(ct.accent, 3);
}

/*
 * Changing the theme primary shade should reset most of the other theme properties and send
 * corresponding notifications.  Test that this takes place.
 */
function testChangingPrimary(ct: ColorTheme) {
    let resetLMBG = false;
    let resetAccent = false;
    ct.lightModeBackground.setPropertyListener("testChangingPrimary", function(vc: EventValueChange<ColorPair>) {
        console.log(`TEST: value reset: ${JSON.stringify(vc)}`);
        if (vc.newValue == undefined) resetLMBG = true;
    });
    ct.accent.setPropertyListener("testChangingPrimary", function(vc: EventValueChange<Shade>) {
        console.log(`TEST: value reset: ${JSON.stringify(vc)}`);
        if (vc.newValue == undefined) resetAccent = true;
    });
    selectColorShade(ct.primary, 1);
    assert(resetLMBG, `The lightmode background property value was not reset`);
    assert(resetLMBG, `The accent property value was not reset`);
}

function notify(event: Event) {
    console.log(`TEST: Received ${event.type} notification for node ${event.node.key}`);
}

function ssNotify(event: Event) {
    console.log(`TEST: StateSettings: Received ${event.type} notification for node ${event.node.key}`);
}

function selectColorShade(prop: PropertyColorShade, idx: number) {
    const sels = prop.getSelectableValues();
    if (sels.length === 0) throw new Error(`No selectables`);
    const row = sels[0];
    if (row.length === 0) throw new Error(`No first row selectables`);
    idx = Math.min(idx, row.length-1);
    const val = row[idx];
    if (val === undefined) throw new Error(`Value not found at index ${idx}: ${JSON.stringify(row)}`);
    console.log(`TEST: begin setting value for ${prop.key}`);
    prop.setValue(val);
    console.log(`TEST: end setting value for ${prop.key}`);
}

function selectColorPair(prop: PropertyColorPair, idx: number) {
    prop.setValue(prop.getSelectableValues()[idx]);
}

function selectTitledShade(prop: PropertyTitledShade, idx: number) {
    prop.setValue(prop.getSelectableValues()[idx]);
}

function cssVar(name: string, value?: string) {
    console.log(`TEST: CSS setting: ${name}: ${value};`);
}

function buttonEventListener(event: Event) {
    if (event.type === EventType.SelectablesChanged) {
        buttonSelectablesChangedCount++;
        console.log(`TEST: button selectables changed for ${event.node.key}`);
    }
}

function themeInitializedEventListener(event: Event) {
    if (event.type === EventType.NodeEnabled) {
        console.log(`AKR Theme addTheme enabled changed`);
        themeInitializedCount++;
    }
}

function assert(cond: boolean, msg: string) {
    if (!cond) {
        console.log(`TEST ERROR: ${msg}`);
        errCnt++;
    }
}

const expectedCssVars = [
    "--zoom",
    "--meshSVGfill",
    "--transparent",
    "--white",
    "--white-half",
    "--on-white",
    "--black",
    "--black-half",
    "--nearblack",
    "--on-nearblack",
    "--dm-white",
    "--dm-on-white",
    "--on-black",
    "--dm-on-black",
    "--dm-nearblack",
    "--dm-on-nearblack",
    "--textLight",
    "--textDark",
    "--dm-textLight",
    "--dm-textDark",
    "--gray-0",
    "--gray-100",
    "--gray-200",
    "--gray-300",
    "--gray-400",
    "--gray-500",
    "--gray-600",
    "--gray-700",
    "--gray-800",
    "--gray-900",
    "--on-gray-0",
    "--on-gray-100",
    "--on-gray-200",
    "--on-gray-300",
    "--on-gray-400",
    "--on-gray-500",
    "--on-gray-600",
    "--on-gray-700",
    "--on-gray-800",
    "--on-gray-900",
    "--dm-gray-0",
    "--dm-gray-100",
    "--dm-gray-200",
    "--dm-gray-300",
    "--dm-gray-400",
    "--dm-gray-500",
    "--dm-gray-600",
    "--dm-gray-700",
    "--dm-gray-800",
    "--dm-gray-900",
    "--primary",
    "--primary-0",
    "--primary-half",
    "--primary-quarter",
    "--primary-100",
    "--primary-200",
    "--primary-300",
    "--primary-400",
    "--primary-500",
    "--primary-600",
    "--primary-700",
    "--primary-800",
    "--primary-900",
    //TODO "--primary-1000",
    "--secondary",
    "--secondary-0",
    "--secondary-100",
    "--secondary-200",
    "--secondary-300",
    "--secondary-400",
    "--secondary-500",
    "--secondary-600",
    "--secondary-700",
    "--secondary-800",
    "--secondary-900",
    "--tertiary",
    "--tertiary-0",
    "--tertiary-100",
    "--tertiary-200",
    "--tertiary-300",
    "--tertiary-400",
    "--tertiary-500",
    "--tertiary-600",
    "--tertiary-700",
    "--tertiary-800",
    "--tertiary-900",
    "--on-primary",
    "--on-primary-half",
    "--on-primary-0",
    "--on-primary-100",
    "--on-primary-200",
    "--on-primary-300",
    "--on-primary-400",
    "--on-primary-500",
    "--on-primary-600",
    "--on-primary-700",
    "--on-primary-800",
    "--on-primary-900",
    "--on-secondary",
    "--on-secondary-0",
    "--on-secondary-100",
    "--on-secondary-200",
    "--on-secondary-300",
    "--on-secondary-400",
    "--on-secondary-500",
    "--on-secondary-600",
    "--on-secondary-700",
    "--on-secondary-800",
    "--on-secondary-900",
    "--on-tertiary",
    "--on-tertiary-0",
    "--on-tertiary-100",
    "--on-tertiary-200",
    "--on-tertiary-300",
    "--on-tertiary-400",
    "--on-tertiary-500",
    "--on-tertiary-600",
    "--on-tertiary-700",
    "--on-tertiary-800",
    "--on-tertiary-900",
    "--on-accent",
    "--on-accent-0",
    "--on-accent-100",
    "--on-accent-200",
    "--on-accent-300",
    "--on-accent-400",
    "--on-accent-500",
    "--on-accent-600",
    "--on-accent-700",
    "--on-accent-800",
    "--on-accent-900",
    "--dm-primary",
    "--dm-primary-0",
    "--dm-primary-100",
    "--dm-primary-200",
    "--dm-primary-300",
    "--dm-primary-400",
    "--dm-primary-500",
    "--dm-primary-600",
    "--dm-primary-700",
    "--dm-primary-800",
    "--dm-primary-900",
    "--dm-secondary",
    "--dm-secondary-0",
    "--dm-secondary-100",
    "--dm-secondary-200",
    "--dm-secondary-300",
    "--dm-secondary-400",
    "--dm-secondary-500",
    "--dm-secondary-600",
    "--dm-secondary-700",
    "--dm-secondary-800",
    "--dm-secondary-900",
    "--dm-tertiary",
    "--dm-tertiary-0",
    "--dm-tertiary-100",
    "--dm-tertiary-200",
    "--dm-tertiary-300",
    "--dm-tertiary-400",
    "--dm-tertiary-500",
    "--dm-tertiary-600",
    "--dm-tertiary-700",
    "--dm-tertiary-800",
    "--dm-tertiary-900",
    "--dm-accent",
    "--dm-accent-0",
    "--dm-accent-100",
    "--dm-accent-200",
    "--dm-accent-300",
    "--dm-accent-400",
    "--dm-accent-500",
    "--dm-accent-600",
    "--dm-accent-700",
    "--dm-accent-800",
    "--dm-accent-900",
    "--dm-on-primary",
    "--dm-on-primary-0",
    "--dm-on-primary-100",
    "--dm-on-primary-200",
    "--dm-on-primary-300",
    "--dm-on-primary-400",
    "--dm-on-primary-500",
    "--dm-on-primary-600",
    "--dm-on-primary-700",
    "--dm-on-primary-800",
    "--dm-on-primary-900",
    "--dm-on-secondary",
    "--dm-on-secondary-0",
    "--dm-on-secondary-100",
    "--dm-on-secondary-200",
    "--dm-on-secondary-300",
    "--dm-on-secondary-400",
    "--dm-on-secondary-500",
    "--dm-on-secondary-600",
    "--dm-on-secondary-700",
    "--dm-on-secondary-800",
    "--dm-on-secondary-900",
    "--dm-on-tertiary",
    "--dm-on-tertiary-0",
    "--dm-on-tertiary-100",
    "--dm-on-tertiary-200",
    "--dm-on-tertiary-300",
    "--dm-on-tertiary-400",
    "--dm-on-tertiary-500",
    "--dm-on-tertiary-600",
    "--dm-on-tertiary-700",
    "--dm-on-tertiary-800",
    "--dm-on-tertiary-900",
    "--accent",
    // "--dmaccent",
    "--white-bg",
    "--buttonOnWhite",
    "--buttonHalfOnWhite",
    "--onbuttonOnWhite",
    //"--linkOnWhite",
    //"--linkDecorationOnWhite",
    "--iconOnWhite",
    "--dmbuttonOnWhite",
    "--dmbuttonHalfOnWhite",
    "--dmiconOnWhite",
    "--buttonOnBlack",
    "--buttonHalfOnBlack",
    "--onbuttonOnBlack",
    //"--linkOnBlack",
    //"--linkDecorationOnBlack",
    "--iconOnBlack",
    "--dmiconOnBlack",
    "--dm-on-accent",
    "--dm-on-accent-0",
    "--dm-on-accent-100",
    "--dm-on-accent-200",
    "--dm-on-accent-300",
    "--dm-on-accent-400",
    "--dm-on-accent-500",
    "--dm-on-accent-600",
    "--dm-on-accent-700",
    "--dm-on-accent-800",
    "--dm-on-accent-900",
    "--dm-on-gray",
    "--dm-on-gray-0",
    "--dm-on-gray-100",
    "--dm-on-gray-200",
    "--dm-on-gray-300",
    "--dm-on-gray-400",
    "--dm-on-gray-500",
    "--dm-on-gray-600",
    "--dm-on-gray-700",
    "--dm-on-gray-800",
    "--dm-on-gray-900",
    "--dm-white-bg",
    "--dm-on-white-bg",
    "--primaryDarkBG",
    "--secondaryDarkBG",
    "--background",
    "--on-background",
    "--dm-background",
    "--dm-on-background",
    "--background-secondary",
    "--on-background-secondary",
    "--dm-background-secondary",
    "--dm-on-background-secondary",
    "--background-tertiary",
    "--on-background-tertiary",
    "--dm-background-tertiary",
    "--dm-on-background-tertiary",
    "--buttonOnTertiary",
    //"--buttonHalfOnTertiary",
    "--onbuttonOnTertiary",
    //"--linkOnTertiary",
    "--iconOnTertiary",
    "--dmbuttonOnTertiary",
    //"--dmbuttonHalfOnTertiary",
    "--dmonbuttonOnTertiary",
    //"--dmlinkOnTertiary",
    "--dmiconOnTertiary",
    "--gradient1-b",
    "--gradient-1",
    "--gradient1-a",
    "--on-gradient-1",
    "--on-gradient1-a", // TODO - changed name "-1a"
    "--dm-on-gradient1-a", // TODO - changed name "-1a"
    "--buttonOnGradient1",
    "--buttonHalfOnGradient1",
    "--onbuttonOnGradient1",
    "--dmbuttonOnGradient1",
    "--dmbuttonHalfOnGradient1",
    "--dmonbuttonOnGradient1",
    "--gradient2-a",
    "--gradient2-b",
    "--gradient-2",
    "--on-gradient-2",
    "--buttonOnGradient2",
    "--buttonHalfOnGradient2",
    "--onbuttonOnGradient2",
    "--dmbuttonOnGradient2",
    "--dmbuttonHalfOnGradient2",
    "--dmonbuttonOnGradient2",
    "--gradient-3",
    "--on-gradient-3",
    "--buttonOnGradient3",
    //"--buttonHalfOnGradient3",
    "--onbuttonOnGradient3",
    "--dmbuttonOnGradient3",
    //"--dmbuttonHalfOnGradient3",
    "--dmonbuttonOnGradient3",
    //"--linkOnGradient3",
    //"--dmlinkOnGradient3",
    "--text-gradient-a",
    "--text-gradient-b",
    "--text-gradient",
    "--dm-gradient1-a",
    "--dm-gradient1-b",
    "--dm-gradient-1",
    "--dm-on-gradient-1",
    "--dm-gradient2-a",
    "--dm-gradient2-b",
    "--dm-gradient-2",
    "--dm-on-gradient-2",
    "--dm-gradient-3",
    "--dm-on-gradient-3",
    "--dm-text-gradient-a",
    "--dm-text-gradient-b",
    "--dm-text-gradient",
    "--color-drop",
    "--dm-color-drop",
    "--surface",
    "--on-surface",
    "--dm-surface",
    "--dm-on-surface",
    "--border",
    "--dm-border",
    "--input",
    "--on-input",
    //"--input-disabled",
    "--input-hover",
    "--dm-input",
    "--dm-on-input",
    //"--dm-input-disabled",
    "--dm-input-hover",
    "--focusBlur",
    "--quiet",
    "--disabled",
    "--hover",
    "--active",
    "--danger",
    "--warning",
    "--success",
    "--info",
    "--on-danger",
    "--on-warning",
    "--on-success",
    "--on-info",
    "--dm-danger",
    "--dm-warning",
    "--dm-success",
    "--dm-info",
    "--dm-on-danger",
    "--dm-on-warning",
    "--dm-on-success",
    "--dm-on-info",
    "--hotlink",
    "--hotlink-visited",
    "--hotlink-decoration",
    "--hotlink-hover-decoration",
    "--dm-hotlink",
    "--dm-hotlink-visited",
    "--dm-hotlink-decoration",
    "--dm-hotlink-hover-decoration",
    "--hotlinkOnWhite",
    "--hotlinkOnWhite-visited",
    "--hotlinkOnWhite-decoration",
    "--hotlinkOnWhite-hover-decoration",
    "--hotlinkOnBlack",
    "--hotlinkOnBlack-visited",
    "--hotlinkOnBlack-decoration",
    "--hotlinkOnBlack-hover-decoration",
    "--hotlinkOnTertiary",
    "--hotlinkOnGradient3-visited",
    "--hotlinkOnGradient3",
    "--min-target",
    "--mobile-target",
    "--animation-speed",
    "--animation-distance",
    "--animation-focus-distance",
    "--radius-0",
    "--radius-1",
    "--radius-2",
    "--radius-3",
    "--radius-4",
    "--radius-5",
    "--radius-6",
    "--radius-7",
    "--radius-8",
    "--radius-9",
    "--radius-10",
    "--radius-quarter",
    "--radius-half",
    "--spacing-0",
    "--spacing-1",
    "--spacing-2",
    "--spacing-3",
    "--spacing-4",
    "--spacing-5",
    "--spacing-6",
    "--spacing-7",
    "--spacing-8",
    "--spacing-9",
    "--spacing-10",
    "--spacing-quarter",
    "--spacing-half",
    "--negative-size-half",
    "--border-0",
    "--border-1",
    "--border-2",
    "--border-3",
    "--border-4",
    "--inset-border-0",
    "--inset-border-1",
    "--inset-border-2",
    "--inset-border-3",
    "--inset-border-4",
    "--dark-inset-border-1",
    "--dark-inset-border-2",
    "--dark-inset-border-3",
    "--dark-inset-border-4",
    "--white-inset-border-1",
    "--white-inset-border-2",
    "--white-inset-border-3",
    "--white-inset-border-4",
    "--elevation-change",
    "--change-2",
    "--change-3",
    "--change-4",
    "--change-5",
    "--change-6",
    "--change-7",
    "--change-8",
    "--change-9",
    "--elevation-horizontal",
    "--elevation-vertical",
    "--elevation-blur",
    "--elevation-spread",
    "--base-elevation-blur",
    "--base-elevation-spread",
    "--elevation-rgb",
    "--elevation-opacity",
    "--base-elevation-opacity",
    "--elevation-0",
    "--elevation-1",
    "--elevation-2",
    "--elevation-3",
    "--elevation-4",
    "--elevation-5",
    "--elevation-6",
    "--elevation-7",
    "--elevation-8",
    "--elevation-9",
    "--elevation-horizontal-2",
    "--elevation-horizontal-3",
    "--elevation-horizontal-4",
    "--elevation-horizontal-5",
    "--elevation-horizontal-6",
    "--elevation-horizontal-7",
    "--elevation-horizontal-8",
    "--elevation-horizontal-9",
    "--elevation-vertical-2",
    "--elevation-vertical-3",
    "--elevation-vertical-4",
    "--elevation-vertical-5",
    "--elevation-vertical-6",
    "--elevation-vertical-7",
    "--elevation-vertical-8",
    "--elevation-vertical-9",
    "--elevation-blur-2",
    "--elevation-blur-3",
    "--elevation-blur-4",
    "--elevation-blur-5",
    "--elevation-blur-6",
    "--elevation-blur-7",
    "--elevation-blur-8",
    "--elevation-blur-9",
    "--elevation-spread-2",
    "--elevation-spread-3",
    "--elevation-spread-4",
    "--elevation-spread-5",
    "--elevation-spread-6",
    "--elevation-spread-7",
    "--elevation-spread-8",
    "--elevation-spread-9",
    "--reverse-elevation-horizontal",
    "--reverse-elevation-horizontal-2",
    "--reverse-elevation-horizontal-3",
    "--reverse-elevation-horizontal-4",
    "--reverse-elevation-horizontal-5",
    "--reverse-elevation-horizontal-6",
    "--reverse-elevation-horizontal-7",
    "--reverse-elevation-horizontal-8",
    "--reverse-elevation-horizontal-9",
    "--reverse-elevation-vertical",
    "--reverse-elevation-vertical-2",
    "--reverse-elevation-vertical-3",
    "--reverse-elevation-vertical-4",
    "--reverse-elevation-vertical-5",
    "--reverse-elevation-vertical-6",
    "--reverse-elevation-vertical-7",
    "--reverse-elevation-vertical-8",
    "--reverse-elevation-vertical-9",
    "--base-elevation-blur-2",
    "--base-elevation-blur-3",
    "--base-elevation-blur-4",
    "--base-elevation-blur-5",
    "--base-elevation-blur-6",
    "--base-elevation-blur-7",
    "--base-elevation-blur-8",
    "--base-elevation-blur-9",
    "--base-elevation-spread-2",
    "--base-elevation-spread-3",
    "--base-elevation-spread-4",
    "--base-elevation-spread-5",
    "--base-elevation-spread-6",
    "--base-elevation-spread-7",
    "--base-elevation-spread-8",
    "--base-elevation-spread-9",
    "--base-elevation-1",
    "--base-elevation-2",
    "--base-elevation-3",
    "--base-elevation-4",
    "--base-elevation-5",
    "--base-elevation-6",
    "--base-elevation-7",
    "--base-elevation-8",
    "--base-elevation-9",
    "--elevation-bg-0",
    "--on-elevation-bg-0",
    "--elevation-bg-1",
    "--on-elevation-bg-1",
    "--elevation-bg-2",
    "--on-elevation-bg-2",
    "--elevation-bg-3",
    "--on-elevation-bg-3",
    "--elevation-bg-4",
    "--on-elevation-bg-4",
    "--elevation-bg-5",
    "--on-elevation-bg-5",
    "--elevation-bg-6",
    "--on-elevation-bg-6",
    "--elevation-bg-7",
    "--on-elevation-bg-7",
    "--elevation-bg-8",
    "--on-elevation-bg-8",
    "--elevation-bg-9",
    "--on-elevation-bg-9",
    "--bevel-horizontal",
    "--bevel-vertical",
    "--bevel-spread",
    "--bevel-blur",
    "--bevel-light-opacity",
    "--bevel-dark-opacity",
    "--bevel-change",
    "--bevel-0",
    "--bevel-1",
    "--bevel-2",
    "--bevel-3",
    "--bevel-4",
    "--bevel-5",
    "--bevel-6",
    "--bevel-8",
    "--bevel-9",
    "--inbevel-horizontal",
    "--inbevel-vertical",
    "--inbevel-spread",
    "--inbevel-blur",
    "--inbevel-light-opacity",
    "--inbevel-dark-opacity",
    "--inbevel-change",
    "--reverse-bevel-1",
    "--reverse-bevel-2",
    "--reverse-bevel-3",
    "--reverse-bevel-4",
    "--reverse-bevel-5",
    "--reverse-bevel-6",
    "--reverse-bevel-7",
    "--reverse-bevel-8",
    "--reverse-bevel-9",
    "--dropdown-focus-theme",
    "--dropdown-focus-bg",
    "--on-dropdown-focus-bg",
    "--dm-dropdown-focus-bg",
    "--dm-on-dropdown-focus-bg",
    "--dropdown-elevation",
    "--dropdown-hover-style",
    "--dm-dropdown-hover-bg",
    "--dm-on-dropdown-hover-bg",
    "--dropdown-radius",
    "--icon",
    "--on-icon",
    "--dm-icon",
    "--dm-on-icon",
    "--on-button",
    "--button",
    "--button-half",
    "--dm-on-button",
    "--dm-button",
    "--dm-button-half",
    "--button-border",
    "--button-radius",
    "--button-minwidth",
    "--button-padding",
    "--button-height",
    "--buttonTypography",
    "--buttonTextDecoration",
    "--buttonTextTransform",
    "--buttonLetterSpacing",
    "--button-elevation",
    "--button-bevel",
    "--button-shadow",
    "--sm-button-padding",
    "--sm-button-height",
    "--sm-buttonTypography",
    "--sm-buttonTextDecoration",
    "--sm-buttonTextTransform",
    "--sm-buttonLetterSpacing",
    "--groupButton-radius",
    "--groupButtonBG",
    "--on-groupButtonBG",
    "--dm-groupButtonBG",
    "--dm-on-groupButtonBG",
    "--chip",
    "--on-chip",
    "--dm-chip",
    "--dm-on-chip",
    "--chip-padding",
    "--chip-radius",
    "--chip-minwidth",
    "--chip-height",
    "--chipTypography",
    "--chipTextTransform",
    "--chipLetterSpacing",
    "--chip-bevel",
    "--chip-elevation",
    "--switch-height",
    "--switch-radius",
    "--switch-bar-height",
    "--switch-bar-radius",
    "--leftNav",
    "--on-leftNav",
    "--leftNavPadding",
    "--footer",
    "--on-footer",
    "--footer-padding",
    "--dm-footer",
    "--dm-on-footer",
    "--copyright",
    "--on-copyright",
    "--copyright-padding",
    "--dm-copyright",
    "--dm-on-copyright",
    "--p-padding",
    "--section-padding",
    "--card-padding",
    "--card-gap",
    "--card-border",
    "--card-border-color",
    "--card-radius",
    "--card-elevation",
    "--card-bevel",
    "--card-shadow",
    "--modal-padding",
    "--modal-border",
    "--modal-radius",
    "--modal-elevation",
    "--modal-shadow",
    "--modal-overlay",
    "--tooltip-padding",
    "--tooltip-border",
    "--tooltip-elevation",
    "--toast-padding",
    "--toast-radius",
    "--toast-bevel",
    "--toast-elevation",
    "--toast-boxshadow",
    "--image-elevation",
    "--image-radius",
    "--image-shadow",
    "--inline-image-height",
    "--inline-image-radius",
    "--avatar-border",
    "--avatar-border-lg",
    "--avatar-elevation",
    "--avatar-shadow",
    "--sliderhandleHeight",
    "--sliderhandleRadius",
    "--barInBevel",
    "--popoverBevel",
    "--popoverShadow",
    "--popoverRadius",
    "--navbarPrimary-padding",
    "--navbarSecondary-padding",
    "--navbarSecondary-stickyTop",
    "--hero-gap",
    "--hero-padding",
    "--hero-titleTypography",
    "--hero-titleTransform",
    "--hero-titleSpacing",
    "--hero-bodyTypography",
    "--hero-bodyTransform",
    "--hero-bodySpacing",
    "--hero-justify-content",
    "--tableheaderTypography",
    "--tableheaderSpacing",
    "--tableheaderTransform",
    "--tablebodyTypography",
    "--tablebodySpacing",
    "--tablebodyTransform",
    "--tableheaderPadding",
    "--tablebodyPadding",
    "--standard-LineHeight",
    "--header-LineHeight",
    "--sm-LineHeight",
    "--fontWeight-0",
    "--fontWeight-1",
    "--fontWeight-2",
    "--fontWeight-3",
    "--fontWeight-4",
    "--primaryFont",
    "--secondaryFont",
    "--baseFont",
    "--headerChange",
    "--headerWeight",
    "--headerFamily",
    "--bodyFamily",
    "--Display1FontSize",
    "--Display1FontFamily",
    "--Display1FontWeight",
    "--Display1LineHeight",
    "--Display1TextDecoration",
    "--Display1TextTransform",
    "--Display1LetterSpacing",
    "--Display2FontSize",
    "--Display2FontFamily",
    "--Display2FontWeight",
    "--Display2LineHeight",
    "--Display2TextDecoration",
    "--Display2TextTransform",
    "--Display2LetterSpacing",
    "--h1FontSize",
    "--h1FontFamily",
    "--h1FontWeight",
    "--h1LineHeight",
    "--h1TextDecoration",
    "--h1TextTransform",
    "--h1LetterSpacing",
    "--h2FontSize",
    "--h2FontFamily",
    "--h2FontWeight",
    "--h2LineHeight",
    "--h2TextDecoration",
    "--h2TextTransform",
    "--h2LetterSpacing",
    "--h3FontSize",
    "--h3FontFamily",
    "--h3FontWeight",
    "--h3LineHeight",
    "--h3TextDecoration",
    "--h3TextTransform",
    "--h3LetterSpacing",
    "--h4FontSize",
    "--h4FontFamily",
    "--h4FontWeight",
    "--h4LineHeight",
    "--h4TextDecoration",
    "--h4TextTransform",
    "--h4LetterSpacing",
    "--h5FontSize",
    "--h5FontFamily",
    "--h5FontWeight",
    "--h5LineHeight",
    "--h5TextDecoration",
    "--h5TextTransform",
    "--h5LetterSpacing",
    "--h6FontSize",
    "--h6FontFamily",
    "--h6FontWeight",
    "--h6LineHeight",
    "--h6TextDecoration",
    "--h6TextTransform",
    "--h6LetterSpacing",
    "--body1FontSize",
    "--body1FontFamily",
    "--body1FontWeight",
    "--body1LineHeight",
    "--body1TextDecoration",
    "--body1TextTransform",
    "--body1LetterSpacing",
    "--body1-boldFontSize",
    "--body1-boldFontFamily",
    "--body1-boldFontWeight",
    "--body1-boldLineHeight",
    "--body1-boldTextDecoration",
    "--body1-boldTextTransform",
    "--body1-boldLetterSpacing",
    "--body2FontSize",
    "--body2FontFamily",
    "--body2FontWeight",
    "--body2LineHeight",
    "--body2TextDecoration",
    "--body2TextTransform",
    "--body2LetterSpacing",
    "--body2-boldFontSize",
    "--body2-boldFontFamily",
    "--body2-boldFontWeight",
    "--body2-boldLineHeight",
    "--body2-boldTextDecoration",
    "--body2-boldTextTransform",
    "--body2-boldLetterSpacing",
    "--body3FontSize",
    "--body3FontFamily",
    "--body3FontWeight",
    "--body3LineHeight",
    "--body3TextDecoration",
    "--body3TextTransform",
    "--body3LetterSpacing",
    "--body3-boldFontSize",
    "--body3-boldFontFamily",
    "--body3-boldFontWeight",
    "--body3-boldLineHeight",
    "--body3-boldTextDecoration",
    "--body3-boldTextTransform",
    "--body3-boldLetterSpacing",
    "--subtitle1FontSize",
    "--subtitle1FontFamily",
    "--subtitle1FontWeight",
    "--subtitle1LineHeight",
    "--subtitle1TextDecoration",
    "--subtitle1TextTransform",
    "--subtitle1LetterSpacing",
    "--subtitle2FontSize",
    "--subtitle2FontFamily",
    "--subtitle2FontWeight",
    "--subtitle2LineHeight",
    "--subtitle2TextDecoration",
    "--subtitle2TextTransform",
    "--subtitle2LetterSpacing",
    "--CTAFontSize",
    "--CTAFontFamily",
    "--CTAFontWeight",
    "--CTALineHeight",
    "--CTATextDecoration",
    "--CTATextTransform",
    "--CTALetterSpacing",
    "--CTA-SmallFontSize",
    "--CTA-SmallFontFamily",
    "--CTA-SmallFontWeight",
    "--CTA-SmallLineHeight",
    "--CTA-SmallTextDecoration",
    "--CTA-SmallTextTransform",
    "--CTA-SmallLetterSpacing",
    "--captionFontSize",
    "--captionFontFamily",
    "--captionFontWeight",
    "--captionLineHeight",
    "--captionTextDecoration",
    "--captionTextTransform",
    "--captionLetterSpacing",
    "--caption-boldFontSize",
    "--caption-boldFontFamily",
    "--caption-boldFontWeight",
    "--caption-boldLineHeight",
    "--caption-boldTextDecoration",
    "--caption-boldTextTransform",
    "--caption-boldLetterSpacing",
    "--overlineFontSize",
    "--overlineFontFamily",
    "--overlineFontWeight",
    "--overlineLineHeight",
    "--overlineTextDecoration",
    "--overlineTextTransform",
    "--overlineLetterSpacing",
    "--overline-largeFontSize",
    "--overline-largeFontFamily",
    "--overline-largeFontWeight",
    "--overline-largeLineHeight",
    "--overline-largeTextDecoration",
    "--overline-largeTextTransform",
    "--overline-largeLetterSpacing",
    "--overline-XLFontSize",
    "--overline-XLFontFamily",
    "--overline-XLFontWeight",
    "--overline-XLLineHeight",
    "--overline-XLTextDecoration",
    "--overline-XLTextTransform",
    "--overline-XLLetterSpacing",
    "--smallFontSize",
    "--smallFontFamily",
    "--smallFontWeight",
    "--smallLineHeight",
    "--smallTextDecoration",
    "--smallTextTransform",
    "--smallLetterSpacing",
    "--small-semiboldFontSize",
    "--small-semiboldFontFamily",
    "--small-semiboldFontWeight",
    "--small-semiboldLineHeight",
    "--small-semiboldTextDecoration",
    "--small-semiboldTextTransform",
    "--small-semiboldLetterSpacing",
    "--label-1FontSize",
    "--label-1FontFamily",
    "--label-1FontWeight",
    "--label-1LineHeight",
    "--label-1TextDecoration",
    "--label-1TextTransform",
    "--label-1LetterSpacing",
    "--label-1-allCapsFontSize",
    "--label-1-allCapsFontFamily",
    "--label-1-allCapsFontWeight",
    "--label-1-allCapsLineHeight",
    "--label-1-allCapsTextDecoration",
    "--label-1-allCapsTextTransform",
    "--label-1-allCapsLetterSpacing",
    "--label-2FontSize",
    "--label-2FontFamily",
    "--label-2FontWeight",
    "--label-2LineHeight",
    "--label-2TextDecoration",
    "--label-2TextTransform",
    "--label-2LetterSpacing",
    "--label-2-allCapsFontSize",
    "--label-2-allCapsFontFamily",
    "--label-2-allCapsFontWeight",
    "--label-2-allCapsLineHeight",
    "--label-2-allCapsTextDecoration",
    "--label-2-allCapsTextTransform",
    "--label-2-allCapsLetterSpacing",
    "--label-smallFontSize",
    "--label-smallFontFamily",
    "--label-smallFontWeight",
    "--label-smallLineHeight",
    "--label-smallTextDecoration",
    "--label-smallTextTransform",
    "--label-smallLetterSpacing",
    "--statFontSize",
    "--statFontFamily",
    "--statFontWeight",
    "--statLineHeight",
    "--statTextDecoration",
    "--statTextTransform",
    "--statLetterSpacing",
    "--cobalt-0",
    "--on-cobalt-0",
    "--cobalt-100",
    "--on-cobalt-100",
    "--cobalt-200",
    "--on-cobalt-200",
    "--cobalt-300",
    "--on-cobalt-300",
    "--cobalt-400",
    "--on-cobalt-400",
    "--cobalt-500",
    "--on-cobalt-500",
    "--cobalt-600",
    "--on-cobalt-600",
    "--cobalt-700",
    "--on-cobalt-700",
    "--cobalt-800",
    "--on-cobalt-800",
    "--cobalt-900",
    "--on-cobalt-900",
    "--dm-cobalt-0",
    "--dm-cobalt-100",
    "--dm-cobalt-200",
    "--dm-cobalt-300",
    "--dm-cobalt-400",
    "--dm-cobalt-500",
    "--dm-cobalt-600",
    "--dm-cobalt-700",
    "--dm-cobalt-800",
    "--dm-cobalt-900",
    "--dropdown-hover-bg",
    "--dropdown-bottom-hover-bg",
    "--dm-dropdown-bottom-hover-bg",
    "--bevel-7",
    "--captionLetterSpacing",
    "--caption-boldLetterSpacing",
    "--overlineLetterSpacing",
    "--overline-largeLetterSpacing",
    "--overline-XLLetterSpacing",
    "--label-1LetterSpacing",
    "--label-1-allCapsLetterSpacing",
    "--label-2LetterSpacing",
    "--label-2-allCapsLetterSpacing",
    "--label-smallLetterSpacing",
    "--CTA-SmallLetterSpacing",
    "--smallLetterSpacing",
    "--small-semiboldLetterSpacing",
    "--statLetterSpacing",
    "--buttonLetterSpacing",
    "--sm-buttonLetterSpacing",
    "--sliderhandleElevation",
    "--popoverElevation",
];

const expectedCssVarsPostMVP = [
    "--sliderbarHeight",
    "--mobile-bar",
    "--mobile-topNav",
    "--on-mobile-topNav",
    "--mobile-bottomNav",
    "--on-mobile-bottomNav",
    "--mobile-tabs",
    "--on-mobile-tabs",
    "--mobile-primaryBG",
    "--on-mobile-primaryBG",
    "--dm-mobile-primaryBG",
    "--dm-on-mobile-primaryBG",
    "--mobile-primaryCard",
    "--on-mobile-primaryCard",
    "--mobile-card-padding",
    "--mini-mobile-card-padding",
    "--mobile-card-gap",
    "--mobile-primaryPanel",
    "--on-mobile-primaryPanel",
    "--chart-bg",
    "--chart-bg-border",
    "--chart-lineColor",
    "--chart-primary-01",
    "--chart-primary-02",
    "--chart-primary-03",
    "--chart-secondary-01",
    "--chart-secondary-02",
    "--chart-secondary-03",
    "--chart-tertiary-01",
    "--chart-tertiary-02",
    "--chart-tertiary-03",
    "--chart-primary-01-opaque",
    "--chart-primary-02-opaque",
    "--chart-primary-03-opaque",
    "--chart-secondary-01-opaque",
    "--chart-secondary-02-opaque",
    "--chart-secondary-03-opaque",
    "--chart-tertiary-01-opaque",
    "--chart-tertiary-02-opaque",
    "--chart-tertiary-03-opaque",
    "--dm-chart-bg",
    "--dm-chart-lineColor",
    "--dm-chart-bg-border",
    "--dm-chart-primary-01",
    "--dm-chart-primary-02",
    "--dm-chart-primary-03",
    "--dm-chart-secondary-01",
    "--dm-chart-secondary-02",
    "--dm-chart-secondary-03",
    "--dm-chart-tertiary-01",
    "--dm-chart-tertiary-02",
    "--dm-chart-tertiary-03",
    "--dm-chart-primary-01-opaque",
    "--dm-chart-primary-02-opaque",
    "--dm-chart-primary-03-opaque",
    "--dm-chart-secondary-01-opaque",
    "--dm-chart-secondary-02-opaque",
    "--dm-chart-secondary-03-opaque",
    "--dm-chart-tertiary-01-opaque",
    "--dm-chart-tertiary-02-opaque",
    "--dm-chart-tertiary-03-opaque",
    "--bar-chart-background",
    "--bar-chart-width",
    "--bar-chart-radius",
    "--bar-chart-border",
    "--bar-chart-bevel",
    "--bar-chart-elevation",
    "--line-chart-background",
    "--line-chart-width",
    "--line-chart-radius",
    "--line-chart-border",
    "--line-chart-bevel",
    "--line-chart-elevation",
    "--donut-chart-background",
    "--donut-chart-thickness",
    "--donut-chart-radius",
    "--donut-chart-space",
    "--donut-chart-bevel",
    "--donut-chart-elevation",
    "--donut-chart-container",
    "--donut-container",
    "--donuthole-display",
    "--pie-chart-background",
    "--pie-chart-width",
    "--pie-chart-radius",
    "--pie-chart-border",
    "--pie-chart-bevel",
    "--pie-chart-elevation",
    "--pie-container",
    "--progress-chart-background",
    "--progress-chart-thickness",
    "--progress-chart-radius",
    "--progress-chart-space",
    "--progress-chart-bevel",
    "--progress-chart-elevation",
    "--progress-chart-start",
];

const doNotSet = [
    "--navbarPrimary-font",
    "--navbarPrimary-character-spacing",
    "--navbarPrimary-transform",
    "--navbarPrimary",
    "--on-navbarPrimary",
    "--navbarPrimary-position",
    "--dm-navbarPrimary",
    "--dm-n-navbarPrimary",
    "--navbarSecondary-font",
    "--navbarSecondary-character-spacing",
    "--navbarSecondary-transform",
    "--navbarSecondary",
    "--on-navbarSecondary",
    "--navbarSecondary-position",
    "--dm-navbarSecondary",
    "--dm-on-navbarSecondary",
    "--text-uppercase",
    "--text-decoration-none",
    "--min-letter-spacing",
    "--dm-on-cobalt-0",
    "--dm-on-cobalt-100",
    "--dm-on-cobalt-200",
    "--dm-on-cobalt-300",
    "--dm-on-cobalt-400",
    "--dm-on-cobalt-500",
    "--dm-on-cobalt-600",
    "--dm-on-cobalt-700",
    "--dm-on-cobalt-800",
    "--dm-on-cobalt-900",
    "--chipTypography",
    "--image-border",
]

test();