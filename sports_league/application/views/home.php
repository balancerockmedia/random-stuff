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
    <h3>Leagues</h3>
    
    <table class="table">
        <thead>
            <tr>
                <th>Name</th>
            </tr>
        </thead>
        <tbody>
        <?php foreach ($leagues as $league): ?>
            <tr>
                <td><a href="index.php/league/view/<?php echo $league->id; ?>"><?php echo $league->name; ?></a></td>
            </tr>
        <?php endforeach; ?>
        </tbody>
    </table>
    
    <h3>Teams</h3>
    
    <table class="table">
        <thead>
            <tr>
                <th>Name</th>
                <th>League</th>
            </tr>
        </thead>
        <tbody>
        <?php foreach ($teams as $team): ?>
            <tr>
                <td><a href="index.php/team/view/<?php echo $team->id; ?>"><?php echo $team->name; ?></a></td>
                <td><a href="index.php/league/view/<?php echo $team->league_id; ?>"><?php echo $team->league_name; ?></a></td>
            </tr>
        <?php endforeach; ?>
        </tbody>
    </table>
</div>

</body>
</html>