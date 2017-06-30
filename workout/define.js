$(document).ready(function(){
	$.extend(WorkoutLog, {
		definition: {
			userDefinition : [],

			create: function(){
				var def = {
					desc: $("#def-description").val(),
					type: $("#def-logtype").val()
				}

				var postData = { definition: def };

				var define = $.ajax({
					type: "POST", 
					url: WorkoutLog.API_BASE + "definition",
					data: JSON.stringify(postData), 
					contentType: "application/json"
				})
				define.done(function(data){
					WorkoutLog.definition.userDefinition.push(data.definition);
				}).fail(function(err){
					console.log(err);
				});

			},

			fetchAll: function(){
				if( window.localStorage.getItem("sessionToken")){
					WorkoutLog.definition.fetchAll();
				}
			}
		}
	})

	$('#def-save').on('click', WorkoutLog.definition.create);

})