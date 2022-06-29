
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse){
  if (request.method == "getStatus") {
    console.log(request.data);
    let result = fetch(request.data,
      {
        method: "GET",
      }
    );
    result.then(res => 
      res.json()).then(d=>{
        // console.log("daze: " + JSON.stringify(d.Days));
        sendResponse(d.Days); 
      });
      return true;
  }
});
