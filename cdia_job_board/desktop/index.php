<?php include 'mobile.php'; ?>
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>CDIA Jobs</title>
<link rel="stylesheet" type="text/css" href="css/bootstrap.css" />
<link rel="stylesheet" type="text/css" href="css/app.css" />
<link rel="stylesheet" type="text/css" href="css/bootstrap-responsive.css" />
</head>
<body>
    
<div class="navbar navbar-inverse navbar-fixed-top">
    <div class="navbar-inner">
        <div class="container-fluid">
            <a class="btn btn-navbar" data-toggle="collapse" data-target=".nav-collapse">
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
            </a>
            
            <a class="brand" href="index.php">Job Board</a>
            
            <div class="nav-collapse collapse">
                <ul class="nav">
                    <li><a href="post_job.php">Post a Job</a></li>
                    <li><a href="#">About</a></li>
                    <li><a href="">Contact</a></li>
                </ul>
            </div>
        </div>
    </div>
</div>

<div class="container-fluid">
    <div class="row-fluid">
        <div class="span9">
            <div class="well" id="search_bar">
                <form class="form-search">
                    <input type="text" class="span3 search-query" placeholder="keyword" id="keyword" autocomplete="off" />
                    <input type="text" class="span3 search-query" placeholder="Location" id="location" autocomplete="off" />
                    <select name="category" id="category" class="span3">
                        <option value="">Category</option>
                        <option value="design">Design</option>
                        <option value="development">Development</option>
                    </select>
                    
                    <a id="reset" class="btn disabled" href="#">Reset</a>
                </form>
            </div>
            
            <p id="current_search_terms"></p>
            
            <table class="table table-striped">
                <thead>
                    <tr>
                        <th>Location</th>
                        <th>Title</th>
                        <th>Category</th>
                        <th>Keywords</th>
                        <th>&nbsp;</th>
                    </tr>
                </thead>
                <tbody></tbody>
            </table>
        </div>
        
        <div class="span3" id="sidebar">
            <p><strong>The job board for web professionals.</strong></p>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
        </div>
    </div>
</div>

<div class="modal hide fade" id="job_details">
    <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
        <h3></h3>
    </div>
    <div class="modal-body"></div>
    <div class="modal-footer">
        <a href="#" class="btn" data-dismiss="modal">Close</a>
    </div>
</div>

<script type="text/javascript" src="http://code.jquery.com/jquery-1.8.3.min.js"></script>
<script type="text/javascript" src="http://maps.google.com/maps/api/js?sensor=false"></script>
<script type="text/javascript" src="js/bootstrap.js"></script>
<script type="text/javascript" src="js/app.js"></script>

</body>
</html>