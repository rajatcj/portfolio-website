

// values to change for the height of the activities rectangle
var originalh = -0.2;
var addedh = 5;

// change userId to your user ID
var userid = "754033245972201612";

// different from updatepresence, adds the username, pfp, status, original activities
async function init() {
    let json = await lanyard({userId: userid});
    let activities = json.activities;
    let currentdiv = document.getElementById("activities");
    var h = originalh;
    let curractiv = 1;
    activities.forEach(element => {
        // if not the status activity, continue
        if(element['type'] !== 4) {
            var div = document.createElement("div");
            div.id = element['name'].split(' ').join('').toLowerCase();
            div.className = "activity";
            // if the activity is spotify try to get all of the song info instead of the activity details
            if(element['name'] === "Spotify") {
                const start_time = element.timestamps['start']
                const end_time = element.timestamps['end']
                cur_time = Math.floor(Date.now() / 1000)

                now = (cur_time * 1000) - start_time,
                end = end_time - start_time,

                playTime = (ms) => {
                    const seconds = Math.floor((ms / 1000) % 60);
                    const minutes = Math.floor((ms / 1000 / 60) % 60);
                    const hours = Math.floor((ms / 1000 / 3600) % 60);
                    return [minutes, seconds].map(v => String(v).padStart(2,0)).join(':');
                }

                percent = (now/end)*100;
                
                var songinfo = ["<li id='spotify-songname'>" + json.spotify['song'] + "</li>", "<li id='spotify-bar'><div class='progress-bar'><div class='fill' style='width: " + percent + "%;'></div></div></li>", "<li id='spotify-time'>" + playTime(now) + "/" + playTime(end) + "</li>", "<li id='spotify-artist'>" + "by " + json.spotify['artist'].split('; ').join(', ') + "</li>", "<li id='spotify-album'>" + "on " + json.spotify['album'] + "</li>"]
                
                div.innerHTML = '<img draggable="false" alt="" width="80" height="80" src="' +
                    json.spotify['album_art_url'] + '"> ' +"<ul><li id='spotify-ing'>" + 'LISTENING TO SPOTIFY...' + "</li>" +
                    songinfo.join("") + '</ul>';
            } else {
                // time elapsed timer
                current_time = (element.timestamps['start'] === undefined ? element['created_at'] : element.timestamps['start']),
                exp_time = Math.floor(Date.now() / 1000),
                diff = (exp_time * 1000) - current_time,
                formatTime = (ms) => {
                    const seconds = Math.floor((ms / 1000) % 60);
                    const minutes = Math.floor((ms / 1000 / 60) % 60);
                    const hours = Math.floor((ms / 1000 / 3600) % 60);
                    return [hours, minutes, seconds].map(v => String(v).padStart(2,0)).join(':');
                }
                var activityinfo = ["<strong>" + element['name'] + "</strong>", + (element['details'] === undefined ? "" : "<p>" + element['details'] + "</p>"), + (element['state'] === undefined ? "" : "<p>" + element['state'] + "</p>"), "<p>" + formatTime(diff) + " elapsed </p>"]
                if(element.assets !== undefined) {
                    div.innerHTML = ('<img draggable="false" alt="" onerror=this.src="https://cdn.discordapp.com/app-assets/' +
                        element['application_id'] + '/' + element.assets['large_image'] +
                        '.png" width="64" height="64" src="https://cdn.discordapp.com/app-assets/' + userid + '/' +
                        element.assets['large_image'] + '.png"> <div class="other">' +
                        "<ul><li>" + activityinfo.join("</li><li>") + "</li></ul>" + '</div>');
                } else if(element.assets === undefined) {
                    div.innerHTML = ('<img draggable="false" alt="" width="64" height="64" src="https://cdn.discordapp.com/emojis/932294894775599174.gif"> <div class="other">' +
                        "<ul><li>" + activityinfo.join("</li><li>") + "</li></ul>" + '</div>');
                }
            }
        

            h += addedh;

            currentdiv.appendChild(div);
        } else {
            // if it is the status, set the src of the emoji img and the status text itself
            document.getElementById("statusemoji").src = "https://cdn.discordapp.com/emojis/" + element.emoji['id'] + (element.emoji['animated'] ? ".gif" : ".png");
            document.getElementById("status").innerHTML = element['state'];
        }
    });

    // set height of activities rect
    currentdiv.style.height = h + "rem";
}

async function updatepresence() {
    var json = await lanyard({userId: userid});
    let activities = json.activities;
    let currentdiv = document.getElementById("activities");
    var h = originalh;
    activities.forEach(element => {
        // if not the status activity, continue
        if(element['type'] !== 4) {
            var activityname = element['name'].split(' ').join('').toLowerCase();
            var exists = true;
            if(document.getElementById(activityname) !== null)
                exists = document.getElementById(activityname)['length'] == 0;
            let div = document.getElementById(activityname);

            // check if the activity already exists, if it does just modify the existing one to not create multiple instances
            if(exists) {
                div = document.createElement("div");
                div.id = activityname;
                div.className = "activity";
            }
            
            // if the activity is spotify try to get all of the song info instead of the activity details
            if(element['name'] === "Spotify") {
                const start_time = element.timestamps['start']
                const end_time = element.timestamps['end']
                cur_time = Math.floor(Date.now() / 1000)

                now = (cur_time * 1000) - start_time,
                end = end_time - start_time,

                playTime = (ms) => {
                    const seconds = Math.floor((ms / 1000) % 60);
                    const minutes = Math.floor((ms / 1000 / 60) % 60);
                    const hours = Math.floor((ms / 1000 / 3600) % 60);
                    return [minutes, seconds].map(v => String(v).padStart(2,0)).join(':');
                }

                percent = (now/end)*100;
                
                var songinfo = ["<li id='spotify-songname'>" + json.spotify['song'] + "</li>", "<li id='spotify-bar'><div class='progress-bar'><div class='fill' style='width: " + percent + "%;'></div></div></li>", "<li id='spotify-time'>" + playTime(now) + "/" + playTime(end) + "</li>", "<li id='spotify-artist'>" + "by " + json.spotify['artist'].split('; ').join(', ') + "</li>", "<li id='spotify-album'>" + "on " + json.spotify['album'] + "</li>"]
                
                div.innerHTML = '<img draggable="false" alt="" width="80" height="80" src="' +
                    json.spotify['album_art_url'] + '"> ' + '<ul><li id="spotify-ing">' + 'LISTENING TO SPOTIFY...' + "</li>" +
                    songinfo.join("") + '</ul>';
            } else {
                // time elapsed timer
                current_time = element.timestamps['start'],
                exp_time = Math.floor(Date.now() / 1000),
                diff = (exp_time * 1000) - current_time,
                formatTime = (ms) => {
                    const seconds = Math.floor((ms / 1000) % 60);
                    const minutes = Math.floor((ms / 1000 / 60) % 60);
                    const hours = Math.floor((ms / 1000 / 3600) % 60);
                    return [hours, minutes, seconds].map(v => String(v).padStart(2,0)).join(':');
                }
                
                var activityinfo = ["<li id='type'>" + (element['application_id'] === "920907514344779827" ? "Online on..." : (element['type'] === 0 ? "PLAYING..." : (element['type'] === 1 ? "STREAMING..." : (element['type'] === 2 ? "LISTENING..." : (element['type'] === 3 ? "WATCHING..." : ""))))) + "</li><li id='name'>" + element['name'] + "</li>", (element['details'] === undefined ? "" : "<li id='details'>" +  element['details'] + "</li>"), (element['state'] === undefined ? "" : "<li id='state'>" + element['state'] + "</li>"), "<li id='time'>" + formatTime(diff) + " elapsed </li>"]
                if(element.assets !== undefined) {
                    div.innerHTML = ('<img draggable="false" alt="" onerror=this.src="https://cdn.discordapp.com/app-assets/' +
                        element['application_id'] + '/' + element.assets['large_image'] +
                        '.png" width="80" height="80" src="https://cdn.discordapp.com/app-assets/'+ userid + '/' +
                        element.assets['large_image'] + '.png"> <div class="other">' +
                        "<ul>" + activityinfo.join("") + "</ul>" + '</div>');
                } else if(element.assets === undefined) {
                    div.innerHTML = ('<img draggable="false" alt="" width="80" height="80" src="unknown.png"> <div class="other">' +
                        "<ul>" + activityinfo.join("") + "</ul>" + '</div>');
                }
            }
            h += addedh;

            if(exists)
                currentdiv.appendChild(div);
        }
    });

    // get the difference of the current activities and the last, mostly just to remove activities that aren't active anymore
    let names = [];
    activities.forEach(e => {if(e['type'] !== 4)names.push(e['name'].split(' ').join('').toLowerCase())})
    var children = [].slice.call(currentdiv.getElementsByClassName('activity'), 0);
    var childnames = new Array(children.length);
    var array1Length = children.length;
    var array2Length = names.length;
    for (var i = 0; i < array1Length; i++) {
        var name = children[i].getAttribute("id");    
        childnames[i] = name;
    }
    var toremove = childnames.filter(x => !names.includes(x));
    children.filter(x => toremove.includes(x.id)).forEach(e => {e.remove()});

    // set height of activities rect
    currentdiv.style.height = h + "rem";
}

const onload = async () => {
    // init all of the original divs and main user details
    const start = async () => {
        var json = await lanyard({userId: userid});
        init(json);
    }

    start();
    
    // start the websocket to automatically fetch the new details on presence update
    lanyard({
        userId: userid,
        socket: true,
        onPresenceUpdate: updatepresence
    })
}
