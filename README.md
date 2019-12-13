# VS Code Angular ngRx

This extension allows **quickly scaffolding ngRx file templates** (actions, reducers, effects and more) in VS Code Angular project based on @ngrx/platform

### Generate store directory + files 

Right click on `root-store` folder in your current project to generate the `feature-store.module`. You will be prompted to enter the feature name.
This command will generate the following files:

* `feature-store.module.ts`
* `feature.actions.ts`
* `feature.effects.ts`
* `feature.reducer.ts`
* `feature.state.ts`
* `feature.selectors.ts`
* `index.ts`
This extension creates a `feature-store.module` with actions, reducer file, feature-state, effects, selectors and **import a new store module into root-store module**. The module contains the required setup for ngrx for a feature-module (lazy loaded).


## Known Issues

Calling out known issues can help limit users opening duplicate issues against your extension.

## Release Notes

Users appreciate release notes as you update your extension.

### 1.0.0

Initial release of ...

### 1.0.1

Fixed issue #.

### 1.1.0

Added features X, Y, and Z.

-----------------------------------------------------------------------------------------------------------

## Working with Markdown

**Note:** You can author your README using Visual Studio Code.  Here are some useful editor keyboard shortcuts:

* Split the editor (`Cmd+\` on macOS or `Ctrl+\` on Windows and Linux)
* Toggle preview (`Shift+CMD+V` on macOS or `Shift+Ctrl+V` on Windows and Linux)
* Press `Ctrl+Space` (Windows, Linux) or `Cmd+Space` (macOS) to see a list of Markdown snippets

### For more information

* [Visual Studio Code's Markdown Support](http://code.visualstudio.com/docs/languages/markdown)
* [Markdown Syntax Reference](https://help.github.com/articles/markdown-basics/)

**Enjoy!**
