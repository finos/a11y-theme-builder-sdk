/*
 * Copyright (c) 2024 Discover Financial Services
 * Licensed under Apache-2.0 License. See License.txt in the project root for license information
 */

import { Shade } from "./shade";

/**
 * Settings
 * 
 * @category 
 */

export class WCAGSetting {

    public static readonly AA = new WCAGSetting("AA", 4.5);
    public static readonly AAA = new WCAGSetting("AAA", 7.1);

    private constructor(name: string, minContrastRatio: number) {
        this.name = name;
        this.minContrastRatio = minContrastRatio;
    }

    public readonly name: string;
    public readonly minContrastRatio: number;
}

export class Settings {
    
    public wcag: WCAGSetting = WCAGSetting.AA;  // per theme
    // Not sure if these should be per theme or per color.  Lise to follow up.
    public lmMaxChroma = 100;
    public dmMaxChroma = 80;
    // per theme
    public lightText = Shade.WHITE;
    public darkText = Shade.DARK_TEXT;
    public dmOpacity = .7;
    public mixer = 1 - this.dmOpacity;  // constant relative to dmOpacity

}