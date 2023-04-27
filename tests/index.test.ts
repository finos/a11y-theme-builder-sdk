/*
 * Copyright (c) 2023 Discover Financial Services
 * Licensed under MIT License. See License.txt in the project root for license information
 */
import {describe, beforeAll, expect, test} from '@jest/globals';
import { ThemeBuilder, DesignSystem } from "..";

describe('All', () => {
    let tb: ThemeBuilder;
    let ds: DesignSystem;
    beforeAll(async() => {
        tb = await ThemeBuilder.create();
        expect(tb).toBeDefined();
        ds = await tb.addDesignSystem("ds1");
        expect(ds).toBeDefined();
        expect(ds.atoms.colorPalette.isEnabled()).toBeTruthy();
        expect(ds.atoms.colorPalette.isInitialized()).toBeFalsy();
        expect(ds.atoms.colorThemes.isEnabled()).toBeFalsy();
        expect(ds.molecules.isEnabled()).toBeFalsy();
        expect(ds.organisms.isEnabled()).toBeFalsy();
        //expect(ds.code.isEnabled()).toBeFalsy();
    });
    test('Palette', () => {
        expect(ds.atoms.colorPalette.isEnabled()).toBeTruthy();
        expect(ds.atoms.colorPalette.isInitialized()).toBeFalsy();
        const color = ds.atoms.colorPalette.addColor("cobalt","#0047AB");
        expect(color).toBeDefined();
        expect(ds.atoms.colorPalette.isInitialized()).toBeTruthy();
    });
});