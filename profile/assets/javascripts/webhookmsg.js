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
        document.getElementById('content').placeholder = "Send a secret message to me";
      }, 5000);
    }
  }

  $.getJSON("https://sendbotu.rajatcj.com.np/ping")