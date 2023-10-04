/*
 * Copyright (c) 2023 Discover Financial Services
 * Licensed under Apache-2.0 License. See License.txt in the project root for license information
 */
import { Node } from "../common/node";
import { IOrganisms } from "../interfaces";

/**
 * The base class for all organisms.
 * @category Organisms
 */
export class Organism extends Node {

    public readonly organisms: IOrganisms;

    constructor(name: string, organisms: IOrganisms) {
        super(name, organisms)
        this.organisms = organisms;
    }

}