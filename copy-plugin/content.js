// on copy event, send a message to background.html
function onCopy(e) {
    var sel = window.getSelection();
    var parentNode = sel.anchorNode.parentElement;
    var rect = parentNode.getBoundingClientRect();
    var pLeft = rect.left;
    var pWidth = rect.width;
    var pTop = rect.top;
    var pHeight = rect.height;
    var windowWidth = window.innerWidth;
    var windowHeight = window.innerHeight;
    chrome.extension.sendRequest({event: "copy",
                                  data:sel.toString(),
                                  left:pLeft,
                                  width:pWidth,
                                  top:pTop,
                                  height:pHeight,
                                  wWidth:windowWidth,
                                  wHight:windowHeight});
}
//register event listener for copy events on document
document.addEventListener('copy',onCopy,true);
alert("start");
