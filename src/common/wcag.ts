/*
 * Copyright (c) 2023 Discover Financial Services
 * Licensed under Apache-2.0 License. See License.txt in the project root for license information
 */

export class WCAGLevel {

    public static findByName(name: string): WCAGLevel | undefined {
        for (const wl of this.ALL) {
            if (wl.name == name) return wl;
        }
        return undefined;
    }

    public static AA = new WCAGLevel("AA", 4.5, 3.1, 3.1);
    public static AAA = new WCAGLevel("AAA", 7.1, 4.5, 3.1);
    public static ALL = [this.AA, this.AAA];

    public name: string;
    public minContrastRatioForSmallText: number;
    public minContrastRatioForLargeText: number;
    public minContrastRatioForNonText: number;

    private constructor(name: string, minContrastRatioForSmallText: number, minContrastRatioForLargeText: number, minContrastRatioForNonText: number) {
        this.name = name;
        this.minContrastRatioForSmallText = minContrastRatioForSmallText;
        this.minContrastRatioForLargeText = minContrastRatioForLargeText;
        this.minContrastRatioForNonText = minContrastRatioForNonText;
    }

    public isAA(): boolean {
        return this === WCAGLevel.AA;
    }

    public isAAA(): boolean {
        return this === WCAGLevel.AAA;
    }

    public shouldSmoothTransition(lm: boolean): boolean {
        return (!lm && this.isAA()) || this.isAAA();
    }

    public toString() {
        return this.name;
    }

}