// values to change for the height of the activities rectangle
var originalh = -0.2;
var addedh = 5;

// change userId to your user ID
var userid = "754033245972201612";

// different from updatepresence, adds the username, pfp, status, original activities
async function init(data) {
    let json = data;
    document.getElementById("name").innerHTML = json.discord_user['username'] + '#' + json.discord_user['discriminator'];
    document.getElementById("avatar").src = "https://cdn.discordapp.com/avatars/" + userid + "/" + json.discord_user['avatar'];
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
                var songinfo = [json.spotify['song'], json.spotify['artist'].split('; ').join(', '), json.spotify['album']]
                div.innerHTML = ('<img draggable="false" alt="" width="128" height="128" src="' + json.spotify['album_art_url'] + '"> ' +
                "<ul><li><strong>" + 'LISTENING TO SPOTIFY...' + "</strong></li>" + "<li>" + songinfo.join("</li><li>") + "</li></ul>");
            } 

            

            currentdiv.appendChild(div);
        } else {
            // if it is the status, set the src of the emoji img and the status text itself
            document.getElementById("statusemoji").src = "https://cdn.discordapp.com/emojis/" + element.emoji['id'] + (element.emoji['animated'] ? ".gif" : ".png");
            document.getElementById("status").innerHTML = element['state'];
        }
    });

    
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
                var songinfo = [json.spotify['song'], "by " + json.spotify['artist'].split('; ').join(', '), "on " + json.spotify['album']]
                div.innerHTML = '<img draggable="false" alt="" width="96" height="96" src="' +
                    json.spotify['album_art_url'] + '"> ' +"<ul><li><strong>" + 'LISTENING TO SPOTIFY...' + "</strong></li>"  + "<li>" +
                    songinfo.join("</li><li>") + '</li></ul>';
            } 
            

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
