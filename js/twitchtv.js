// The variable which contains streams list
var streams1 = ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas", "brunofin",
	"comster404"];
var streams = ["ESL_SC2", "freecodecamp"];
var workUrl = 'https://wind-bow.gomix.me/twitch-api';
$( document ).ready(function(){
	for(var i = 0, n = streams.length; i < n; i++) {
		let rowNum = i;
		$.getJSON(workUrl + '/channels/' + streams[i] + '?callback=?', function(data) {
			if(data.logo){
				$(".result").append('<div class="row"><div class="col-xs-2"><img class="logo" src="' + data.logo + '"></div>');
			}
			else {
				$(".result").append('<div class="row"><div class="col-xs-2"></div>');	
			};
			if (data.display_name) {
				$(".row:last").append('<div class="col-xs-2">' + data.display_name + '</div>');
			}
			else{
				$(".row:last").append('<div class="col-xs-2">' + streams[i] + '</div>');
			}
			if (data.error) {
	// appending the status
				$(".row:last").append('<div class="col-xs-5">' + data.status + ' ' + data.message + '</div>');
				$(".row:last").append('<div class="col-xs-3">' + data.error + '</div>');
			}
			else {
				$(".row:last").append('<div class="col-xs-5">' + data.status + '</div>');
				console.log(rowNum);
				$.getJSON('https://wind-bow.gomix.me/twitch-api/channels/' + streams[i] + '?callback=?', function(data) {
					if (data.stream !== null) {	 				
	  					$(".row").eq(rowNum).append('<div class="col-xs-3">Online</div>');
					}
					else {
						$(".row").eq(rowNum).append('<div class="col-xs-3">Offline</div>');
					};	
				});
			};	
		});	

	
/*	for(var i = 0, n = streams.length; i < n; i++) {
		$.getJSON('https://wind-bow.gomix.me/twitch-api/streams/' + streams[i] + '?callback=?', function(data) {
	  		response[i] = data;
		});		
	}*/
	

/*		$.getJSON('https://wind-bow.gomix.me/twitch-api/channels/ESL_SC2?callback=?', function(data) {
	  console.log(data);
	});
		$.getJSON('https://wind-bow.gomix.me/twitch-api/channels/freecodecamp?callback=?', function(data) {
	  console.log(data);
	});
			$.getJSON('https://wind-bow.gomix.me/twitch-api/streams/brunofin?callback=?', function(data) {
	  console.log(data);
	}); 
		$.getJSON('https://wind-bow.gomix.me/twitch-api/channels/comster404?callback=?', function(data) {
	  console.log(data);
	});*/
	}
});