chrome.action.onClicked.addListener((tab) => {
    chrome.scripting.executeScript({
        target: { tabId: tab.id },
        func: () => {
            // change();
            alert("Hello from my extension");
        },
    });
});
