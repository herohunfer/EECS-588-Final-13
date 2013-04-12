chrome.extension.onRequest.addListener(
  function(request, sender, sendResponse) {
    if (request.event == "copy") {
       alert("You Have Copied:\n"+request.data);
       chrome.tabs.captureVisibleTab(null, {format:'png'},function(data){
         var image = new Image();
         //var image = document.getElementById("im");
         image.onload = function() {
           var canvas = document.createElement("canvas");
           canvas.width = request.width;
           canvas.height = request.height;
           var context = canvas.getContext("2d");
           context.drawImage(image, request.left, request.top, request.width, request.height,0,0,request.width,request.height);
           //context.drawImage(image, 10, 10);
           var d = canvas.toDataURL('image/png');
           alert("left:"+request.left
             +"\nwidth:"+request.width
             +"\ntop:"+request.top
             +"\nheight:"+request.height);
           var im = document.getElementById("im");
           im.src = d;
         };
         
         image.src = data;
       });
    }
    sendResponse({});
  });
