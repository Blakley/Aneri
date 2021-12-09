/* */
function account() {
    // increase access
    login_completed = true;
    document.getElementById('html5-player').dataset.premium = "true";
    document.getElementById('PGBase').dataset.adblockPremium = "true";            
}

/* */
function advertisement() {
    // remove page ads
    document.getElementById('ad-container').remove();
    document.getElementById('ad-loading-text').remove();
    try { document.getElementsByClassName('adspace-lb')[0].remove(); } catch (e) { console.log(""); }
}

/* */
function page() {
    // remove page content
    document.getElementById('UILog').remove();
    document.getElementById('UIFooter').remove();
    document.getElementById('UIHeadBar').remove();
    document.getElementById('UIWhatsNew').remove();
    document.getElementById('contact-popup').remove();
    document.getElementById('social-wrapper').remove();
    document.getElementById('UIMovieSummary').remove();
    document.getElementById('load-status-screen').remove();
    document.getElementsByClassName('tabbing')[0].remove();
    document.getElementById('UIDiscussionCompact').remove();
    document.getElementById('supported-languages').remove();
    document.getElementById('UICompactMovieClipList').remove();
    document.getElementsByClassName('interaction-bar')[0].remove();
    try { document.getElementsByClassName('leftside')[0].remove() } catch (e) { console.log(""); }
    try { document.getElementsByClassName('comment-rate-wrapper')[0].remove(); } catch (e) { console.log(""); }

    document.body.style.backgroundColor = "black";
    $('link[rel=stylesheet][href*="style"]').remove(); // default-icon stylesheet

    // UI interface
    let link = document.createElement("link");
    link.type = "text/css";
    link.rel = "stylesheet";
    link.href = chrome.extension.getURL("/styles/interface.css");
    document.getElementsByTagName("head")[0].appendChild(link);
}

/* */
function player() {
    UIVideoPlayer.min_wait_time = 0; // buffer time
    document.getElementById("blackboard").remove(); // old controls
    document.querySelector("#video-container > video").id = "video-id";

    // video ui
    fluidPlayer(
        'video-id',	{
        "layoutControls": {
            "controlBar": {
                "autoHideTimeout": 3,
                "animated": true,
                "autoHide": true
            },
            "htmlOnPauseBlock": {
                "html": "",
                "height": null,
                "width": null
            },
            "autoPlay": false,
            "mute": false,
            "allowTheatre": false,
            "playPauseAnimation": true,
            "playbackRateEnabled": false,
            "allowDownload": false,
            "playButtonShowing": false,
            "fillToContainer": true,
            "primaryColor": "#102038"
        },
        "vastOptions": {
            "adList": [],
            "adCTAText": false,
            "adCTATextPosition": ""
        }
    });

    // change video ui position
    let controls = document.getElementById("fluid_video_wrapper_video-id");
    document.body.appendChild(controls);
    document.body.style.overflow = 'hidden';
    document.getElementById('html5-player').remove();
    
    setTimeout(() => {
        document.getElementById('PGMovieWatcher').remove();

        let video = document.querySelector('#video-id');
        video.style.top = '0';
        video.style.left = '0';
        video.style.zIndex = '-1';
        video.style.width = '100vw';
        video.style.height = '100vh';
        video.style.position = 'fixed';
        video.style.objectFit = 'cover';

        document.querySelector('.fluid_video_wrapper').style.position = 'inherit';
        document.getElementById('video-id_fluid_controls_container').style.height = '55px';
        document.getElementById('video-id_fluid_controls_container').style.bottom = '55px';
        document.getElementById('video-id_fluid_controls_container').style.background = 'transparent';
    }, 500);
}

/* */
function interface() {
    let ui = document.createElement('div');
    let ui_content = "" + 
        "        <!-- menu -->" + 
        "        <div class=\"menu-div-closed\">" + 
        "            <nav class=\"menu floating\">" + 
        "                <input type=\"checkbox\" href=\"#\" class=\"menu-open\" name=\"menu-open\" id=\"menu-open\"/>" + 
        "                                <!-- menu button -->" + 
        "                <label id =\"menu-button\" class=\"menu-open-button closed\" for=\"menu-open\">" + 
        "                    <span class=\"lines line-1\"></span>" + 
        "                    <span class=\"lines line-2\"></span>" + 
        "                    <span class=\"lines line-3\"></span>" + 
        "                </label>" + 
        "                                <!-- menu items -->" + 
        "                <!-- item #3 (initial) -->" + 
        "                <a id =\"state-join\" href=\"#\" class=\"menu-item blue\">" + 
        "                    <i id=\"icon\" class=\"fa fa-ticket\"></i> " + 
        "                    <div class=\"tooltip\">join</div>" + 
        "                </a>" + 
        "                <!-- item #4 -->" + 
        "                <a style=\"visibility: hidden;\"  id =\"\" href=\"#\" class=\"menu-item blue\">" + 
        "                    <i id=\"icon\" class=\"fa fa-info-circle\"></i> " + 
        "                    <div class=\"tooltip\"></div>" + 
        "                </a>" + 
        "                <!-- item #2 (initial) -->" + 
        "                <a id =\"state-create\" href=\"#\" class=\"menu-item blue\">" + 
        "                    <i id=\"icon\" class=\"fa fa-film\"></i> " + 
        "                    <div class=\"tooltip\">create</div>" + 
        "                </a>" + 
        "                <!-- item #1 -->" + 
        "                <a style=\"visibility: hidden;\" id =\"\" href=\"#\" class=\"menu-item blue\">" + 
        "                    <i id=\"icon\" class=\"fa fa-smile-o\"></i>" + 
        "                    <div class=\"tooltip\"></div>" + 
        "                </a>" + 
        "                                <!-- menu button divs -->" + 
        "                <!-- input div -->" + 
        "                <div id =\"\" class=\"input_text\">" + 
        "                    <input id = \"input_field\" type=\"text\" placeholder=\"\">" + 
        "                    <button hidden id =\"submit_btn\"></button>" + 
        "                </div>" + 
        "                <!-- info div -->" + 
        "                <div id=\"info\">" + 
        "                    <a href=\"#\">" + 
        "                        <p>Aneri Video Streaming ™</p>" + 
        "                    </a>" + 
        "                </div>" + 
        "            </nav>" + 
        "        </div>" + 
        "        <!-- reaction div -->" + 
        "        <div class = \"reactions\">" + 
        "            <i id=\"reaction-icon\" class=\"fa fa-smile-o\"></i>" + 
        "            <p id=\"reaction-name\"></p>" + 
        "        </div>" + 
        "" + 
        "";
    ui.className = 'aneri-ui';
    ui.innerHTML = ui_content;
    document.body.appendChild(ui);
}

/* */
function notify(message) {
    Page.send("notify", {
        Alert: "custom",
        Line1: message,
        Buttons: []
    });

    setTimeout(() => {
        $("#UINotify #close-notify").click()
    }, 2000);
}

/* */
function listener() {
    // Custom console message listener
    let original = console.log;
    console.log = function(msg) {
        if (msg == "_videoPlayer canplay") {
            alert(msg); // video is ready to play
            // console.log('seeking');
        }
        else if (msg == "_videoPlayer seeking") {
            console.log('seeking');
        }
        else if (msg == "_videoPlayer seeked") {
            console.log('seeked');
        }
        else if (msg == "_videoPlayer waiting") {
            console.log('waiting');
        }
        else if (msg == "_videoPlayer pause") {
            console.log('pause');
        }
        else if (msg == "_videoPlayer play triggered") {
            console.log('play triggered');
        }
        else if (msg == "_videoPlayer playing") {
            console.log('playing');
        }
        else if (msg == "_videoPlayer stalled") {
            console.log('stalled');
        }
        else if (msg == "_videoPlayer durationchange") {
            console.log('durationchange');
        }
        else if (msg == "_videoPlayer ended") {
            console.log('ended');
        }
    }
}

/* */
function create() {
    function hash() {
        // create session hash
        let result = '';
        let characters ='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        const charactersLength = characters.length;
        for ( let i = 0; i < 5; i++ ) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    }

    function link() 
    {
        let link = "";
        let m_hash = hash(); 
        let url = window.location.href;

        if (url[url.length-1] == '#') {
            link = url + m_hash;
        }
        else {
            let content = url.split('#');
            if (content[1] != '') link = content[0] + '#' + m_hash;
            else link = url + '#' + m_hash;       
        }

        // create reference to movie sharing link
        let sharing = document.createElement('div');
        let s_text = document.createTextNode(link);
        sharing.id = "sharing";
        sharing.hidden = true;
        sharing.appendChild(s_text);
        document.body.appendChild(sharing);
        document.getElementById('input_field').value = link;
    }

    link();
}

/* */
function terminate() {
    if (typeof chrome.app.isInstalled !== 'undefined') {
        setTimeout(() => {
            location.reload();    
        }, 1500);
    }
}

// 
if (session == true) {
    account();
    interface();
    setTimeout(() => {
        advertisement();
        page();
        player();
    }, 2000);
} 
else {
    terminate();
}