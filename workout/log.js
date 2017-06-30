$(document).ready(function(){
	$.extend(WorkoutLog, {
		log:{
			workouts: [],

			setDefinitions: function(){
				var defs = WorkoutLog.definition.userDefinition;
				var len = defs.length; 
				var opts;

				for(var i = 0; i < len; i++){
					opts += "<option value='" + defs[i].id +"'>" + defs[i].description + "</option>";
				}

				$("#log-definition").children().remove();
				$("#log-definition").append(opts)
			},

			setHistory: function(){
				var history = WorkoutLog.log.workouts;
				var len = history.length; 
				var lis = "";
				console.log(history)
				for(var i = 0; i < len; i++){
					lis += "<li class='list-group-item'>" + history[i].def + " - " + history[i].result +
					"<div class ='pull-right'>" + "<button id='"+ history[i].id+ "' class='remove'><strong>X</strong></button>"
					 +"</div></li>"
				}

				$("#history-list").children().remove();
				$("#history-list").append(lis)
			},

			create: function(){
				var itsLog = {
					description: $("#log-description").val(),
					result: $("#log-result").val(),
					def: $("#log-definition option:selected").text()
				}; 
				var postData = { log: itsLog }; 
				var logger = $.ajax({
					type:"POST", 
					url: WorkoutLog.API_BASE + "log",
					data: JSON.stringify(postData), 
					contentType: "application/json"
				})

				logger.done(function(data){
					WorkoutLog.log.workouts.push(data)
				})

			},

			fetchAll: function(){
				var fetchDefs = $.ajax({
					type: "GET",
					url: WorkoutLog.API_BASE + "log",
					headers: {
						"Authorization": window.localStorage.getItem("sessionToken")
					} 
				})

				fetchDefs.done(function(data){
					WorkoutLog.log.workouts = data;
				}).fail(function(err){
					console.log("Hey this happend ->" + err)
				})
			},

			delete: function(){
				var thisLog = {
					id: $(this).attr("id")
				};

				var deleteData = {log: thisLog };
				var deleteLog = $.ajax({
					type: "DELETE",
					url: WorkoutLog.API_BASE + "log",
					data: JSON.stringify(deleteData),
					contentType: "application/json"
				});

				$(this).closest("li").remove();

				for(var i = 0; i < WorkoutLog.log.workouts.length; i++){
					if(WorkoutLog.log.workouts[i].id == thisLog.id ){
						WorkoutLog.log.workouts.splice(i, 1);
					}
				}

				deleteLog.fail(function(){
					console.log("the workout was not deleted");
				})

			}
		}
	})

	$("#log-save").on('click', WorkoutLog.log.create)
	$("#history-list").delegate('.remove', 'click', WorkoutLog.log.delete)
	if (window.localStorage.getItem("sessionToken")){
		WorkoutLog.log.fetchAll();
	}

})