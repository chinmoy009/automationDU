function sendAuthMsg()
{
	var name = document.getElementById('name').value;
	var email = document.getElementById('em').value;
	var msg = document.getElementById('msg').value;
	var id =  "";
	if(msg.length >= 2)
	{
		var i;
		for(i=0;i<2;i++) id+=msg[i];
	}
	else id.concat(msg);
	var d = new Date();
	var hours = d.getHours();
	  var minutes = d.getMinutes();
	  var ampm = hours >= 12 ? 'pm' : 'am';
	  hours = hours % 12;
	  hours = hours ? hours : 12; // the hour '0' should be '12'
	  minutes = minutes < 10 ? '0'+minutes : minutes;
	  var strTime = hours + ':' + minutes + ' ' + ampm;
	firebase.database().ref('feedback/'+id).set({
		name : name,
		email : email,
		msg  : msg,
		time : strTime
	}).then(function(){
		alert("Feedback sent");
	}).catch(function(error){
		console.log("Error in sending feedback");
	});
}