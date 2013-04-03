<?php

use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\JsonResponse;

require_once __DIR__.'/vendor/autoload.php';
require_once __DIR__.'/config.php';
require_once __DIR__.'/cdia/Database.php';

// create the Silex application
$app = new Silex\Application();

// debug mode
$app['debug'] = TRUE;

// inject Database object
$app['db'] = new cdia\Database();

// get all jobs or search
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
    
    SELECT job.id AS job_id, job.title, job.company, job.company_logo, job.description 
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

// post a job
$app->post('/job', function(Request $request) use ($app) {
    $img_formats = array('jpg', 'gif', 'png');
    
    $extension = end(explode('.', $_FILES['company_logo']['name']));
    
    if (in_array($extension, $img_formats)) {
        $uploaddir = dirname(__FILE__) . '/uploads/';
        $uploadfile = $uploaddir . basename($_FILES['company_logo']['name']);
        
        if (move_uploaded_file($_FILES['company_logo']['tmp_name'], $uploadfile)) {
            $company_logo = $_FILES['company_logo']['name'];
        } else {
            $company_logo = NULL;
        }
    }
    
    $result = $app['db']->insert('job', array(
        'title' => $request->get('title'),
        'company' => $request->get('company'),
        'company_logo' => $company_logo,
        'category_id' => $request->get('category_id'),
        'type_id' => $request->get('type_id'),
        'location_id' => $request->get('location_id')
    ));
        
    return $app->redirect('http://127.0.0.1/~Dan/random_stuff/cdia_job_board/desktop');
});

// run the app
$app->run();

?>