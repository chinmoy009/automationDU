window.onload  = function()
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
			so.setAttribute("data-hover","Sign out");
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
	firebase.database().ref("schedule/football").orderByKey().once("value").then(function(snapshot){
		snapshot.forEach(function(childSnapshot){
			var data = childSnapshot.val();
			var type  = data.type;
			if(type === "approved")
		    {
				var name = data.name;
			var start = data.start;
			var end = data.end;
			var mid = " to ";
			var s1 = start.concat(mid);
			var s2 = s1.concat(end);
			var div = document.getElementById('ag');
			var div1 = document.createElement("DIV");
			div1.setAttribute("class","col-md-5 about-left-two");
			var h1 = document.createElement("H1");
			h1.style.color = "blue";
		    var t1 = document.createTextNode(name);
			var br = document.createElement("BR");
			h1.appendChild(t1);
			div1.appendChild(h1);
			div1.appendChild(br);
			var p1 = document.createElement("P");
			var t2 = document.createTextNode(s2);
			p1.appendChild(t2);
			div1.appendChild(p1);
			div1.appendChild(br);
			div.appendChild(div1);
				
			}
			
			
		});
	});
}