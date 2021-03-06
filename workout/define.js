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
					$("a[href='#log'").tab("show");
					$("#def-description").val("");
					$("#def-logtype").val("");
				}).fail(function(err){
					console.log(err);
				});

			},

			fetchAll: function(){

				var fetchDefs = $.ajax({
					type: "GET",
					url: WorkoutLog.API_BASE + "definition",
					headers:{
						"Authorization" : window.localStorage.getItem("sessionToken")
					}
				})

				fetchDefs.done(function(){
					WorkoutLog.definition.userDefinition = data
				}).fail(function(err){
					console.log(err)
				})

				if( window.localStorage.getItem("sessionToken")){
					WorkoutLog.definition.userDefinition;
				}
			}
		}
	})

	$('#def-save').on('click', WorkoutLog.definition.create);

})