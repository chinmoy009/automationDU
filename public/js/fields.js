

function applyForGround()
{
	firebase.auth().onAuthStateChanged(function(user){
		if(user)
		{
			var userId = user.uid;
			var gn = document.getElementById('gn');
			var gnval = gn.options[gn.selectedIndex].value;
			var en = document.getElementById('en').value;
			console.log(en);
			var sf = document.getElementById('sf').value;
			console.log(sf);
			var ea = document.getElementById('ea').value;
			console.log(ea);
			var enP="";
			var i;
			for(i=0;i<en.length;i++)
			{
				if(en[i]===' ') continue;
				else enP+=en[i];
			}
			console.log(enP);
			if(new Date(ea)> new Date(sf))
			{
				if(new Date(ea) > new Date())
				{
					firebase.database().ref('schedule/' + gnval+'/'+enP).set({
						name : en,
						start : sf,
						end : ea,
						field: gnval,
						type : "pending",
						bookedBy : userId
					}).then(function(){
						console.log("Data write successfull");
						alert("Your request is  submitted for approval");
						window.location.href="index.html";
					}).catch(function(error){
						  console.log("Data write failed");
					});
				}
				else
				{
					alert("Tournament to sesh vai , ekhn schedule book korben? kemne ki? :|");
				}
			}
			else
			{
				alert("Tournament shurur agei sesh hoy kmne ? :| ki odvut ");
			}
			
		}
		else
		{
			alert("You have to log in first to apply for ground");
		}
	});
} 