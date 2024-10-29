import t from "./translation";

if (import.meta.env.DEV) {
	chrome.action.setBadgeText({ text: "DEV" });
}

chrome.contextMenus.onClicked.addListener((info, tab) => {
	if (info.menuItemId === "copy-scrapbox-link-with-page-title") {
		addLinkToClipboard(tab.title, info.pageUrl);
	}
	if (info.menuItemId === "copy-scrapbox-link-with-selection") {
		addLinkToClipboard(info.selectionText, info.pageUrl);
	}
});

chrome.contextMenus.create({
	id: "copy-scrapbox-link-with-page-title",
	title: t.copyScrapboxLinkWithPageTitle,
	contexts: ["page"],
});
chrome.contextMenus.create({
	id: "copy-scrapbox-link-with-selection",
	title: t.copyScrapboxLinkWithSelection,
	contexts: ["selection"],
});

const addLinkToClipboard = async (title: string, url: string) => {
	const offscreenUrl = chrome.runtime.getURL("offscreen.html");
	const existingContexts = await chrome.runtime.getContexts({
		contextTypes: [chrome.runtime.ContextType.OFFSCREEN_DOCUMENT],
		documentUrls: [offscreenUrl],
	});

	if (existingContexts.length > 0) {
		chrome.offscreen.closeDocument();
	}

	await chrome.offscreen.createDocument({
		url: offscreenUrl,
		reasons: [chrome.offscreen.Reason.CLIPBOARD],
		justification: "Write text to the clipboard.",
	});

	chrome.runtime.sendMessage({
		type: "copy-scrapbox-link-to-clipboard",
		target: "offscreen",
		data: `[${title} ${decodeURIComponent(url)}]`,
	});
};
