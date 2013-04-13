// on copy event, send a message to background.html
function onCopy(e) {
    var sel = window.getSelection();
    var parentNode = sel.anchorNode.parentElement;
    var rect = parentNode.getBoundingClientRect();
    var pLeft = parseInt(rect.left);
    var pWidth = parseInt(rect.width);
    var pTop = parseInt(rect.top);
    var pHeight = parseInt(rect.height);
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
