
window.onload = function()
{
	
	var a = document.getElementById('sup');
	var so = document.getElementById('sout');
	var ad =document.getElementById('ad');
    firebase.auth().onAuthStateChanged(function(user) {
	  if (user) {
		var userId = user.uid;
		firebase.database().ref('/members/' + userId).once('value').then(function(snapshot) {
  			userProperty=snapshot.val();
			
			a.innerHTML = userProperty.username;
			a.href = "userProfile.html";
			
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
}