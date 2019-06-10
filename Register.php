<?php

	$inData = getRequestInfo();
	
	//$id = 0;
	//$Username = $inData["Username"];
	$Username = $inData["Username"];
	$Password= $inData["Password"];
	
	$error_occurred = false;

	$conn = new mysqli("localhost", "Sadi", "password123", "Kontacts");
	if ($conn->connect_error) 
	{
		$error_occurred = true;
		returnWithError( $conn->connect_error );
	} 
	else
	{
		$sql = "SELECT UserID FROM Users WHERE Username = '$Username'";
		$result = $conn->query($sql);
			if ($result->num_rows > 0)
			{
							//$row = $result->fetch_assoc();
				//$firstName = $row["firstName"];
				//$lastName = $row["lastName"];
				//$id = $row["userID"];
				
				//returnWithInfo($id);
				$error_occurred = true;
				returnWithError("Username aldready in use, please try a different username");
				echo "<script type=\"text/javascript\">".
        "alert('Not success');".
        "</script>";
			}
			else
			{
				$sql = "INSERT INTO Users (Username, Password) VALUES ('$Username', '$Password')";
				if( $result = $conn->query($sql) != TRUE )
				{
					$error_occurred = true;
					returnWithError( $conn->error );
				}

			}
		$conn->close();
	}
	if(!$error_occurred)
	{
		returnWithError("");
	}
	
	function getRequestInfo()
	{
		echo "<script type=\"text/javascript\">".
        "alert('success');".
        "</script>";
		return json_decode(file_get_contents('php://input'), true);

	}

	function sendResultInfoAsJson( $obj )
	{
		header('Content-type: application/json');
		echo $obj;
	}
	
	function returnWithError( $err )
	{
		echo "<script type=\"text/javascript\">".
        "alert('success');".
        "</script>";
		$retValue = '{"error":"' . $err . '"}';
		sendResultInfoAsJson( $retValue );
	}

	
?>