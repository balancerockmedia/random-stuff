<?php

use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\JsonResponse;

require_once __DIR__.'/vendor/autoload.php';
require_once __DIR__.'/config.php';
require_once __DIR__.'/CDIA/Database.php';

// create the Silex application
$app = new Silex\Application();

// debug mode
$app['debug'] = true;

// inject Database object
$app['db'] = new CDIA\Database();

// get all users
$app->get('/users', function(Request $request) use ($app) {    
    $query = <<<EOD
    
    SELECT user.id, first_name, last_name, latitude, longitude, program.name AS program_name, status.name AS status_name
    FROM user 
    INNER JOIN program ON program.id = user.program_id 
    INNER JOIN status ON status.id = user.status_id
                  
EOD;
    
    return new JsonResponse($app['db']->fetchAll($query));
});

// get user by id
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

// search users
$app->post('/search', function(Request $request) use ($app) {
    $last_name = $request->get('search');
    
    $query = <<<EOD
    
    SELECT user.*, program.name AS program_name, status.name AS status_name
    FROM user 
    INNER JOIN program ON program.id = user.program_id 
    INNER JOIN status ON status.id = user.status_id 
    WHERE user.last_name LIKE '%$last_name%'
                  
EOD;
    
    return new JsonResponse($app['db']->fetchAll($query));
});

// remove user by id
$app->get('/remove/{id}', function(Request $request, $id) use ($app) {
    $app['db']->delete('user', $id);
    
    $query = <<<EOD
    
    SELECT user.id, first_name, last_name, latitude, longitude, program.name AS program_name, status.name AS status_name
    FROM user 
    INNER JOIN program ON program.id = user.program_id 
    INNER JOIN status ON status.id = user.status_id
                  
EOD;
    
    return new JsonResponse($app['db']->fetchAll($query));
});

// insrt or update a user
$app->post('/upsert', function(Request $request) use ($app) {
    $id = $request->get('id');
    
    $params = array(
        'first_name' => $request->get('first_name'),
        'last_name' => $request->get('last_name'),
        'city' => $request->get('city'),
        'state' => $request->get('state'),
        'country' => $request->get('country'),
        'latitude' => $request->get('latitude'),
        'longitude' => $request->get('longitude'),
        'program_id' => $request->get('program_id'),
        'status_id' => $request->get('status_id')
    );
    
    if (empty($id) || is_null($id)) {
        $app['db']->insert('user', $params);
    } else {
        $app['db']->update('user', $id, $params);
    }
    
    $query = <<<EOD
    
    SELECT user.id, first_name, last_name, latitude, longitude, program.name AS program_name, status.name AS status_name
    FROM user 
    INNER JOIN program ON program.id = user.program_id 
    INNER JOIN status ON status.id = user.status_id 
                  
EOD;
    
    return new JsonResponse($app['db']->fetchAll($query));
});

// run the app
$app->run();

?>