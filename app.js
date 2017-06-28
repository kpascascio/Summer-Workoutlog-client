// short hand notation for the keyword jQuery
$(document).ready(function(){

	var WorkoutLog = (function($, undefined){
		var API_BASE = "http://localhost:3000/api/"; 

		var userDefinitions = []

		var setAuthHeader = function(sessionToken){
			window.localStorage.setItem("sessionToken", sessionToken);

			$.ajaxSetup({
				"headers":{
					"Authorization": sessionToken
				}
			})

		}

		return {
			API_BASE: API_BASE,
			setAuthHeader: setAuthHeader
		}
	})(jQuery);

	$('.nav-tabs a[data-toggle="tab"]').on("click", function(e){
		var token = window.localStorage.getItem("sessionToken");
		if($(this).hasClass("disabled") && !token){
			e.preventDefault();
			return false;
		}
	})

	$('a[data-toggle="tab"]').on('shown.bs.tab', function(e){
		var target = $(e.target).attr("href");
		if(target === "#log"){
			WorkoutLog.log.setDefinitions();
		}

		if(target === "#history"){
			WorkoutLog.log.setHistory();
		}
	})

	$(document).on('keypress', function(e){
		if(e.which === 13){
			if($("#signup-module").is(":visible")){
				$("#signup").trigger("click");
			}
			if($("#login-modal").is(":visible")){
				$("#login").trigger("click");
			}
		} 
	})

	var token = window.localStorage.getItem("sessionToken")
	if(token){
		WorkoutLog.setAuthHeader(token)
	}
	window.WorkoutLog = WorkoutLog


})