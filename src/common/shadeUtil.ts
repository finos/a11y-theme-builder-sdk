import * as chroma from "chroma-js";

/*
 * Copyright (c) 2023 Discover Financial Services
 * Licensed under Apache-2.0 License. See License.txt in the project root for license information
 */
export class ShadeUtil {

    /**
     * Lighten a color and return resulting color.
     * @param hexColor The hex representation of the color to lighten.
     * @param opacity The opacity value to lighten, between [0,1];
     * @returns The hex representation of the lightened color.
     */
    public static lighten(hexColor: string, opacity: number): string {
        return ShadeUtil.mixColors(hexColor, '#ffffff', opacity);
    }

    /**
     * Darken a color and return resulting color.
     * @param hexColor The hex representation of the color to darken.
     * @param opacity The opacity value to darken [0.01,100];
     * @returns The hex representation of the darkened color.
     */
    public static darken(hexColor: string, opacity: number): string {
        return ShadeUtil.mixColors(hexColor, '#121212', opacity);
    }

    /**
     * Mix two colors (in hex) and return the resulting color (in hex).
     * @param c1 Hex string for color1
     * @param c2 Hex string for color2
     * @param opacity Value from [0,1]
     * @returns Hex string for mixed color
     */
    public static mixColors(c1: string, c2: string, opacity: number): string {
        const [r0, g0, b0, r1, g1, b1] = [
          parseInt(c1.slice(1, 3), 16),
          parseInt(c1.slice(3, 5), 16),
          parseInt(c1.slice(5, 7), 16),
          parseInt(c2.slice(1, 3), 16),
          parseInt(c2.slice(3, 5), 16),
          parseInt(c2.slice(5, 7), 16),
        ];
        const [r, g, b] = [
          Math.round(r0 * opacity + r1 * (1 - opacity)),
          Math.round(g0 * opacity + g1 * (1 - opacity)),
          Math.round(b0 * opacity + b1 * (1 - opacity)),
        ];
        const pn = (n:number) => ('0' + n.toString(16)).slice(-2);
        return `#${pn(r)}${pn(g)}${pn(b)}`;
    }

}