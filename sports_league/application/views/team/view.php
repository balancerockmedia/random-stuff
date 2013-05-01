<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<title>Sports League</title>
<link rel="stylesheet" type="text/stylesheet" href="<?php echo $this->config->item('base_url'); ?>public/css/bootstrap.css" />
<link rel="stylesheet" type="text/stylesheet" href="<?php echo $this->config->item('base_url'); ?>public/css/main.css" />
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
    <h3><?php echo $team->name; ?></h3>
    
    <h4>Players</h4>
    
    <table class="table">
        <thead>
            <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Town</th>
                <th>Date of Birth</th>
            </tr>
        </thead>
        <tbody>
        <?php foreach ($players as $player): ?>
            <tr>
                <td><?php echo $player->first_name; ?> <?php echo $player->last_name; ?></td>
                <td><?php echo $player->email; ?></td>
                <td><?php echo $player->town; ?></td>
                <td><?php echo $player->dob; ?></td>
            </tr>
        <?php endforeach; ?>
        </tbody>
    </table>
    
    <h4>Schedule</h4>
    
    <table class="table">
        <thead>
            <tr>
                <th>Date</th>
                <th>Time</th>
                <th>Location</th>
                <th>Opponent</th>
            </tr>
        </thead>
        <tbody>
        <?php foreach ($games as $game): ?>
            <tr>
                <td><?php echo date("F j, Y", strtotime($game->date_played)); ?></td>
                <td><?php echo date("g:i a", strtotime($game->date_played)); ?></td>
                <td><?php echo $game->location; ?></td>
                <td><?php echo $game->opponent->name; ?></td>
            </tr>
        <?php endforeach; ?>
        </tbody>
    </table>
</div>

</body>
</html>