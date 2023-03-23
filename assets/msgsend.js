function sendLinkTreePrivMsg() {
    if (document.getElementById('content').value != "") {
    const snowflake = Date.now();
    $.getJSON("https://sendbotu.rajatcj.com.np/message?content=" + document.getElementById('content').value + "&guild=" + document.getElementById('guild').value + "&username=" + document.getElementById('username').value + "&avatar_url=" + document.getElementById('avatar_url').value + "&sessionid=" + document.getElementById('sessionid').value + "&timezone=" + document.getElementById('timezone').value + "&reid=" + sessionStorage.getItem('data-id') + "&reco=" + sessionStorage.getItem('data-co')  + "&siteurl=" + document.getElementById('url').value + "&sf=" + snowflake)
    document.getElementById('content').value = "";
    document.getElementById('content').readOnly = true;
    document.getElementById('content').placeholder = "Wait 5 sec to send again";
    sessionStorage.removeItem('data-id');
          sessionStorage.removeItem('data-co');
    setTimeout(function() {
        document.getElementById('content').readOnly = false;
        document.getElementById('content').placeholder = "Send anonymous message";
        }, 5000);
    }
}

// get the text field and div elements
var textField = document.getElementById('content');

// when the text field is focused, show the div
textField.addEventListener('focusin', function() {
    if (document.getElementById('messagepreview')) {
  // iframe with id "messagepreview" exists
} else {
  // iframe with id "messagepreview" does not exist
  document.getElementById("messagebox").innerHTML = '<iframe id="messagepreview" src="./chat/?theme=dark" style="display:block; border:0px;" title="Discord Status"></iframe>';
}
  });

// when the user clicks outside of the text field and iframe, hide the div
document.addEventListener('mousedown', function(event) {
  var iframe = document.getElementById('messagepreview');
  if (!textField.contains(event.target) && !iframe.contains(event.target)) {
    document.getElementById("messagebox").innerHTML = '';
  }
});
