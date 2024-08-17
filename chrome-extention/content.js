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
    let data = { hasCN: false };
    if (
      url ===
      "https://www.asahi.com/articles/ASS8733T3S87ULBH00QM.html?ref=tw_asahicom"
    ) {
      data.hasCN = true;
      data.urlCN = "https://x.com/i/birdwatch/n/1822911167385444833";
    }

    // Uncomment the following lines when ready to use the actual service
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
  // Ensure the DOM is ready before modifying
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", () =>
      modifyPageContent(data)
    );
  } else {
    modifyPageContent(data);
  }
}

function modifyPageContent(data) {
  if (data.hasCN) {
    console.log("has CN");

    const warningDiv = createWarningDiv(data.urlCN);

    // Find the header element
    const header = document.querySelector("header");
    if (header && header.nextSibling) {
      // Insert the warning div after the header
      // This is required because the ad in header sometimes hide the the warning div.
      header.parentNode.insertBefore(warningDiv, header.nextSibling);
    } else {
      // Fallback: If no header is found or it's the last element, prepend to body
      document.body.prepend(warningDiv);
    }
  }
  // Add more conditions as needed
}

function createWarningDiv(urlCN) {
  const warningDiv = document.createElement("div");
  warningDiv.textContent = "Warning: This site has Community Notes";
  warningDiv.style.cssText =
    "background: red; color: white; padding: 10px; text-align: center; width: 100%;";
  warningDiv.onclick = () => {
    window.location = urlCN;
  };
  return warningDiv;
}
