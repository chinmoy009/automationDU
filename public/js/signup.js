// Chinmoy Chakraborty, Saklain Zaman, Sameen Wasif Hussain 


const firstname= document.getElementById('fn');
const lastname = document.getElementById('ln');
const username = document.getElementById('un');
const psw = document.getElementById('pass');
const conpsw = document.getElementById('pass2');
const email = document.getElementById('em');


var name = " ";

function getMemberType(){
	if(document.getElementById('r1').checked) return document.getElementById('r1').value;
	else if(document.getElementById('r2').checked) return document.getElementById('r2').value;
	else if(document.getElementById('r3').checked) return document.getElementById('r3').value;
}

function getGender(){
	if(document.getElementById('r0').checked) 
	{
		var g =  document.getElementById('r0').value;
		console.log(g);
		return g;
	}
	else if(document.getElementById('r5').checked)
	{
		
		var g =  document.getElementById('r0').value;
		console.log(g);
		return g;
	
	}
}

var config = {
    apiKey: "AIzaSyC2JvJTDgo4Phyv4U-23Vk03ZkUtm3-b1E",
    authDomain: "automation-c28ac.firebaseapp.com",
    databaseURL: "https://automation-c28ac.firebaseio.com",
    projectId: "automation-c28ac",
    storageBucket: "automation-c28ac.appspot.com",
    messagingSenderId: "974876054664"
  };
  firebase.initializeApp(config);
  
  
  function getUserName()
  {
	  return name;
  }

// Chinmoy Chakraborty

 var userNameValidation = function()
 {
 	var uname = document.getElementById('un').value;
 	this.getConfirmation = function()
 	{
          if(uname.length>=6) return true;
          else
          {
          	 alert("UserName should be at least of 6 characters");
          	 return false;
          }
 	}
 };

 var passwordValidation = function()
 {
 	var psw = document.getElementById('pass').value;
 	var conpsw = document.getElementById('pass2').value;
 	this.getConfirmation = function()
 	{
 		if(psw.length>=6)
 		{
 			if(psw === conpsw)
 			{
 				return true;
 			}
 			else
 			{
 				alert("Password does not match");
 				return false;
 			}
 		}
 		else
 		{
 			alert("Password should be at least of 6 characters");
 			return false;
 		}
 	}
 }

 /**** facade pattern ****/
 // Sameen Wasif Hussain

var signUpObject = function() {
    // Make quick references to our fields.
	var fname = document.getElementById('fn').value;
	var uname = document.getElementById('un').value;
	var email = document.getElementById('em').value;
	var psw = document.getElementById('pass').value;
	var conpsw = document.getElementById('pass2').value;
	localStorage.setItem("username",uname);

	var unameVal = new userNameValidation();
	var passVal = new passwordValidation();

	this.operation  = function()
	{
			if(unameVal.getConfirmation())
		    {
				if(passVal.getConfirmation())
				{
					complete_signup();
				}
		    }

	}
};

// Saklain Zaman

function complete_signup() {
	const email_val = email.value; //check for real email
	const pass_val = psw.value;
	const gend = getGender();
	const memType = getMemberType();
	const auth = firebase.auth();
	

	const promise = auth.createUserWithEmailAndPassword(email_val,pass_val).catch(function	(error) {
		console.log(error.message);
	});


	firebase.auth().onAuthStateChanged(function(user) {
		if (user) {
			console.log("Signed Up "+ JSON.stringify(user));
			const userId = user.uid;
			firebase.database().ref('members/' + userId).set({
				firstname: firstname.value,  
                lastname : lastname.value,				
				username: username.value,
				email: email_val,
				gender : gend,
				type : memType,
				userID: userId
			}).then(function() {
				console.log('Data write succeeded');
				alert("Sign up complete");
				window.location.href = "index.html";
			})
			.catch(function(error) {
				console.log('Data write failed');
			});


			//OBSERVER ADD
			/*firebase.database().ref('userlist/'+ userId).set({
				fullname: firstname.value,    		
			}).then(function() {
				console.log('Data write succeeded');	
				alert("Sign up complete");
				window.location="index.html";
			})
			.catch(function(error) {
				console.log('Data write failed2');
			});*/
		} 
		else {
			console.log("No user is signed up.")
		}
	});
}


function user_doSomething()
{
    console.log("hello\n");
	var newObject = new signUpObject();
	newObject.operation();
}