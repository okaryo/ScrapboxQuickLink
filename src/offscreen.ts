const handleMessages = async (message: {
	type: string;
	target: string;
	data: string;
}) => {
	if (message.target !== "offscreen") return;

	switch (message.type) {
		case "copy-scrapbox-link-to-clipboard":
			handleClipboardWrite(message.data);
			break;
		default:
			console.warn(`Unexpected message type received: '${message.type}'.`);
	}
};

chrome.runtime.onMessage.addListener(handleMessages);

const handleClipboardWrite = async (data: string) => {
	try {
		if (typeof data !== "string") {
			throw new TypeError(
				`Value provided must be a 'string', got '${typeof data}'.`,
			);
		}

		const textElement = document.querySelector("#text") as HTMLInputElement;
		textElement.value = data;
		textElement.select();
		const result = document.execCommand("copy");
		if (result) {
			chrome.runtime.sendMessage({
				type: "copy-complete",
				status: "success",
				message: "Copy to clipboard successful",
			});
		} else {
			throw new Error("Copy to clipboard failed");
		}
	} catch (error) {
		chrome.runtime.sendMessage({
			type: "copy-complete",
			status: "error",
			message: error.message,
		});
	}
};
