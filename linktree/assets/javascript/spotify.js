
lanyard({
    userId: "754033245972201612",
    socket: true,
    onPresenceUpdate: loopspoti
})

function loopspoti(data) {
    console.log(data);
            if(data.listening_to_spotify === false) {
        document.getElementById('spotify-np').innerHTML = '<p id="spotify-iframe" src="hm"></p>'
    } else if(document.getElementById('spotify-iframe').src != "https://open.spotify.com/embed/track/" + data.spotify.track_id) {
        document.getElementById('spotify-np').innerHTML = '<br><br><table><tr><td><img class="spotifylink-image" width="45" height="45" src="./assets/spotifylink.gif"></td><td><h2 style="color: #1cb853;">Listening Now...</h2></td></tr></table><iframe id="spotify-iframe" style="border-radius:12px;" src="https://open.spotify.com/embed/track/' + data.spotify.track_id + '" width="100%" height="80" frameBorder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>'
    }
        
};
