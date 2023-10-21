import { App, Modal, Setting } from "obsidian";

export class ExampleModal extends Modal {
	result: string;
	onPush: (result: string) => void;
	onPull: () => void;

	constructor(
		app: App,
		onPush: (result: string) => void,
		onPull: () => void
	) {
		super(app);
		this.onPush = onPush;
		this.onPull = onPull;
	}

	onOpen() {
		const { contentEl } = this;

		new Setting(contentEl).setName("Commit message").addText((text) =>
			text.onChange((value) => {
				this.result = value;
			})
		);
		new Setting(contentEl).addButton((btn) =>
			btn
				.setButtonText("Pull")
				.setCta()
				.setClass("pullButton")
				.onClick(() => {
					this.close();
					this.onPull();
				})
		);

		new Setting(contentEl).addButton((btn) =>
			btn
				.setButtonText("Push")
				.setCta()
				.onClick(() => {
					this.close();
					this.onPush(this.result);
				})
		);
	}
	onClose() {
		const { contentEl } = this;
		contentEl.empty();
	}
}
