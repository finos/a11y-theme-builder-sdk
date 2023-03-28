import { Node } from "./common/node";
import { Layers } from "./layers/layers";
import { Atoms } from "./atoms/atoms";
import { Molecules } from "./molecules/molecules";
import { Organisms } from "./organisms/organisms";
import { Code } from "./code/code";
import { Shade } from "./common/shade";
import { IThemeBuilder, IDesignSystem, IDesignSystemMetadata, INode, IVarGroup, IProperty } from "./interfaces";
import { Logger } from "./util/logger";

const log = new Logger("ds");

/**
 * A design system
 * @category Main
 */
export class DesignSystem extends Node implements IDesignSystem {

    public readonly themeBuilder: IThemeBuilder;
    /** All atoms for this design system. */
    public readonly atoms: Atoms;
    /** All molecules for this design system. */
    public readonly molecules: Molecules;
    /** All organisms for this design system. */
    public readonly organisms: Organisms;
    /** All accessibility layers for this design system */
    public readonly layers: Layers;
    /** All code generators for this design system. */
    public readonly code: Code;
    
    private createdInMs: number;
    private updatedInMs: number;
    private sample: boolean;
    private readonly dsShades: {[key: string]: Shade} = {};

    public constructor( name: string, themeBuilder: IThemeBuilder, opts?: { sample?: boolean} ) {
        super(name);
        opts = opts || {};
        this.themeBuilder = themeBuilder;
        this.atoms = new Atoms(this);
        this.molecules = new Molecules(this);
        this.organisms = new Organisms(this);
        this.layers = new Layers(this);
        this.code = new Code(this);
        const now = Date.now();
        this.createdInMs = now;
        this.updatedInMs = now;
        this.sample = opts.sample || false;
    }

    public clone(): DesignSystem {
        throw new Error("TODO");
    }

    public getNode(key: string): Node | undefined {
        return this.dsNodes[key];
    }

    public registerNode(node: Node) {
       this.dsNodes[node.key] = node;
    }

    public getShade(key: string): Shade | undefined {
        const shade = this.dsShades[key];
        if (shade) return shade;
        return Shade.byKey(key);
    }

    public findShade(key: string): Shade {
        const shade = this.getShade(key);
        if (shade) return shade;
        throw new Error(`Shade '${key}' was not found`);
    }

    public registerShade(key: string, shade: Shade) {
        log.debug(`Registering shade ${key}`);
        this.dsShades[key] = shade;
    }

    public getCSSVarGroup(node: INode): IVarGroup {
        return this.code.cssGenerator.getVarGroup(node.key);
    }

    public listProperties(): IProperty[] {
        const props: IProperty[] = [];
        this._addProperties(props);
        return props;
    }

    public getTimeOfCreationInMs(): number {
        return this.createdInMs;
    }

    public getTimeOfLastUpdateInMs(): number {
        return this.updatedInMs;
    }

    public isSample(): boolean {
        return this.sample;
    }

    public setIsSample(sample: boolean) {
        this.sample = sample;
    }

    public async store() {
        this.updatedInMs = Date.now();
        await this.themeBuilder.storage.set(this.name, JSON.stringify(this.serialize()));
    }

    public serialize(): any {
        const obj = super.serialize();
        obj.atoms = this.atoms.serialize();
        obj.molecules = this.molecules.serialize();
        obj.organisms = this.organisms.serialize();
        obj.layers = this.layers.serialize();
        obj.created = this.createdInMs;
        obj.updated = this.updatedInMs;
        obj.sample = this.sample;
        return obj;
    }

    public deserialize(obj: any) {
        if (!obj) return;
        super.deserialize(obj);
        this.atoms.deserialize(obj.atoms);
        this.molecules.deserialize(obj.molecules);
        this.organisms.deserialize(obj.organisms);
        this.layers.deserialize(obj.layers);
        this.createdInMs = obj.created;
        this.updatedInMs = obj.updated;
        this.sample = obj.sample;
        this.code.generate();
    }

}