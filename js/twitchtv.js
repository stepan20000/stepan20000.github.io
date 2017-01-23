// The variable which contains streams list
var streams = ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas", "brunofin",
	"comster404"];
var streams1 = ["ESL_SC2", "freecodecamp"];
var workUrl = 'https://wind-bow.gomix.me/twitch-api';
$( document ).ready(function(){
	for(var i = 0, n = streams.length; i < n; i++) {
		let rowNum = i;
		$(".result").append('<div class="row"></div>');
		$.getJSON(workUrl + '/channels/' + streams[rowNum] + '?callback=?', function(data) {
			if(data.logo){
				$(".row").eq(rowNum).append('<div class="col-xs-2"><img class="logo" src="' + data.logo + '"></div>');
			}
			else {
				$(".row").eq(rowNum).append('<div class="col-xs-2"><img class="logo" src="http://res.cloudinary.com/dtnyso8nn/image/upload/v1485194092/tvitchtv/blanck_logo1.png"></div>');	
			};
			if (data.display_name) {
				$(".row").eq(rowNum).append('<div class="col-xs-2">' + data.display_name + '</div>');
			}
			else{
				$(".row").eq(rowNum).append('<div class="col-xs-2">' + streams[rowNum] + '</div>');
			}
			if (data.error) {
	// appending the status
				$(".row").eq(rowNum).append('<div class="col-xs-5">' + data.status + '. ' + data.message + '</div>');
				$(".row").eq(rowNum).append('<div class="col-xs-3">' + data.error + '</div>');
			}
			else {
				if(jQuery.isEmptyObject(data.status)){
					$(".row").eq(rowNum).append('<div class="col-xs-5"></div>');
					$.getJSON(workUrl + '/streams/' + streams[rowNum] + '?callback=?', function(data) {
						if (jQuery.isEmptyObject(data.stream)) {	 				
	  						$(".row").eq(rowNum).append('<div class="col-xs-3">Offline</div>');
						}
						else {
							$(".row").eq(rowNum).append('<div class="col-xs-3">Online</div>');
						};
					});	
				}
				else {
					$(".row").eq(rowNum).append('<div class="col-xs-5">' + data.status + '</div>');
					$.getJSON(workUrl + '/streams/' + streams[rowNum] + '?callback=?', function(data) {
						if (jQuery.isEmptyObject(data.stream)) {	 				
	  						$(".row").eq(rowNum).append('<div class="col-xs-3">Offline</div>');
						}
						else {
							$(".row").eq(rowNum).append('<div class="col-xs-3">Online</div>');
						};
					});	
				};
			};	
		});
	}
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
});