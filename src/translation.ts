class Translations {
	get copyScrapboxLinkWithPageTitle() {
		return chrome.i18n.getMessage("copy_scrapbox_link_with_page_title");
	}

	get copyScrapboxLinkWithSelection() {
		return chrome.i18n.getMessage("copy_scrapbox_link_with_selection");
	}
}

const t = new Translations();

export default t;
