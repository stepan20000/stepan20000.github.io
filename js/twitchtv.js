// The variable which contains streams list
var streams = ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas", "brunofin",
	"comster404"];
$( document ).ready(function(){
/*	for(var i = 0, n = streams.length; i < n; i++) {
		$.getJSON('https://wind-bow.gomix.me/twitch-api/channels/' + streams[i] + '?callback=?', function(data) {
	  		$(".result").append('<div class="row"><div class="col-xs-2"><img class="logo" src="' + data.logo
		+ '"></div><div class="col-xs-3 display_name">' + data.display_name
		+ '</div><div class="col-xs-7"></div></div>');
	  	});	
	}
	*/
	
/*	for(var i = 0, n = streams.length; i < n; i++) {
		$.getJSON('https://wind-bow.gomix.me/twitch-api/streams/' + streams[i] + '?callback=?', function(data) {
	  		response[i] = data;
		});		
	}*/
	

		$.getJSON('https://wind-bow.gomix.me/twitch-api/channels/ESL_SC2?callback=?', function(data) {
	  console.log(data);
	});
		$.getJSON('https://wind-bow.gomix.me/twitch-api/channels/freecodecamp?callback=?', function(data) {
	  console.log(data);
	});
			$.getJSON('https://wind-bow.gomix.me/twitch-api/channels/brunofin?callback=?', function(data) {
	  console.log(data);
	});
		$.getJSON('https://wind-bow.gomix.me/twitch-api/channels/comster404?callback=?', function(data) {
	  console.log(data);
	});
});