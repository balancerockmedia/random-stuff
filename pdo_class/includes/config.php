<?php

// db login
define('HOST', '127.0.0.1');
define('PORT', NULL);
define('USERNAME', 'root');
define('PASSWORD', '');
define('DATABASE', 'blog');

// load classes
function __autoload($class) {
	require_once 'classes/' . $class . '.php';
}

?>