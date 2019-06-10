<?php

// The input is a JSON file in the format of:
//{
//  "UserID" :"UserID of new user",
//  "First_Name" : "",
//  "Last_Name" : "",
//  "Phone" : "",
//  "Email" : "",
// "Address" : ""
// }

	$inData = getRequestInfo();
	
	$First_Name = $inData["First_Name"];
	$Last_Name = $inData["Last_Name"];
	$Phone= $inData["Phone"];
	$Email = $inData["Email"];
	$Address = $inData["Address"];
	$UserID = $inData["UserID"];
	
	// Flag for keeping track of any errors
    $error_occurred = false;
	
	// Connect to the database
	$conn = new mysqli("localhost", "Sadi", "password123", "Kontacts");
	
	// Return with error if connection with database was not successful
	if ($conn->connect_error) 
	{
		$error_occurred = true;
		returnWithError( $conn->connect_error );
	} 
	
	else
	{
		$sql = "insert into Contacts (ContactID,UserID, First_Name, Last_Name, Phone, Email, Address) VALUES (NULL , '". $UserID . "', '" . $First_Name . "', '" . $Last_Name . "', '". $Phone . "','" . $Email . "','" . $Address . "')";
		
		// If any error occured while inserting the contact information return with error
		if( $result = $conn->query($sql) != TRUE )
		{
			$error_occurred = true;
			returnWithError( $conn->error );
		}
		$conn->close();
	}
	// If the contact is added successfully then return with no error
	if(!$error_occurred)
		{
			returnWithError("");
		}
	
	function getRequestInfo()
	{
		return json_decode(file_get_contents('php://input'), true);
	}

	function sendResultInfoAsJson( $obj )
	{
		header('Content-type: application/json');
		echo $obj;
	}
	
	function returnWithError( $err )
	{
		$retValue = '{"error":"' . $err . '"}';
		sendResultInfoAsJson( $retValue );
	}
	
?>