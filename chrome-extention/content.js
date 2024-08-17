chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "checkURL") {
    checkURLAgainstService(request.url);
  }
});

async function checkURLAgainstService(url) {
  try {
    // mock code
    console.log("testing", url);

    // mock
    data = { hasCN: false };
    if (
      url ===
      "https://www.asahi.com/articles/ASS8733T3S87ULBH00QM.html?ref=tw_asahicom"
    ) {
      data.hasCN = true;
      data.urlCN = "https://x.com/i/birdwatch/n/1822911167385444833";
    }

    // const response = await fetch(
    //   `https://example.com/search?url=${encodeURIComponent(url)}`
    // );
    // const data = await response.json();

    // Process the response and modify the page
    modifyPage(data);
  } catch (error) {
    console.error("Error checking URL:", error);
  }
}

function modifyPage(data) {
  // This function will change the view based on the response from the service
  // The exact implementation will depend on your specific requirements

  if (data.hasCN) {
    console.log("has CN");

    const warningDiv = document.createElement("div");
    warningDiv.textContent = "Warning: This site has Community Notes";
    warningDiv.style.cssText =
      "position: fixed; top: 0; left: 0; right: 0; background: red; color: white; padding: 10px; text-align: center;";
    warningDiv.onclick = () => {
      window.location = data.urlCN;
    };
    document.body.prepend(warningDiv);
  }
  // Add more conditions as needed
}
