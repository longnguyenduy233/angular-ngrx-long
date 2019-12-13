// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import { VsCodePrompt } from './vs-code-prompt';
import { NgrxCli } from './ngrx-cli';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "Generate ngrx feature store" is now active!');
	const vsCodePrompt = new VsCodePrompt();
	const ngrxCli = new NgrxCli();

	const commandsMap = {
	  'extension.addNgRxFeatureStore': {
		template: 'feature store',
		fileName: 'feature-name',
		callback: ngrxCli.generateFeatureStore
	  }
	};
  
	const showDynamicDialog = (args: any, template: string, fileName: string, callback: any) => {
	  vsCodePrompt
		.showFileNameDialog(args, template, fileName)
		.then(loc => callback(loc))
		.catch(err => vscode.window.showErrorMessage(err));
	};
  
	for (const [key, value] of Object.entries(commandsMap)) {
	  const command = vscode.commands.registerCommand(key, args =>
		showDynamicDialog(args, value.template, value.fileName, value.callback)
	  );
	  context.subscriptions.push(command);
	}

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	// let disposable = vscode.commands.registerCommand('extension.helloWorld', () => {
	// 	// The code you place here will be executed every time your command is executed
	// 	if (vscode.workspace.workspaceFolders && vscode.workspace.workspaceFolders[0]) {
	// 		const storeName = 'test01';
	// 		const featureNameClassName = TemplateUtils.getInputNameCamelCase(storeName);
    // 		const featureNameVarName = TemplateUtils.getInputFeatureName(storeName);
	// 		const wsPath = vscode.workspace.workspaceFolders[0].uri.fsPath; // gets the path of the first workspace folder
	// 		let filePath = vscode.Uri.file(wsPath + Config.STORE_PATH + `/${storeName}-store/actions.ts`);

	// 		writeFiles(filePath, featureNameClassName, featureNameVarName, wsPath, storeName);
	// 	}
	// });

	// context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() {}
