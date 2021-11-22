function init() {
    // clear page
    function clear() {
        document.getElementsByClassName('adspace-lb')[0].remove();
        document.getElementById('ad-container').remove();
        document.getElementById('ad-loading-text').remove();
        document.getElementById('load-status-screen').remove();
        document.getElementById('html5-player').dataset.premium = "true";
        document.getElementById('PGBase').dataset.adblockPremium = "true";
        document.getElementById('social-wrapper').remove();
        document.getElementById('UICompactMovieClipList').remove();
        document.getElementById('UIFooter').remove();
        document.getElementById('UIMovieSummary').remove();
        document.getElementById('buffering').remove();
        document.getElementById('UIDiscussionCompact').remove();
        document.getElementsByClassName('tabbing')[0].remove();
        document.getElementsByClassName('interaction-bar')[0].remove();
        document.getElementById('UIHeadBar').remove();
        document.getElementById('supported-languages').remove();
    
        try { document.getElementsByClassName('leftside')[0].remove() } catch (e) { console.log(""); }
        try { document.getElementsByClassName('adspace-lb')[0].remove(); } catch (e) { console.log(""); }
        try { document.getElementsByClassName('comment-rate-wrapper')[0].remove(); } catch (e) { console.log(""); }
    }

    // additional page styling
    function styling() {
        $('head').append('<link rel="stylesheet" type="text/css" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.6.3/css/font-awesome.min.css">');
        $('head').append('<link rel="stylesheet" type="text/css" href="https://antbugger.github.io/Movies/style.css">');
    }

    // edit video frame
    function frame() {
        let wplayer = document.getElementById('html5-player');
        wplayer.style.position = 'absolute';
        wplayer.style.margin = 'auto';
        wplayer.style.top = '0';
        wplayer.style.bottom = '0';
        wplayer.style.right = '0';
        wplayer.style.width = '96.9%';
        wplayer.style.height = '100vh';
    }

    // edit video controls
    function controls() {
        document.getElementsByClassName('subs')[0].remove();
        document.getElementsByClassName('formaticons')[0].remove();
        document.getElementById('controlbar').style.backgroundColor = "black";
        document.getElementById('controlbar').style.zIndex = '2';
        document.getElementsByClassName('play-pause')[0].style.color="white";
        document.getElementsByClassName('bump-backward')[0].style.color="white";
        document.getElementsByClassName('bump-forward')[0].style.color="white";
        document.getElementsByClassName('mutable')[0].style.color="white";
        document.getElementsByClassName('fullscreen')[0].style.color="white";
        document.querySelector("#play > i").style.fontSize="50px";
        document.querySelector("#play > i").style.backgroundColor = 'rgba(255,255,255,0)';
        document.querySelector("#video-container > video").poster="poster.png";
        document.querySelector("#video-container > video").pause();
        document.getElementsByClassName("bump-backward")[0].hidden = true;
        document.getElementsByClassName("bump-forward")[0].hidden = true;
    }

    // user joined popup
    function popup() {
        let pop = document.createElement('div');
        pop.id = "joined_popup";
        pop.hidden = true;
        let pop_count = "" + 
            "<div class=\"user_popup\">" + 
            "  <p>A new user has joined the session</p>" + 
            "</div>" + 
            "";
        pop.innerHTML = pop_count;
        document.getElementById('content').appendChild(pop);
    }
    
    // tab unload
    function events() {
         // tab-leave listener
        window.addEventListener("beforeunload", function (e) {
            var confirmationMessage = "\o/";
            (e || window.event).returnValue = confirmationMessage; 
            return confirmationMessage;
        });
    }

    clear();
    styling();
    setTimeout(() => {
        frame();
        controls();
        popup();
        events();
        menu();
    }, 2500);
}

function menu() {
    // create navigation menu
    let nav = document.createElement('div');
    var nav_content = "" + 
        "<ul id=\"nav-menu\" class=\"side-menu\">" + 
        "  <li><a href=\"#\"><span id=\"nav-share\" class=\"fa fa-link\"></span>Share</a></li>" + 
        "  <li><a href=\"#\"><span id=\"nav-create\" class=\"fa fa-video-camera\"></span>Create</a></li>" + 
        "  <li><a href=\"#\"><span id=\"nav-join\" class=\"fa fa-film\"></span>Join</a></li>" + 
        "  <p id=\"aneri\">Aneri</p>" + 
        "</ul>" + 
        "";

    nav.innerHTML = nav_content;
    document.getElementById('content').appendChild(nav);

    let name = document.getElementById('aneri');
    
    let menu = document.getElementById('nav-menu');
    name.style.right = '100%';
    menu.onmouseover = function() {
        name.style.right = '40%';
        document.getElementById('controlbar').style.zIndex = '0';
    }
    menu.onmouseleave = function () {
        name.style.right = '100%';
        setTimeout(() => {
            document.getElementById('controlbar').style.zIndex = '2';
        }, 2500);
    }

    // share button
    let share_btn = document.getElementById('nav-share');
    share_btn.onmouseover = function() {
        share_btn.style.color = 'white';
    }
    share_btn.onmouseleave = function () {
        share_btn.style.color = '#555';
    }
    share_btn.onclick = function() {
        if (party == true) {
            document.querySelector("#nav-share").nextSibling.nodeValue = 'Generating link ...';
            setTimeout(() => {
                document.querySelector("#nav-share").nextSibling.nodeValue = 'Generated ✓';
                var clipboard = document.createElement('input');
                var text = window.location.href;
                text = document.getElementById('sharing').innerText;
                document.body.appendChild(clipboard);
                clipboard.value = text;
                clipboard.select();
                document.execCommand('copy');
                document.body.removeChild(clipboard);
    
                setTimeout(() => {
                    document.querySelector("#nav-share").nextSibling.nodeValue = 'Share';
                }, 1500);
            }, 2500);
        }
        else {
            document.querySelector("#nav-share").nextSibling.nodeValue = 'Not in a party ...';
            setTimeout(() => {
                document.querySelector("#nav-share").nextSibling.nodeValue = 'Share';
            }, 2500);  
        }
    }

    // create button
    let create_btn = document.getElementById('nav-create');
    create_btn.onmouseover = function() {
        create_btn.style.color = 'white';
    }
    create_btn.onmouseleave = function () {
        create_btn.style.color = '#555';
    }
    create_btn.onclick = function() {
        if (party == false && host == false) {
            document.querySelector("#nav-create").nextSibling.nodeValue = 'Creating party ...';
            setTimeout(() => {
                document.querySelector("#nav-create").nextSibling.nodeValue = 'Created ✓';
                create();  // setup session
                setTimeout(() => {
                    document.querySelector("#nav-create").nextSibling.nodeValue = 'Create';
                }, 3000);
            }, 2500);           
        }
        else {
            document.querySelector("#nav-create").nextSibling.nodeValue = 'Already in a party ...';
            setTimeout(() => {
                document.querySelector("#nav-create").nextSibling.nodeValue = 'Created';
            }, 2500);  
        }
    }

    // join button
    let join_btn = document.getElementById('nav-join');
    join_btn.onmouseover = function() {
        join_btn.style.color = 'white';
    }
    join_btn.onmouseleave = function () {
        join_btn.style.color = '#555';
    }
    join_btn.onclick = function() {
        let url = document.getElementById('url_ref').innerText;
        let key = (url).split('#')[1];
        if (key == '' || key == undefined) 
        {
            document.querySelector("#nav-join").nextSibling.nodeValue = 'Invalid party link ...';
            setTimeout(() => {
                document.querySelector("#nav-join").nextSibling.nodeValue = 'Join';
            }, 2500);
        }
        else if (host == false && party == false) 
        {
            document.querySelector("#nav-join").nextSibling.nodeValue = 'Joining party ...';
            setTimeout(() => {
                join();  // join movie session
                document.querySelector("#nav-join").nextSibling.nodeValue = 'Connected ✓';
                setTimeout(() => {
                        document.querySelector("#nav-join").nextSibling.nodeValue = 'Join';
                }, 2500); 
            }, 2500);
        }
        else {
            document.querySelector("#nav-join").nextSibling.nodeValue = 'Already in a party ...';
            setTimeout(() => {
                document.querySelector("#nav-join").nextSibling.nodeValue = 'Join';
            }, 2500);
        }
    }

    // store pasted url
    let link = document.location.href;
    let url_text = document.createTextNode(link);
    let url = document.createElement('div');
    url.id = "url_ref";
    url.hidden = true;
    url.appendChild(url_text);
    document.getElementById('video-container').appendChild(url);
}

function hash() {
    // create movie hash
    let result = '';
    let characters ='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    for ( let i = 0; i < 5; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

function create() {
    // create party
    party = true;
    host = true;

    let video = document.querySelector("#video-container > video");
    video.pause();

    let link = "";
    let m_hash = hash(); 
    let url = window.location.href;

    if (url[url.length-1] == '#') {
        link = url + m_hash;
    }
    else {
        let content = url.split('#');
        if (content[1] != '') {
            link = content[0] + '#' + m_hash;
        }
        else {
            link = url + '#' + m_hash;
        }
    }

    // create reference to movie sharing link
    let sharing = document.createElement('div');
    let s_text = document.createTextNode(link);
    sharing.id = "sharing";
    sharing.hidden = true;
    sharing.appendChild(s_text);
    document.getElementById('video-container').appendChild(sharing);

    // create reference to movie database name
    let movie_ref = document.createElement('div');
    movie_ref.id = "movie_ref";
    movie_ref.hidden = true;

    let lang = url.split('=').pop();
    let href = url.split('/')[5];
    let key =  href + '?' + lang + '?' + m_hash;
    key = key.replace('#', '');

    let m_text = document.createTextNode(key);
    movie_ref.appendChild(m_text);
    document.getElementById('video-container').appendChild(movie_ref);

    // create database entry
    chrome.runtime.sendMessage({
        command: "create", 
        data: {
            "paused": true,
            "time": video.currentTime,
            "viewers": 1
        }, 
        key: key
    },
    (response) => {
        console.log(response.status);
    });

    movie();
}

function join() {
    // join an Aneri party
    party = true;
    let video = document.querySelector("#video-container > video");
    video.pause();

    // create reference to movie sharing link
    let url = document.getElementById('url_ref').innerText;
    let m_hash = url.split('#')[1];

    let sharing = document.createElement('div');
    let s_text = document.createTextNode(url);
    sharing.id = "sharing";
    sharing.hidden = true;
    sharing.appendChild(s_text);
    document.getElementById('video-container').appendChild(sharing);

    // create reference to movie database name
    let movie_ref = document.createElement('div');
    movie_ref.id = "movie_ref";
    movie_ref.hidden = true;

    let key = "";
    let lang = (url.split('=').pop()).split('#')[0];
    let href = url.split('/')[5];
    key =  href + '?' + lang + '?' + m_hash;
    key = key.replace('#', '');

    let m_text = document.createTextNode(key);
    movie_ref.appendChild(m_text);
    document.getElementById('video-container').appendChild(movie_ref);

    // join movie session
    chrome.runtime.sendMessage({
        command: "join", 
        key: key,
        paused: true,
        viewers: 1,
        time: 0
    },
    (response) => {
        console.log(response.status);
    });

     movie(); 
}

function update() {
    // update client session
    let video = document.querySelector("#video-container > video");
    let offset = 2;

    // user joined dialog
    if (db_viewers != -1) {
        setTimeout(() => {
            document.getElementById('joined_popup').hidden = false;
            setTimeout(() => {
                document.getElementById('joined_popup').hidden = true;
            }, 3000);        
        }, 1000);
        db_viewers = -1;
    }

    // update movie time
    if (db_time != -1) {
        // check that we aren't the initiating client
        if (!(video.currentTime >= db_time-offset) || !(video.currentTime <= db_time+offset)) {
            video.currentTime = db_time;
            seeked = false;
        }
        db_time = -1;
    }

    if (db_paused != -1) {
        if (db_paused == true) {
            setTimeout(() => {
                video.pause();
            }, 1500);
        }
        else {
            setTimeout(() => {
                video.play();
            }, 1500);
        }
    }
}

function movie() {
    // setup movie player event handler
    let key = document.getElementById("movie_ref").innerText;
    let video = document.querySelector("#video-container > video");

    // client seeking video
    video.onseeked = function() {
        chrome.runtime.sendMessage({
            command: "movie", 
            key: key,
            paused: true,
            viewers: 1,
            time: video.currentTime
        },
        () => {
            setTimeout(() => {
                video.pause();
                console.log("waiting for clients to update");   
                if (seeked == false) {
                    video.play();
                    seeked = true;
                }
                else {
                    // wait until paused = false in database
                    chrome.runtime.sendMessage({
                        command: "wait",
                        key: key
                    },  
                    () => {
                        video.play();
                        console.log("video now playing");
                    });
                }
            }, 5000);
        });
    };
}

function end() {
    if (typeof chrome.app.isInstalled!=='undefined'){
        let video = document.querySelector("#video-container > video");
        if (host == null) {
            let key = "empty"
            chrome.runtime.sendMessage({command: "leave", key: key},
            (response) => {
                console.log(response.status);
            });
        }
        else if (host == true) {           
            let key = document.getElementById("movie_ref").innerText;
            chrome.runtime.sendMessage({command: "delete", key: key},
            (response) => {
                console.log(response.status);
            });
        }
        else {
            // ending: in a party
            if (party == true) {
                let key = document.getElementById("movie_ref").innerText;
                let time = video.currentTime;
                let paused = true;
                chrome.runtime.sendMessage({command: "leave", key: key, time: time, paused: paused},
                (response) => {
                    console.log(response.status);
                });
            }
            else {
                // ending: not in a party or host
                let key = "empty"
                chrome.runtime.sendMessage({command: "leave", key: key},
                (response) => {
                    console.log(response.status);
                });
            }
        }        

        setTimeout(() => {
            location.reload();    
        }, 1500);
    }
}

if (start_flag == false) end();
else {
    if (db_time == -1 && db_paused == -1 && db_viewers == -1) init();
    else update(); // update client session
}
