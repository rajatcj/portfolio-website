
    // get the text field and div elements
    var textField = document.getElementById('content');
    // when the text field is focused, show the div
    textField.addEventListener('focusin', function() {
      if (document.getElementById('messagepreview')) {
        // iframe with id "messagepreview" exists
      } else {
        // iframe with id "messagepreview" does not exist
        document.getElementById("messagebox").innerHTML = '<iframe id="messagepreview" src="../chat/index.html?theme=dark" style="border:10px; width:100%;" title="Discord Status" ></iframe>';
        document.getElementById("messagebox").style.display = 'flex';
      }
    });
    // when the user clicks outside of the text field and iframe, hide the div
    document.addEventListener('mousedown', function(event) {
      var iframe = document.getElementById('messagepreview');
      if (!textField.contains(event.target) && !iframe.contains(event.target)) {
        document.getElementById("messagebox").innerHTML = '';
        document.getElementById("messagebox").style.display = 'none';
      }
    });



