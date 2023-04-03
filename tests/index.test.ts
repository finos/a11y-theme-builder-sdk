/*
 * Copyright (c) 2023 Discover Financial Services
 * Licensed under MIT License. See License.txt in the project root for license information
 */
import { ThemeBuilder, DesignSystem } from "..";

describe('All', () => {
    let tb: ThemeBuilder;
    let ds: DesignSystem;
    beforeAll(async() => {
        tb = await ThemeBuilder.create();
        expect(tb).toBeDefined();
        const ds = await tb.addDesignSystem("ds1");
        expect(ds).toBeDefined();
    });
    test('Enabled', () => {
        
    });
});