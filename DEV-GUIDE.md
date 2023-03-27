# Developer's Overview of the Accessibility Theme Builder SDK

## Getting Started

To build the SDK:

```
npm run build
```

To run the tests:

```
npm run dotest
```

To run the jest-based tests:

```
npm run test
```

## Code layout

The following is an overview of the code layout of this repository:

* [src/themeBuilder.ts](./src/themeBuilder.ts) - The main theme builder class.
  
* [src/designSystem.ts](./src/designSystem.ts) - The design system class.

* [src/atoms](./src/atoms) - The directory containing all atoms.  Each atom class extends the [Atom](./src/atoms/atom.ts) class.

* [src/molecules](./src/molecules) - The directory containing all molecules.  Each molecule class extends the [Molecule](./src/molecules/molecule.ts) class.

* [src/organisms](./src/organisms) - The directory containing all organisms.  Each organism class extends the [Organism](./src/organisms/organism.ts) class.

* [src/layers](./src/layers) - The directory containing the accessbility layers, all currently in the [Layers](src/layers/layers.ts) class.

* [src/storage](./src/storage) - The directory containing all code related to storage or persistence.  Each molecule class extends the [Molecule](./src/molecules/molecule.ts) class.

* [src/common](./src/common) - The directory containing common code used by atoms, molecules, and/or organisms.  In particular, each atom extends the [Node](./src/common/node.ts) class which represents a node in a tree as well as a node in a dependency graph.  Each node may contain any number of properties from [src/common/props](./src/common/props.ts).

* [src/util](./src/util) - The directory containing various utility classes.  One very important class worth noting here is the [Shade](./src/common/shade.ts) class which performs several color-related important calculations for this SDK.

## Extending the SDK

### How to add property to an atom, molecule, or organism

All properties of an atom, molecule, or organism are defined as `public` variables and are initialized in a constructor.

For example, in order to add a new string-based property `foo` to the `MinimumTarget` atom, consider the following.

```
import { Atom } from "./atom";
import { IAtoms } from "../interfaces";
// Import PropertyString
import { PropertyPixelSelectable, PropertyString } from "../common/props";

export class MinimumTarget extends Atom {

    /** The min height property */
    public minHeight: PropertyPixelSelectable;
    // Add Foo with a appropriate description as follows:
    /** The foo property */
    public foo: PropertyString;

    constructor(atoms: IAtoms) {
        super("Minimum Target", false, atoms);
        this.addDependency(atoms.colorThemes);
        this.minHeight = new PropertyPixelSelectable("Min Height", false, this, [24, 32, 40, 44]);
        // Initialize the foo property.
        // The 'false' means it is optional.
        // The default value is "defaultFoo".
        this.foo = new PropertyString("Foo", false, this, "defaultFoo");
    }

    public deserialize(obj: any) {
        if (!obj) return;
        super.deserialize(obj);
        this.minHeight.deserialize(obj.minHeight);
        // Add the following to deserialize foo
        this.foo.deserialize(obj.foo);
    }

    public serialize(): any {
        const obj: any = {};
        obj.minHeight = this.minHeight.serialize();
        // Add the following to serialize foo
        obj.foo = this.foo.serialize();
        return obj;
    }

}
```

### How to add a new atom, molecule, or organism

The following steps should be taken to add a new atom, molecule, or organism.

1. Choose an existing atom, molecule, or organism to use as a template.

2. Add/delete properties as appropriate for the new entity.
   All property types are defined in [src/common/props.ts](./src/common/props.ts).  Add a new property type if needed.  Take care to set the `required` and `defaultValue` fields appropriately.

3. Call the contructor from `src/atoms/atoms.ts` for an atom, from `src/molecules/molecules.ts` for a molecule, or from `src/organisms/organisms.ts` for an organism.

4. Add an `export` to the appropriate `index.ts` in the `src/atoms`, `src/molecules`, or `src/organisms` directory.

5. Make sure the `serialize` and `deserialize` methods appropriately serialize and deserialize all properties.

6. Add one or more test cases to the tests directory, and run `npm run test` to make sure the test case(s) pass.

### How to add a new code generator

See `src/code/cssGenerator.ts` as an example.  If you want the code generation to be dynamically updated as properties are changed, be sure to add listeners as is done by the CSS code generator.

Also be sure to construct a new code generator appropriately in `src/code/code.ts`.