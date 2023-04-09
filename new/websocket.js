let trackName = document.getElementById("trackName");
let trackArtist = document.getElementById("trackArtist");
let trackLink = document.getElementById("trackLink");

let discordName = document.getElementById("discordName");
let discordMotd = document.getElementById("discordMotd");
let avatarLink = document.getElementById("avatarLink");

let rpcName = document.getElementById("rpcName");
let rpcDetails = document.getElementById("rpcDetails");

let webSocket = new WebSocket("wss://api.lanyard.rest/socket");
let discordID = "754033245972201612";

fetch(`https://api.lanyard.rest/v1/users/${discordID}`)
  .then((response) => response.json())
  .then((e) => {
    
    if(e.data["discord_user"]){
      discordName.innerText = `${e.data.discord_user.username}#${e.data.discord_user.discriminator}`;
      avatarLink.href = `https://discord.com/users/${discordID}`;
      discordMotd.innerText = e.data.kv.note;
      document.getElementById("discordAvatar").src = `https://cdn.discordapp.com/avatars/${discordID}/${e.data["discord_user"].avatar}.png?size=4096`;
      if (e.data.discord_status == "online") {
        document.getElementById("statusCircle").style.backgroundColor = "#23a55a";
      }
      else if (e.data.discord_status == "idle"){
        document.getElementById("statusCircle").style.backgroundColor = "#f0b232";
      }
      else if (e.data.discord_status == "dnd"){
        document.getElementById("statusCircle").style.backgroundColor = "#f23f43";
      }
      else if (e.data.discord_status == "offline"){
        document.getElementById("statusCircle").style.backgroundColor = "#80848e";
      }
    }

    if (e.data["listening_to_spotify"]) {
      trackName.innerText = `${e.data.spotify.song}`;
      let artists = e.data.spotify.artist;
      let artistFinal = artists.replaceAll(";", ",");
      trackArtist.innerText = artistFinal;
      document.getElementById("trackImg").src = e.data.spotify.album_art_url;   
      trackLink.href = `https://open.spotify.com/track/${e.data.spotify.track_id}`;
    } else {
      trackName.innerText = "None";
      trackArtist.innerText = "I'm not currently listening anything";
      document.getElementById("trackImg").src = "musicDefault.png";   
    }
    
    if (e.data["activities"].length > 0) {
      if (e.data["activities"][0].name == "Spotify") {    
        rpcName.innerText = e.data["activities"][1].name
        rpcDetails.innerText = e.data["activities"][1].details + '\n' + e.data["activities"][1].state
        //rpcState.innerText = e.data["activities"][1].state
        document.getElementById("rpcIcon").src = `https://cdn.discordapp.com/app-assets/383226320970055681/${e.data["activities"][1].assets.large_image}.png`;
        document.getElementById("rpcSmallIcon").src = `https://cdn.discordapp.com/app-assets/383226320970055681/${e.data["activities"][1].assets.small_image}.png`;
    } else if (e.data["activities"][0].type != 4) {
      const regexPattern = /^mp:external\//;
      let largeimagelink;
      try {
        largeimagelink = regexPattern.test(e.data["activities"][0].assets?.large_image) 
          ? `https://${e.data["activities"][0].assets.small_image.split('/https/')[0]}` 
          : `https://cdn.discordapp.com/app-assets/${e.data["activities"][0].application_id}/${e.data["activities"][0].assets?.large_image}.png`;
      } catch (error) {
        console.log(error);
        largeimagelink = '../assets/img/unknown.png';
      }
      
      try {
        smallimagelink = regexPattern.test(e.data["activities"][0].assets?.small_image) 
          ? `https://${e.data["activities"][0].assets.small_image.split('/https/')[0]}` 
          : `https://cdn.discordapp.com/app-assets/${e.data["activities"][0].application_id}/${e.data["activities"][0].assets?.small_image}.png`;
      } catch (error) {
        console.log(error);
        smallimagelink = '../assets/img/unknown.png';
      }
      rpcName.innerText = e.data["activities"][0].name
      rpcDetails.innerText = e.data["activities"][0].details + '\n' + e.data["activities"][0].state
      //rpcState.innerText = e.data["activities"][0].state
      document.getElementById("rpcIcon").src = largeimagelink;
      document.getElementById("rpcSmallIcon").src = smallimagelink;
    } else if (e.data["activities"].length > 1) {
      const regexPattern = /^mp:external\//;
      let largeimagelink;
      try {
        largeimagelink = regexPattern.test(e.data["activities"][1].assets?.large_image) 
          ? `https://${e.data["activities"][1].assets.small_image.split('/https/')[1]}` 
          : `https://cdn.discordapp.com/app-assets/${e.data["activities"][1].application_id}/${e.data["activities"][1].assets?.large_image}.png`;
      } catch (error) {
        console.log(error);
        largeimagelink = '../assets/img/unknown.png';
      }
      
      try {
        smallimagelink = regexPattern.test(e.data["activities"][1].assets?.small_image) 
          ? `https://${e.data["activities"][1].assets.small_image.split('/https/')[1]}` 
          : `https://cdn.discordapp.com/app-assets/${e.data["activities"][1].application_id}/${e.data["activities"][1].assets?.small_image}.png`;
      } catch (error) {
        console.log(error);
        smallimagelink = '../assets/img/unknown.png';
      }
      rpcName.innerText = e.data["activities"][1].name
      rpcDetails.innerText = e.data["activities"][1].details + '\n' + e.data["activities"][1].state
      //rpcState.innerText = e.data["activities"][0].state
      document.getElementById("rpcIcon").src = largeimagelink;
      document.getElementById("rpcSmallIcon").src = smallimagelink;
    }
    } else {
      rpcName.innerText = "None"
      rpcDetails.innerText = "I'm not currently playing anything"
      rpcState.innerText = ""
      document.getElementById("rpcIcon").src = `gameDefault.png`;
      document.getElementById("rpcSmallIcon").src = `https://neksio.wtf/transparent.png`;
      //document.getElementById("rpcPanel").style.display = "none";
    }
  });

webSocket.addEventListener("message", (event) => {
  data = JSON.parse(event.data);

  if (event.data == '{"op":1,"d":{"heartbeat_interval":30000}}') {
    webSocket.send(
      JSON.stringify({
        op: 2,
        d: {
          subscribe_to_id: discordID,
        },
      })
    );
    setInterval(() => {
      webSocket.send(
        JSON.stringify({
          op: 3,
          d: {
            heartbeat_interval: 30000,
          },
        })
      );
    }, 30000);
  }
  if (data.t == "PRESENCE_UPDATE") {
    if (data.d.spotify) {
      trackName.innerText = data.d.spotify.song;
      let artists = data.d.spotify.artist;
      let artistFinal = artists.replaceAll(";", ",");
      trackArtist.innerText = artistFinal;
      document.getElementById("trackImg").src = data.d.spotify.album_art_url;   
      trackLink.href = `https://open.spotify.com/track/${data.d.spotify.track_id}`;
    } else if (data.d.activities.length > 0) {
      if(data.d.activities[0].name == "Spotify"){
        rpcName.innerText = data.d["activities"][1].name
        rpcDetails.innerText = data.d["activities"][1].details
        rpcState.innerText = data.d["activities"][1].state
        document.getElementById("rpcIcon").src = `https://cdn.discordapp.com/app-assets/383226320970055681/${data.d["activities"][1].assets.large_image}.png`;
        document.getElementById("rpcSmallIcon").src = `https://cdn.discordapp.com/app-assets/383226320970055681/${data.d["activities"][1].assets.small_image}.png`;
      }
    } else {
      rpcName.innerText = "None"
      rpcDetails.innerText = "I'm not currently playing anything"
      rpcState.innerText = ""
      document.getElementById("rpcIcon").src = `gameDefault.png`;
      document.getElementById("rpcSmallIcon").src = `https://neksio.wtf/transparent.png`;
      //document.getElementById("rpcPanel").style.display = "none";
    }
  }
});
