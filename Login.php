<?php
// The input is a JSON file in the format of:
//{
//   "Username" : "",
//   "Password" : ""
//}

	$inData = getRequestInfo();
	
	$id = 0;
	$Username = $inData["Username"];
	$Password = $inData["Password"];

// Connect to database
	$conn = new mysqli("localhost", "Sadi", "password123", "Kontacts");
	
// Return with error if connection with database was not successful
	if ($conn->connect_error) 
	{
		returnWithError( $conn->connect_error );
	} 
	
	else
	{//Binary is making sure the the password is case sensitive not the user name
		$sql = "SELECT UserID FROM Users where Username = '$Username' and BINARY (Password = '$Password')";
		$result = $conn->query($sql);
		
		// Returns with the UserID of the username 
		if ($result->num_rows > 0)
		{
			$row = $result->fetch_assoc();
			$id = $row["UserID"];
			
			returnWithInfo($id);
		}
		// Return with error if the username is not in the database
		else
		{
			returnWithError( "No Records Found" );
		}
		$conn->close();
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
		$retValue = '{"id":0,"error":"' . $err . '"}';
		sendResultInfoAsJson( $retValue );
	}
	
	function returnWithInfo($id )
	{
		$retValue = '{"id":' . $id . ',"error":""}';
		sendResultInfoAsJson( $retValue );
	}
	
?>