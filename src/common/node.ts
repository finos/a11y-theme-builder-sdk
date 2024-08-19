/*
 * Copyright (c) 2023 Discover Financial Services
 * Licensed under Apache-2.0 License. See License.txt in the project root for license information
 */
import { Logger } from "../util/logger";
import { IDesignSystem, INode, Event, EventType, EventCallback, EventListener, IProperty, IListenerSubscription } from "../interfaces";
import { Property } from "./props";

const log = new Logger("node");

class NodeState {
    public isEnabled: {[key: string]: boolean } = {};
}

/**
 * The Node class is the base class for all atoms, molecules, and organisms.
 * 
 * It is used to create a tree of the following form:
 * ```
 * DesignSystem -> Atoms     -> <SomeAtom>     -> <Properties of SomeAtom>
 *              -> Molecules -> <SomeMolecule> -> <Properties of SomeMolecule>
 *              -> Organisms -> <SomeOrganism> -> <Properties of SomeOrganism>
 *              -> Layers    -> <SomeLayer>
 *              -> Code      -> <SomeCodeGenerator>
 * ```
 * 
 * It is also used to form a dependency graph between nodes of the tree.
 * 
 * Each node may depend on other nodes and inversely may be depended on by other nodes.
 * A node is considered "initialized" only when all children are initialized.
 * A Prop (a leaf node) is considered "initialized" if it is either not a required property
 * or it is required but has a value.
 * A node is considered "enabled" only when all dependency nodes are "initialized".
 * Listeners are notified when it transitions the enabled status of a node changes.
 * 
 * @category Utilities
 */
export class Node implements INode {

    /** The name of the node, which is unique relative to it's siblings */
    public readonly name: string;
    /** The unique key for the node.  It is unique from all other nodes in the ThemeBuilder */
    public readonly key: string;
    protected readonly parent?: Node;
    protected readonly children: Node[] = [];
    private readonly dependencies: Node[] = [];
    private readonly dependents: Node[] = [];
    private readonly listeners: {[name: string]: EventListener} = {};
    private readonly props: IProperty[] = [];
    protected readonly dsNodes: {[key: string]: Node} = {};

    constructor(name: string, parent?: INode) {
        this.name = name;
        const p = parent as Node;
        this.key = (!p || !p.parent) ? name.replace(/\s/g,'') : p.getChildKey(name);
        this.parent = p;
        if (p) {
            p.children.push(this);
        }
        this.getDesignSystem().registerNode(this);
    }

    public getChildKey(name: string): string {
        return `${this.key}/${name}`.replace(/\s/g, '');
    }

    /** Get the design system */
    public getDesignSystem(): IDesignSystem {
        let node: Node = this;
        while (node.parent) {
            node = node.parent;
        }
        return node as any;
    }

    /** 
     * Find a property by name by walking the tree upwards.
     * As soon as the property is found at a node, we stop searching.
     * This allows us to generically configure an arbitrary property at various levels and we always find the value closest to us in the tree.
     */
    public findProperty<T>(propName: string): Property<T> {
        // Walk up the node tree until we find a property named 'name'
        for (let node: Node | undefined = this; node !== undefined; node = (node as Node).parent) {
            if (!node.hasOwnProperty(propName)) continue;
            return (node as any)[propName];
        }
        throw new Error(`Property '${propName}' was not found at ${this.name} or above`);
    }

    /** Add a dependency to another node in the tree */
    public addDependency(node: INode) {
        const ni = node as Node
        this.dependencies.push(ni);
        ni.dependents.push(this);
    }

    /**
     * Determine if this node is enabled.  A node is enabled if all other nodes on which this node depends have been initialized.
     * @returns True if enabled, or false otherwise.
     */
    public isEnabled(): boolean {
        for (const node of this.dependencies) {
            if (!node.isInitialized()) {
                log.debug(`${this.key} is not enabled because ${node.key} is not initialized`);
                return false;
            }
        }
        return true;
    }

    /**
     * Determine if this node is initialized.
     * 
     * If this node is a property, it is initialized if it is not required to have a value, or if it is required and has either a default or non-default value.
     * 
     * @returns True if initialized, or false otherwise.
     */
    public isInitialized(): boolean {
        const missing = this.getUninitializedRequiredProperties();
        if (missing.length > 0) {
            log.debug(`${this.key} is not initialized because the following properties have not been set: ${JSON.stringify(missing)}`);
            return false;
        }
        return true;
    }

    /**
     * Return the keys of all properties which are required and not initialized.
     * @returns Returns the keys of all properties which are required and not initialized.
     */
    public getUninitializedRequiredProperties(): string[] {
        log.debug(`Getting uninitialized required properties for ${this.key}`);
        const names: string[] = [];
        this._getUninitializedRequiredProperties(names);
        log.debug(`Got uninitialized required properties for ${this.key}: ${JSON.stringify(names)}`);
        return names;
    }

    private _getUninitializedRequiredProperties(names: string[]) {
        for (const prop of this.props) {
            if (!prop.isInitialized()) {
                names.push(prop.key);
            }
        }
        if (this.children.length > 0) {
            for(const child of this.children) {
                child._getUninitializedRequiredProperties(names);
            }
        }
    }

    /**
     * Set a listener on this node
     * @param name  The name of the listener.
     * @param callback  The callback to call when an event occurs.
     * @param eventTypes  The types of events to wait for.  If none are specified, listen for all events.
     * @returns The ListenerSubscription which should be canceled to stop listening.
     */
    public setListener(name: string, callback: EventCallback, eventTypes?: EventType[]): ListenerSubscription {
        log.debug(`NodeListener: key=${this.key}, setListener name=${name}`);
        if (name in this.listeners) {
            log.debug(`NodeListener: key=${this.key}, setListener replacing name=${name}`);
        }
        this.listeners[name] = { callback, eventTypes };
        return new ListenerSubscription(name,this);
    }

    /**
     * Remove a listener by name.
     * @param name The name of the listener to remove
     */
    public removeListener(name: string) {
        log.debug(`NodeListener: key=${this.key}, removeListener name=${name}`);
        delete this.listeners[name];
    }

    /**
     * Remove all listeners on this node.
     */
    public removeAllListeners() {
        log.debug(`NodeListener: key=${this.key}, removeAllListeners`);
        Object.keys(this.listeners).forEach(key => delete this.listeners[key]);
    }

    public notifyListeners(event: Event) {
        const names = Object.keys(this.listeners);
        log.debug(`NodeListener: key=${this.key}, begin notifying listeners of event ${JSON.stringify(event.type)}, listeners=${JSON.stringify(names)}`);
        names.forEach(name => {
            const listener = this.listeners[name];
            if (!listener.eventTypes || listener.eventTypes.indexOf(event.type) >= 0) {
                try {
                    log.debug(`NodeListener: key=${this.key}, begin notifying listener ${name}`);
                    listener.callback(event);
                    log.debug(`NodeListener: key=${this.key}, end notifying listener ${name}`);
                } catch (e:any) {
                    log.debug(`NodeListener: key=${this.key}, EXCEPTION while notifying listener ${name}`);
                    console.log(e);
                }
            } else {
                log.debug(`NodeListener: key=${this.key}, skipping listener ${name}: events of interest are ${JSON.stringify(listener.eventTypes)}`);
            }
        });
        log.debug(`NodeListener: key=${this.key}, end notifying listeners of event ${JSON.stringify(event.type)}`);
    }

    /**
     * Store persistently the state of the design system.
     */
    public async store() {
        if (this.parent) {
            await this.parent.store();
        } else {
            throw new Error("Root storage isn't implemented");
        }
    }

    public addProperty(prop: IProperty) {
        this.props.push(prop);
    }

    public getNodeState() {
        const ns = new NodeState();
        this.addToNodeState(ns);
        return ns;
    }

    public compareNodeState(state: NodeState) {
        this.dependents.forEach((node: Node) => {
            const wasEnabled = state.isEnabled[node.key];
            const isEnabled = node.isEnabled();
            if (wasEnabled !== isEnabled) {
                const event = { node, type: isEnabled ? EventType.NodeEnabled : EventType.NodeDisabled };
                node.notifyListeners(event);
                node.getDesignSystem().notifyListeners(event);
            }
        });
        if (this.parent) {
            this.parent.compareNodeState(state);
        }
    }

    public getParent(): Node | undefined {
        return this.parent;
    }

    private addToNodeState(state: NodeState) {
        this.dependents.forEach((node: Node) => {
            state.isEnabled[node.key] = node.isEnabled();
        });
        if (this.parent) {
            this.parent.addToNodeState(state);
        }
    }

    protected _addProperties(props: IProperty[]) {
        for (const child of this.children) {
            child._addProperties(props);
        }
    }

    public serialize(): any { return {}; }

    public deserialize(obj: any) {}

    public toJSON(): Object {
        return { key: this.key };
    }
}

/**
 * A ListenerSubscription returned by Node.setListener.
 * @category Utilities
 */
export class ListenerSubscription implements IListenerSubscription {

    private name: string;
    private node: Node;

    constructor(name: string, node: Node) {
        this.name = name;
        this.node = node;
    }

    /** Cancel this listener subscription */
    public cancel(): void {
        this.node.removeListener(this.name);
    }

}