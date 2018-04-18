
window.onload = function()
{
	
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
			//so.data-hover = "Sign Out";
			
		});
	  } else {
		  console.log("No user\n");
		  a.innerHTML = "Sign Up";
		  a.href="register.html";
	  }
    });
}