
function log_out()
{
	firebase.auth().signOut().then(function() {
 	alert('Signed Out');
	window.location.href = "index.html";
	}, function(error) {
  		console.error('Sign Out Error', error);
	});
}