<?php
	$inData = getRequestInfo();
	// grabbing all needed variables for editing
	$First_Nameold= $inData["First_Nameold"];
	$Last_Nameold = $inData["Last_Nameold"];
	$First_Namenew = $inData["First_Namenew"];
	$Last_Namenew = $inData["Last_Namenew"];
	$Phone = $inData["Phone"];
	$Email = $inData["Email"];
	$Address = $inData["Address"];
	$UserID = $inData["UserID"];
	
	$error_occured = false;

	$conn = new mysqli("localhost", "Sadi", "password123", "Kontacts"); //how to grab the user name from the the input
	if ($conn->connect_error) //checking if there is a connection
	{
		$error_occured = true;
		returnWithError( $conn->connect_error );
	} 
	else
	{
		$sql = "UPDATE Contacts SET First_Name = '$First_Namenew', Last_Name = '$Last_Namenew', Phone = '$Phone', Email = '$Email', Address = '$Address'
			WHERE First_Name = '$First_Nameold' AND Last_Name = '$Last_Nameold' AND UserID = '$UserID'";// sql string to edit the what is passed
		if( $result = $conn->query($sql) != TRUE )
		{
			$error_occured = true;
			returnWithError( $conn->error );
		}

		$conn->close();
	}
	
	if(!$error_occured)
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