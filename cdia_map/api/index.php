<?php

use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\JsonResponse;

require_once __DIR__.'/vendor/autoload.php';
require_once __DIR__.'/config.php';
require_once __DIR__.'/cdia/Database.php';

// create the Silex application
$app = new Silex\Application();

// debug mode
$app['debug'] = FALSE;

// inject Database object
$app['db'] = new CDIA\Database();

// get all jobs
$app->get('/students', function(Request $request) use ($app) {    
    $query = <<<EOD
    
    SELECT student.*, program.name, status.name
    FROM student 
    INNER JOIN program ON program.id = student.program_id 
    INNER JOIN status ON status.id = student.status_id
                  
EOD;
    
    return new JsonResponse($app['db']->fetchAll($query));
});

// get student by id
$app->get('/student/{id}', function(Request $request, $id) use ($app) {
    $query = <<<EOD
    
    SELECT student.*, program.name, status.name
    FROM student 
    INNER JOIN program ON program.id = student.program_id 
    INNER JOIN status ON status.id = student.status_id 
    WHERE student.id = :id
                  
EOD;
    
    $params = array(
        'id' => $id
    );
    
    return new JsonResponse($app['db']->fetch($query, $params));
});

// run the app
$app->run();

?>