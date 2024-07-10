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

    private constructor(name: string, textContrast: number) {
        this.name = name;
        this.textContrast = textContrast;
    }

    public readonly name: string;
    public readonly textContrast: number;
}

export class Settings {
    
    public wcag: WCAGSetting = WCAGSetting.AA;
    public lmMaxChroma = 100;
    public dmMaxChroma = 100;
    public lightText = Shade.WHITE;
    public darkText = Shade.DARK_TEXT;

}