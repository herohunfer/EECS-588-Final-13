chrome.extension.onRequest.addListener(
  function(request, sender, sendResponse) {
    if (request.event == "copy") {
       alert("You Have Copied:\n" + request.data);
       chrome.tabs.captureVisibleTab(null, {format: 'png'}, function(data) {
         var image = new Image();

         image.onload = function() {
           var canvas = document.createElement("canvas");
           canvas.width = request.width;
           canvas.height = request.height;
           var context = canvas.getContext("2d");
           context.drawImage(image, request.left, 
             request.top, request.width, request.height,
             0, 0, request.width, request.height);

           var d = canvas.toDataURL('image/png');

           ajax_post("http://198.199.74.75/tesseract.php", {"img": d}, function(data_text) {
             //obj = toJson(txt)
             //obj.name
             /*
             if (Math.abs(request.data.length - data_text.length) > parseInt(0.2 * data_text.length) ) {
               alert("good, " + data_text);
             } else {
               alert("bad, " + data_text); 
             }
             */
             l = Math.min(data_text.length, request.parent.length);
             count = 0;
             for (i = 0; i < l; i++) {
              if (data_text[i] == request.parent[i]) count++; 
             }
             if (count*1.0/l > 0.8) alert("good");
             //if (data_text === request.parent) alert("good");
             else alert("Danger! Check what you copied! \ndata:"+data_text+"\nparent:"+request.parent);
           });

           var im = document.getElementById("im");
           im.src = d;
         };
         
         image.src = data;
       });
    }
    sendResponse({});
  });

// A helper function to post data
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
