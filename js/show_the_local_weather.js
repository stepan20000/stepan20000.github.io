/*$(document).ready(function() {
	var loc = { lat: 0, lon: 0 }; 
	var url = "http://api.openweathermap.org/data/2.5/weather?" 
	key = "916819ad322d699ea2d8f94cf94c42cd";
	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(function(position) {
			loc.lat = position.coords.latitude;
			loc.lon = position.coords.longitude;
			url = url + "lat=" + loc.lat +"&lon=" + loc.lon;
			$(".location").html("latitude: " + loc.lat + "<br>longitude: " + loc.lon);
		});
	}
	else {
		alert("Can't access your location");
	}
	$.getJSON("http://quotes.stormconsultancy.co.uk/random.json", function(wheather) {
		console.log("getJSON is a function");
	});
});*/

/*  $(document).ready(function() {

	$.getJSON("http://api.openweathermap.org/data/2.5/weather?lat=35&lon=139&APPID=916819ad322d699ea2d8f94cf94c42cd", function(json) {
     var html = "";
     console.log(json.coord.lon);
     console.log(json.base);
     $(".json").html(json.coord.lon);
        json.forEach(function(val) {
				var keys = Object.keys(val);
				html += "<div class = 'cat'>";
				keys.forEach(function(key) {
					html += "<strong>" + key + "</strong>: " + val[key] + "<br>";
				});
					html += "</div><br>";
        });
        
		$(".container-fluid").html(html);	
   });

	
});*/


  $(document).ready(function() {


      $.getJSON("http://api.openweathermap.org/data/2.5/weather?lat=35&lon=139&APPID=916819ad322d699ea2d8f94cf94c42cd", function(json) {

        var html = "";
        // Only change code below this line.
        json.forEach(function(val) {
var keys = Object.keys(val);
          
html += "<div class = 'cat'>";
keys.forEach(function(key) {
  
html += "<strong>" + key + "</strong>: " + val[key] + "<br>";

});
html += "</div><br>";

        }
                    );
        
        
        // Only change code above this line.

        $(".message").html(html);

      });

  });





