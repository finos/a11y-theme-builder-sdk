/**
 * The StorageElement interface defines the minimum requirements for each element
 * that is stored.
 */
export interface StorageElement {
    metadata: Object;
}

/**
 * The Storage interface which defines what must be implemented in order to create
 * persistent storage for the Theme Builder.
 */
export interface Storage {
    /** Get the value associated with a key */
    get(key: string): Promise<StorageElement>;
    /** Set the value associated with a key  */
    set(key: string, value: StorageElement): Promise<void>;
    /** Delete the value associated with a key */
    delete(key: string): Promise<void>;
    /** List all of the keys stored */
    listKeys(): Promise<string[]>;
    /** List the metadata associated with each entry */
    listMetadata(): Promise<StorageElement[]>;
}