var memReqCount = 0;
var scReqCount = 0;
var totCount =  0;
var msgCount = 0;


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
		 document.getElementById('mrspan').innerHTML = s1;
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
         document.getElementById('scspan').innerHTML = s1;		 
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
			s4.style.display = 'none';
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
}



function approveMemberRequests()
{
	
}