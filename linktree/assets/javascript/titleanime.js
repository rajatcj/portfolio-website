const focusedTitles = ["Never", "Gonna", "Give", "You", "Up", "Never", "Gonna", "Tell", "A", "Lie", "Never", "Gonna", "Run", "Around", "And",  "Desert", "You", "@rajat_cj", "@rajat_cj"];
const focusedIcon = "https://api.lanyard.rest/754033245972201612.jpg";
const notFocusedTitles = ["Babyy did you go?", "Pls come back", "I need to tell you sth", "Heyyy", "Aw Im sad now~", "Babyyyy", "come back 😭", "@rajat_cj", "@rajat_cj"];
const notFocusedIcon = "https://cdn.discordapp.com/emojis/1062638551650549760.gif";
let intervalId;
let currentTitleIndex = 0;
let titles = focusedTitles;
let icon = focusedIcon;

function updateTitle() {
  document.querySelector("#titleofthepage").textContent = titles[currentTitleIndex];
  currentTitleIndex = (currentTitleIndex + 1) % titles.length;
  document.querySelector("#iconofthepage").setAttribute("href", icon);
}

function handleVisibilityChange() {
  if (document.hidden) {
    titles = notFocusedTitles;
    icon = notFocusedIcon;
    currentTitleIndex = 0;
    clearInterval(intervalId);
    intervalId = setInterval(updateTitle, 2500);
  } else {
    titles = focusedTitles;
    icon = focusedIcon;
    currentTitleIndex = 0;
    clearInterval(intervalId);
    intervalId = setInterval(updateTitle, 1000);
  }
}


document.addEventListener("visibilitychange", handleVisibilityChange);
