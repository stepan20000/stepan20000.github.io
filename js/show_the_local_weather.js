// All comments are for not experienced peoples like me now

	var loc = {lat: NaN, lon: NaN};
	var temp;
	var wind;
	
//Make a variable cors_api_url which now contains url 'https://cors-anywhere.herokuapp.com/'
	var cors_api_url = 'https://cors-anywhere.herokuapp.com/';
  
 //Declare function doCORSRequest which takes two arguments options and printResult (printResult is a function)  
  function doCORSRequest(options, printResult) {
	// In a function call the constructor and make new request x
    var x = new XMLHttpRequest();
	// Initialize request by call the open method of the х request, and give it parameters:
	//options.method - here should be(GET) and url in our case url consists of
	//cors_api_url + options.url where options.url is a property url of the options object, take the method (GET) also  
	// from the options object. Remember that all object options we give to the function doCORSRequest as
	// an argument 
    x.open(options.method, cors_api_url + options.url);
    // Call methods onload and onerror of our request х, it means that when events x.onload or x.onerror  
    //is come we will perform function which just call printResult with argument x response. x.response is 
    // a string with information obtained from api.
    x.onload = x.onerror = function() {
      printResult(x.response);
    };

    //Send request
    x.send();
  }

  //Declare function getWeather
  function getWeather(loc) {
  		var key = "APPID=916819ad322d699ea2d8f94cf94c42cd"; 
  		// Use loc object to make our weather url
		var weatherUrl = "http://api.openweathermap.org/data/2.5/weather?units=metric&"+key+"&lat="+loc.lat+"&lon="+loc.lon;
      // Call our first function doCORSRequest and give it as agrument an object with method and url
      // function printResult parses respond and print a result in to html 
      doCORSRequest({
        method: 'GET',
        url: weatherUrl,
      }, function printResult(result) {    		
      		var $json = JSON.parse(result);
      		temp = Math.round($json.main.temp);
      		wind = $json.wind.speed;
      		/*var html = "";
      		jQuery.each($json, function(i, val) {    
					html += "<br>" + i +" :  " + val;
		       }); 
       		$(".json").html(html);*/
       		$(".location").html($json.name + ", " + $json.sys.country);
       		$(".temperature").html(temp + "°C");
       		if (temp >= 30) {
       			$(".thermometer").html('<i class="fa fa-thermometer-full" aria-hidden="true"></i>  ' );
       		}
       		else if(15 <= temp && temp <= 29){
							$(".thermometer").html('<i class="fa fa-thermometer-three-quarters" aria-hidden="true"></i>  ');       				
       				}
       				else if (5 <= temp && temp <= 14){ 
       							$(".thermometer").html('<i class="fa fa-thermometer-half" aria-hidden="true"></i>  '); 
       						}
       						else if (-7 <= temp && temp <= 4) {
											$(".thermometer").html('<i class="fa fa-thermometer-quarter" aria-hidden="true"></i>  ');        								
       								}
       								else {
								       	$(".thermometer").html('<i class="fa fa-thermometer-empty" aria-hidden="true"></i>  ');				
       								};
      // The alternative colored icons http://download.spinetix.com/content/widgets/icons/weather/
      // http://openweathermap.org/img/w/ 
       		$("#weather-icon").attr({src: "http://download.spinetix.com/content/widgets/icons/weather/" + $json.weather[0].icon + ".png"});
       		$(".description").html(toTitleCase($json.weather[0].description));
       		$(".direction").css({
					"-ms-transform": "rotate(" + $json.wind.deg + "g)", /* IE 9 */
    				"-webkit-transform": "rotate(" + $json.wind.deg + "deg)", /* Chrome, Safari, Opera */
					transform: "rotate(" + $json.wind.deg + "deg)"       		
       		});
       		$(".wind").html(wind + " m/s");
       		$(".pressure").html($json.main.pressure + " hPa");
       		$(".humidity").html($json.main.humidity + " %");
       		
      });
  }
	
	//Declare function getLocation. This function gets the location and return an object loc with coordinates lat and lon
	function getLocation() {
		getTodayDate();
		function success(position){
			loc = {lat: position.coords.latitude, lon: position.coords.longitude};
			getWeather(loc);
		}		
		function error(position){
			    alert('Error occurred. Error code: ' + position.code);
    // error.code can be:
    //   0: unknown error
    //   1: permission denied
    //   2: position unavailable (error response from locaton provider)
    //   3: timed out
		} 				
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(success, error);									
		}
		else { 
			alert('Geolocation is not supported for this Browser/OS version yet.');
		};
	}
	//Declare function getDate. This function gets the current today and return an object date with year, month,
	//day and time  
	function getTodayDate(){
		var today = new Date();
		var locale = window.navigator.userLanguage || window.navigator.language;
		$(".date").html(today.toLocaleDateString("en-En",  { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }));
	} 
	function toTitleCase(str){
    return str.replace(/\w\S*/, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
	}
$(document).ready(function() {
	getLocation();
		$("#imperial").on("change", function () {
			$(".temperature").html(Math.round(temp*9/5 + 32) + "°F");
			$(".wind").html(Math.round(wind * 3600 / 1609.344)  + " mph");
  });
		$("#metric").on("change", function () {
			$(".temperature").html(temp + "°C");		
			$(".wind").html(wind + " m/s"); 
  });
});




