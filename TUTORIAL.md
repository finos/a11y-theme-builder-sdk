# Accessibility Theme Builder SDK Tutorial

The following is a tutorial of how to use this SDK in order to generate code which is accessibility compliant.

1. Creating the ThemeBuilder

   To create a ThemeBuilder without persistent storage:
   
   ```
   import { ThemeBuilder } from "a11y-theme-builder-sdk";
   ...
   const myThemeBuilder = await ThemeBuilder.create();
   ```
   
   To create a ThemeBuilder with persistent storage, create a class which implements the [Storage interface](./src/storage/interface.ts) and pass an instance of your object to the create method as follows:
   
   ```
   import { ThemeBuilder } from "a11y-theme-builder-sdk";
   ...
   const myStorageObject = new MyStorageObject();  // MyStorageObject implements Storage
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
   // The following is true because this atom has no dependencies
   // on other entities
   myDesignSystem.atoms.colorPalette.isEnabled()
   // The following is false because no colors have been added to
   // the color palette atom
   myDesignSystem.atoms.colorPalette.isInitialized()
   // The following is false because the color themes atom depends
   // upon the color palette atom
   myDesignSystem.atoms.colorThemes.isEnabled()
   // The following is false because the default theme property of
   // the color themes atom is not yet set (i.e. there are no themes).
   myDesignSystem.atoms.colorThemes.isInitialized()
   // All of the following are false because molecules, organism,
   // accessbility layers, and code generators all depend upon
   // atoms being initialized, but the color palette and color themes
   // atoms are not yet initialized.
   myDesignSystem.molecules.isEnabled()
   myDesignSystem.organisms.isEnabled()
   myDesignSystem.layers.isEnabled()
   myDesignSystem.code.isEnabled()
   ``` 
   
4. Managing the color palette

   The first thing to start initializing is the color palette atom.
   
   Add a color to your color palette as follows:
   
   ```
   // The 1st parameter is the name of the color (e.g. "blue")
   // The 2nd parameter is the hex value for the color (e.g. "#E2F3FF")
   const myColor = myDesignSystem.atoms.colorPalette.addColor("blue", "#E2F3FF");
   ```

   The color palette atom is now initialized; however, you will typically want to add
   multiple colors to your palette.

5. Managing a color theme

   Create a default color theme as follows:

   ```
   const myTheme = myDesignSystem.atoms.colorThemes.createTheme("myThemeName");
   ```

   Since this is the first theme created, it will automatically become the default theme.

   Create a second theme and set it as the default theme as follows:

   ```
   const myTheme2 = myDesignSystem.atoms.colorThemes.createTheme("myThemeName2");
   myDesignSystem.atoms.colorThemes.setDefaultTheme(myTheme2);
   ```
