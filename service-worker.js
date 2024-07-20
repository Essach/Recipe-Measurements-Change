chrome.action.onClicked.addListener((tab) => {
    chrome.scripting.executeScript({
        target: { tabId: tab.id },
        func: () => {
            // console.log("hi");
            alert("Hello from my extension");
        },
    });
});
