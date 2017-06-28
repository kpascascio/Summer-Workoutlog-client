$(document).ready(function(){
	$.extend(WorkoutLog, {
		signup:function(){
			var username = $("#su_username").val();
			var password = $('#su_password').val(); 

			var user = {
				user:{
					username: username,
					password: password
				}
			}

			var signup = $.ajax({
				type:"POST", 
				url: WorkoutLog.API_BASE + "user",
				data: JSON.stringify(user),
				contentType: "application/json"
			})

			signup.done(function(data){
				WorkoutLog.setAuthHeader(data.sessionToken);

				$("#signup-modal").modal("hide");
				$(".disabled").removeClass("disabled");
				$("#loginout").text("Logout")
			}).fail(function(){
				$("#su_error").text("There was a problem with sign up").show();
			})
		}
	})
	$("#signup").on("click", WorkoutLog.signup)
});