function membership(deptName)
{
	

	firebase.auth().onAuthStateChanged(function(user){
         if(user)
         {
         	var userId = user.uid;
			var idNum = document.getElementById('id').value;
			var bg = document.getElementById('blood-group');
	        var bgval = bg.options[bg.selectedIndex].value;
			var crn = document.getElementById('crn').value;
			var rpn = document.getElementById('rpn').value;
			firebase.database().ref('members/'+userId).once("value").then(function(snapshot){
				var data  = snapshot.val();
				var flag = false;
				if(data.memberOf)
				{
					console.log(data.memberOf);
					var i;
					var s="";
					var m = data.memberOf;
					for(i=0;i<m.length;i++)
					{
						if(m[i] === ' ')
						{
							
							if(s === deptName)
							{
								flag= true;
								s="";
							}
							else s="";
								
						}
						else if(i==(m.length-1))
						{
							s+=m[i];
							if(s === deptName)
							{
								flag= true;
								s="";
							}
							else s="";
						}
						else
						{
							s+=m[i];
						}
					}
				}
				if(flag) 
				{
					alert("You are already a member of "+deptName);
				}
				else
				{
					firebase.database().ref("memberRequests/"+deptName+'/'+userId).set({
						user : userId,
						id_number : idNum,
						dept : deptName,
						blood_group : bgval,
						closeRelative : crn,
						relativePhone : rpn,
						type : "pending"
					}).then(function(){
						console.log("Data write successful");
						alert("Your membership request is submitted for processing, you will notified about the next procedure");
						window.location.href="index.html";
					}).catch(function(error){
						  console.log("Data write failed");
					});
					
				}
			});
         }
         else
         {
         	alert("You have to login first before applying to be a member");
         }
	});
}