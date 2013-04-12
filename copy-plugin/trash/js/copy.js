var seltext = null;

chrome.extension.onRequest.addListener(function(request, sender, sendResponse)
{
    switch(request.message)
    {
        case 'setText':
            window.seltext = request.data;
        break;

        default:
            sendResponse({data: 'Invalid arguments'});
        break;
    }
});

function copyToClipboard( text ){
  var copyDiv = document.createElement('div');
  copyDiv.contentEditable = true;
  document.body.appendChild(copyDiv);
  copyDiv.innerHTML = text;
  copyDiv.unselectable = "off";
  copyDiv.focus();
  document.execCommand('SelectAll');
  document.execCommand("copy");
  document.body.removeChild(copyDiv);
  console.log("finish copying");
}

function savetext(info,tab)
{
  /*
    var jax = new XMLHttpRequest();
    jax.open("POST","http://localhost/text/");
    jax.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
    jax.send("text="+seltext);
    jax.onreadystatechange = function() { if(jax.readyState==4) { alert(jax.responseText);  }}
}
*/
copyToClipboard(seltext);    
}
var contexts = ["selection"];
for (var i = 0; i < contexts.length; i++)
{
    var context = contexts[i];
    chrome.contextMenus.create({"title": "Send to Server", "contexts":[context], "onclick": savetext});  
}
