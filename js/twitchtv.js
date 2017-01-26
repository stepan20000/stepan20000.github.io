// The variable which contains streams list
var streams = ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas", "brunofin",
	"comster404"];
var streams1 = ["ESL_SC2", "freecodecamp"];
var workUrl = 'https://wind-bow.gomix.me/twitch-api';

// This functon receive the list of streams and write the statuses and info to the page
function printResult(streams) {
		for(var i = 0, n = streams.length; i < n; i++) { 
		let rowNum = i;
		let rowId = "row" + i;
		$(".result").append('<div id="' + rowId + '" class="row"></div>');
		$.getJSON(workUrl + '/channels/' + streams[rowNum] + '?callback=?', function(data) {
			// write logo
			if(data.logo){
				$("#" + rowId).append('<div class="col-xs-2 logo vcenter"><img class="img-circle img-responsive" src="' + data.logo + '"></div>');
			}
			else {
				$("#" + rowId).append('<div class="col-xs-2 logo vcenter"><img class="img-circle img-responsive" src="http://res.cloudinary.com/dtnyso8nn/image/upload/v1485194092/tvitchtv/blanck_logo1.png"></div>');	
			};
			// write channel name
			if (data.display_name) {
				$("#" + rowId).append('<div class="col-xs-7 vcenter info"><h4>' + data.display_name + '</h4></div>');
			}
			else{
				$("#" + rowId).append('<div class="col-xs-7 vcenter info"><h4>' + streams[rowNum] + '</h4></div>');
			};
			// appending the status for the non existiong channels
			if (data.error) {
				$("#" + rowId).addClass("not-exist");
				$("#" + rowId + " .info").append('<p class="status">' + data.status + '. ' + data.message + '</p');
				$("#" + rowId).append('<div class="col-xs-3 vcenter">' + data.error + '</div>');
			}
			// if channel is exist, i.e. data.error doesn't exist
			else {
				//if channel doesn't have status info
				if(jQuery.isEmptyObject(data.status)){
					//write an empty status paragraph and make next request
					$("#" + rowId + " .info").append('<p class="status"></p>');
					$.getJSON(workUrl + '/streams/' + streams[rowNum] + '?callback=?', function(data) {
						if (jQuery.isEmptyObject(data.stream)) {	
							$("#" + rowId).addClass("offline"); 				
	  						$("#" + rowId).append('<div class="col-xs-3 vcenter">Offline</div>');
						}
						else {
							$("#" + rowId).addClass("online");
							$("#" + rowId).append('<div class="col-xs-3 vcenter">Online</div>');
						};
					});	
				}
				// if channel has status info - write this status and make next request
				else {
					$("#" + rowId + " .info").append('<p class="status">' + data.status + '</p>');
					console.log($("#" + rowId + " .info").html());
					$.getJSON(workUrl + '/streams/' + streams[rowNum] + '?callback=?', function(data) {
						if (jQuery.isEmptyObject(data.stream)) {	 
							$("#" + rowId).addClass("offline");				
	  						$("#" + rowId).append('<div class="col-xs-3 vcenter">Offline</div>');
						}
						else {
							$("#" + rowId).addClass("online");
							$("#" + rowId).append('<div class="col-xs-3 vcenter">Online</div>');
						};
					});	
				};
			};	
		});
	}	
}

$( document ).ready(function(){
	printResult(streams);

$('input:radio[name="display-options"]').change(
	function(){
		if($(this).is(':checked') && $(this).val() == "online"){
			$(".offline").hide("slow");
			$(".not-exist").hide("slow");
			$(".online").show("slow");
			
		}
		else if ($(this).is(':checked') && $(this).val() == "offline"){
			$(".online").hide("slow");
			$(".not-exist").hide("slow");
			$(".offline").show("slow");
		} 
		else {
			$(".not-exist").show("slow");
			$(".online").show("slow");
			$(".offline").show("slow");
		}
	});
});