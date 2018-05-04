function updateProfile()
{
     firebase.auth().onAuthStateChanged(function(user){
		 if(user)
		 {
			 var userId = user.uid;
			 var fn = document.getElementById('fn').value;
			 var ln = document.getElementById('ln').value;
			 var em = document.getElementById('em').value;
			 var un = document.getElementById('un').value;
			 firebase.database().ref('members/'+userId).update({
				 firstname : fn,
				 lastname : ln,
				 username : un,
				 email : em
			 }).then(function(){
				 alert("Profile updated successfully");
			 }).catch(function(error){
				 console.log("Update failed");
			 });
			 var file = document.getElementById('propic').files[0];
			 if(!file)
			 {
				 alert("Select a photo before clicking open");
			 }
			 else
			 {
				 var metadata = {
				  contentType: file.type,
				};
				console.log(file.name);
				var uploadTask = firebase.storage().ref().child('UserProPics/'+file.name).put(file, metadata);
				uploadTask.on('state_changed', function(snapshot){
				  // Observe state change events such as progress, pause, and resume
				  // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
				  var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
				  alert('Upload is ' + progress + '% done');
				  switch (snapshot.state) {
					case firebase.storage.TaskState.PAUSED: // or 'paused'
					  console.log('Upload is paused');
					  break;
					case firebase.storage.TaskState.RUNNING: // or 'running'
					  console.log('Upload is running');
					  break;
				  }
				}, function(error) {
				  console.log("ERROR");
				}, function() {
				  alert("Photo uploaded successfully");
				  var downloadURL = uploadTask.snapshot.downloadURL;
				  firebase.database().ref('members/'+userId).update({
					  prourl : downloadURL
				  });
	
				});
			 }
			 window.location.href="userProfile.html";
		 }
	 });
	
}