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
    <h3><?php echo $league->name; ?></h3>
    
    <table class="table">
        <thead>
            <tr>
                <th>Team Name</th>
                <th># Players</th>
            </tr>
        </thead>
        <tbody>
        <?php foreach ($teams as $team): ?>
            <tr>
                <td><a href="<?php echo $this->config->item('base_url'); ?>index.php/team/view/<?php echo $team->id; ?>"><?php echo $team->name; ?></a></td>
                <td><?php echo $team->num_players; ?></td>
            </tr>
        <?php endforeach; ?>
        </tbody>
    </table>
    
    <h4>Add Game</h4>
    
    <form method="post" action="<?php echo $this->config->item('base_url'); ?>index.php/league/add_game/<?php echo $league->id; ?>" class="form-horizontal">
        <div class="control-group">
            <label class="control-label">Date</label>
            
            <div class="controls">
                <input type="datetime-local" name="date_played" required="true" />
            </div>
        </div>
        
        <div class="control-group">
            <label class="control-label">Location</label>
            
            <div class="controls">
                <input type="text" name="location" required="true" />
            </div>
        </div>
        
        <div class="control-group">
            <label class="control-label">Team 1</label>
            
            <div class="controls">
                <input type="text" name="team_id1" required="true" />
            </div>
        </div>
        
        <div class="control-group">
            <label class="control-label">Team 2</label>
            
            <div class="controls">
                <input type="text" name="team_id2" required="true" />
            </div>
        </div>
        
        <input type="submit" name="submit" class="btn btn-primary" />
    </form>
</div>

</body>
</html>