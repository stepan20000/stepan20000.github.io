window.onload = function() {
  var loginForm= document.getElementsByClassName('login')[0];
  var showLogin = document.getElementById('slf');
  var hideLogin = document.getElementById('hlf');
  
  var map = document.getElementsByClassName('map')[0];
  var showMap = document.getElementById('sm');
  var hideMap = document.getElementById('hm'); 
  
  
  var a = 2;
  console.log(hideLogin);
 // console.log(hideMap);  
  showLogin.onclick = function(event) {
    event.preventDefault();
    loginForm.style.display = "block";  
  };
hideLogin.onclick = function(event) {
    event.preventDefault();
    loginForm.style.display = "none";
  };

   showMap.onclick = function(event){
    event.preventDefault();
    map.style.display = "block"; 
    window.scrollTo(0, 300);
  }
  hideMap.onclick = function(event){
    event.preventDefault();
    map.style.display = "none";
    window.scrollTo(0, window.innerHeight);
  } 
};