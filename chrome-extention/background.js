chrome.webNavigation.onCommitted.addListener((details) => {
  if (details.frameId === 0) {
    // Ensure it's the main frame
    chrome.tabs.get(details.tabId, (tab) => {
      if (chrome.runtime.lastError) {
        console.error(chrome.runtime.lastError);
        return;
      }

      // Send a message to the content script
      chrome.tabs.sendMessage(details.tabId, {
        action: "checkURL",
        url: tab.url,
      });
    });
  }
});
