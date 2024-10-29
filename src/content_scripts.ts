chrome.runtime.onMessage.addListener((message) => {
	if (message.type === "show-snackbar") {
		showSnackbar(message.status, message.data);
	}
});

function showSnackbar(status: string, value: string) {
	const id = "scrapbox-quick-link-snackbar";
	let snackbar = document.getElementById(id);
	if (!snackbar) {
		snackbar = document.createElement("div");
		snackbar.id = id;
		snackbar.style.cssText = `
          position: fixed;
          bottom: 20px;
          left: 20px;
          max-width: 300px;
          background-color: #333;
          color: white;
          padding: 12px 16px;
          border-radius: 4px;
          font-size: 14px;
          z-index: 9999;
          opacity: 0;
          transition: opacity 0.5s ease, transform 0.5s ease;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
      `;
		document.body.appendChild(snackbar);
	}

	const icon = status === "success" ? "✅" : "😢";
	const bgColor = status === "success" ? "#4CAF50" : "#F44336";
	const message =
		status === "success" ? "Copied to clipboard" : "Failed to copy";
	snackbar.style.backgroundColor = bgColor;

	snackbar.innerHTML = `
        <div style="display: flex; align-items: center;">
            <span style="font-size: 18px; margin-right: 8px;">${icon}</span>
            <span>${message}</span>
        </div>
    `;

	if (status === "success" && value) {
		const valueElement = document.createElement("div");
		valueElement.style.cssText = `
        font-size: 12px;
        margin-top: 4px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        max-width: 100%;
    `;
		valueElement.textContent = value;
		snackbar.appendChild(valueElement);
	}

	snackbar.style.opacity = "1";
	snackbar.style.transform = "translateY(0)";
	setTimeout(() => {
		snackbar.style.opacity = "0";
		snackbar.style.transform = "translateY(20px)";
	}, 3000);
}
