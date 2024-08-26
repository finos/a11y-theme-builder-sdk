/*
 * Copyright (c) 2023 Discover Financial Services
 * Licensed under Apache-2.0 License. See License.txt in the project root for license information
 */
import * as chroma from "chroma-js";
import { Logger } from "../util/logger";
import { ShadeBuilder, ShadeBuilderView } from "./shadeBuilder";
import { ShadeUtil } from "./shadeUtil";
import { Util } from "../util/util";
import { IColor } from "../interfaces";

const log = new Logger("shd");

export interface ShadeGroup {
    shade: Shade;
    halfShade: Shade;
    onShade: Shade;
}

export interface HSL {
    H: number;   // hue
    S: number;   // saturation
    L: number;   // lightness
}

export interface HCL {
    H: number;   // hue
    C: number;   // chroma
    L: number;   // lightness
}

export interface HSLOpts {
    H?: number;
    S?: number;
    L?: number;
}

interface IV {
    idx: number;
    val: number;
}

interface LMH {
    low: IV;
    mid: IV;
    high: IV;
}

export interface SearchShadesArgs {
    condition: (shade: Shade) => boolean;
    add1: number;
    add2: number;
}

/**
 * A color shade.
 * 
 * @category Utilities
 */
export class Shade {

    private static coreShadeMap: {[coreShadeName:string]: Shade} = {};

    /** The black shade */
    public static FULL_BLACK = Shade.fromHex("#000000", "Full-Black");
    /** The black shade */
    public static BLACK = Shade.fromHex("#121212", "Black");
    /** The near black shade */
    public static NEAR_BLACK = Shade.fromHex("#181818", "Near-Black");
    /** The half-black shade */
    public static HALF_BLACK = Shade.fromHex("#000000", "Half-Black").setOpacity(0.5);
    /** The off-black shade */
    public static OFF_BLACK = Shade.fromHex("#181818", "Off-Black");
    /** The white shade */
    public static WHITE = Shade.fromHex("#FFFFFF", "White");
    /** The half-white shade */
    public static HALF_WHITE = Shade.fromHex("#FFFFFF", "Half-White").setOpacity(0.5);
    /** The off-white shade */
    public static OFF_WHITE = Shade.fromHex("#FAF9F6", "Off-White");
    /** The gray shade */
    public static GRAY = Shade.fromHex("#FAFAFA", "Gray");
    /** The dark text shade */
    public static DARK_TEXT = Shade.fromHex("#23233F", "Dark-Text");
    /** The white dark mode shade */
    public static WHITE_DM = Shade.fromHex("#FFFFFF", "DM-White").setOpacity(0.6);
    /** The half-white dark mode shade */
    public static HALF_WHITE_DM = Shade.fromHex("#FFFFFF", "DM-Half-White").setOpacity(0.4);
    /** The dark blue shade */
    public static DARK_BLUE = Shade.fromHex("#1D1D1F", "Dark-Blue");
    public static DARKEN_MULTIPLIER = 0.99;
    public static LIGHTEN_MULTIPLIER = 1.01;
    /** Lists of light and dark shades */
    public static LIGHT_SHADES = [this.WHITE, this.HALF_WHITE, this.OFF_WHITE, this.WHITE_DM, this.HALF_WHITE_DM];
    public static DARK_SHADES = [this.FULL_BLACK, this.BLACK, this.HALF_BLACK, this.NEAR_BLACK, this.OFF_BLACK, this.GRAY, this.DARK_TEXT, this.DARK_BLUE];
    /** default shade builder */
    public static defaultBuilder: ShadeBuilder;
    
    /**
     * Get a core shade given the core shade name.
     * @param coreShadeName The core shade name.
     * @returns The core shade, or undefined if none found by this name.
     */
    public static getCoreShade(coreShadeName: string): Shade | undefined {
        return Shade.coreShadeMap[coreShadeName];
    }

    /**
     * Get all core shades.
     * @returns All core shades.
     */
    public static coreShades(): Shade[] {
        return Object.values(Shade.coreShadeMap);
    }

    /**
     * Create a shade object from it's hex value.
     * @param hex The hex value for the color shade.
     * @param coreShadeName An optional core shade name for this object.
     * @returns The shade object
     */
    public static fromHex(hex: string, coreShadeName?: string): Shade {
        const shade = new Shade({hex});
        if (coreShadeName) {
            if (Shade.getCoreShade(coreShadeName)) {
                throw new Error(`Core shade '${coreShadeName}' already exists`);
            }
            shade.coreShadeName = coreShadeName;
            Shade.coreShadeMap[coreShadeName] = shade;
        }
        return shade;
    }

    /**
     * Create a shade object from it's R, G, and B values.
     * @param R Red value.
     * @param G Green value.
     * @param B Blue value.
     * @returns The shade object
     */
    public static fromRGB(R: number, G: number, B: number): Shade {
        return Shade.fromRGBArray([R,G,B]);
    }

    /**
     * Create a shade object from it's HSL values.
     * @returns The shade object
     */
    public static fromHSL(hsl:HSL): Shade {
        return Shade.fromHex(chroma.hsl(hsl.H, hsl.S, hsl.L).hex());
    }

    /**
     * Create a shade object from it's R, G, and B values.
     * @returns The shade object
     */
    public static fromHCL(hcl:HCL): Shade {
        return Shade.fromHex(chroma.hcl(hcl.H, hcl.C, hcl.L).hex());
    }

    /**
     * Create a shade object from an [R,G,B] array.
     * @param rgbArray The [R,G,B] array.
     * @returns The shade object.
     */
    public static fromRGBArray(rgbArray: number[]): Shade {
        return new Shade({rgbArray})
    }

    public static fromRGBString(rgb: string): Shade {
        const m = rgb.match(/rgb\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\)/);
        if (!m) throw new Error(`Not an RGB string: ${rgb}`);
        const R = Number(m[1]);
        const G = Number(m[2]);
        const B = Number(m[3]);
        return Shade.fromRGB(R,G,B);
    }

    public static fromRGBAString(rgba: string): Shade {
        const m = rgba.match(/rgba\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*,\s*([\d\.]+)\s*\)/);
        if (!m) throw new Error(`Not an RGBA string: ${rgba}`);
        const R = Number(m[1]);
        const G = Number(m[2]);
        const B = Number(m[3]);
        const opacity = Number(m[4]);
        return Shade.fromRGB(R,G,B).setOpacity(opacity);
    }

    public static setDefaultBuilder(builder: ShadeBuilder) {
        Shade.defaultBuilder = builder;
    }

    /** The shade's hex value */
    public hex!: string;
    /** The shade's RGB array */
    public rgbArray!: number[];
    /** The shade's R value */
    public R!: number;
    /** The shade's G value */
    public G!: number;
    /** The shade's B value */
    public B!: number;
    /** The id of the shade */
    public id: string = "unknown";
    /** The index of the shade */
    public index: number = -1;
    /** The opacity of the shade */
    public opacity: number = 1;
    /** The onHex value for this shade */
    public onHex: string = "";
    /** If this is a shade built from the color palette, it is the unique key to the shade node in the tree */
    public key?: string;
    /** If this is a core shade such as "Black" or "White", it is set to the core shade name. */
    public coreShadeName?: string;
    /** The cached computed luminance value for this shade */
    private luminance?: number;
    /** The cached computed lightness value for this shade */
    private lightness?: number;
    /** The cached computed perceived lightness value for this shade */
    private perceivedLightness?: number;
    /** The cached computed saturation value for this shade */
    private saturation?: number;
    /** The cached computed label (e.g. 100, 200, etc) for this shade based upon it's lightness value */
    private label?: number;
    /** The parent color node for this shade if it was generated from the color palette */
    private color?: IColor;
    /** For automatically built shades,  */
    private builder?: ShadeBuilder;

    constructor(opts: { hex?: string; rgbArray?: number[]} ) {
        if (!opts.hex && !opts.rgbArray) {
            throw new Error(`Either hex or rgbArray must be specified`);
        }
        if (opts.rgbArray) {
            opts.rgbArray = Util.normalizeRgbArray(opts.rgbArray);
        }
        const hex = opts.hex || Util.rgbArrayToHex(opts.rgbArray as number[]);
        this.setHex(hex);
    }

    public hasBuilder(): boolean {
        return this.builder !== undefined;
    }

    public getBuilder(lm?: boolean): ShadeBuilder {
        const sb = this.builder || ShadeBuilder.lmDefault;
        if (lm == undefined || lm == sb.isLightMode()) return sb;
        return sb.getOther();
    }

    public setBuilder(builder: ShadeBuilder): Shade {
        this.builder = builder;
        return this;
    }

    public buildShades(lm?: boolean): Shade[] {
        return this.getBuilder(lm).build(this);
    }

    public buildLMShades(): Shade[] {
        return this.buildShades(true);
    }

    public buildDMShades(): Shade[] {
        return this.buildShades(false);
    }

    public hasColor(): boolean {
        return this.color !== undefined;
    }

    public getColor(): IColor {
        const color = this.color;
        if (!color) throw new Error(`No color found for shade ${this.toString()}`);
        return color;
    }

    public setColor(color: IColor) {
        this.color = color;
    }

    public setContext(shade: Shade): Shade {
        if (shade.hasColor()) this.setColor(shade.getColor());
        this.setBuilder(shade.getBuilder());
        return this;
    }

    public fromHex(): Shade {
        const rtn = Shade.fromHex(this.hex);
        rtn.index = this.index;
        rtn.color = this.color;
        return rtn;
    }

    public fromRGB(): Shade {
        const rtn = Shade.fromRGB(this.R, this.G, this.B);
        rtn.index = this.index;
        rtn.color = this.color;
        return rtn;
    }

    /**
     * Set the hex value for this shade.
     * @param hex The hex value for this shade.
     */
    public setHex(hex: string): Shade {
        this.hex = hex.toUpperCase();
        this.rgbArray = Util.hexToRgbArray(hex as string);
        this.R = this.rgbArray[0];
        this.G = this.rgbArray[1];
        this.B = this.rgbArray[2];
        return this;
    }

    public setIndex(index: number): Shade {
        this.index = index;
        return this;
    }

    public hsl(): HSL {
       const hsl = chroma.hex(this.hex).hsl();
       return { H: hsl[0], S: hsl[1], L: hsl[2] };
    }

    public hcl(): HCL {
       const hcl = chroma.hex(this.hex).hcl();
       return { H: hcl[0], C: hcl[1], L: hcl[2] };
    }

    public adjustHSL(opts: HSLOpts): Shade {
        const hsl = this.hsl();
        if ('H' in opts) hsl.H = opts.H as number;
        if ('S' in opts) hsl.S = opts.S as number;
        if ('L' in opts) hsl.L = opts.L as number;
        return Shade.fromHSL(hsl);
    }

    public setH(h: number): Shade {
        return this.adjustHSL({H: h});
    }

    public setS(s: number): Shade {
        return this.adjustHSL({S: s});
    }

    public setL(l: number): Shade {
        return this.adjustHSL({L: l});
    }

    public setChroma(c: number): Shade {
        const hcl = this.hcl();
        hcl.C = c;
        return Shade.fromHCL(hcl);
    }

    /**
     * Determine if this shade is a core shade.
     * @returns True if this is a core shade; false, otherwise.
     */
    public isCore(): boolean {
        return this.coreShadeName !== undefined;
    }

    /**
     * Set the id of the shade
     * @param id The id of the shade
     * @returns The shade
     */
    public setId(id: string): Shade {
        this.id = id;
        return this;
    }

    /**
     * Get the half shade for this shade.
     * @returns The half shade (opacity 0.5) of this shade
     */
    public getHalfShade(): Shade {
        return this.getPartialShade(0.5);
    }

    /**
     * Get the quarter shade for this shade.
     * @returns The half shade (opacity 0.25) of this shade
     */
    public getQuarterShade(): Shade {
        return this.getPartialShade(0.25);
    }

    /**
     * Get a partial shade
     * @param opacity The opacity to apply to this new shade
     * @returns 
     */
    public getPartialShade(opacity: number): Shade {
        return this.clone().setOpacity(opacity);
    }

    public getOnShade(): Shade {
        return this.getOnShade2(true);
    }

    public getOnShade2(lm: boolean): Shade {
        return this.getBuilder(lm).getOnShade(this);
    }

    public getShadeGroup(lm: boolean): ShadeGroup {
        return {
            shade: this,
            halfShade: this.getHalfShade(),
            onShade: this.getOnShade2(lm),
        };
    }

    public setOpacity(opacity: number): Shade {
        this.opacity = opacity;
        return this;
    }

    public getLabel(): number {
        if (!this.label) {
            this.label = this.calculateLabel();
        }
        return this.label as number;
    }

    public getLabelIndex(): number {
        return this.getLabel() / 100;
    }

    /**
     * Get the luminance of this shade.
     * @returns The luminance
     */
    public getLuminance(): number {
        if (!this.luminance) {
            this.luminance = this.calculateLuminance();
        }
        return this.luminance;
    }

    /**
     * Return either this shade or the onShade based on contrast requirements to 'shade'.
     * @param shade The shade to compare to this one
     * @param multiplier Optional multiplier
     * @returns This shade or the onShade
     */
    public getShadeOrOnShadeBasedOnContrast(shade: Shade, lm: boolean): Shade {
        const sb = this.getBuilder(lm);
        const multiplier = lm ? 1 : 0.6;
        const contrast = this.getContrastRatio(shade) * multiplier;
        if (contrast >= sb.getMinContrastRatioForNonText()) {
            log.debug(`getShadeOrOnShadeBasedOnContrast: return shade, shade=${this.getRGBA()}, other=${shade.getRGBA()}, contrast=${contrast}`);
            return this;
        }
        const onShade = this.getOnShade2(lm);
        log.debug(`getShadeOrOnShadeBasedOnContrast: return onShade, onShade=${onShade.hex}, shade=${this.getRGBA()}, other=${shade.getRGBA()}, contrast=${contrast}`);
        return onShade;
    }

    /**
     * Get the lightness of this shade.
     * @returns The lightness of this shade.
     */
    public getLightness(): number {
        if (!this.lightness) {
            this.lightness = this.calculateLightness();
        }
        return this.lightness;
    }

    /**
     * Get the perceived lightness of this shade.
     * @returns The perceived lightness of this shade.
     */
    public getPerceivedLightness(): number {
        if (!this.perceivedLightness) {
            this.perceivedLightness = this.calculatePerceivedLightness();
        }
        return this.perceivedLightness;
    }

    /**
     * Get the saturation of this shade.
     * @returns The saturation of this shade.
     */
    public getSaturation(): number {
        if (!this.saturation) {
            this.saturation = this.calculateSaturation();
        }
        return this.saturation;
    }

    public lighten(opacity: number): Shade {
        return Shade.fromHex(ShadeUtil.lighten(this.hex, opacity));
    }

    public darken(opacity: number): Shade {
        return Shade.fromHex(ShadeUtil.darken(this.hex, opacity));
    }

    /**
     * Get a light mode shade which meets the contrast ratio on this background shade.
     * Find the shade closest to this shade which meets the contrast ratio requirement against the background shade.    
     * @param bgShade The background shade
     * @param ratio The required contrast ratio
     * @returns A light mode shade meeting the contrast ratio requirement, or undefined if not found
     */
    public getLMShade(bgShades: Shade[], ratio: number): Shade | undefined {
        log.debug(`Getting lightmode shade for ${JSON.stringify(this)}`);
        if (this.meetsContrastRequirements(bgShades, ratio)) {
            log.debug(`No lightmode searching required; shade ${JSON.stringify(this)}`);
            return this;
        }
        log.debug(`Lightmode searching required; shade ${JSON.stringify(this)}`);
        const lmShades = this.getDarkerShades(true);
        // Search forwards for the first one of these built shades which has a contrast ratio to the selected shade >=
        // the required ratio.
        for (let i = 0; i < lmShades.length; i++) {
            const shade = lmShades[i];
            log.debug(`Check shade ${shade.hex}`);
            if (shade.meetsContrastRequirements(bgShades, ratio)) {
                log.debug(`Found lightmode shade ${i} for ${JSON.stringify(this)}: ${JSON.stringify(shade)}`);
                return shade;
            }
        }
        log.debug(`Could not find lightmode shade for ${JSON.stringify(this)}`);
        return undefined;
    }

    /**
     * Get a dark mode shade which meets the contrast ratio on these background shades
     * @param bgShades The background shades
     * @param ratio The required contrast ratio
     * @returns A dark mode shade meeting the contrast ratio requirements, or undefined if not found
     */
    public getDMShade(bgShades: Shade[], ratio: number): Shade | undefined {
        log.debug(`getDMShade enter: hex=${this.hex}, ratio=${ratio}`);
        if (this.meetsContrastRequirements(bgShades, ratio)) {
            log.debug(`No searching required; shade ${JSON.stringify(this)}`);
            return this;
        }
        log.debug(`Dark mode search required for ${JSON.stringify(this)})`);
        const shades = this.getLighterShades(false);
        // Search backwards for the first one of these built shades which meets the contrast ratio requirements
        // to the background shades
        for (let i = Math.min(this.index,4); i >= 0; i--) {
            const shade = shades[i];
            if (shade.meetsContrastRequirements(bgShades, ratio)) {
                log.debug(`getDMShade exit: i=${i}, shade=${JSON.stringify(shade)}`);
                return shade;
            }
        }
        log.debug(`getDMShade exit: not found`);
        return undefined;
    }

    /**
     * Return true if the contrast ratio of this shade to all 'bgShades' meets or exceeds 'ratio';
     * otherwise, return false.
     * @param bgShades 
     * @param ratio 
     */
    public meetsContrastRequirements(bgShades: Shade[], ratio: number): boolean {
        log.debug(`Enter meetsContrastRequirements: ratio=${ratio}, num shades: ${bgShades.length}`);
        for (let i = 0; i < bgShades.length; i++) {
            log.debug(`Checking index ${i}`);
            if (this.getContrastRatio(bgShades[i]) < ratio) {
                log.debug(`Exit meetsContrastRequirements: failure (less than ${ratio})`);
                return false;
            }
        }
        log.debug(`Exit meetsContrastRequirements: success`);
        return true;
    }

    /**
     * Build 10 shades from this shade, some of which may be lighter and some of which may be darker.
     * The number of lighter and darker depends on where in the spectrum this shade falls.
     * @param lm True if this is for light mode; else false if for dark mode.
     * @returns 
     */
    private getLighterShades(lm: boolean): Shade[] {
        let shades = this.buildShades(lm);
        const idx = this.index;
        if (idx < 0) throw new Error(`Shade has no index`);
        if (idx == 0) return [];
        shades = shades.slice(0,this.index);
        log.debug(`lighter shades: ${JSON.stringify(shades)}`);
        return shades;
    }

    private getDarkerShades(lm: boolean): Shade[] {
        let shades = this.buildShades(lm);
        const idx = this.index;
        if (idx < 0) throw new Error(`Shade has no index`);
        if (idx >= shades.length) return [];
        shades = shades.slice(this.index+1);
        log.debug(`darker shades: ${JSON.stringify(shades)}`);
        return shades;
    }

    public getDesaturatedShade(): Shade {
        if (this.R === this.G && this.R === this.B) {
            return this;
        }
        const lmh = this.getLMH();
        if (lmh.low.val === lmh.high.val) {
            return this;
        }
        const grayVal = this.getPerceivedLightness() * 255;
        const saturationRange =  Math.round(Math.min(255-grayVal,grayVal));
        const maxChange = Math.min((255-lmh.high.val),lmh.low.val);
        const changeAmount = Math.min(saturationRange/-5, maxChange);
        const middleValueRatio =(grayVal-lmh.mid.val)/(grayVal-lmh.high.val);
        const rgbArray: number[] = [];
        rgbArray[lmh.high.idx]= Math.round(lmh.high.val+changeAmount);
        rgbArray[lmh.low.idx]= Math.round(lmh.low.val-changeAmount);
        rgbArray[lmh.mid.idx]= Math.round(grayVal+(rgbArray[lmh.high.idx]-grayVal)*middleValueRatio);
        return Shade.fromRGBArray(rgbArray).setContext(this);
    }

    public getElevationShades(): Shade[] {
        const shades: Shade[] = [];
        shades.push(this);
        for (let opacity of [.05, .07, .08, .09, .11, .12, .14, .15, .16]) {
            shades.push(this.getElevationShade(opacity));
        }
        return shades;
    }

    public getElevationShade(opacity: number): Shade {
        // mix with white background:
        const A = 1 - opacity;
        const R = Math.floor(this.R * A + 0xff * opacity);
        const G = Math.floor(this.G * A + 0xff * opacity);
        const B = Math.floor(this.B * A + 0xff * opacity);
        return Shade.fromRGB(R,G,B).setContext(this);
    }

    public mixShade(shade: Shade, opacity: number): Shade {
        const A = 1 - opacity;
        const R = Math.floor(this.R * A + shade.R * opacity);
        const G = Math.floor(this.G * A + shade.G * opacity);
        const B = Math.floor(this.B * A + shade.B * opacity);
        return Shade.fromRGB(R,G,B).setContext(this);
    }

    public mixShade2(shade: Shade, opacity: number): Shade {
        return Shade.fromHex(ShadeUtil.mixColors(this.hex, shade.hex, opacity));
    }

    public numLighterShades(): number {
        return this.getLabel()/100 + 1;
    }

    public numDarkerShades(): number {
        return ((900-this.getLabel())/100) + 1;
    }

    private getLMH(): LMH {
        const R: IV = { idx: 0, val: this.R };
        const G: IV = { idx: 1, val: this.G };
        const B: IV = { idx: 2, val: this.B };
        if (this.R < this.G) {
            if (this.R < this.B) {
                if (this.G < this.B) {
                    return {low: R, mid: G, high: B};
                } else {
                    return {low: R, mid: B, high: G};
                }
            } else {
                return {low: B, mid: R, high: G};
            }
        } else if (this.B < this.G) {
            return {low: B, mid: G, high: R};
        } else if (this.B < this.R) {
            return {low: G, mid: B, high: R};
        } else {
            return {low: G, mid: R, high: B};
        }
    }

    public adjust(multiplier: number): Shade {
        return Shade.fromRGB(this.R * multiplier, this.G * multiplier, this.B * multiplier).setContext(this);
    }

    private calculateLightness(): number {
        const luminance = this.getLuminance();
        // Send this function a luminance value between 0.0 and 1.0,
        // and it returns L* which is "perceptual lightness"
        if ( luminance <= (216/24389)) {       // The CIE standard states 0.008856 but 216/24389 is the intent for 0.008856451679036
            return luminance * (24389/27);  // The CIE standard states 903.3, but 24389/27 is the intent, making 903.296296296296296
        } else {
            return Math.pow(luminance,(1/3)) * 116 - 16;
        }
    }

    private calculatePerceivedLightness(): number {
        const max = Math.max(...this.rgbArray);
        const min = Math.min(...this.rgbArray);
        return (max + min) / 2 / 255;
    }

    public calculateLuminance(): number {
        const a = [this.R, this.G, this.B].map(function(v) {
            v /= 255;
            return v <= 0.03928 ?  v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
        });
        return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
    }

    public calculateSaturation(): number {
        const max = Math.max(this.R, this.G, this.B)/255;
        const min = Math.min(this.R, this.G, this.B)/255;
        const lum = (max + min)/2;
        return Util.round2((max - min) / (1 - ( 2 * lum - 1)));
    }

    private calculateLabel(): number {
        const lightness = this.getLightness();
        if (lightness > 95 && lightness <= 100) {
            return 0;
        } else if (lightness > 85 && lightness <= 95) {
            return 100
        } else if (lightness > 75 && lightness <= 85) {
            return 200;
        } else if (lightness > 65 && lightness <= 75) {
            return 300;
        } else if (lightness > 55 && lightness <= 65) {
            return 400;
        } else if (lightness > 45 && lightness <= 55) {
            return 500;
        } else if (lightness > 35 && lightness <= 45) {
            return 600;
        } else if (lightness > 25 && lightness <= 35) {
            return 700;
        } else if (lightness > 15 && lightness <= 25) {
            return 800;
        } else if (lightness >= 0 && lightness <= 15) {
            return 900;
        } else {
            throw new Error(`Unable to calculate shade label: lightness=${lightness}`);
        }
    }

    /**
     * Calculate the contrast ratio between two shades.
     */
    public getContrastRatio(other: Shade): number {
        const myLuminance = this.getLuminance();
        const otherLuminance = other.getLuminance();
        const brightest = Math.max(myLuminance, otherLuminance);
        const darkest = Math.min(myLuminance, otherLuminance);
        const ratio = (brightest + 0.05) / (darkest + 0.05);
        const rtn = Util.round2(ratio);
        return rtn;
    }

    /**
     * Get the contrast of this shade to white or black.
     * @returns The contrast of this shade to white or black.
     */
    public getContrast(): number {
        return this.getContrastToWhiteOrBlack(true);
    }

    /**
     * Get the contrast of this shade to white or black.
     * @returns 
     */
    public getContrastToWhiteOrBlack(lm: boolean): number {
        return this.getContrastRatio(this.getContrastShade(lm));
    }

    /**
     * Get the shade which contrasts most to this shade, white or black.
     * @param lm 
     * @returns 
     */
    public getContrastShade(lm: boolean): Shade {
        return this.getBuilder(lm).getContrastShade(this);
    }

    /**
     * Mix this shade with another shade to produce a third shade.
     * @param shade The other shade to mix with this shade
     * @param ratio The ratio; a value between 0 and 1 denoting how much of this shade verses the other shade in the resulting shade.
     * @returns A third shade which is the mixture of this shade and the 'shade'.
     */
    public mix(shade: Shade, ratio: number): Shade {
        if (ratio < 0 || ratio > 1) throw new Error(`Expecting a ratio between [0,1] but found ${ratio}`);
        const color = chroma.mix(this.hex, shade.hex, ratio);
        const rtn = Shade.fromHex(color.hex());
        const bs = this.hasBuilder() ? this : rtn;
        rtn.setContext(bs);
        return shade;
    }

    /**
     * Get the hex value if no opacity, or RGBA string if opacity is not 1.
     * @returns 
     */
    public getHexOrRGBA(): string {
        if (this.opacity === 1) {
            return this.hex;
        } else {
            return this.getRGBA();
        }
    }

    public getRGB(): string {
        return `rgb(${this.R},${this.G},${this.B})`;
    }

    public getRGBA(): string {
        return `rgba(${this.R},${this.G},${this.B},${this.opacity})`;
    }

    /**
     * Clone a shade object.
     * @returns A new shade object.
     */
    public clone(): Shade {
        return this.fromHex().setOpacity(this.opacity).setContext(this);
    }

    public equals(shade: Shade): boolean {
        return this.R === shade.R && this.G === shade.G && this.B === shade.B && this.opacity === shade.opacity;
    }

    public isSameColor(shade: Shade): boolean {
        return this.getColor().name === shade.getColor().name;
    }

    /**
     * Get shades ordered by the nearest to the current shade.
     */
    public getShadesOrderedByNearness(): Shade[] {
        return this.getShadesOrderedByNearness2(1,-1);
    }

    public getShadesOrderedByNearness2(add1: number, add2: number): Shade[] {
        const rtn: Shade[] = [];
        rtn.push(this);
        let idx1 = this.index;
        let idx2 = this.index;
        const shades = this.buildShades();
        while (add1 || add2) {
            if (add1) {
               idx1 += add1;
               if (idx1 >= 0 && idx1 < shades.length) rtn.push(shades[idx1]);
               else add1 = 0;
            }
            if (add2) {
               idx2 += add2;
               if (idx2 >= 0 && idx2 < shades.length) rtn.push(shades[idx2]);
               else add2 = 0;
            }
        }
        return rtn;
    }

    public buildComplimentaryShades(): Shade[] {
        const ra = this.rgbArray;
        const rgb = chroma.rgb(ra[0],ra[1],ra[2]);
        const h = rgb.get('hsv.h');
        const s = rgb.get('hsv.s');
        const v = rgb.get('hsv.v') + 180;
        const h0 = h + 30;
        const h1 = h - 30;
        const rgb1 = 'rgb(' + chroma.hsv(h0,s,v).rgb() + ')';
        const rgb2 = 'rgb(' + chroma.hsv(h1,s,v).rgb() + ')';
        const sb = this.getBuilder();
        const shade1 = Shade.fromRGBString(rgb1).setContext(this);
        const shade2 = Shade.fromRGBString(rgb2).setContext(this);
        return [shade1, shade2]
    }

    public toJSON(): Object {
        return this.hex;
    }

    public toString() {
        let str = `index=${this.index}, hex=${this.hex}, opacity=${this.opacity}, onHex=${this.onHex}, id=${this.id}, builder=${this.getBuilder().name}`;
        if (this.isCore()) str = `core=${this.coreShadeName}, ${str}`;
        return str;
    }

    public deserialize(obj: any) {
        if (!obj) return;
        this.hex = obj.hex;
        this.opacity = obj.opacity;
        this.rgbArray = Util.hexToRgbArray(this.hex);
        this.R = this.rgbArray[0];
        this.G = this.rgbArray[1];
        this.B = this.rgbArray[2];
    }

    public serialize(): any {
        return { hex: this.hex, opacity: this.opacity };
    }

}