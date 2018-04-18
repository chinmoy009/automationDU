window.onload = function()
{
	var name = localStorage.getItem("username");
	console.log(name);
	document.getElementById('uname').innerHTML = name;
}