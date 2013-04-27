<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<title>Sports League</title>
<link rel="stylesheet" type="text/stylesheet" href="<?php echo $this->config->item('base_url'); ?>/public/css/bootstrap.css" />
<link rel="stylesheet" type="text/stylesheet" href="<?php echo $this->config->item('base_url'); ?>/public/css/main.css" />
</head>
<body>
    
<div class="navbar navbar-inverse navbar-fixed-top">
    <div class="navbar-inner">
        <div class="container">
            <a class="brand" href="<?php echo $this->config->item('base_url'); ?>">Sports League</a>
            <ul class="nav">
                <li class="active"><a href="<?php echo $this->config->item('base_url'); ?>">Home</a></li>
            </ul>
        </div>
    </div>
</div>

<div class="container">
    <h3>Team</h3>
    
    <p>Name: <?php echo $team->name; ?></p>
</div>

</body>
</html>