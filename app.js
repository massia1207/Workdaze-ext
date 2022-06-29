 const y = document.getElementById('year');
 const m = document.getElementById('month');
 const button = document.getElementById('btn');
 const tblHolidays = document.getElementById('table');
 const resultDiv = document.getElementById('results');
 const resultBox = document.getElementById('daySpan');
 const resultText = document.getElementById('workdaze');
 const btnDiv = document.getElementById('btnDiv');
 const daze = document.getElementById('daze');


 button.addEventListener('click',()=>{
  let formYear = y.options[y.selectedIndex].value;
  let formMonth = m.options[m.selectedIndex].value;
  let h = new Array;
  let chks = tblHolidays.getElementsByTagName("INPUT");
  for (let i =0; i<chks.length;i++){
    if(chks[i].checked){
      h.push(chks[i].value);
    }
  }
  
  if(formYear != "" && formMonth != ""){
  
  btnDiv.style.display = 'none'
  document.getElementById('results').style.display="block";
  
  let api = buildApiString(formYear,formMonth,h);
  // console.log(api);
  chrome.runtime.sendMessage({method: "getStatus", data:api}, function(res){
    daze.innerHTML = res.toString();
    return true;
  });
}else{
    alert("Please select a year and month");
} 
}) 

resultBox.addEventListener('click', () =>{
  resultDiv.style.display = 'none';
  btnDiv.style.display = 'block';
})



function buildApiString(y, m, h){
  let apiString = '';
  let holidayString = '';
  let year = y;
  let month = m;
  let holidays = h;
  
  apiString += `http://localhost:8080/api?`;
  apiString += `year=${year}`;
  apiString += `&month=${month}`;
  for (let i = 0; i < holidays.length; i++){
    holidayString += `&holidays=${holidays[i]}`;
  }
  apiString += holidayString;
  return apiString;
}

