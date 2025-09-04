const WEATHER_KEY = "62e7df4de26843f79c5135524250309";
const LOCATION = "Pokhara";
const LANYARD_ID = "754033245972201612";

async function loadWeather() {
  try {
    const res = await fetch(`https://api.weatherapi.com/v1/current.json?key=${WEATHER_KEY}&q=${LOCATION}&aqi=no`);
    const data = await res.json();
    document.getElementById('temp').textContent = `${Math.round(data.current.temp_c)}°C`;
    document.getElementById('cond').textContent = data.current.condition.text;
    document.getElementById('wx-extra').textContent = `Feels like ${Math.round(data.current.feelslike_c)}°C • Wind ${data.current.wind_kph} kph • Humidity ${data.current.humidity}%`;
  } catch (e) {
    document.getElementById('cond').textContent = 'Weather unavailable';
  }
}

function startClock() {
  const tz = 'Asia/Kathmandu';
  setInterval(() => {
    const now = new Date();
    document.getElementById('time').textContent = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true, timeZone: tz });
    document.getElementById('date').textContent = now.toLocaleDateString('en-GB', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', timeZone: tz });
  }, 1000);
}

const STATUS_MAP = {
  online: { icon: 'fa-solid fa-circle', color: 'green', label: 'online' },
  idle: { icon: 'fa-regular fa-moon', color: 'yellow', label: 'idle' },
  dnd: { icon: 'fa-solid fa-minus-circle', color: 'red', label: 'do not disturb' },
  offline: { icon: 'fa-regular fa-circle', color: 'gray', label: 'offline' }
};

function devicesText(d) {
  const list = [];
  if (d.active_on_discord_desktop) list.push('desktop');
  if (d.active_on_discord_mobile) list.push('mobile');
  if (d.active_on_discord_web) list.push('web');
  if (d.active_on_discord_embedded) list.push('embedded');
  return list.join(', ');
}

function updatePageWithLanyardData(d) {
  const statusKey = (d.discord_status || 'offline').toLowerCase();
  const meta = STATUS_MAP[statusKey] || STATUS_MAP.offline;

  document.getElementById('status-icon').className = meta.icon;
  document.getElementById('status-icon').title = meta.label;
  document.getElementById('status-dot').className = 'dot ' + meta.color;
  document.getElementById('status-text').textContent = meta.label;
  document.getElementById('device-text').textContent = devicesText(d);

  if (d.listening_to_spotify && d.spotify) {
    document.getElementById('spotify-card').style.display = 'flex';
    document.getElementById('spotify-art').src = d.spotify.album_art_url;
    document.getElementById('spotify-song').textContent = d.spotify.song;
    document.getElementById('spotify-artist').textContent = d.spotify.artist;
    document.getElementById('spotify-album').textContent = d.spotify.album;
    document.getElementById('spotify-duration').textContent = formatMS(d.spotify.timestamps.end - d.spotify.timestamps.start);
    updateSpotifyProgress(d.spotify);
  } else {
    document.getElementById('spotify-card').style.display = 'none';
  }

  renderActivities(d.activities);
}

function cleanImageUrl(url, appId, type = "large") {
  if (!url) return null;
  if (url.startsWith("spotify:")) {
    return url.replace("spotify:", "https://i.scdn.co/image/");
  }
  if (url.startsWith("mp:external/")) {
    // Remove the mp:external/<random>/https/ prefix and force https://
    const cleaned = url.replace(/^mp:external\/[^/]+\/https\//, "https://");
    return cleaned;
  }
  return `https://cdn.discordapp.com/app-assets/${appId}/${url}.png`;
}

function renderActivities(activities) {
  const container = document.querySelector('.container');
  document.querySelectorAll('.activity-card').forEach(el => el.remove());

  activities.forEach(act => {
    if (act.type === 0) {
      const card = document.createElement('div');
      card.className = 'card activity-card';

      const row = document.createElement('div');
      row.className = 'activity-row';
      row.style.display = "flex";
      row.style.gap = "16px";
      row.style.width = "100%";
      row.style.alignItems = "center";
      row.style.position = "relative";

      // Large image on left
      if (act.assets && act.assets.large_image) {
        const largeImg = document.createElement('img');
        largeImg.src = cleanImageUrl(act.assets.large_image, act.application_id, "large");
        largeImg.className = 'large-icon';
        row.appendChild(largeImg);
      }

      // Text content on right
      const textWrapper = document.createElement('div');
      textWrapper.className = 'activity-text';
      textWrapper.style.flex = "1";
      textWrapper.style.textAlign = "left";

      const label = document.createElement('div');
      label.className = 'label';
      label.style.color = "#3b82f6";
      label.textContent = act.name || "Activity";
      textWrapper.appendChild(label);

      if (act.details) {
        const details = document.createElement('div');
        details.className = 'big';
        details.textContent = act.details;
        textWrapper.appendChild(details);
      }

      if (act.state) {
        const state = document.createElement('div');
        state.className = 'small';
        state.textContent = act.state;
        textWrapper.appendChild(state);
      }

      if (act.timestamps && act.timestamps.start) {
        const elapsedSec = Math.floor((Date.now() - act.timestamps.start) / 1000);
        const hours = Math.floor(elapsedSec / 3600);
        const mins = Math.floor((elapsedSec % 3600) / 60);
        const secs = elapsedSec % 60;
        const elapsed = document.createElement('div');
        elapsed.className = 'small';
        elapsed.textContent = `Elapsed: ${hours}h ${mins}m ${secs}s`;
        textWrapper.appendChild(elapsed);
      }

      row.appendChild(textWrapper);

      // Small image on top right
      if (act.assets && act.assets.small_image) {
        const smallIcon = document.createElement('img');
        smallIcon.src = cleanImageUrl(act.assets.small_image, act.application_id, "small");
        smallIcon.className = 'small-icon';
        smallIcon.style.position = "absolute";
        smallIcon.style.top = "12px";
        smallIcon.style.right = "12px";
        smallIcon.style.width = "32px";
        smallIcon.style.height = "32px";
        smallIcon.style.borderRadius = "6px";
        smallIcon.title = act.assets.small_text || act.name;
        row.appendChild(smallIcon);
      }

      card.appendChild(row);
      container.appendChild(card);
    }
  });
}


function updateSpotifyProgress(spotify) {
  const bar = document.getElementById('spotify-progress');
  const elapsedEl = document.getElementById('spotify-elapsed');
  const durationMS = spotify.timestamps.end - spotify.timestamps.start;

  function update() {
    const now = Date.now();
    let percent = ((now - spotify.timestamps.start) / durationMS) * 100;
    if (percent > 100) percent = 100;
    bar.style.width = percent + '%';
    elapsedEl.textContent = formatMS(now - spotify.timestamps.start);
    requestAnimationFrame(update);
  }
  update();
}

function formatMS(ms) {
  const totalSec = Math.floor(ms / 1000);
  const minutes = Math.floor(totalSec / 60);
  const seconds = totalSec % 60;
  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
}

// WebSocket for live updates
const ws = new WebSocket('wss://api.lanyard.rest/socket');
ws.onmessage = (msg) => {
  const data = JSON.parse(msg.data);
  switch (data.op) {
    case 1:
      const interval = data.d.heartbeat_interval;
      setInterval(() => ws.send(JSON.stringify({ op: 3 })), interval);
      ws.send(JSON.stringify({ op: 2, d: { subscribe_to_ids: [LANYARD_ID] } }));
      break;
    case 0:
      if (data.t === 'INIT_STATE' || data.t === 'PRESENCE_UPDATE') {
        const presence = data.d[LANYARD_ID] || data.d;
        updatePageWithLanyardData(presence);
      }
      break;
  }
};

loadWeather();
startClock();
fetch(`https://api.lanyard.rest/v1/users/${LANYARD_ID}`)
  .then(r => r.json())
  .then(d => updatePageWithLanyardData(d.data));


const LASTFM_USER = "rajatcj";
const LASTFM_API_KEY = "ae77155b734605f6a7e6cc404e176542";

// Helper to format ms into m:ss
function formatMS(ms) {
  const totalSec = Math.floor(ms / 1000);
  return `${Math.floor(totalSec / 60)}:${String(totalSec % 60).padStart(2, '0')}`;
}

// Lanyard (live) integration
async function loadSpotifyFromLanyard() {  
  try {  
    const response = await fetch(`https://api.lanyard.rest/v1/users/754033245972201612`);
    const data = await response.json();

    if (data.data.listening_to_spotify) {  
      const s = data.data.spotify;  

      document.getElementById("spotify-card").style.display = "flex";  
      document.getElementById("last-spotify-card").style.display = "none";  

      document.getElementById("spotify-art").src = s.album_art_url;  
      document.getElementById("spotify-song").textContent = s.song + "Lan";  
      document.getElementById("spotify-artist").textContent = s.artist;  
      document.getElementById('spotify-album').textContent = s.album;  

      const total = s.timestamps.end - s.timestamps.start;  

      function updateProgress() {  
        const elapsed = Date.now() - s.timestamps.start;  
        const percent = Math.min((elapsed / total) * 100, 100);  
        document.getElementById("spotify-progress-bar").style.width = percent + "%";  
        document.getElementById("spotify-elapsed").textContent = formatMS(elapsed);  
        document.getElementById("spotify-duration").textContent = formatMS(total);  
        if (percent < 100) requestAnimationFrame(updateProgress);  
      }  

      updateProgress();  
      return true;  
    }  
  } catch (e) {  
    console.error("Lanyard fetch failed:", e);  
  }  
  return false;  
}

// Last.fm (fallback)
async function loadSpotifyFromLastFM() {
  try {
    const res = await fetch(
      `https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=${LASTFM_USER}&api_key=${LASTFM_API_KEY}&format=json&limit=1`
    );
    const data = await res.json();
    const track = data.recenttracks.track[0];
    const attrs = track['@attr'];

    if (attrs && attrs.nowplaying === "true") {
      document.getElementById("spotify-card").style.display = "flex";
      document.getElementById("last-spotify-card").style.display = "none";
      document.getElementById("spotify-art").src = track.image?.[2]['#text'] || "";
      document.getElementById("spotify-song").textContent = `${track.name} + LF`;
      document.getElementById("spotify-artist").textContent = track.artist['#text'] || "";
      document.getElementById('spotify-album').textContent = track.album?.['#text'] || "";
      document.getElementById("spotify-progress-bar").style.width = "0%";
      document.getElementById("spotify-elapsed").textContent = "";
      document.getElementById("spotify-duration").textContent = "";
    } else {
      document.getElementById("spotify-card").style.display = "none";
      document.getElementById("last-spotify-card").style.display = "flex";
      document.getElementById("last-spotify-art").src = track.image?.[2]['#text'] || "";
      document.getElementById("last-spotify-song").textContent = `${track.name} — ${track.artist['#text']}`;
      const playedMs = parseInt(track.date.uts, 10) * 1000;
      const hoursAgo = Math.floor((Date.now() - playedMs) / 3600000);
      document.getElementById("last-spotify-time").textContent = `Played ${hoursAgo} hrs ago`;
    }
  } catch (e) {
    console.error("Last.fm fetch failed:", e);
  }
}

// Master loader
async function loadSpotifyCard() {
  const isLive = await loadSpotifyFromLanyard();
  if (!isLive) await loadSpotifyFromLastFM();
}

loadSpotifyCard();
setInterval(loadSpotifyCard, 10000);
