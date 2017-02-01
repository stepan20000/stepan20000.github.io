//Client ID: 4cialbjopbvvuhiguy71sb9cfm9bq4
// This array is a list with usernames
var userNames = ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas", "brunofin",
	"comster404", "blablablabakaffrfkwfsrf"];
var workUrl = 'https://wind-bow.gomix.me/twitch-api';
// Сonverting usernames to lower case for easily further search
for(let i = 0, n = userNames.length; i < n; i++){
	userNames[i] = userNames[i].toLowerCase();
};

// This function takes an id of the appropriate row and the username and then
// fill this row with the information which corresponds to this username
function fillRow(rowId, userName){
	$.getJSON(workUrl + '/channels/' + userName + '?callback=?', function(data) {
		// write logo
		if(data.logo){
			$("#" + rowId).append('<div class="col-xs-2 logo vcenter"><a href="https://www.twitch.tv/' + userName + '" target="_blank"><img class="img-circle img-responsive" src="' 
				+ data.logo + '"></a></div>');
		}
		else {
			$("#" + rowId).append('<div class="col-xs-2 logo vcenter"><a href="https://www.twitch.tv/'
				+ userName + '" target="_blank"><img class="img-circle img-responsive" src="http://res.cloudinary.com/dtnyso8nn/image/upload/v1485194092/tvitchtv/blanck_logo1.png"></a></div>');	
		};
		// write obtained channel name
		if (data.display_name) {
			$("#" + rowId).append('<div class="col-xs-7 vcenter info"><a href="https://www.twitch.tv/' + userName + '" target="_blank"><h3>' 
				+ data.display_name + '</h3></a></div>');
		}
		// if not exist write username from userNames array
		else{
			$("#" + rowId).append('<div class="col-xs-7 vcenter info"><a href="https://www.twitch.tv/' + userName + '" target="_blank"><h3>' 
			+ userName + '</h3></a></div>');
		};
		// appending the status for the non existiong channels, and instead of the online/offline mark write the error info
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
				$.getJSON(workUrl + '/streams/' + userName + '?callback=?', function(data) {
					if (jQuery.isEmptyObject(data.stream)) {	
						$("#" + rowId).addClass("offline"); 				
	  						$("#" + rowId).append('<div class="col-xs-3 vcenter"><img class="online-mark" src="http://res.cloudinary.com/dtnyso8nn/image/upload/v1485635805/tvitchtv/offline-mark.png" alt="Offline"></div>');
					}
					else {
						$("#" + rowId).addClass("online");
						$("#" + rowId).append('<div class="col-xs-3 vcenter"><img class="online-mark" src="http://res.cloudinary.com/dtnyso8nn/image/upload/v1485635805/tvitchtv/online-mark.png" alt="Online"></div>');
					};
				});	
			}
			// if channel has status info - write this status and make next request
			else {
				$("#" + rowId + " .info").append('<p class="status">' + data.status + '</p>');
				$.getJSON(workUrl + '/streams/' + userName + '?callback=?', function(data) {
					if (jQuery.isEmptyObject(data.stream)) {	 
						$("#" + rowId).addClass("offline");				
	  						$("#" + rowId).append('<div class="col-xs-3 vcenter"><img class="online-mark" src="http://res.cloudinary.com/dtnyso8nn/image/upload/v1485635805/tvitchtv/offline-mark.png" alt="Offline"></div>');
					}
					else {
						$("#" + rowId).addClass("online");
						$("#" + rowId).append('<div class="col-xs-3 vcenter"><img class="online-mark" src="http://res.cloudinary.com/dtnyso8nn/image/upload/v1485635805/tvitchtv/online-mark.png" alt="Online"></div>');
					};
				});	
			};
		};	
	});
}

// This function takes the usernames from the userNames list and print corresponding information to the page
function printResult() {
		for(var i = 0, n = userNames.length; i < n; i++) { 
		let rowNum = i;
		let rowId = "row" + i;
		$(".result").append('<div id="' + rowId + '" class="row"></div>');
		fillRow(rowId, userNames[i]);
	};
		
}

// This function makes the filter radio buttons filter the results
function filterResult() {
	//Add one event listener to the button group and then define what button was clicked depends on the event.target.id
	$('.btn-group').on('click',  						
	function(event){
		if (event.target.id === "all") {
			$(".offline").show("slow");
			$(".not-exist").show("slow");
			$(".online").show("slow");
			
		}
		else if (event.target.id === "online") {
			$(".offline").hide("slow");
			$(".not-exist").hide("slow");
			$(".online").show("slow");
			
		}
		else {
			$(".not-exist").hide("slow");
			$(".online").hide("slow");
			$(".offline").show("slow");
		}
	});	
}

// This function print the result to the top of the page according to the user's input
function addResult(event) {
	//Check if printed userName is exist in the our username Array if not add it to the array and display on the page
	if (userNames.indexOf($("#text-field").val().toLowerCase()) === -1) {		
		let rowNum =userNames.length; 
		let rowId = 'row' + rowNum; 
		userNames.push($("#text-field").val().toLowerCase());	
		$(".result").prepend('<div id="' + rowId + '" class="row"></div>');
		fillRow(rowId, userNames[rowNum]);		
	}
	// else make alert message
	else {
		alert('Take a closer look please, the channel "' + $("#text-field").val() + '" is already displayed in a list' );
	};
}

$( document ).ready(function(){
	printResult();
	filterResult();
	$("#text-field").on('change',addResult);
	$("#text-field").autocomplete({	
   	source: function(request, response) {
      	$.ajax({
        		type: 'GET',
            url: "https://api.twitch.tv/kraken/search/channels/",
            headers: {
            	'Accept': 'application/vnd.twitchtv.v5+json',
				   'Client-ID': '4cialbjopbvvuhiguy71sb9cfm9bq4' 								
 				},
 				data: {
 					'query': request.term
 				},
            crossOrigin: true,
            dataType: "json",
          	success: function (data) {
          		var autocompleteList = [];
          		for(var i = 0, n = data.channels.length; i < n; i++){
						autocompleteList[i] = data.channels[i].display_name; 	          		
          		}
          		response(autocompleteList);
          	}
			});
		}
	})
});
