window.onload  = function()
{
	var a = document.getElementById('sup');
	var so = document.getElementById('sout');
	var un = document.getElementById('un');
	var em = document.getElementById('em');
	var ty = document.getElementById('type');
	var gn = document.getElementById('gn');
    firebase.auth().onAuthStateChanged(function(user) {
	  if (user) {
		var userId = user.uid;
		firebase.database().ref('/members/' + userId).once('value').then(function(snapshot) {
  			userProperty=snapshot.val();
			
			a.innerHTML = userProperty.username;
			a.href = "userProfile.html";
			
			so.innerHTML = "Sign Out";
			un.innerHTML = userProperty.username;
			em.innerHTML = userProperty.email;
			ty.innerHTML = userProperty.type;
			gn.innerHTML = userProperty.gender;
			var pro = userProperty.prourl;
			if(pro)
			{
				var img = document.getElementById("propic");
				img.src = pro;
			}
			else
			{
				var img = document.getElementById("propic");
				img.src = "www.expogeorgia.ge/wp-content/uploads/2015/09/anonymous-user.png";
			}

			
		});

		
	  } 
});
}