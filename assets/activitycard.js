// ------------------- CONFIG -------------------
const WEATHER_KEY = "62e7df4de26843f79c5135524250309";
const LOCATION = "Pokhara";
const LANYARD_ID = "754033245972201612";
const LASTFM_USER = "rajatcj";
const LASTFM_API_KEY = "ae77155b734605f6a7e6cc404e176542";

// ------------------- WEATHER -------------------
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

// ------------------- CLOCK -------------------
function startClock() {
  const tz = 'Asia/Kathmandu';
  setInterval(() => {
    const now = new Date();
    document.getElementById('time').textContent = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true, timeZone: tz });
    document.getElementById('date').textContent = now.toLocaleDateString('en-GB', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', timeZone: tz });
  }, 1000);
}

// ------------------- STATUS -------------------
const STATUS_MAP = {
  online: { icon: 'fa-solid fa-circle', color: '#23a65a', label: 'online' },
  idle: { icon: 'fa-regular fa-moon', color: '#efb133', label: 'online (idle)' },
  dnd: { icon: 'fa-solid fa-minus-circle', color: '#f23f43', label: 'online (dnd)' },
  offline: { icon: 'fa-regular fa-circle', color: '#9597a2', label: 'offline' }
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
  // Save the entire Lanyard presence to localStorage
  localStorage.setItem("lanyardData", JSON.stringify(d));

  const statusKey = (d.discord_status || 'offline').toLowerCase();
  const meta = STATUS_MAP[statusKey] || STATUS_MAP.offline;

  document.getElementById('status-icon').className = meta.icon;
  document.getElementById('status-icon').style.color = meta.color;
  document.getElementById('status-icon').title = meta.label;
  document.getElementById('status-text').textContent = meta.label;
  document.getElementById('device-text').textContent = devicesText(d);

  // Spotify from Lanyard
  if (d.listening_to_spotify && d.spotify) {
    localStorage.setItem("spotifySource", "lanyard");
    localStorage.setItem("spotifyData", JSON.stringify(d.spotify));
  }

  // Render activities
  renderActivities(d.activities);
}

// ------------------- ACTIVITIES -------------------
function cleanImageUrl(url, appId) {
  if (!url) return null;
  if (url.startsWith("spotify:")) return url.replace("spotify:", "https://i.scdn.co/image/");
  if (url.startsWith("mp:external/")) return url.replace(/^mp:external\/[^/]+\/https\//, "https://");
  return `https://cdn.discordapp.com/app-assets/${appId}/${url}.png`;
}
function renderActivities(activities) {
  const container = document.querySelector('.containerx');

  // Remove previously rendered activity cards
  document.querySelectorAll('.activity-card').forEach(el => el.remove());

  // Remove previously rendered email card if exists
  const existingEmail = document.querySelector('.email-card');
  if (existingEmail) existingEmail.remove();

  // Loop through activities
  activities.forEach(act => {
    // Skip type 2 and 4
    if (act.type === 2 || act.type === 4) return;

    const card = document.createElement('div');
    card.className = 'card activity-card';

    const row = document.createElement('div');
    row.className = 'activity-row';
    row.style.display = 'flex';
    row.style.gap = '16px';
    row.style.width = '100%';
    row.style.alignItems = 'center';
    row.style.position = 'relative';

    // Left large image
    if (act.assets && act.assets.large_image) {
      const largeImg = document.createElement('img');
      largeImg.src = cleanImageUrl(act.assets.large_image, act.application_id, 'large');
      largeImg.className = 'large-icon';
      row.appendChild(largeImg);
    }

    // Text info
    const textWrapper = document.createElement('div');
    textWrapper.className = 'activity-text';
    textWrapper.style.flex = '1';
    textWrapper.style.textAlign = 'left';

    const activitytype = document.createElement('div');
    activitytype.className = 'label';
    activitytype.style.fontSize = 'x-small';
    activitytype.textContent = 'Current Activity';
    textWrapper.appendChild(activitytype);

    const label = document.createElement('div');
    label.className = 'label';
    label.style.color = '#3b82f6';
    label.textContent = act.name || 'Activity';
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

    // Small top-right image
    if (act.assets && act.assets.small_image) {
      const smallIcon = document.createElement('img');
      smallIcon.src = cleanImageUrl(act.assets.small_image, act.application_id, 'small');
      smallIcon.className = 'small-icon';
      smallIcon.style.position = 'absolute';
      smallIcon.style.top = '12px';
      smallIcon.style.right = '12px';
      smallIcon.style.width = '32px';
      smallIcon.style.height = '32px';
      smallIcon.style.borderRadius = '6px';
      smallIcon.title = act.assets.small_text || act.name;
      row.appendChild(smallIcon);
    }

    card.appendChild(row);
    container.appendChild(card);
  });

  // ----- Add Email Card dynamically -----
// ----- Add Email Card dynamically -----
const emailCard = document.createElement('div');
emailCard.className = 'email-card';

// Count how many activity cards were rendered
const n = document.querySelectorAll('.activity-card').length;

// Set grid-column span based on number of activities
if (window.innerWidth > 900) {
  if (n === 0) emailCard.style.gridColumn = "span 2";
  else if (n === 1) emailCard.style.gridColumn = "span 1";
  else if (n === 2) emailCard.style.gridColumn = "span 3";
  else if (n === 3) emailCard.style.gridColumn = "span 2";
  else if (n === 4) emailCard.style.gridColumn = "span 1";
  else emailCard.style.gridColumn = "span 1"; // default
} 
// ---- Build the contact form inside the email card ----
// Create form instead of plain card
const emailForm = document.createElement('form');
emailForm.action = "https://api.web3forms.com/submit";
emailForm.method = "POST";
emailForm.className = "email-form";
emailForm.id = "contact-form";
if (n > 1) {
  emailForm.style.maxWidth = "750px";
}

// Hidden Web3Forms Access Key
const accessKey = document.createElement('input');
accessKey.type = "hidden";
accessKey.name = "access_key";
accessKey.value = "7710c7c9-0e9c-43f4-a83d-6f2efcee5cc9";
emailForm.appendChild(accessKey);


// redirect
const redirectform = document.createElement('input');
redirectform.type = "hidden";
redirectform.name = "redirect";
redirectform.value = "https://rajatcj.com/#contact-form";
emailForm.appendChild(redirectform);


// formname
const formname = document.createElement('input');
formname.type = "hidden";
formname.name = "from_name";
formname.value = "Website Message";
emailForm.appendChild(formname);

// Honeypot (spam protection)
const botCheck = document.createElement('input');
botCheck.type = "checkbox";
botCheck.name = "botcheck";
botCheck.style.display = "none";
emailForm.appendChild(botCheck);



// Title
const title = document.createElement('div');
title.textContent = "Send Me a Message";
title.className = "email-title";
emailForm.appendChild(title);

// Message textarea (top, fills available space)
const messageTextarea = document.createElement('textarea');
messageTextarea.placeholder = "Message...";
messageTextarea.name = "message";  // <-- important for Web3Forms
messageTextarea.className = "email-message";
messageTextarea.required = true;
emailForm.appendChild(messageTextarea);

// Bottom row for name, email, send button
const inputRow = document.createElement('div');
inputRow.className = "email-input-row";

// Name input (3 columns)
const nameInput = document.createElement('input');
nameInput.type = "text";
nameInput.placeholder = "Name";
nameInput.name = "name";   // <-- Web3Forms field
nameInput.className = "email-name";
nameInput.required = true;
inputRow.appendChild(nameInput);

// Email input (3 columns)
const emailInput = document.createElement('input');
emailInput.type = "email";
emailInput.placeholder = "Email";
emailInput.name = "email"; // <-- Web3Forms field
emailInput.className = "email-email";
emailInput.required = true;
inputRow.appendChild(emailInput);

// Send button (1 column)
const sendBtn = document.createElement('button');
sendBtn.type = "submit";  // <-- make it submit the form
sendBtn.textContent = "Send";
sendBtn.className = "email-send-btn";
inputRow.appendChild(sendBtn);

emailForm.appendChild(inputRow);
emailCard.appendChild(emailForm);

// Append email card to container
container.appendChild(emailCard);

}



// ------------------- SPOTIFY -------------------
function formatMS(ms) {
  const totalSec = Math.floor(ms / 1000);
  const minutes = Math.floor(totalSec / 60);
  const seconds = totalSec % 60;
  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
}

async function loadSpotifyFromLanyard() {
  try {
    const response = await fetch(`https://api.lanyard.rest/v1/users/${LANYARD_ID}`);
    const data = await response.json();
    if (data.data.listening_to_spotify) {
      localStorage.setItem("spotifySource", "lanyard");
      localStorage.setItem("spotifyData", JSON.stringify(data.data.spotify));
      return true;
    }
  } catch (e) { console.error("Lanyard fetch failed:", e); }
  return false;
}

async function loadSpotifyFromLastFM() {
  try {
    const res = await fetch(
      `https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=${LASTFM_USER}&api_key=${LASTFM_API_KEY}&format=json&limit=1`
    );
    const data = await res.json();
    const track = data.recenttracks.track[0];
    localStorage.setItem("spotifySource", "lastfm");
    localStorage.setItem("spotifyData", JSON.stringify(track));
  } catch (e) { console.error("Last.fm fetch failed:", e); }
}

function renderSpotify() {
  const source = localStorage.getItem("spotifySource");
  const data = JSON.parse(localStorage.getItem("spotifyData") || "{}");

  const spotifyCard = document.getElementById("spotify-card");
  const lastCard = document.getElementById("last-spotify-card");
  const progressBar = document.getElementById("spotify-progress-bar");
  const elapsedEl = document.getElementById("spotify-elapsed");
  const durEl = document.getElementById("spotify-duration");


  if (source === "lanyard" && data) {
    // Lanyard live song
    spotifyCard.style.display = "flex";
    lastCard.style.display = "none";

    document.getElementById("spotify-art").src = data.album_art_url;
    document.getElementById("spotify-song").textContent = data.song;
    document.getElementById("spotify-artist").textContent = data.artist;
    document.getElementById("spotify-album").textContent = data.album;
    document.getElementById("spotifyquick").innerHTML = `<i class="fa-brands fa-spotify" style="color:#1DB954; animation: spinicon 2s linear infinite"></i> Currently listening to <u>${data.song}</u> by <u>${data.artist}</u>`;

    const total = data.timestamps.end - data.timestamps.start;
    const elapsed = Date.now() - data.timestamps.start;
    const percent = Math.min((elapsed / total) * 100, 100);

    progressBar.style.width = percent + "%";
    elapsedEl.textContent = formatMS(elapsed);
    durEl.textContent = formatMS(total);

  } else if (source === "lastfm" && data) {
    if (data['@attr'] && data['@attr'].nowplaying === "true") {
      // Last.fm live song (no progress bar)
      spotifyCard.style.display = "flex";
      lastCard.style.display = "none";

      document.getElementById("spotify-art").src = data.image?.[2]['#text'] || "";
      document.getElementById("spotify-song").textContent = data.name;
      document.getElementById("spotify-artist").textContent = data.artist['#text'] || "";
      document.getElementById("spotify-album").textContent = data.album?.['#text'] || "";
    document.getElementById("spotifyquick").innerHTML = `<i class="fa-brands fa-spotify" style="color:#1DB954; animation: spinicon 2s linear infinite"></i> Currently listening to <u>${data.name}</u> by <u>${data.artist['#text']}</u>`;


      progressBar.style.width = "0%";
      elapsedEl.textContent = "";
      durEl.textContent = "";

    } else {
      // Last played song
      spotifyCard.style.display = "none";
      lastCard.style.display = "flex";

      document.getElementById("last-spotify-art").src = data.image?.[2]['#text'] || "";
      document.getElementById("last-spotify-song").textContent = `${data.name}`;
      document.getElementById("last-spotify-artist").textContent = `${data.artist['#text']}`;
      document.getElementById("last-spotify-album").textContent = `${data.album['#text']}`;
      document.getElementById("spotifyquick").textContent = ``;
      
      const playedMs = parseInt(data.date.uts, 10) * 1000;
      const diffMs = Date.now() - playedMs;
      const minsAgo = Math.floor(diffMs / 60000);
      const hoursAgo = Math.floor(diffMs / 3600000);

      document.getElementById("last-spotify-time").textContent =
        hoursAgo > 0 ? `Played ${hoursAgo} hrs ago` : `Played ${minsAgo} mins ago`;
    }

  } else {
    // No data at all
    spotifyCard.style.display = "none";
    lastCard.style.display = "none";
  }
}

// ------------------- MASTER LOADER -------------------
async function updateSpotify() {
  const lanyardAvailable = await loadSpotifyFromLanyard();
  if (!lanyardAvailable) await loadSpotifyFromLastFM();
  renderSpotify();
}

// Update Spotify every second for rendering, Last.fm every 10s for fetching
setInterval(updateSpotify, 1000);
setInterval(loadSpotifyFromLastFM, 10000);

// ------------------- LANYARD WEBSOCKET -------------------
const ws = new WebSocket('wss://api.lanyard.rest/socket');
ws.onmessage = msg => {
  const data = JSON.parse(msg.data);
  switch (data.op) {
    case 1: {
      const interval = data.d.heartbeat_interval;
      setInterval(() => ws.send(JSON.stringify({ op: 3 })), interval);
      ws.send(JSON.stringify({ op: 2, d: { subscribe_to_ids: [LANYARD_ID] } }));
      break;
    }
    case 0: {
      if (data.t === 'INIT_STATE' || data.t === 'PRESENCE_UPDATE') {
        const presence = data.d[LANYARD_ID] || data.d;
        updatePageWithLanyardData(presence);
      }
      break;
    }
  }
};

// ------------------- INITIALIZE -------------------
loadWeather();
startClock();
fetch(`https://api.lanyard.rest/v1/users/${LANYARD_ID}`)
  .then(r => r.json())
  .then(d => updatePageWithLanyardData(d.data));
