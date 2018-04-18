


function signed_in()
{
	firebase.auth().onAuthStateChanged(function(user) {

	if(user!==null)
	{
			
		console.log(JSON.stringify(user));

		var userId = user.uid;

		firebase.database().ref('/members/' + userId).once('value').then(function(snapshot) {
  			userProperty=snapshot.val();
			//console.log(userProperty.fullname);
			console.log("hudai");
			console.log(userProperty.username);
			console.log(userProperty.email);
		});

    		//console.log("User state changed");
            //console.log("User signed out");
		   window.location.href = "index.html";
                return true;
  	}
	else {
    		console.log("No user is signed in.");
                return false;
  	}
	});
	
}


function login_func()
{
		
	const psw = document.getElementById('pass3');
	const email = document.getElementById('em2');
	

	const email_val = email.value;
	const pass_val = psw.value;
	const auth = firebase.auth();

	console.log("something nnn\n");
	
	const promise = auth.signInWithEmailAndPassword(email_val,pass_val);
	
	signed_in();	

	console.log("After sign in\n");
	
	promise.catch(e => console.log(e.message));

}





