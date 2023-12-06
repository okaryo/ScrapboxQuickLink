import t from "./translation";

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
	await chrome.offscreen.createDocument({
		url: "../offscreen.html",
		reasons: [chrome.offscreen.Reason.CLIPBOARD],
		justification: "Write text to the clipboard.",
	});

	chrome.runtime.sendMessage({
		type: "copy-scrapbox-link-to-clipboard",
		target: "offscreen",
		data: `[${title} ${decodeURIComponent(url)}]`,
	});
};
