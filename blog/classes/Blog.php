<?php

abstract class Blog {
	
    public function __construct() {
		try {
		    $host = '127.0.0.1';
		    $database = 'blog';
		    $this->pdo = new PDO("mysql:host=$host;dbname=$database", 'root', '');
		    $this->pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
		} catch (PDOException $e) {
		    echo $e->getMessage();
		    exit();
		}
	}
    
}

?>