// All comments are for not experienced peoples like me now

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
  //Declare function getQuote
  function getWiki(event) {
  		// Declare variable with our url with quote
		var wikiUrl = "https://en.wikipedia.org/w/api.php?action=opensearch&search=" + event.target.value;
      // Call our first function doCORSRequest and give it as agrument an object with method and url
      // function printResult parses respond and print a result in to html 
      doCORSRequest({
        method: 'GET',
        url: wikiUrl,
      }, printResult);

  }
	function printResult(result) {
      		var $json = JSON.parse(result); 
		for(var i = 0, n = $json[1].length; i < n; i++){
			var $newLink = $('<a href="'+$json[3][i]+'" target="_blank"><h3>'+$json[1][i]+'</h3></a>');
			var $newText = $('<p>' + $json[2][i] +'</p>');
			var $newDiv = $('<div class="cell"></div>');
			$newDiv.appendTo(".result");
			$newLink.appendTo($newDiv);
			$newText.insertAfter($newLink);		
		}  
  }
  


$( document ).ready(function(){
	
	$( "p" ).on( "change", getWiki );
	$("#text-field").autocomplete({
	    source: function(request, response) {
	        $.ajax({
	            url: "http://en.wikipedia.org/w/api.php",
	            dataType: "jsonp",
	            data: {
	                'action': "opensearch",
	                'format': "json",
	                'search': request.term
	            },
	            success: function(data) {
	                response(data[1]);
	            }
	        });
	    }
	});

});