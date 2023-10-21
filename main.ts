/* eslint-disable @typescript-eslint/no-unused-vars */
import {
	App,
	Editor,
	MarkdownView,
	Modal,
	Notice,
	Plugin,
	PluginSettingTab,
	Setting,
	FileSystemAdapter
} from "obsidian";
import { ExampleModal } from "./src/modal";
import {executeShell,setFilePermissions} from './utils/execute'
// Remember to rename these classes and interfaces!

interface MyPluginSettings {
	mySetting: string;
}

const DEFAULT_SETTINGS: MyPluginSettings = {
	mySetting: "default",
};


function getAbsolutePath(filename:string): string {
	let basePath;
	// base path
	if (this.app.vault.adapter instanceof FileSystemAdapter) {
		basePath = this.app.vault.adapter.getBasePath();
	} else {
		throw new Error('Cannot determine base path.');
	}
	// relative path
	const relativePath = `${this.app.vault.configDir}/plugins/obsidian-sample-plugin/${filename}`;
	// absolute path
	return `${basePath}/${relativePath}`;
}
function onPushHandler(commitMessage: string){
	const absolutePath = getAbsolutePath("utils")
	setFilePermissions(`cd ${absolutePath} && chmod +x ./commit.sh`)
	// setFilePermissions("chmod +x ./commit.sh")
	const response  = executeShell(absolutePath, commitMessage)
}
function onPullHandler(){
	const absolutePath = getAbsolutePath("utils")
	const response = setFilePermissions(`cd ${absolutePath} && chmod +x ./commit.sh && git stash && git pull && git stash pop`)
}
export default class PullPushSyncPlugin extends Plugin {
	
	settings: MyPluginSettings;

	async onload() {
		await this.loadSettings();
		// This creates an icon in the left ribbon.
		
		const ribbonIconEl = this.addRibbonIcon(
			"git-branch",
			"Push/Pull",
			(evt: MouseEvent) => {
				// Called when the user clicks the icon.
				// new Notice("This is a new new notice!");
				
				new ExampleModal(this.app, onPushHandler, onPullHandler).open();
			}
		);
		ribbonIconEl.addClass("my-plugin-ribbon-class");

	}

	onunload() {}

	async loadSettings() {
		this.settings = Object.assign(
			{},
			DEFAULT_SETTINGS,
			await this.loadData()
		);
	}

	async saveSettings() {
		await this.saveData(this.settings);
	}
}



// class SampleSettingTab extends PluginSettingTab {
// 	plugin: PullPushSyncPlugin;

// 	constructor(app: App, plugin: PullPushSyncPlugin) {
// 		super(app, plugin);
// 		this.plugin = plugin;
// 	}

// 	display(): void {
// 		const { containerEl } = this;

// 		containerEl.empty();

// 		new Setting(containerEl)
// 			.setName("Setting #1")
// 			.setDesc("It's a secret")
// 			.addText((text) =>
// 				text
// 					.setPlaceholder("Enter your secret")
// 					.setValue(this.plugin.settings.mySetting)
// 					.onChange(async (value) => {
// 						this.plugin.settings.mySetting = value;
// 						await this.plugin.saveSettings();
// 					})
// 			);
// 	}
// }
