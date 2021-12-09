// Globals
let screen_name = "Ant";
let user_reaction = document.getElementById("reaction-icon");
let aneri_info = document.querySelector("#info");
let user_input = document.querySelector(".input_text");
let mic_enabled = false;
let ui_state = "state-create";

// menu button click
let menu_btn = document.getElementById("menu-button");
menu_btn.onclick = function() {
    let action = menu_btn.className;
    if (action.includes("closed")) {
        // open menu
        let menu = document.getElementsByClassName('menu-div-closed')[0];
        let menu_float = document.getElementsByClassName('menu floating')[0];

        menu.className = "menu-div";
        menu_btn.className = "menu-open-button opened";
        menu_float.className = "menu";
        document.getElementsByClassName('menu')[0].style.height = '56px';
    }
    else {
        // close menu
        let menu = document.getElementsByClassName('menu-div')[0];
        let menu_float = document.getElementsByClassName('menu')[0];

        menu.className = "menu-div-closed";
        menu_btn.className = "menu-open-button closed";
        menu_float.className = "menu floating";

        // reset UI
        if (ui_state == "state-create" || ui_state == "state-join") {
            menu_btn_2.style.visibility = "visible"; 
            menu_btn_3.style.visibility = "visible"; 
            menu_btn.style.marginLeft = '-25px';
            user_input.style.visibility = "hidden";
            user_input.id = "";
            user_input.children[0].value = "";
            user_input.children[0].placeholder = "";
            menu.style.width='160px'; // input width
            document.getElementsByClassName('menu')[0].style.height = '46px';
        }
        else {
            movieUI(); // in party
        }
    }
}

// reactions button,  meh-reaction button, 
let menu_btn_1 = document.querySelector(".menu-item:nth-child(6)");
menu_btn_1.onclick = function() {
    // reactions clicked
    if (ui_state == "state-movie") {
        movieReactions();
    }
    else if (ui_state == "state-reaction") {
        user_reaction.className = menu_btn_1.children[0].className;
        // document.getElementById("reaction-name").innerText =  '"'+ screen_name + '"';
        user_reaction.parentElement.style.visibility = "visible";        
        setTimeout(() => {
            user_reaction.parentElement.style.visibility = "hidden";
        }, 1500);
    }
}

// create button, microphone button, smile-reaction button, 
let menu_btn_2 = document.querySelector(".menu-item:nth-child(5)");
menu_btn_2.onclick = function () {
    let menu = document.getElementsByClassName('menu-div')[0];
    
    // create clicked
    let ui = menu_btn_2.id;
    if (ui == "state-create") {
        // hide buttons create & join
        menu_btn_2.style.visibility = "hidden"; 
        menu_btn_3.style.visibility = "hidden"; 
        menu_btn.style.marginLeft = '130px';
        user_input.style.visibility = "visible";
        user_input.id = "create-input";

        // TODO: Page is not defined at this point
        // Just send message: link copied to clipboard, then submit for them
        // notify('Copy link to share with friends then press enter to continue.');
        create(); 

        menu.style.width='350px';
        ui_state = ui;
    } 
    else if (ui == "state-movie") {
        // microphone clicked
        enableMic();
    }
    else if (ui == "state-reaction") {
        // document.getElementById("reaction-name").innerText =  '"'+ screen_name + '"';
        user_reaction.className = menu_btn_2.children[0].className;
        user_reaction.parentElement.style.visibility = "visible";
        setTimeout(() => {
            user_reaction.parentElement.style.visibility = "hidden";
        }, 1500);
    }
}

// join button, settings button, love-reaction button,
let menu_btn_3 = document.querySelector(".menu-item:nth-child(3)");
menu_btn_3.onclick = function () {
    let menu = document.getElementsByClassName('menu-div')[0];

    let ui = menu_btn_3.id;
    if (ui == "state-join") {
        // join clicked

        // hide buttons create & join
        menu_btn_2.style.visibility = "hidden"; 
        menu_btn_3.style.visibility = "hidden"; 
        menu_btn.style.marginLeft = '130px'; // exit button position

        // show create UI
        user_input.style.visibility = "visible";
        user_input.id = "join-input";
        user_input.children[0].placeholder = "paste_link_here";
        menu.style.width='350px'; // input width
        ui_state = ui;
    }
    else if (ui == "state-movie") {
        // settings clicked
        aneriSettings();
    }
    else if (ui_state == "state-reaction") {
        // document.getElementById("reaction-name").innerText =  '"'+ screen_name + '"';
        user_reaction.className = menu_btn_3.children[0].className;
        user_reaction.parentElement.style.visibility = "visible";
        setTimeout(() => {
            user_reaction.parentElement.style.visibility = "hidden";
        }, 1500);
    }
}

// info button, sad-reaction button,
let menu_btn_4 = document.querySelector(".menu-item:nth-child(4)");
menu_btn_4.onclick = function() {
    // info button clicked
    if (ui_state == "state-movie") {
        aneriInfo();
    }
    else if (ui_state == "state-reaction") {
        // document.getElementById("reaction-name").innerText =  '"'+ screen_name + '"';
        user_reaction.className = menu_btn_4.children[0].className;
        user_reaction.parentElement.style.visibility = "visible";
        setTimeout(() => {
            user_reaction.parentElement.style.visibility = "hidden";
        }, 1500);
    }
}

// set input listener
let input_field = document.getElementById("input_field");
input_field.addEventListener("keyup", function(event) {
    if (event.keyCode === 13) {
        event.preventDefault();
        document.getElementById("submit_btn").click();
    }
});

// input listener submit button
let input_sumbit = document.getElementById("submit_btn");
input_sumbit.onclick = function() {
    
    let menu = document.getElementsByClassName('menu-div')[0];

    if (ui_state == "state-create") {
        let generated = document.getElementById('input_field').value; // generated link
        let link = user_input.children[0].value;
        if (link == generated) {
            user_input.children[0].value = "";
            user_input.children[0].placeholder = "creating party ...";
            setTimeout(() => {
                menu.style.width='350px'; // input width
                movieUI();
            }, 2000);
        }
        else {
            setTimeout(() => { menu_btn.click(); }, 1000);
        }
    }
    else if (ui_state == "state-join") {
        let link = user_input.children[0].value;
        if (link != "") {
            // TODO: check validity of provided link
            user_input.children[0].value = "";
            user_input.children[0].placeholder = "joining party ...";
            setTimeout(() => {
                menu.style.width='350px'; // input width
                movieUI();
            }, 2000);
        }
        else {
            setTimeout(() => { menu_btn.click(); }, 1000);
        }
    }
    else if (ui_state == "state-settings") {
        let name = user_input.children[0].value;
        if (name != "") {
            screen_name = name;
            user_input.children[0].value = "";
            user_input.children[0].placeholder = "changing name ...";
            setTimeout(() => {
                movieUI();
            }, 2000);
        }
        else {
            setTimeout(() => { menu_btn.click(); }, 1000);
        }
    }
}

function movieUI() {
    // set UI state
    ui_state = "state-movie";
    menu_btn_1.id = ui_state;
    menu_btn_2.id = ui_state;
    menu_btn_3.id = ui_state;
    menu_btn_4.id = ui_state;

    // set button visibility
    menu_btn_1.style.visibility = "visible";
    menu_btn_2.style.visibility = "visible";
    menu_btn_3.style.visibility = "visible";
    menu_btn_4.style.visibility = "visible";

    // set button icons
    menu_btn_1.children[0].className = "fa fa-smile-o";
    if (mic_enabled == true) menu_btn_2.children[0].className = "fa fa-microphone";
    else menu_btn_2.children[0].className = "fa fa-microphone-slash";
    menu_btn_3.children[0].className = "fa fa-cog";
    menu_btn_4.children[0].className = "fa fa-info-circle";

    // set button tooltip messages
    menu_btn_1.children[1].innerText = "reactions";
    menu_btn_2.children[1].innerText = "voice";
    menu_btn_3.children[1].innerText = "settings";
    menu_btn_4.children[1].innerText = "about";

    // input field
    user_input.style.visibility = "hidden";
    user_input.children[0].placeholder = "";
    user_input.id = "settings-input";
    user_input.children[0].value = "";

    menu_btn.style.marginLeft = '-25px';  // menu button pos
    aneri_info.style.visibility = "hidden"; // info div
    user_reaction.parentElement.style.visibility = "hidden"; // reaction div
    
}

function movieReactions() {
    // set UI state
    ui_state = "state-reaction";
    menu_btn_1.id = ui_state;
    menu_btn_2.id = ui_state;
    menu_btn_3.id = ui_state;
    menu_btn_4.id = ui_state;

    // set button icons
    menu_btn_1.children[0].className = "fa fa-meh-o";
    menu_btn_2.children[0].className = "fa fa-smile-o";
    menu_btn_3.children[0].className = "fa fa-heart";
    menu_btn_4.children[0].className = "fa fa-frown-o";

    // set button tooltip messages
    menu_btn_1.children[1].innerText = "meh";
    menu_btn_2.children[1].innerText = "smile";
    menu_btn_3.children[1].innerText = "love";
    menu_btn_4.children[1].innerText = "sad";
}

function enableMic() {
    let mic = menu_btn_2.children[0];
    if (mic.className == "fa fa-microphone-slash") {
        mic.className = "fa fa-microphone"; // on
        mic_enabled = true;
    }
    else {
        mic.className = "fa fa-microphone-slash"; // off
        mic_enabled = false;
    }
    // TODO: [read: https://medium.com/swlh/how-to-add-voice-chat-feature-to-netflix-party-ff0390d39c9c]
}

function aneriInfo() {
    // set state
    ui_state = "state-info"; 
    menu_btn_1.id = ui_state;
    menu_btn_2.id = ui_state;
    menu_btn_3.id = ui_state;
    menu_btn_4.id = ui_state;

    // set button visibility
    menu_btn_1.style.visibility = "hidden";
    menu_btn_2.style.visibility = "hidden";
    menu_btn_3.style.visibility = "hidden";
    menu_btn_4.style.visibility = "hidden";

    menu_btn.style.marginLeft = '130px'; // menu button position
    aneri_info.style.visibility = "visible"; // info enable
}

function aneriSettings() {
    // set state
    ui_state = "state-settings"; 
    menu_btn_1.id = ui_state;
    menu_btn_2.id = ui_state;
    menu_btn_3.id = ui_state;
    menu_btn_4.id = ui_state;

    // set button visibility
    menu_btn_1.style.visibility = "hidden";
    menu_btn_2.style.visibility = "hidden";
    menu_btn_3.style.visibility = "hidden";
    menu_btn_4.style.visibility = "hidden";

    // button location
    menu_btn.style.marginLeft = '130px';

    // screen name
    user_input.style.visibility = "visible";
    user_input.children[0].placeholder = "screen name: " + screen_name;
}