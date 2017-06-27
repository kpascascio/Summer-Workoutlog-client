// short hand notation for the keyword jQuery
$(document).ready(function(){
	$('#testAPI').on('click', function(){
		console.log("Hey it's working")
	})

	var test = $.ajax({
		type: "GET",
		url: "http://localhost:3000/api/test"
	})
	// .done() = deferred promise
	test.done()

});