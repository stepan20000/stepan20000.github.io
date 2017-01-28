//Client ID: 4cialbjopbvvuhiguy71sb9cfm9bq4
// This array is a list with usernames
var userNames = ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas", "brunofin",
	"comster404", "blablablabakaffrfkwfsrf"];
var workUrl = 'https://wind-bow.gomix.me/twitch-api';
// Сonverting usernames to lower case for easily further search
for(let i = 0, n = userNames.length; i < n; i++){
	userNames[i] = userNames[i].toLowerCase();
};

// This function takes the id of the appropriate row and the username and then
// fill this row with the information which correspond this username
function fillRow(rowId, userName){
	$.getJSON(workUrl + '/channels/' + userName + '?callback=?', function(data) {
		// write logo
		if(data.logo){
			$("#" + rowId).append('<div class="col-xs-2 logo vcenter"><img class="img-circle img-responsive" src="' + data.logo + '"></div>');
		}
		else {
			$("#" + rowId).append('<div class="col-xs-2 logo vcenter"><img class="img-circle img-responsive" src="http://res.cloudinary.com/dtnyso8nn/image/upload/v1485194092/tvitchtv/blanck_logo1.png"></div>');	
		};
		// write obtained channel name
		if (data.display_name) {
			$("#" + rowId).append('<div class="col-xs-7 vcenter info"><h4>' + data.display_name + '</h4></div>');
		}
		// if not exist username from userNames array
		else{
			$("#" + rowId).append('<div class="col-xs-7 vcenter info"><h4>' + userName + '</h4></div>');
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
				$.getJSON(workUrl + '/streams/' + userName + '?callback=?', function(data) {
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
				$.getJSON(workUrl + '/streams/' + userName + '?callback=?', function(data) {
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

// This function takes the usernames from the userNames list and print corresponding information to the page
function printResult() {
		for(var i = 0, n = userNames.length; i < n; i++) { 
		let rowNum = i;
		let rowId = "row" + i;
		$(".result").append('<div id="' + rowId + '" class="row"></div>');
		fillRow(rowId, userNames[i]);
	};
		
}

// This function makes the filter radiobuttons filter the results
function filterResult() {
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
}

// This function print the result to the top of the page according to the user's input
function addResult(event) {
	if (userNames.indexOf($("#text-field").val().toLowerCase()) === -1) {		
		let rowNum =userNames.length; 
		let rowId = 'row' + rowNum; 
		userNames.push($("#text-field").val().toLowerCase());	
		$(".result").prepend('<div id="' + rowId + '" class="row"></div>');
		fillRow(rowId, userNames[rowNum]);		
	}
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
