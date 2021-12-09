/* start extension */
function Begin() {
    chrome.runtime.getBackgroundPage(function(backgroundPage){
        backgroundPage.Start()   
    });
}

/* close extension */
function Leave() {
    chrome.runtime.getBackgroundPage(function(backgroundPage){
        backgroundPage.End()
    });
}

let info = document.getElementById('description');

// start extension
let start = document.getElementById('create-session');
start.onclick = function() {
    chrome.windows.getCurrent(function(w) {
        chrome.tabs.getSelected(w.id,
        function (response)
        {            
            // run when only 1 instance of Einthusan is open
            let instances = 0; 
            let r = response.url;

            chrome.tabs.query({}, function(tabs) {     
                tabs.forEach(function(tab) {
                    let url = (tab.url).toString();
                    if (url.includes("einthusan")) instances += 1;
                });

                if (instances == 1) {
                    if(r.includes("einthusan.tv/movie/watch")) {
                        start.innerHTML = 'Loading ...';
                        end.innerHTML = 'Disconnect';
                        setTimeout(() => {
                            // change popup UI
                            document.getElementsByClassName('disconnected')[0].className = 'disconnected hidden';
                            document.getElementsByClassName('connected hidden')[0].className = 'connected'; 
                            chrome.browserAction.setPopup({popup: "/pages/popup2.html"}); 
                            Begin();
                            setTimeout(() => { window.close(); }, 300);
                        }, 1500);
                    } 
                    else {
                        start.innerHTML = 'Loading ...';
                        setTimeout(() => {
                            start.innerHTML = 'Error';
                            info.innerHTML = 'Unable to use extension on this site';
                            setTimeout(() => {
                                window.close();
                                start.innerHTML = 'Start streaming now';
                                info.innerHTML = 'Join or Create an Aneri streaming session';
                            }, 3000);                            
                        }, 1500);
                    }
                }
                else {
                    if(r.includes("einthusan.tv/movie/watch")) {
                        start.innerHTML = 'Loading ...';
                        setTimeout(() => {
                            start.innerHTML = 'Error';
                            info.innerHTML = 'Please close all other Einthusan tabs to continue';  
                            setTimeout(() => {
                                window.close();
                                start.innerHTML = 'Start streaming now';
                                info.innerHTML = 'Join an existing Aneri stream or create a new one.'; 
                            }, 3000);
                        }, 1500);
                    } 
                    else {
                        start.innerHTML = 'Loading ...';
                        setTimeout(() => {
                            start.innerHTML = 'Error';
                            info.innerHTML = 'Unable to use extension on this site';
                            setTimeout(() => {
                                window.close();
                                start.innerHTML = 'Start streaming now';
                                info.innerHTML = 'Join or Create an Aneri streaming session';
                            }, 3000);                            
                        }, 1500);
                    }
                }
             });
        });
    });

}

// disconnect extension
let end = document.getElementById('leave-session');
end.onclick = function() {
    end.innerHTML = 'Disconnecting ...';
    start.innerHTML = 'Start streaming now';
    setTimeout(() => {
        document.getElementsByClassName('disconnected hidden')[0].className = 'disconnected';
        document.getElementsByClassName('connected')[0].className = 'connected hidden';
        chrome.browserAction.setPopup({popup: "/pages/popup.html"}); 
        setTimeout(() => { window.close(); }, 3000);
        Leave();
    }, 1500);
}