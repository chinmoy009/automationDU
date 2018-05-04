var memReqCount = 0;
var scReqCount = 0;
var totCount =  0;



window.onload = function()
{
	
	console.log("in");
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
			var br1 = document.createElement("BR");
			a1.appendChild(br1);
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
	
	
	console.log("main section");
	
	firebase.database().ref('memberRequests').orderByKey().once("value").then(function(snapshot){
		 snapshot.forEach(function(childSnapshot){
			 childSnapshot.forEach(function(userSnapshot){
				 var data = userSnapshot.val();
				console.log(data.type);
				if(data.type === "pending")
				{
					
					 var idNum = data.id_number;
					 var dept = data.dept;
					 var userId = data.user;
					 var fullName="";
					 var email;
					 var gender;
					 console.log(idNum);
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
					 var t1 = document.createTextNode(dept);
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
						 var p2 = document.createElement("P");
						 var t2 = document.createTextNode(fullName);
						 p2.appendChild(t2);
						 var p3 = document.createElement("P");
						 var t3 = document.createTextNode(email);
						 p3.appendChild(t3);
						 var s1 ="ID Number: ";
						 var s2 = s1.concat(idNum);
						 var p4 = document.createElement("P");
						 var t4 = document.createTextNode(s2);
						 p4.appendChild(t4);
						 s1 = "Gender: ";
						 s2 = s1.concat(gender);
						 var p5 = document.createElement("P");
						 var t5 = document.createTextNode(s2);
						 p5.appendChild(t5);
						 d3.appendChild(p2);
						 d3.appendChild(p3);
						 d3.appendChild(p4);
						 d3.appendChild(p5); 
						 var b2 = document.createElement("BUTTON");
						 var t6 = document.createTextNode("APPROVE");
						 b2.setAttribute("class","apbutton");
						 b2.appendChild(t6);
						 //b2.setAttribute("onclick","approve(\''+userId+'\');");
						 b2.onclick=approve(userId,dept);
						 var b3 = document.createElement("BUTTON");
						 var t7 = document.createTextNode("DECLINE");
						 b3.setAttribute("class","apbutton");
						 b3.appendChild(t7);
						 //b3.setAttribute("onclick","decline(\''+userId+'\');");
						 b3.onclick = decline(userId,dept);
						 var br1 = document.createElement("BR");
						 d3.appendChild(b2);
						 d3.appendChild(b3);
					 });
				}
				 
			 });
		});
	});
}



var approve  = function(userId, dept)
{
	return function()
    {
		firebase.database().ref('memberRequests/'+dept+'/'+userId).update({
			type : "approved"
		}).then(function(){
			alert("request approved");
			window.location.href = "memberRequest.html";
		}).catch(function(error){
			console.log("Error in approving");
		});
		firebase.database().ref('members/'+userId).once("value").then(function(snapshot){
			var data = snapshot.val();
			var s;
			if(data.memberOf)
			{
				var mem = data.memberOf;
				mem+=' ';
				s = mem.concat(dept);
			}
			else
			{
				s = dept;
			}
			firebase.database().ref('members/'+userId).update({
				memberOf : s
			}).then(function(){
				console.log("memberOf updated");
			}).catch(function(error){
				console.log("memberOf update error");
			});
		});
		
	}
}


var decline = function(userId,dept)
{
	return function()
	{
		firebase.database().ref('memberRequests/'+dept+'/'+userId).remove();
		alert("Declined");
		window.location.href = "memberRequest.html";
	}
}