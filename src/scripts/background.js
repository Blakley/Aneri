/* Start Aneri */
function Start() {
    chrome.tabs.executeScript(null, { 
        file: "/scripts/jquery.js" }, function() {
            chrome.tabs.executeScript(null, {file: '/scripts/video.js'}),
            chrome.tabs.executeScript(null, {code: 'let session = true;'}),
            chrome.tabs.executeScript(null, {file: '/scripts/einthusan.js'});
            chrome.tabs.executeScript(null, {file: '/scripts/interface.js'});
    });
}

/* Stop Aneri */
function End() {
    chrome.tabs.executeScript(null, {code: 'session = false;'});
    chrome.tabs.executeScript(null, {file: '/scripts/einthusan.js'});
}