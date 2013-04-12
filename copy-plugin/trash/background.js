document.addEventListener('copy',function(e) {alert("now copy!")});



chrome.extension.onMessage.addListener(function (msg, sender, sendResponse) {
    //Set Content
    document.getElementById("tmp-clipboard").value = msg.text;
    //Get Input Element
    document.getElementById("tmp-clipboard").select();

    //Copy Content
    document.execCommand("Copy", false, null);
});
