
function openDisc() {
    document.getElementById("discordprofile").style.height = "100%";
}


var body = document.getElementById('discordprofile');
var except = document.getElementById('discordprofileinside');
body.addEventListener("click", function() {
    document.getElementById("discordprofile").style.height = "0%";
}, false);
except.addEventListener("click", function(ev) {
    ev.stopPropagation();
}, false);



    //rickroll
var GFG = document.getElementById("idAudio");

function play_Audio() {
    GFG.volume = 1.0;
    GFG.play();
    document.getElementById('rickroll').innerHTML = "Never Gonna Give You Up";
    document.getElementById('avatartext').innerHTML = "gotcha";
    document.getElementById('avatar').innerHTML = "<img src='./assets/rickroll.gif' alt='Discord Avatar' onclick='openDisc()' style='cursor: pointer;' class='header__icon'/>";
}

function pause_Audio() {
    GFG.pause();
    document.getElementById('rickroll').innerHTML = "OnlyFans";
    document.getElementById('avatartext').innerHTML = "Hi.";
    document.getElementById('avatar').innerHTML = "<img src='https://api.lanyard.rest/754033245972201612.jpg' alt='Discord Avatar'  onclick='openDisc()' style='cursor: pointer;' class='header__icon'/>";
}


    //theme
var currentTheme = localStorage.getItem('theme');
if(currentTheme) {
    document.documentElement.setAttribute('data-theme', currentTheme);
    if(currentTheme === 'dark') {
        document.getElementById('themebutton').innerHTML = "<i class='fa-solid fa-moon'></i>";
    }
};

function changeTheme() {
    if(localStorage.getItem('theme') === 'light') {
        document.documentElement.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
        document.getElementById('themebutton').innerHTML = "<i class='fa-solid fa-moon'></i>";
    } else {
        document.documentElement.setAttribute('data-theme', 'light');
        localStorage.setItem('theme', 'light');
        document.getElementById('themebutton').innerHTML = "<i class='fa-solid fa-sun'></i>";
    }
}




function updateTime() {
    // Update the time displays
    document.getElementById('my-time').innerHTML = new Date().toLocaleTimeString('en-US', {timeZone: 'Asia/Kathmandu', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true});
    
    document.getElementById('my-date').innerHTML = new Date().toLocaleDateString('en-US', {timeZone: 'Asia/Kathmandu', day: '2-digit', month: 'long', year: 'numeric'});
    }
    // Update the time every second
    setInterval(updateTime, 1000);
    // Update the time when the page loads
    updateTime();
    
    document.getElementById("my-time-label").textContent = NepaliDate.now().format('DD MMMM YYYY (dd)');