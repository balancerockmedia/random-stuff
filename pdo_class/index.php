<?php require_once 'includes/config.php'; ?>
<?php

// create new instance of Database class
$db = new Database();

// test fetchAll
if (isset($_POST['action']) && $_POST['action'] === 'fetchAll') {
	$params = array(
		':id' => 4
	);
    
	var_dump($db->fetchAll("SELECT * FROM post WHERE id = :id", $params));
}

// test insert
if (isset($_POST['action']) && $_POST['action'] === 'insert') {
	$params = array(
		'title' => 'test'
	);
    
	var_dump($db->insert('category', $params));
}

// test update
if (isset($_POST['action']) && $_POST['action'] === 'update') {
	$params = array(
		'title' => 'test'
	);
    
	var_dump($db->update('category', 1, $params));
}

// test delete
if (isset($_POST['action']) && $_POST['action'] === 'delete') {    
	var_dump($db->delete('category', 1));
}

?>
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8" />
<title></title>
</head>
<body>
	
<form action="index.php" method="post">
	<select name="action">
		<option value="">Select One</option>
        <option value="fetchAll">Fetch All</option>
		<option value="insert">Insert</option>
        <option value="update">Update</option>
        <option value="delete">Delete</option>
	</select>
	
	<input type="submit" name="submit" value="Submit" />
</form>

</body>
</html>