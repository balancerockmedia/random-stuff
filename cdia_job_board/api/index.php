<?php

use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\JsonResponse;

require_once __DIR__.'/vendor/autoload.php';
require_once __DIR__.'/config.php';
require_once __DIR__.'/cdia/Database.php';

// create the Silex application
$app = new Silex\Application();
$app['debug'] = TRUE;

// inject Database object
$app['db'] = new CDIA\Database();

// get all jobs
$app->get('/jobs', function(Request $request) use ($app) {    
    $query = <<<EOD
    
    SELECT job.id AS job_id, job.title, location.name AS location_name, category.name AS category_name, keywords.keyword_list
    FROM job 
    INNER JOIN location ON location.id = job.location_id 
    INNER JOIN category ON category.id = job.category_id 
    LEFT OUTER JOIN (
        SELECT job_keyword.job_id as job_id, group_concat(keyword.name separator ', ') as keyword_list
        FROM job_keyword
        INNER JOIN keyword ON keyword.id = job_keyword.keyword_id
        GROUP BY job_keyword.job_id
    ) AS keywords 
        ON keywords.job_id = job.id
                  
EOD;
    
    // build up the WHERE clause based on the search param
    $search = $request->get('search');
    
    if (!is_null($search)) {
        $where = '';
        $params = array();
        
        if ($search['keyword'] !== '') {
            if ($where === '') {
                $where .= " WHERE FIND_IN_SET(:keyword_with_no_spaces, REPLACE(keywords.keyword_list, SPACE(1), ''))";
            } else {
                $where .= " AND FIND_IN_SET(:keyword_with_no_spaces, REPLACE(keywords.keyword_list, SPACE(1), ''))";
            }
            
            $params['keyword_with_no_spaces'] = str_replace(' ', '', $search['keyword']);
        }
        
        if ($search['location'] !== '') {
            if ($where === '') {
                $where .= " WHERE location.name = :location";
            } else {
                $where .= " AND location.name = :location";
            }
            
            $params['location'] = $search['location'];
        }
        
        if ($search['category'] !== '') {
            if ($where === '') {
                $where .= " WHERE category.name = :category";
            } else {
                $where .= " AND category.name = :category";
            }
            
            $params['category'] = $search['category'];
        }
        
        $query .= $where;
    }
    
    return new JsonResponse($app['db']->fetchAll($query, $params));
});

// get job by id
$app->get('/job/{id}', function(Request $request, $id) use ($app) {
    $query = <<<EOD
    
    SELECT job.id AS job_id, job.title, job.description 
    FROM job 
    WHERE job.id = :id
                  
EOD;
    
    $params = array(
        'id' => $id
    );
    
    return new JsonResponse($app['db']->fetch($query, $params));
});

// get states (handles JSONP requests as well as normal JSON)
$app->get('/states', function(Request $request) {
    $states = '[{"name":"Alabama","abbreviation":"AL"},{"name":"Alaska","abbreviation":"AK"},{"name":"AmericanSamoa","abbreviation":"AS"},{"name":"Arizona","abbreviation":"AZ"},{"name":"Arkansas","abbreviation":"AR"},{"name":"California","abbreviation":"CA"},{"name":"Colorado","abbreviation":"CO"},{"name":"Connecticut","abbreviation":"CT"},{"name":"Delaware","abbreviation":"DE"},{"name":"DistrictOfColumbia","abbreviation":"DC"},{"name":"FederatedStatesOfMicronesia","abbreviation":"FM"},{"name":"Florida","abbreviation":"FL"},{"name":"Georgia","abbreviation":"GA"},{"name":"Guam","abbreviation":"GU"},{"name":"Hawaii","abbreviation":"HI"},{"name":"Idaho","abbreviation":"ID"},{"name":"Illinois","abbreviation":"IL"},{"name":"Indiana","abbreviation":"IN"},{"name":"Iowa","abbreviation":"IA"},{"name":"Kansas","abbreviation":"KS"},{"name":"Kentucky","abbreviation":"KY"},{"name":"Louisiana","abbreviation":"LA"},{"name":"Maine","abbreviation":"ME"},{"name":"MarshallIslands","abbreviation":"MH"},{"name":"Maryland","abbreviation":"MD"},{"name":"Massachusetts","abbreviation":"MA"},{"name":"Michigan","abbreviation":"MI"},{"name":"Minnesota","abbreviation":"MN"},{"name":"Mississippi","abbreviation":"MS"},{"name":"Missouri","abbreviation":"MO"},{"name":"Montana","abbreviation":"MT"},{"name":"Nebraska","abbreviation":"NE"},{"name":"Nevada","abbreviation":"NV"},{"name":"NewHampshire","abbreviation":"NH"},{"name":"NewJersey","abbreviation":"NJ"},{"name":"NewMexico","abbreviation":"NM"},{"name":"NewYork","abbreviation":"NY"},{"name":"NorthCarolina","abbreviation":"NC"},{"name":"NorthDakota","abbreviation":"ND"},{"name":"NorthernMarianaIslands","abbreviation":"MP"},{"name":"Ohio","abbreviation":"OH"},{"name":"Oklahoma","abbreviation":"OK"},{"name":"Oregon","abbreviation":"OR"},{"name":"Palau","abbreviation":"PW"},{"name":"Pennsylvania","abbreviation":"PA"},{"name":"PuertoRico","abbreviation":"PR"},{"name":"RhodeIsland","abbreviation":"RI"},{"name":"SouthCarolina","abbreviation":"SC"},{"name":"SouthDakota","abbreviation":"SD"},{"name":"Tennessee","abbreviation":"TN"},{"name":"Texas","abbreviation":"TX"},{"name":"Utah","abbreviation":"UT"},{"name":"Vermont","abbreviation":"VT"},{"name":"VirginIslands","abbreviation":"VI"},{"name":"Virginia","abbreviation":"VA"},{"name":"Washington","abbreviation":"WA"},{"name":"WestVirginia","abbreviation":"WV"},{"name":"Wisconsin","abbreviation":"WI"},{"name":"Wyoming","abbreviation":"WY"}]';
    
    if ($request->get('callback') !== NULL) {
        $response = new JsonResponse($states);
        
        return $response->setCallback($request->get('callback'));
    } else {
        return new JsonResponse($states);
    }
});

// run the app
$app->run();

?>