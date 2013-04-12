// on copy event, send a message to background.html
function onCopy(e) {
    var sel = window.getSelection().toString();
    alert("copied "+sel);
    chrome.tabs.captureVisibleTab(0,{format:'png'}, function(data) {
      //bg = chrome.extension.getBackgroundPage();
      //var img = bg.images[0];
      //img.src = "data:img/png;base64, "+data;
      alert("yes");
    }); 
    //chrome.extension.sendRequest({event: "copy", data:sel});
}
// http://stackoverflow.com/questions/6251937/how-to-get-selecteduser-highlighted-text-in-contenteditable-element-and-replac
/*
function getSelectionHtml() {
    var html = "";
    if (typeof window.getSelection != "undefined") {
        var sel = window.getSelection();
        if (sel.rangeCount) {
            var container = document.createElement("div");
            for (var i = 0, len = sel.rangeCount; i < len; ++i) {
                container.appendChild(sel.getRangeAt(i).cloneContents());
            }
            html = container.innerHTML;
        }
    } else if (typeof document.selection != "undefined") {
        if (document.selection.type == "Text") {
            html = document.selection.createRange().htmlText;
        }
    }
    alert(html);
}
*/
//register event listener for copy events on document
document.addEventListener('copy',onCopy,true);
alert("begin");
 chrome.tabs.captureVisibleTab(-1,{format:'png'}, function(data) {
      //bg = chrome.extension.getBackgroundPage();
      //var img = bg.images[0];
      //img.src = "data:img/png;base64, "+data;
      alert("yes");
    }); 
