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
$app->get('/users', function(Request $request) use ($app) {    
    $query = <<<EOD
    
    SELECT user.id, first_name, last_name, latitude, longitude, program.name AS program_name, status.name AS status_name
    FROM user 
    INNER JOIN program ON program.id = user.program_id 
    INNER JOIN status ON status.id = user.status_id
                  
EOD;
    
    return new JsonResponse($app['db']->fetchAll($query));
});

// get student by id
$app->get('/user/{id}', function(Request $request, $id) use ($app) {
    $query = <<<EOD
    
    SELECT user.*, program.name AS program_name, status.name AS status_name
    FROM user 
    INNER JOIN program ON program.id = user.program_id 
    INNER JOIN status ON status.id = user.status_id 
    WHERE user.id = :id
                  
EOD;
    
    $params = array(
        'id' => $id
    );
    
    return new JsonResponse($app['db']->fetch($query, $params));
});

// run the app
$app->run();

?>