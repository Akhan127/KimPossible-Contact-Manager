
var urlBase = 'http://callmebeepus.world'; // URL for our website
var extension = "php"; // Variable which holds the php extension which is utilized to create file names

// Variables to contain information; 0 signifies the beginning of the UserID count; "" signifies empty string
var UserID = 0;
var firstName = "";
var lastName = "";


// Creates json with username and password and relays it to the API 
// DONE!
function doLogin()
{
	UserID = 0;
	firstName = "";
	lastName = "";
	
	// Fetches the username from the textbox 
	var username = document.getElementById("username").value;
	// Fetches the password from the textbook
	var password = document.getElementById("password").value;
	
	document.getElementById("loginResult").innerHTML = ""; 
	
	var jsonPayload = '{"username" : "' + username + '", "password" : "' + password + '"}';
	var url = urlBase + '/Login.' + extension;
	
	var xhr = new XMLHttpRequest();
	xhr.open("POST", url, false);
	xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
	try
	{
		xhr.send(jsonPayload);
		
		var jsonObject = JSON.parse( xhr.responseText );
		
		userId = jsonObject.id;
		
		if( userId < 1 )
		{
			document.getElementById("loginResult").innerHTML = "User/Password combination incorrect";
			return;
		}
		
		firstName = jsonObject.First_Name;
		lastName = jsonObject.Last_Name;

		document.getElementById("userName").innerHTML = firstName + " " + lastName;
		
		document.getElementById("loginName").value = "";
		document.getElementById("loginPassword").value = "";
		
		hideOrShow( "loggedInDiv", true);
		hideOrShow( "accessUIDiv", true);
		hideOrShow( "loginDiv", false);
	}
	catch(err)
	{
		document.getElementById("loginResult").innerHTML = err.message;
	}
	
}

// Allows new user to make an account
function register()
{
	
}

// DONE
function doLogout()
{
	userId = 0;
	firstName = "";
	lastName = "";	

	hideOrShow( "loggedInDiv", false);
	hideOrShow( "accessUIDiv", false);
	hideOrShow( "loginDiv", true);
}

// DON'T CHANGE - DONE
function hideOrShow( elementId, showState )
{
	var vis = "visible";
	var dis = "block";
	if( !showState )
	{
		vis = "hidden";
		dis = "none";
	}
	
	document.getElementById( elementId ).style.visibility = vis;
	document.getElementById( elementId ).style.display = dis;
}

// DONE!
function addContact()
{
	var newContact = document.getElementById("contactText").value;
	document.getElementById("contactAddResult").innerHTML = "";
	
	var jsonPayload = '{"ContactID" : "' + ContactID + '","UserID" : "' + UserID + '", "First_Name" : "' + First_Name + '", "Last_Name" : "' + Last_Name + '","Phone" : "' + Phone + '","Email" : "' + Email + '","Address" : "' + Address + '}';
	var url = urlBase + '/AddContact.' + extension;
	
	var xhr = new XMLHttpRequest();
	xhr.open("POST", url, true);
	xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
	try
	{
		xhr.onreadystatechange = function() 
		{
			if (this.readyState == 4 && this.status == 200) 
			{
				document.getElementById("contactAddResult").innerHTML = "Contact has been added";
			}
		};
		xhr.send(jsonPayload);
	}
	catch(err)
	{
		document.getElementById("contactAddResult").innerHTML = err.message;
	}
	
}

function searchContact()
{
	var srch = document.getElementById("searchText").value;
	document.getElementById("contactSearchResult").innerHTML = "";
	
	var contactList = document.getElementById("contactList");
	contactList.innerHTML = "";
	
	var jsonPayload = '{"search" : "' + srch + '"}';
	var url = urlBase + '/SearchContacts.' + extension;
	
	var xhr = new XMLHttpRequest();
	xhr.open("POST", url, true);
	xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
	try
	{
		xhr.onreadystatechange = function() 
		{
			if (this.readyState == 4 && this.status == 200) 
			{
				hideOrShow( "contactList", true );
				
				document.getElementById("contactSearchResult").innerHTML = "Contact(s) has been retrieved";
				var jsonObject = JSON.parse( xhr.responseText );
				
				var i;
				for( i=0; i<jsonObject.results.length; i++ )
				{
					var opt = document.createElement("option");
					opt.text = jsonObject.results[i];
					opt.value = "";
					contactList.options.add(opt);
				}
			}
		};
		xhr.send(jsonPayload);
	}
	catch(err)
	{
		document.getElementById("contactSearchResult").innerHTML = err.message;
	}
	
}

// TEST A LOT!!
// DONE?
function deleteContact()
{
	var name = document.getElementById("name");
	
	var payload = '{"name" : "' + name + '", "UserID" : "' + UserID + '"}';
	var url = urlBase + '/DeleteContacts.' + extension;
	
	var xhr = new XMLHttpRequest();
	xhr.open("POST", url, true);
	xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
	try
	{
		xhr.onreadystatechange = function() 
		{
			if (this.readyState == 4 && this.status == 200) 
			{
				document.getElementById("contactDeleteResult").innerHTML = "Contact has been deleted";
			}
		};
		xhr.send(jsonPayload);
	}
	catch(err)
	{
		document.getElementById("contactDeleteResult").innerHTML = err.message;
	}	
}

// Need to write!
function editContact()
{
	
}

