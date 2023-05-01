/*
 * Copyright (c) 2023 Discover Financial Services
 * Licensed under MIT License. See License.txt in the project root for license information
 */
import {describe, beforeAll, expect, test} from '@jest/globals';
import { ThemeBuilder, DesignSystem, Color, ColorTheme, PropertyColorShade } from "..";

describe('All', () => {
    let tb: ThemeBuilder;
    let ds: DesignSystem;
    let c1, c2, c3: Color;
    let ct: ColorTheme;
    let selectColorShade = function(prop: PropertyColorShade, idx1: number, idx2:number) {
        const sels = prop.getSelectableValues();
        expect(sels.length).toBeGreaterThan(idx1);
        const row = sels[idx1];
        expect(row.length).toBeGreaterThan(idx2);
        const val = row[idx2];
        expect(val).toBeDefined();
        prop.setValue(val);
    };
    beforeAll(async() => {
        // Create the theme builder
        tb = await ThemeBuilder.create();
        expect(tb).toBeDefined();
        // Create add the design system
        ds = await tb.addDesignSystem("ds1", {sample: true});
        expect(ds).toBeDefined();
        expect(ds.isSample()).toBeTruthy();
        expect(ds.atoms.colorPalette.isEnabled()).toBeTruthy();
        expect(ds.atoms.colorPalette.isInitialized()).toBeFalsy();
        expect(ds.atoms.colorThemes.isEnabled()).toBeFalsy();
        expect(ds.molecules.isEnabled()).toBeFalsy();
        expect(ds.organisms.isEnabled()).toBeFalsy();
        expect(ds.code.isEnabled()).toBeFalsy();
        // Add 1st color
        c1 = ds.atoms.colorPalette.addColor("cobalt","#0047AB");
        expect(c1).toBeDefined();
        expect(ds.atoms.colorPalette.isInitialized()).toBeTruthy();
        expect(ds.atoms.colorThemes.isEnabled()).toBeTruthy();
        expect(ds.molecules.isEnabled()).toBeFalsy();
        expect(ds.organisms.isEnabled()).toBeFalsy();
        expect(ds.code.isEnabled()).toBeFalsy();
        // Add 2nd and 3rd colors
        c2 = ds.atoms.colorPalette.addColor("red","#FF0000");
        expect(c2).toBeDefined();
        c3 = ds.atoms.colorPalette.addColor("green","#00FF00");
        expect(c3).toBeDefined();
        // Add color theme
        ct = ds.atoms.colorThemes.createTheme("colorTheme1");
        expect(ct).toBeDefined();
        // Initialize primary, secondary, and tertiary colors
        selectColorShade(ct.primary, 0, 4);
        selectColorShade(ct.secondary, 1, 2);
        selectColorShade(ct.secondary, 2, 7);
    });
    test('Palette', () => {
    });
});