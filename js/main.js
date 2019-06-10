// NEED TO IMPORT HASH.JS FILE

var urlBase = 'http://callmebeepus.world'; // URL for our website
var extension = "php"; // Variable which holds the php extension which is utilized to create file names

// Variables to contain information; 0 signifies the beginning of the UserID count; "" signifies empty string
var userId = 0;
var firstName = "";
var lastName = "";


// Creates json with username and password and relays it to the API
// DONE!
function doLogin()
{ 
	userId = 0;
	firstName = "";
	lastName = "";
	
	//var SHA512 = new Hashes.SHA512;

	//Fetches the username from the textbox
	var username = document.getElementById("username").value;
	// Fetches the password from the textbook
	var password = document.getElementById("password").value;

	//document.getElementById("loginResult").innerHTML = "";
	
	// Hash the password
	//password = password + username;
	//console.log('SHA512:' + SHA512.hex(password));

	var jsonPayload = '{"Username" : "' + username + '", "Password" : "' + password + '"}';
	
	var url = urlBase + '/LAMPAPI/Login.' + extension;

	var xhr = new XMLHttpRequest();
	xhr.open("POST", url, true);
	xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
	try
	{
		//xhr.send(jsonPayload);

		//var jsonObject = JSON.parse( xhr.responseText );

		//userId = jsonObject.id;
		/*userId = 3;

		if( userId < 1 )
		{
			//document.getElementById("loginResult").innerHTML = "User/Password combination incorrect";
			return;
		}
		else
		{
			window.location.href = "http://callmebeepus.world/Homepage.html";
		}*/
		xhr.send(jsonPayload);
		xhr.onreadystatechange = function()
			{
				if(this.readyState == 4 && this.status == 200)
				{
					
					var jsonObject = JSON.parse( xhr.responseText );
					var userId = jsonObject.id;
			
					if( userId !== 0)
					{
						/*jsonPayload = '{"UserID" : "' + userId + '"}';
						
						url = urlBase + '/LAMPAPI/populate.' + extension;

						xhr = new XMLHttpRequest();
						xhr.open("POST", url, true);
						xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
						
						jsonObject = JSON.parse( xhr.responseText );*/
						
						sessionStorage.setItem('userID', userId);
						window.location.href = "http://callmebeepus.world/Homepage.html";
					}		
					else
					{
						//document.getElementById('id01').style.display= "block";
						document.getElementById("invalidLoginAlert").textContent = "*User/Password combination incorrect*";
						hideOrShow("errorDiv", true);
						//document.getElementById("errorDiv").style.visibility = "visible";
						return;
					}
				}
			}
				
		//firstName = jsonObject.First_Name;
		//lastName = jsonObject.Last_Name;

		//document.getElementById("userName").innerHTML = firstName + " " + lastName;

		//document.getElementById("loginName").value = "";
		//document.getElementById("loginPassword").value = "";

		//hideOrShow( "loggedInDiv", true);
		//hideOrShow( "accessUIDiv", true);
		//hideOrShow( "loginDiv", false);
	}
	catch(err)
	{
		//document.getElementById("loginResult").innerHTML = err.message;
	}

}

// Allows new user to make an account
// June 4th STILL WORKING ON THIS
// Questions throughout comments
function register()
{
	UserID = 0;
	var Username = "";
	var Password = "";
	//var SHA512 = new Hashes.SHA512;

	// Fetch information from webpage
	Username = document.getElementById("username1").value;
	Password = document.getElementById("password1").value;

	//document.getElementById("registerResult").innerHTML = "";

	// Hash the password
	//password = password + username;
	//console.log('SHA512:' + SHA512.hex(password);

	// Create payload
	var jsonPayload = '{"Username" : "' + Username + '", "Password" : "' + Password + '"}';
	var url = urlBase + '/LAMPAPI/Register.' + extension; // changed June 4th

	var xhr = new XMLHttpRequest();
	xhr.open("POST", url, true);
	xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
	try
	{
		xhr.send(jsonPayload);
		xhr.send(jsonPayload);
		xhr.onreadystatechange = function()
			{
				if(this.readyState == 4 && this.status == 200)
				{

					var jsonObject = JSON.parse( xhr.responseText );
					var error = jsonObject.err;

					// Have to change this to check that username isn't taken
					if(error == "")
					{
						document.getElementById("success1").innerHTML =  "You registered successfully!";
						hideOrShow("success1", true);
					}
					else
					{
						document.getElementById("success1").innerHTML =  "Please enter a valid Username/Password";
						hideOrShow("success1", true);
						return;
					}
				}
			}
		

		// Is it username of loginname???
		//Username = jsonObject.Username;
		//Password = jsonObject.Password;

		// Should I stay or should I go
		//document.getElementById("loginName").value = "";
		//document.getElementById("loginPassword").value = "";

		//hideOrShow( "loggedInDiv", true);
		//hideOrShow( "accessUIDiv", true);
		//hideOrShow( "loginDiv", false);
	}
	catch(err)
	{ //JUNE 4TH CHANGED
		//document.getElementById("registerResult").innerHTML = err.message;
	}

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
	var First_Name = document.getElementById("First_NameText").value;
	var Last_Name = document.getElementById("Last_NameText").value;
	var Phone = document.getElementById("PhoneText").value;
	var Email = document.getElementById("EmailText").value;
	var Address = document.getElementById("AddressText").value;

	document.getElementById("contactAddResult").innerHTML = "";

	var jsonPayload = '{"UserID" : "' + userId + '", "First_Name" : "' + First_Name + '", "Last_Name" : "' + Last_Name + '","Phone" : "' + Phone + '","Email" : "' + Email + '","Address" : "' + Address + '}';
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

// DONE!!
function searchContact()
{
	var searchname = document.getElementById("searchText").value;
	document.getElementById("contactSearchResult").innerHTML = "";

	var contactList = document.getElementById("contactList");
	contactList.innerHTML = "";

	var jsonPayload = '{"searchname" : "' + searchname + '","UserID" : "' + userId + '}';
	var url = urlBase + '/SearchContact.' + extension;

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

	var payload = '{"name" : "' + name + '", "UserID" : "' + userId + '"}';
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

// written by Shakira TO BE CHECKED!!!
function editContact()
{ // need all the things you can edit to send to backend
	var First_Name = document.getElementById("First_NameText").value;
	var Last_Name = document.getElementById("Last_NameText").value;
	var Phone = document.getElementById("PhoneText").value;
	var Email = document.getElementById("EmailText").value;
	var Address = document.getElementById("AddressText").value;
	// changed to contactEditResult
	document.getElementById("contactEditResult").innerHTML = "";
	// Sending one json package of everything whether changed or not
	// may change based on backend
	var jsonPayload = '{"UserID" : "' + userId + '", "First_Name" : "' + First_Name + '", "Last_Name" : "' + Last_Name + '","Phone" : "' + Phone + '","Email" : "' + Email + '","Address" : "' + Address + '}';
	var url = urlBase + '/EditContacts.' + extension;

	var xhr = new XMLHttpRequest();
	xhr.open("POST", url, true);
	xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
	try
	{
		xhr.onreadystatechange = function()
		{
			if (this.readyState == 4 && this.status == 200)
			{ // changed to contactEditResult
				document.getElementById("contactEditResult").innerHTML = "Contact has been deleted";
			}
		};
		xhr.send(jsonPayload);
	}
	catch(err)
	{// changed to contactEditResult
		document.getElementById("contactEditResult").innerHTML = err.message;
	}

}
