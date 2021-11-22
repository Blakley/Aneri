// firebase config
firebase.initializeApp({
    apiKey: "AIzaSyDvR3QgPMqvPICiEH7Orz5h_k504dSsrm0",
    authDomain: "aneri-6e3e1.firebaseapp.com",
    databaseURL: "https://aneri-6e3e1-default-rtdb.firebaseio.com",
    projectId: "aneri-6e3e1",
    storageBucket: "aneri-6e3e1.appspot.com",
    messagingSenderId: "320073937008",
    appId: "1:320073937008:web:918ef43c800efe1e9b04b5"
});

function listener(key) {
    let time = firebase.database().ref(key + "/time/");
    let paused = firebase.database().ref(key + "/paused/");
    let viewers = firebase.database().ref(key + "/viewers/");
        
    // On movie viewer joined
    viewers.on('value', (snapshot) => {
        let data = snapshot.val();
        update("viewers", data);
    });

    // On movie time change
    time.on('value', (snapshot) => {
        let data = snapshot.val();
        update("time", data);
    });

    // On paused state change
    paused.on('value', (snapshot) => {
        let data = snapshot.val();
        update("paused", data);
    });   
}

function push(key, pause, viewers, time) {
    // set new movie-entry database values
    firebase.database().ref(key).set({
        "paused": pause,
        "time": time,
        "viewers": viewers
    });
}

chrome.runtime.onMessage.addListener((msg, sender, resp) => {
    // create session
    if (msg.command == "create") {
        let key = msg.key;
        let data = msg.data;
        listener(key);
        firebase.database().ref(key).set(data);
        resp({status:"session created"})
    }

    // end session
    if (msg.command == "delete") {
        let key = msg.key;
        firebase.database().ref(key).remove();
        chrome.runtime.reload();
        resp({status: "session deleted"});
    }

    // leave session
    if (msg.command == "leave") {
        chrome.runtime.reload();
        resp({status: "session ended"});
    }

    // join session
    if (msg.command == "join") {
        let key = msg.key;
        let viewers = msg.viewers + Math.floor(Math.random() * 100) + 1;
        let paused = msg.paused;
        let time = msg.time;

        listener(key);
        push(key, paused, viewers, time); 
        resp({status: "session joined"});
    }

    // set current movie time
    if (msg.command == "movie") {
        let key = msg.key;
        let viewers = msg.viewers;
        let pause = msg.paused;
        let time = msg.time;
        push(key, pause, viewers, time);
    }

    // wait for paused state to change
    if (msg.command == "wait") {
        let key = msg.key;
        let state = firebase.database().ref(key + "/paused/");
        function get_time() {
            state.get().then((snapshot) => {
                let data = snapshot.val();
                if (data != false) {
                    setTimeout(get_time, 1500);
                }
            });
        }
        get_time();
    }

});

function Start() {
    // Start Aneri
    chrome.tabs.executeScript(null, { 
        file: "./jquery.js" }, function() {
        chrome.tabs.executeScript(null, {
            code: 'let start_flag=true; let host=false; let party=false; let db_time=-1; let db_paused=-1; let db_viewers=-1; let seeked=true;'
        }),
        chrome.tabs.executeScript(null, {file: './einthusan.js'});
    });
}

function End() {
    // End Aneri
    chrome.tabs.executeScript(null, { 
        file: "./jquery.js" }, function() {
        chrome.tabs.executeScript(null, {
            code: 'start_flag=false;'
        }),
        chrome.tabs.executeScript(null, {file: './einthusan.js'});
    });
}

function update(item, value) {
    // Show user joined dialog
    if (item == "viewers") {
        chrome.tabs.executeScript(null, { 
            file: "./jquery.js" }, function() {
            chrome.tabs.executeScript(null, {
                code: 'db_viewers=1;'
            }),
            chrome.tabs.executeScript(null, {file: './einthusan.js'});
        });
    }

    // Update movie time in client
    if (item == "time") {
        chrome.tabs.executeScript(null, { 
            file: "./jquery.js" }, function() {
            chrome.tabs.executeScript(null, {
                code: 'db_time=' + value +';'
            }),
            chrome.tabs.executeScript(null, {file: './einthusan.js'});
        });
    }

    // Pause movie
    if (item == "paused") {
        chrome.tabs.executeScript(null, { 
            file: "./jquery.js" }, function() {
            chrome.tabs.executeScript(null, {
                code: 'db_paused=' + value +';'
            }),
            chrome.tabs.executeScript(null, {file: './einthusan.js'});
        });
    }
}


