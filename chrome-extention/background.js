chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === "complete" && tab.url) {
    // Send a message to the content script
    chrome.tabs.sendMessage(tabId, {
      action: "checkURL",
      url: tab.url,
    });
  }
});
