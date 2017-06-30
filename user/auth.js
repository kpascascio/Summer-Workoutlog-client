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
		},

		login : function(){
			var username = $("#li_username").val();
			var password = $("#li_password").val();

			var user = {
				user:{
					username: username, 
					password: password
				}
			}

			var login = $.ajax({
				type: "POST",
				url: WorkoutLog.API_BASE + "login",
				data : JSON.stringify(user), 
				contentType: "application/json"
			})

			login.done(function(data){
				console.log(data)
				if(data.sessionToken){
					WorkoutLog.setAuthHeader(data.sessionToken)
				}

				$("#login-modal").modal("hide");
				$(".disabled").removeClass("disabled");
				$("#loginout").text("Logout")
			}).fail(function(){
				$("#li_error").text("There was a problem with sign up man").show()
			})

		},

		logout: function(){
			if(window.localStorage.getItem("sessionToken")){
				window.localStorage.removeItem("sessionToken");
				$("#loginout").text("Login");
			}
		}

	})
	$("#signup").on("click", WorkoutLog.signup);
	$("#login").on('click', WorkoutLog.login);
	$("#loginout").on('click', WorkoutLog.logout);

	if(window.localStorage.getItem("sessionToken")){
		$("#loginout").text("Logout");
	}
});