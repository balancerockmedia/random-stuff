<?php

use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\JsonResponse;

require_once __DIR__.'/vendor/autoload.php';
require_once __DIR__.'/config.php';
require_once __DIR__.'/cdia/Database.php';

// create the Silex application
$app = new Silex\Application();

// debug mode
$app['debug'] = true;

// inject Database object
$app['db'] = new cdia\Database();

// get all jobs
$app->get('/jobs', function(Request $request) use ($app) {    
    $query = <<<EOD
    
    SELECT job.id AS job_id, job.title, job.tagline, location.name AS location_name, type.name AS type, category.name AS category_name, keywords.keyword_list
    FROM job 
    INNER JOIN location ON location.id = job.location_id 
    INNER JOIN type ON type.id = job.type_id  
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
    
    $params = array();
    
    if (!is_null($search)) {
        $where = '';
        
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
    
    if ($request->get('callback') !== NULL) {
        $response = new JsonResponse($app['db']->fetchAll($query, $params));
        
        return $response->setCallback($request->get('callback'));
    } else {
        return new JsonResponse($app['db']->fetchAll($query, $params));
    }
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
    
    if ($request->get('callback') !== NULL) {
        $response = new JsonResponse($app['db']->fetch($query, $params));
        
        return $response->setCallback($request->get('callback'));
    } else {
        return new JsonResponse($app['db']->fetch($query, $params));
    }
});

// get states (handles JSONP requests as well as normal JSON)
$app->get('/states', function(Request $request) {
    $states = '[{"name":"Alabama","abbreviation":"AL"},{"name":"Alaska","abbreviation":"AK"},{"name":"American Samoa","abbreviation":"AS"},{"name":"Arizona","abbreviation":"AZ"},{"name":"Arkansas","abbreviation":"AR"},{"name":"California","abbreviation":"CA"},{"name":"Colorado","abbreviation":"CO"},{"name":"Connecticut","abbreviation":"CT"},{"name":"Delaware","abbreviation":"DE"},{"name":"District Of Columbia","abbreviation":"DC"},{"name":"Federated States Of Micronesia","abbreviation":"FM"},{"name":"Florida","abbreviation":"FL"},{"name":"Georgia","abbreviation":"GA"},{"name":"Guam","abbreviation":"GU"},{"name":"Hawaii","abbreviation":"HI"},{"name":"Idaho","abbreviation":"ID"},{"name":"Illinois","abbreviation":"IL"},{"name":"Indiana","abbreviation":"IN"},{"name":"Iowa","abbreviation":"IA"},{"name":"Kansas","abbreviation":"KS"},{"name":"Kentucky","abbreviation":"KY"},{"name":"Louisiana","abbreviation":"LA"},{"name":"Maine","abbreviation":"ME"},{"name":"Marshall Islands","abbreviation":"MH"},{"name":"Maryland","abbreviation":"MD"},{"name":"Massachusetts","abbreviation":"MA"},{"name":"Michigan","abbreviation":"MI"},{"name":"Minnesota","abbreviation":"MN"},{"name":"Mississippi","abbreviation":"MS"},{"name":"Missouri","abbreviation":"MO"},{"name":"Montana","abbreviation":"MT"},{"name":"Nebraska","abbreviation":"NE"},{"name":"Nevada","abbreviation":"NV"},{"name":"New Hampshire","abbreviation":"NH"},{"name":"New Jersey","abbreviation":"NJ"},{"name":"New Mexico","abbreviation":"NM"},{"name":"New York","abbreviation":"NY"},{"name":"North Carolina","abbreviation":"NC"},{"name":"North Dakota","abbreviation":"ND"},{"name":"Northern Mariana Islands","abbreviation":"MP"},{"name":"Ohio","abbreviation":"OH"},{"name":"Oklahoma","abbreviation":"OK"},{"name":"Oregon","abbreviation":"OR"},{"name":"Palau","abbreviation":"PW"},{"name":"Pennsylvania","abbreviation":"PA"},{"name":"Puerto Rico","abbreviation":"PR"},{"name":"Rhode Island","abbreviation":"RI"},{"name":"South Carolina","abbreviation":"SC"},{"name":"South Dakota","abbreviation":"SD"},{"name":"Tennessee","abbreviation":"TN"},{"name":"Texas","abbreviation":"TX"},{"name":"Utah","abbreviation":"UT"},{"name":"Vermont","abbreviation":"VT"},{"name":"Virgin Islands","abbreviation":"VI"},{"name":"Virginia","abbreviation":"VA"},{"name":"Washington","abbreviation":"WA"},{"name":"West Virginia","abbreviation":"WV"},{"name":"Wisconsin","abbreviation":"WI"},{"name":"Wyoming","abbreviation":"WY"}]';
    
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