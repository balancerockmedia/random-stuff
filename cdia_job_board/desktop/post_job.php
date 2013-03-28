<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1">
<title></title>
<link rel="stylesheet" type="text/css" href="css/bootstrap.css" />
<link rel="stylesheet" type="text/css" href="css/main.css" />
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
                    <li class="active"><a href="post_job.php">Post a Job</a></li>
                    <li><a href="#">About</a></li>
                    <li><a href="">Contact</a></li>
                </ul>
            </div>
        </div>
    </div>
</div>

<div class="container-fluid">
    <div class="row-fluid">
        <div class="span12">
            <h3>About Us</h3>
            
            <form method="post" action="http://127.0.0.1/~Dan/random_stuff/cdia_job_board/api/index.php/job" enctype="multipart/form-data">
                <p><label>Title: </label>
                <input type="text" name="title" /></p>
                
                <p><label>Company: </label>
                <input type="text" name="company" /></p>
                
                <p><label>Company Logo: </label>
                <input type="file" name="company_logo" /></p>
                
                <p><label>Category Id: </label>
                <input type="text" name="category_id" /></p>
                
                <p><label>Type Id: </label>
                <input type="text" name="type_id" /></p>
                
                <p><label>Location Id: </label>
                <input type="text" name="location_id" /></p>
                
                <p><input type="submit" class="btn btn-primary" name="submit" value="Submit" /></p>
            </form>
        </div>
    </div>
</div>

<script type="text/javascript" src="http://code.jquery.com/jquery-1.8.3.min.js"></script>
<script type="text/javascript" src="js/bootstrap.js"></script>

</body>
</html>