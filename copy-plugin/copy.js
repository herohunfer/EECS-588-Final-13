chrome.extension.onRequest.addListener(
  function(request, sender, sendResponse) {
    if (request.event == "copy") {
       alert("You Have Copied:\n"+request.data);
    }
    sendResponse({});
  });
