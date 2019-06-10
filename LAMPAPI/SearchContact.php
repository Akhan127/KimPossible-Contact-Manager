<?php

	$inData = getRequestInfo();
	
	$searchResults = "";
	$searchCount = 0;

	$searchname = $inData["searchname"];
	$UserID = $inData["UserID"];
	$error_occured = false;
	

	$conn = new mysqli("localhost", "Sadi", "password123", "Kontacts"); //how to grab the user name from the the input
	if ($conn->connect_error) 
	{
		$error_occured = true;
		returnWithError( $conn->connect_error );
	} 
	else
	{
		//$sql = "SELECT * from Contacts WHERE (First_Name like '%" . $inData["searchname"] . "%' OR Last_Name like '%" . $inData["searchname"] . "%') AND UserID = " .$inData["UserID"];
		$sql = "select * from Contacts where First_Name like '%" . $searchname . "%' AND UserID = " . $UserID;
		$result = $conn->query($sql);
		if ($result->num_rows > 0)
		{
			while($row = $result->fetch_assoc())
			{
				if( $searchCount > 0 )
				{
					$searchResults .= ",";
				}
				$searchCount++;
				$searchResults .='"' . $row["First_Name"] . ' | ' . $row["Last_Name"] . ' | ' . $row["Phone"] . ' | ' . $row["Email"] . ' | ' . $row["Address"] . '"';
			}
		}
		else
		{
			$error_occured = true;
			returnWithError( "No Records Found" );
		}
		$conn->close();
	}
	if(!$error_occured)
	{
		returnWithInfo($searchResults);
	}

	//returnWithInfo( $searchResults );

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
		$retValue = '{"result":"","error":"' . $err . '"}';
		sendResultInfoAsJson( $retValue );
	}
	
	function returnWithInfo( $searchResults )
	{
		$retValue = '{"results":[' . $searchResults . '],"error":""}';
		sendResultInfoAsJson( $retValue );
	}
	
?>