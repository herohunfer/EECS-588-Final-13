document.addEventListener('mouseup',function(event)

    console.log("2");
    var sel = window.getSelection().toString();

    if(sel.length)
        chrome.extension.sendRequest({'message':'setText','data': sel},function(response){})
})
