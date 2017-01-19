	function printResult(data) {
		$(".cell").remove();
		for(var i = 0, n = data[1].length; i < n; i++){
			var $newLink = $('<a href="'+data[3][i]+'" target="_blank"><h3>'+data[1][i]+'</h3></a>');
			var $newText = $('<p>' + data[2][i] +'</p>');
			var $newDiv = $('<div class="cell"></div>');
			$newDiv.appendTo(".result");
			$newLink.appendTo($newDiv);
			$newText.insertAfter($newLink);
  		};
	}

$( document ).ready(function(){
	
	
	$( "p" ).on( "keyup", function (event) {
			if (event.target.value === "") {
				$(".cell").remove();
				$(".window").css({"margin-top" : "10%"});
				$(".logo").css({"float" : "none"});
				$(".input").css({"float" : "none", "margin-left" : "px"});
				$("#logo-img").css({"max-width" : "170px"});			
			}
			else {
				$(".window").css({"margin-top": "0%"});
				$(".logo").css({"float" : "left"});
				$(".input").css({"float" : "left", "margin-left" : "40px"});
				$("#logo-img").css({"max-width" : "110px"});						
			};				
		});
	$("#text-field").autocomplete({
	    source: function(request, response) {;
	        $.ajax({
	            url: "https://en.wikipedia.org/w/api.php",
	            crossOrigin: true,
	            dataType: "jsonp",
	            data: {
	                'action': "opensearch",
	                'format': "json",
	                'search': request.term
	            },
	            success: printResult
	        });
	    }
	});

});