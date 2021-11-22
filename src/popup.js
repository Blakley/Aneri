let start = document.getElementById('create-session');
let info = document.getElementById('description');
let end = document.getElementById('leave-session');

start.onclick = function() {
    chrome.windows.getCurrent(function(w) {
        chrome.tabs.getSelected(w.id,
        function (response)
        {            
            let instances = 0; // run when only 1 instance of Einthusan is open
            let r = response.url;

            chrome.tabs.query({}, function(tabs) {     
                tabs.forEach(function(tab) {
                    let url = (tab.url).toString();
                    if (url.includes("einthusan")) instances +=1;
                });

                if (instances == 1) {
                    if(r.includes("einthusan.tv/movie/watch")) {
                        start.innerHTML = 'Loading ...';
                        end.innerHTML = 'Disconnect';
                        setTimeout(() => {
                            document.getElementsByClassName('disconnected')[0].className = 'disconnected hidden';
                            document.getElementsByClassName('connected hidden')[0].className = 'connected'; 
                            chrome.browserAction.setPopup({popup: "popup2.html"}); 
                            Begin();
                            setTimeout(() => { window.close(); }, 2000);
                        }, 1500);
                    } 
                    else {
                        start.innerHTML = 'Loading ...';
                        setTimeout(() => {
                            start.innerHTML = 'Error';
                            info.innerHTML = 'Please provide a valid streaming URL to continue';
                            setTimeout(() => {
                                window.close();
                                start.innerHTML = 'Start streaming now';
                                info.innerHTML = 'Join an existing Aneri stream or create a new one.';
                            }, 3000);                            
                        }, 1500);
                    }
                }
                else  {
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
                            info.innerHTML = 'Please provide a valid streaming URL to continue';
                            setTimeout(() => {
                                window.close();
                                start.innerHTML = 'Start streaming now';
                                info.innerHTML = 'Join an existing Aneri stream or create a new one.';
                            }, 3000);                            
                        }, 1500);
                    }
                }
             });
        });
    });
}

end.onclick = function() {
    end.innerHTML = 'Disconnecting ...';
    start.innerHTML = 'Start streaming now';
    setTimeout(() => {
        document.getElementsByClassName('disconnected hidden')[0].className = 'disconnected';
        document.getElementsByClassName('connected')[0].className = 'connected hidden';
        chrome.browserAction.setPopup({popup: "popup.html"});   
        setTimeout(() => { window.close(); }, 3000);
        Leave();
    }, 1500);
}

function Begin() {
    chrome.runtime.getBackgroundPage(function(backgroundPage){
        backgroundPage.Start()   
    });
}

function Leave() {
    chrome.runtime.getBackgroundPage(function(backgroundPage){
        backgroundPage.End()
    });
}
