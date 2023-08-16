/*
 * Copyright (c) 2023 Discover Financial Services
 * Licensed under Apache-2.0 License. See License.txt in the project root for license information
 */
import { Storage, StorageElement } from "./interface";

/**
 * The memory storage implementation.
 * @category Utilities
 */
export class MemStorage implements Storage {

    private readonly mem: {[key: string]: StorageElement} = {};

    public async get(key: string): Promise<StorageElement> {
        return this.mem[key];
    }

    public async set(key: string, value: StorageElement) {
        this.mem[key] = value;;
    }

    public async delete(key: string) {
        delete this.mem[key];
    }

    public async listKeys(): Promise<string[]> {
        return Object.keys(this.mem);
    }

    public async listMetadata(): Promise<StorageElement[]> {
        return Object.values(this.mem).map(ele => {
            return {metadata: ele.metadata};
        });
    }

}