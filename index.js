async function sayHello() {
    let [tab] = await chrome.tabs.query({ active: true });
    chrome.scripting.executeScript({
        target: { tabId: tab.id },
        func: () => {
            // getText();
            alert("Hello");
        },
    });
}
document.getElementById("myButton").addEventListener("click", sayHello);

// const getText = () => {
//     comments = document.getElementsByClassName("ytd-comment-thread-renderer");
//     alert(comments[0]);
// };
