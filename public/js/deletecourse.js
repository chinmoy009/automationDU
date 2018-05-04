var memReqCount = 0;
var scReqCount = 0;
var totCount =  0;


window.onload = function()
{
     firebase.database().ref('memberRequests').orderByKey().once("value").then(function(snapshot){
		 snapshot.forEach(function(childSnapshot){
			 childSnapshot.forEach(function(userSnapshot){
				 var data = userSnapshot.val();
				 if(data.type === "pending")
				 {
					 console.log("in memreq");
					 memReqCount = memReqCount + 1;
					 totCount = totCount + 1;
				 }
			 });
			 
		 });
		 console.log("memReqCount "+memReqCount);
		 var s1 = memReqCount.toString();
         var s2 = s1.concat(" Member Requests");
		 if(memReqCount > 0)
		 {
            document.getElementById('notp1').innerHTML = s2;
			document.getElementById('nota1').setAttribute("href","memberRequest.html");	
		 }
		 //document.getElementById('mrspan').innerHTML = s1;
	 });
	 
	 firebase.database().ref('schedule').orderByKey().once("value").then(function(snapshot){
		 snapshot.forEach(function(childSnapshot){
			 childSnapshot.forEach(function(userSnapshot){
				 var data = userSnapshot.val();
				 if(data.type === "pending")
				 {
					 console.log("in secreq");
					 scReqCount = scReqCount + 1;
					 totCount = totCount + 1;
				 }
			 });
		 });
		 console.log("scReqCount "+scReqCount);
		 console.log(totCount);
		 var notCount = totCount.toString();
		 document.getElementById('notspan').innerHTML = notCount;
		 if(totCount > 0)
		 {
			 var s1 = "You have ";
			 var s2 = s1.concat(notCount);
			 var s3 = " notifications";
			 s1 = s2.concat(s3);
			 document.getElementById('notp').innerHTML = s1;
			 s1 = scReqCount.toString();
			 s2 = s1.concat(" Ground Booking Requests");
			 if(scReqCount > 0)
			 {
				 if(memReqCount > 0)
				 {
					document.getElementById('notp2').innerHTML = s2;
					document.getElementById('nota2').setAttribute("href","schedule.html"); 
				 }
				 else
				 {
					document.getElementById('notp1').innerHTML = s2;
					document.getElementById('nota1').setAttribute("href","schedule.html"); 
				 }
			 }
		 }
		 else
		 {
			 document.getElementById('notp').innerHTML = "No notifiacations";
		 }
		 var s1 = scReqCount.toString();
         //document.getElementById('scspan').innerHTML = s1;		 
	 });
	 
	 firebase.database().ref('feedback').orderByKey().once("value").then(function(snapshot){
         var d5 = document.getElementById('msgdiv');
		 var msgNum = document.getElementById('msgnum');
		 var mc = document.getElementById('msgcount');
		 snapshot.forEach(function(userSnapshot){
			msgCount = msgCount + 1;
			var data = userSnapshot.val();
			var a1 = document.createElement("A");
			a1.setAttribute("class","dropdown-item media bg-flat-color-1");
			a1.setAttribute("href","replymsg.html");
			d5.appendChild(a1);
			var s1 = document.createElement("SPAN");
			s1.setAttribute("class","message media-body");
			a1.appendChild(s1);
			var s2 = document.createElement("SPAN");
			s2.setAttribute("class","name float-left");
			var t1 = document.createTextNode(data.name);
			s2.appendChild(t1);
			s1.appendChild(s2);
			var s4 = document.createElement("SPAN");
			s4.setAttribute("class","name float-left");
			var t4 = document.createTextNode(data.email);
			s4.appendChild(t4);
			s1.appendChild(s4);
		    var s3 = document.createElement("SPAN");
			s3.setAttribute("class","time float-left");
			var t2 = document.createTextNode(data.time);
			s3.appendChild(t2);
			s1.appendChild(s3);
			var p1 = document.createElement("P");
			var t3 = document.createTextNode(data.msg);
			p1.appendChild(t3);
			s1.appendChild(p1);
		 });
		 var mcs = msgCount.toString();
		 mc.innerHTML = mcs;
		 var st = "You have ";
		 var st1 = st.concat(mcs);
		 var st2 = st1.concat(" messages");
		 msgNum.innerHTML = st2;
	 });
	 
	 
	 firebase.database().ref('courseDistribution').orderByKey().once("value").then(function(snapshot){
		 snapshot.forEach(function(userSnapshot){
			 var data = userSnapshot.val();
			 var course = data.course;
			 var cid = data.courseId;
			 var dept = data.dept;
			 var userId = data.instructor;
			 var fullName="";
			 //var email;
			 //var gender;
			 //console.log(idNum);
			 var d1 = document.getElementById('condiv');
			 var d2 = document.createElement("DIV");
			 d2.setAttribute("class","card text-white bg-flat-color-1");
			 d1.appendChild(d2);
			 var d3 = document.createElement("DIV");
			 d3.setAttribute("class","card-body pb-0");
			 d2.appendChild(d3);
			 var h4 = document.createElement("H4");
			 h4.setAttribute("class","mb-0");
			 d3.appendChild(h4);
			 var p1 =  document.createElement("P");
			 var t1 = document.createTextNode(course);
			 p1.appendChild(t1);
			 h4.appendChild(p1);
			 firebase.database().ref('members/'+userId).once("value").then(function(usnap){
				 var d2 = usnap.val();
				 var fn = d2.firstname;
				 var ln = d2.lastname;
				 var i;
				 for(i=0;i<fn.length;i++)
				 {
					 fullName += fn[i];
				 }
				 fullName+=' ';
				 for(i=0;i<ln.length;i++)
				 {
					 fullName += ln[i];
				 }
				 email = d2.email;
				 gender = d2.gender;
				 console.log(fullName);
				 var s3 = "Instructor: ";
				 var s4 =  s3.concat(fullName);
				 var p2 = document.createElement("P");
				 var t2 = document.createTextNode(s4);
				 p2.appendChild(t2);
				 /*var p3 = document.createElement("P");
				 var t3 = document.createTextNode(email);
				 p3.appendChild(t3);*/
				 var s1 ="Course ID: ";
				 var s2 = s1.concat(cid);
				 var p4 = document.createElement("P");
				 var t4 = document.createTextNode(s2);
				 p4.appendChild(t4);
				 s1 = "Gender: ";
				 s2 = s1.concat(gender);
				 /*var p5 = document.createElement("P");
				 var t5 = document.createTextNode(s2);
				 p5.appendChild(t5);*/
				 d3.appendChild(p4);
				 d3.appendChild(p2);
				 //d3.appendChild(p4);
				 //d3.appendChild(p5); 
				 var b2 = document.createElement("BUTTON");
				 var t6 = document.createTextNode("DELETE");
				 b2.setAttribute("class","apbutton");
				 b2.appendChild(t6);
				 //b2.setAttribute("onclick","approve(\''+userId+'\');");
				 b2.onclick=deleteCourse(cid);
				 d3.appendChild(b2);
				 //d3.appendChild(b3);
			 });
		 });
	 });
}


var deleteCourse = function(cid)
{
	return function()
	{
		firebase.database().ref('courseDistribution/'+cid).once("value").then(function(snapshot){
			var data = snapshot.val();
			var course = data.course;
			firebase.database().ref('courseDistribution/'+cid).remove();
			alert("Deleted");
			var flag = false;
			firebase.database().ref('courseDistribution').orderByKey().once("value").then(function(snapshot){
				snapshot.forEach(function(userSnapshot){
					var d2 = userSnapshot.val();
					if(d2.course === course)
					{
						flag = true;
					}
				});
			});
			if(!flag)
			{
				firebase.database().ref('courses/'+course).update({
					st : "closed"
				}).then(function(){
					alert("Course status modified");
					window.location.href = "deletecourse.html";
				}).catch(function(error){
					console.log("problem in modifying status");
				});
			}
			else
			{
				window.location.href = "deletecourse.html";
			}
		});
		
		
		
	}
}


