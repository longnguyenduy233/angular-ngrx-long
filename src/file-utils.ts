import * as vscode from 'vscode';
import {feature_actions_ts} from './templates/feature/actions';
import {feature_effects_ts} from './templates/feature/effects';
import {feature_state_ts} from './templates/feature/state';
import {feature_reducer_ts} from './templates/feature/reducer';
import {feature_selector_ts} from './templates/feature/selectors';
import {feature_store_module_ts} from './templates/feature/module';
import {feature_index_ts} from './templates/feature/index';
import { IPath } from "./models/path";
import * as path from 'path';
import { TemplateUtils } from './templates/template-utils';


export function writeFiles(loc: IPath) {
    const featureNameClassName = TemplateUtils.getInputNameCamelCase(loc.fileName);
    const featureNameVarName = TemplateUtils.getInputFeatureName(loc.fileName);
    const wsedit = new vscode.WorkspaceEdit();
    let filePath = vscode.Uri.file(getFileName(loc, `actions.ts`));
    wsedit.createFile(filePath, { ignoreIfExists: true });
    wsedit.insert(filePath, new vscode.Position(0, 0), feature_actions_ts(featureNameClassName, featureNameVarName));
    filePath = vscode.Uri.file(getFileName(loc, `effects.ts`));
    wsedit.createFile(filePath, { ignoreIfExists: true });
    wsedit.insert(filePath, new vscode.Position(0, 0), feature_effects_ts(featureNameClassName, featureNameVarName));
    filePath = vscode.Uri.file(getFileName(loc, `reducer.ts`));
    wsedit.createFile(filePath, { ignoreIfExists: true });
    wsedit.insert(filePath, new vscode.Position(0, 0), feature_reducer_ts(featureNameClassName, featureNameVarName));
    filePath = vscode.Uri.file(getFileName(loc, `selectors.ts`));
    wsedit.createFile(filePath, { ignoreIfExists: true });
    wsedit.insert(filePath, new vscode.Position(0, 0), feature_selector_ts(featureNameClassName, featureNameVarName));
    filePath = vscode.Uri.file(getFileName(loc, `state.ts`));
    wsedit.createFile(filePath, { ignoreIfExists: true });
    wsedit.insert(filePath, new vscode.Position(0, 0), feature_state_ts(featureNameClassName, featureNameVarName));
    filePath = vscode.Uri.file(getFileName(loc, `${loc.dirName}.module.ts`));
    wsedit.createFile(filePath, { ignoreIfExists: true });
    wsedit.insert(filePath, new vscode.Position(0, 0), feature_store_module_ts(featureNameClassName, featureNameVarName));
    filePath = vscode.Uri.file(getFileName(loc, `index.ts`));
    wsedit.createFile(filePath, { ignoreIfExists: true });
    wsedit.insert(filePath, new vscode.Position(0, 0), feature_index_ts(featureNameClassName, featureNameVarName));
    vscode.workspace.applyEdit(wsedit).then( rs => {
        updateRootStoreModule(featureNameClassName, loc);
    });
}

export function updateRootStoreModule(featureNameClassName: string, loc: IPath) {
    vscode.workspace.findFiles('**/root-store.module.ts', '**/node_modules/**', 10).then(rs => {
        vscode.workspace.openTextDocument(rs[0]).then((a: vscode.TextDocument) => {
            vscode.window.showTextDocument(a).then(e => {
                const moduleContent = e.document.getText(new vscode.Range(new vscode.Position(0, 0), e.document.positionAt(e.document.getText().length)));
                const importIndex = moduleContent.search(/@NgModule/);
                const moduleImportMatch: any = moduleContent.match(/imports:*\s\[/);
                let moduleImportIndex = 0;
                if (moduleImportMatch) {
                    moduleImportIndex = moduleImportMatch.index + moduleImportMatch[0].length;
                }
                e.edit(edit => {
                    edit.insert(e.document.positionAt(importIndex - 1), `import { ${featureNameClassName}StoreModule } from './${loc.dirName}';\n`);
                    edit.insert(e.document.positionAt(moduleImportIndex), `\n\t\t${featureNameClassName}StoreModule,`);
                }).then( rs => {
                    vscode.window.showInformationMessage(`Created a new store: ${loc.fileName}`);
                });
                // vscode.window.showInformationMessage(e.document.getText(new vscode.Range(new vscode.Position(0, 0), e.document.positionAt(e.document.getText().length))));
            });
        });
    });
}
export function getFileName(loc: IPath, fileName: string): string {
    return path.join(loc.dirPath, fileName);
  }