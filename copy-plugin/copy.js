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

           ajax_post("http://127.0.0.1:5000/", {data: d}, function(data_text) {
             //obj = toJson(txt)
             //obj.name
             alert("ok");
           });

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

function ajax_post(url, data, callback) {
  var httpRequest = new XMLHttpRequest();
  var url = url;
  var data = JSON.stringify(data);
  var callback = callback;

  var handler = function() {
    if (httpRequest.readyState === 4) {
      if (httpRequest.status === 200) {
        // action
        returned_text = httpRequest.responseText;
        callback(returned_text);
        // action
      } else {
        alert('There was a problem with the request. ' + httpRequest.status);
      }
    }
  };

  httpRequest = new XMLHttpRequest();
  httpRequest.onreadystatechange = handler;
  httpRequest.open('POST', url);
  httpRequest.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
  httpRequest.send('data=' + encodeURIComponent(data));
}
