var test_value;

// contents.jsで送信した値を受信
chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {
        test_value = request.value;
    }
);
