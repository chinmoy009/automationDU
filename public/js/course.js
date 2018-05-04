
function enrollment(name)
{
	var courseId;
	console.log("I am inside enrollment");
	firebase.auth().onAuthStateChanged(function(user) {
	  if (user) {
		var uname;
		var userId = user.uid;
		console.log(userId);
		firebase.database().ref('members/'+userId).once("value").then(function(snap){
			var d2 = snap.val();
			var f  = false;
			var s="";
			if(d2.memberOf)
			{
				var m = d2.memberOf;
				var i;
				for(i=0;i<m.length;i++)
				{
					if(m[i] === ' ')
					{
						var se = s.toLowerCase();
						if(se === name)  f = true;
						s = "";
					}
					else if(i==(length-1))
					{
						s+=m[i];
						var se = s.toLowerCase();
						if(se === name) f=true;
						s="";
					}
					else
					{
						s+=m[i];
					}
				}
			}
			if(f)
			{
				firebase.database().ref('members/'+userId).once("value").then(function(snapshot){
					var data = snapshot.val();
					uname = data.username;
				});
				var flag = false;
				firebase.database().ref('courseDistribution').orderByKey().once("value").then(function(snapshot){
					snapshot.forEach(function(userSnapshot){
						var d1 = userSnapshot.val();
						var course = d1.course;
						var stcount = d1.stcount;
						var limit = d1.limit;
						var courseID = d1.courseId;
						if(course === name)
						{
							if(stcount === limit) console.log("saturated "+courseID); 
						}
						else
						{
							if(!flag)
							{
								flag = true;
								courseId = courseID;
								stcount = stcount + 1;
								console.log("stcount "+stcount);
								firebase.database().ref('courseDistribution/'+courseID).update({
									stcount : stcount
								}).then(function(){
									console.log("Student count updated");
								}).catch(function(error){
									console.log("Error in updating student count");
								});
								
							}
							
						}
					});
				});
				var st;
				if(flag)
				{
					firebase.database().ref('courses/'+name).once("value").then(function(snapshot){
						var data = snapshot.val();
						st = data.st;
						if(st==="closed")
						{
						   alert("This course is currently not available,you can not enroll now :) ");
						   return true;
						}
						else
						{
							
						  firebase.database().ref('members/'+userId).once("value").then(function(sn){
							  var d3 = sn.value();
							  if()
						  });	
						  firebase.database().ref('members/' + userId ).update({
						  courses : courseId
						  }).then(function() {
							console.log('Data write succeeded');
							alert("Welcome "+uname+", You are enrolled to "+name+" course. Your batch is "+courseId);
						  }).catch(function(error) {
								console.log('Data write failed');
						  });
						}
					});
					
				}
				else
				{
					alert("Sorry :( , There is no seat available right now.");
				}
			}
			else
			{
				alert("You are not  a member of "+name.toUpperCase()+"\n You have to be a member before enrolling, to apply for being a member click departments on the navbar");
			}
		});
		console.log(st);
		
		
	}});
}



window.onload = function()
{
	var cn;
	var st;
	var season;
	var a = document.getElementById('sup');
	var so = document.getElementById('sout');
    firebase.auth().onAuthStateChanged(function(user) {
	  if (user) {
		var userId = user.uid;
		firebase.database().ref('/members/' + userId).once('value').then(function(snapshot) {
  			userProperty=snapshot.val();
			
			a.innerHTML = userProperty.username;
			a.href = "userprofile.html";
			
			so.innerHTML = "Sign Out";
			so.setAttribute("data-hover","Sign Out");
			if(userProperty.type === "admin")
			{
				ad.innerHTML = "Admin";
				ad.setAttribute("data-hover","Admin");
			}
			
		});
	  } else {
		  console.log("No user\n");
		  a.innerHTML = "Sign Up";
		  a.href="register.html";
	  }
    });
	var dref = firebase.database().ref("courses");
	dref.orderByKey().once("value").then(function(snapshot)
	{
		snapshot.forEach(function(childSnapshot){
			var data = childSnapshot.val();
			   if(data.courseName === "Swimming")
				{
					st = document.getElementById('sts');
					season = document.getElementById('ss');
				}
				else if(data.courseName === "Gym")
				{
					st = document.getElementById('stg');
					season = document.getElementById('sg');
				}
				else if(data.courseName === "Karate")
				{
					st = document.getElementById('stk');
					season = document.getElementById('sk');
				}
				season.innerHTML = data.season;
				st.innerHTML = data.st;

				
			
		});
	});
}

