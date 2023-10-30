# Accessibility Theme Builder SDK Tutorial

The following is a tutorial of how to use this SDK in order to generate code which is accessibility compliant.

1. Creating the ThemeBuilder

   To create a ThemeBuilder without persistent storage:
   
   ```
   import { ThemeBuilder } from "@finos/a11y-theme-builder-sdk";
   ...
   const myThemeBuilder = await ThemeBuilder.create();
   ```
   
   To create a ThemeBuilder with persistent storage, create a class which implements the [Storage interface](./src/storage/interface.ts) and pass an instance of your object to the create method as follows:
   
   ```
   import { ThemeBuilder, Storage } from "@finos/a11y-theme-builder-sdk";
   ...
   const myStorageObject = new MyStorageObject();  // MyStorageObject implements the 'Storage' interface
   const myThemeBuilder = await ThemeBuilder.create({storage: myStorageObject});
   ```

2. Managing a design system

   Create a design system named "ds1" as follows:
   
   ```
   const myDesignSystem = await myThemeBuilder.addDesignSystem("ds1");
   ```
   
   Get an already created design system by name as follows:
   
   ```
   const myDesignSystem = await myThemeBuilder.getDesignSystem("ds1");
   ```
   
   Delete a design system as follows:
   
   ```
   await myThemeBuilder.deleteDesignSystem("ds1");
   ```

3. Testing for initialization and enablement status
   
   Let's refer to any atom, molecule, organism, or accessibility layer of a design system generically as an **element**.  Each **element** has the following two methods which are useful based on the dependency relationships between elements:
      
   1. isEnabled() - This returns true iff all entities on which this entity depends have been initialized.
 
   2. isInitialized() - This returns true iff all required properties without default values of this element have been set.

   For example, consider the following for our newly created design system:
   
   ```
   // The following is true because this atom has no
   // dependencies on other entities
   myDesignSystem.atoms.colorPalette.isEnabled()
   // The following is false because no colors have been
   // added to the color palette atom
   myDesignSystem.atoms.colorPalette.isInitialized()
   // The following is false because the color themes atom 
   // depends upon the color palette atom
   myDesignSystem.atoms.colorThemes.isEnabled()
   // The following is false because the default theme property of
   // the color themes atom is not yet set (i.e. there are no themes).
   myDesignSystem.atoms.colorThemes.isInitialized()
   // All of the following are false because molecules,
   // organisms, accessbility layers, and code generators
   // all depend upon atoms being initialized, but the
   // color palette and color themes atoms are not yet 
   // initialized.
   myDesignSystem.molecules.isEnabled()
   myDesignSystem.organisms.isEnabled()
   myDesignSystem.layers.isEnabled()
   myDesignSystem.code.isEnabled()
   ``` 
   
4. Managing the color palette

   The first part of design system which needs initializing is the color palette atom.
   
   Add colors to your color palette as follows.  Note that these are simply sample colors.
   
   ```
   // The 1st parameter is the name of the color (e.g. "blue")
   // The 2nd parameter is the hex value for the color (e.g. "#E2F3FF")
   const blue = myDesignSystem.atoms.colorPalette.addColor("blue", "#E2F3FF");
   const red = myDesignSystem.atoms.colorPalette.addColor("red", "#DC143C);
   const green = myDesignSystem.atoms.colorPalette.addColor("green", "#32CD32");
   ```

   The color palette atom is now initialized (i.e. `myDesignSystem.atoms.colorPalette.isInitialized()` returns true) and the color themes atom is enabled (i.e. `myDesignSystem.atoms.colorThemes.isEnabled()` returns true).  The color palette atom only requires a single color; however, you will typically want multiple colors in your color palette.

   When a color is added to the color palette, multiple light mode and dark mode shades are generated for that color.  For example, for the color "blue", the light mode shades in the `blue.light.shades` array and the dark mode shades in the `blue.dark.shades` array.

5. Managing a color theme

   The second part of a design system which needs initializing is the color themes atom.

   Create a default color theme as follows:

   ```
   const myTheme = myDesignSystem.atoms.colorThemes.createTheme("myThemeName");
   ```

   Since this is the first theme created, it will automatically become the default theme.

   > NOTE: If you would like to create two or more themes, you may do so and explicitly set one of them as the default theme as follows:
   >
   > ```
   > const myTheme2 = myDesignSystem.atoms.colorThemes.createTheme("myThemeName2");
   > myDesignSystem.atoms.colorThemes.setDefaultTheme(myTheme2);
   > ```

   Each color theme requires that several properties be explicitly set before the color theme is initialized.  The following is an example of setting these properties.

   ```
   // Set the primary, secondary, and tertiary color shades for this theme.
   // The call to `getSelectableValues` returns an array of arrays of shades.
   // The first index selects the color.  Since we added 3 colors to our palette,
   // the index is 0, 1, or 2.  The second index identifies a shade of that color.
   // In this example, we always choose the first one available, but that need
   // not be the case.  Also note that the primary MUST be set first
   myTheme.primary.setValue(myTheme.primary.getSelectableValues()[0][0]);
   myTheme.secondary.setValue(myTheme.secondary.getSelectableValues()[1][0]);
   myTheme.tertiary.setValue(myTheme.tertiary.getSelectableValues()[2][0]);

   // Set the light and dark mode background color pairs.
   // The call to `getSelectableValues` returns an array of color pairs
   // from which to select.
   myTheme.lightModeBackground.setValue(myTheme.lightModeBackground.getSelectableValues()[1]);
   myTheme.darkModeBackground.setValue(myTheme.darkModeBackground.getSelectableValues()[0]);

   // Set the 2 gradients from and to color shades.
   // The call to `getSelectableValues` returns an array of arrays of allowable
   // shades, similar to those for primary, secondary, and tertiary.
   myTheme.gradient1.from.setValue(myTheme.gradient1.from.getSelectableValues()[0][0]);
   myTheme.gradient1.to.setValue(myTheme.gradient1.to.getSelectableValues()[0][2]);
   myTheme.gradient2.from.setValue(myTheme.gradient2.from.getSelectableValues()[1][0]);
   myTheme.gradient2.to.setValue(myTheme.gradient2.to.getSelectableValues()[1][2]);

   // Set the button color shade.
   myTheme.button.setValue(myTheme.button.getSelectableValues()[0][1]);

   // Set the icon color shade.
   myTheme.icon.setValue(myTheme.icon.getSelectableValues()[1][1]);

   // Set the gradient header text from and to colors
   myTheme.gradientHeaderText.from.setValue(myTheme.gradientHeaderText.from.getSelectableValues()[0][0]);
   myTheme.gradientHeaderText.to.setValue(myTheme.gradientHeaderText.to.getSelectableValues()[0][2]);

   // Set the accent color shade
   myTheme.accent.setValue(myTheme.accent.getSelectableValues()[2][1]);
   ```

6. Managing properties of other atoms, molecules, and organisms

   Now that the default color theme has been initialized, everything else should now be enabled including:

   * All other atoms (e.g. `myTheme.atoms.gridSettings.isEnabled() is true`)
   * All molecules (i.e. `myTheme.molecules.isEnabled() is true`)
   * All organisms (i.e. `myTheme.organisms.isEnabled() is true`)
   * Code generation (i.e. `myTheme.code.isEnabled() is true`)

   All of these remaining properties are either optional (i.e. are not required to have a value) or have a default value.  The `listProperties` method of a design system may be used as shown below to list all properties of a design system, along with it's key, whether or not it is required, and the default value (or undefined if it has no default value).

   ```
   const props: IProperty = myTheme.listProperties();
   for (const prop of props) {
      console.log(`Property key=${prop.key}, required=${prop.required}, defaultValue=${prop.getDefaultValue()};
   }
   ```

7. Listening for events

   There are several types of events as defined by the `EventType` enumerated type in the [src/interface.ts file](./src/interfaces.ts).

   * Node enabled, disabled, and deleted events

     The `setListener` method may be called on any node or property in order to notified when that node's status changes.  For example, the following notification occurs when molecules are enabled:
  
     ```
     myDesignSystem.molecules.setListener("some name", function(event: Event) {
         // Called for event.type.NodeEnabled and event.type.NodeDisabled
         // events.  The event.node will always be equal to
         // myDesignSystem.molecules in this case.
     });
     ```
  
     Or you can set a single listener on the
     design system itself and be notified of a status change
     for any node or property in the design system, as shown below.

     ```
     myDesignSystem.setListener("some name", function(event: Event) {
         // Called for event.type.NodeEnabled and event.type.NodeDisabled
         // events for all nodes and properties.
         // The "event.node" identifies the node.
     });
     ```

   * Property value change events
  
     In order to be notified when a property value change
     occurs, call the `setListener` method on the property
     itself.  For example, the following notification will
     occur when the button shade of a theme changes:

     ```
     myTheme.button.setListener("some name", function(event: Event) {
         if (event.type === EventType.ValueChanged) {
            const vc = event as EventValueChange;
            // vc.oldValue is the old value (if any)
            // vc.newValue is the new value (if any)
         }
     });
     ```

   * Selectable values changed

     The selectable values available for a property may change
     as other dependent property values are changed.  In order to be notified of such a change, 
   
     ```
     myTheme.button.setListener("some name", function(event: Event) {
         if (event.type === EventType.SelectablesChanged) {
            // Get the new selectable values
            const sels = myTheme.button.getSelectableValues();
            ...
         }
     });
     ```

   * Listening for CSS variable changes

     Listen for CSS variable changes as follows:

     ```
     myDesignSystem.code.setCSSVarListener("some name", function(name: string, value?: string) {
        console.log(`CSS variable: name=${name}, value=${value});
     });
     ```

7. Getting generated code

   The following returns a snapshot of all generated CSS root variables:

   ```
   myDesignSystem.code.getCSSVars()
   ```
   
   Or the following can be used to listen for dynamic CSS variable changes which occur as the design system is updated:
   
   ```
   myDesignSystem.code.setCSSVarListener("your unique listener name", function(name: string, value?: string) {
      if (value === undefined) {
          console.log(`CSS variable ${name} was deleted`);
      } else {
          console.log(`CSS variable ${name} was set to ${value}`);
      }
   });
   ```
   
   The following returns a snapshot of JSON code for light mode:
   
   ```
   myDesignSystem.code.getJSON(true)
   ```
   
   And the following returns a snapshot of JSON code for dark mode:
   
   ```
   myDesignSystem.code.getJSON(false)
   ```
