<?php
// The input is a JSON file in the format of:
//{
//   "First_Name" : "",
//   "Last_Name" : "",
//   "UserID" : ""
//}
	
	$inData = getRequestInfo();
	
	// Server info for connection
	$servername = "localhost";
	$dbUName = "Sadi";
	$dbPwd = "password123";
	$dbName = "Kontacts";
	
	$UserID = $inData["UserID"];
	$First_Name= $inData["First_Name"];
	$Last_Name = $inData["Last_Name"];
	
	$error_occurred = false;
	
	// Connect to database
	$conn = new mysqli($servername, $dbUName, $dbPwd, $dbName);
	if ($conn->connect_error){
		$error_occurred = true;
		returnWithError($conn->connect_error);
	}
	else{
		//making sure the contact is in the table
		$sql = "SELECT * from Contacts WHERE First_Name = '$First_Name' AND Last_Name = '$Last_Name' AND UserID = '$UserID'";
		$result = $conn->query($sql);
		if ($result->num_rows == 0){
			$error_occurred = true;
			returnWithError("No contact found");
		}
		else{
			// sql string to edit the what is passed
		$sql = "DELETE from Contacts WHERE First_Name = '$First_Name' AND Last_Name = '$Last_Name' AND UserID = '$UserID'";
			if( $result = $conn->query($sql) != TRUE ){
				$error_occurred = true;
				returnWithError( $conn->error );
			}
		}
		$conn->close();
	}
	
	if (!$error_occurred)
	{
		returnWithError("");
	}
	
	// Parse JSON file input
	function getRequestInfo(){
		return json_decode(file_get_contents('php://input'), true);
	}
	
	function sendAsJSON($obj){
		header('Content-type: application/json');
		echo $obj;
	}
	
	function returnWithError( $err )
	{
		$retValue = '{"error":"' . $err . '"}';
		sendAsJson( $retValue );
	}
	
?>