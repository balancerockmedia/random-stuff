<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>CDIA Map</title>
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
            </a>
            
            <a class="brand" href="index.php">CDIA Map</a>
            
            <div class="nav-collapse collapse">
                <ul class="nav">
                    <li><a id="admin_link" href="#">Admin</a></li>
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
                    <select name="program" class="span4">
                        <option value="">Program</option>
                        <option value="audio_production">Audio Production</option>
                        <option value="graphic_design">Graphic Design</option>
                        <option value="web_development">Web Development</option>
                    </select>
                    
                    <select name="status" class="span4">
                        <option value="">Status</option>
                        <option value="student">Student</option>
                        <option value="alumni">Alumni</option>
                        <option value="instructor">Instructor</option>
                    </select>
                    
                    <a id="reset" class="btn" href="#">Reset</a>
                </form>
            </div>
            
            <p id="current_search_terms"></p>
            
            <div id="map_canvas" style="width:100%; height:500px"></div>
        </div>
        
        <div class="span3" id="sidebar">
            <p><strong>CDIA Map of Students and Alumni</strong></p>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
        </div>
    </div>
</div>

<div class="modal hide fade" id="admin_modal">
    <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal">&times;</button>
        <h3>CDIA Map Admin</h3>
    </div>
    <div class="modal-body">
        <div id="edit_delete_users">
            <h4>Search for a user by last name</h4>
        
            <form class="form-search" id="search_form" method="post" action="">
                <input type="text" class="input-medium search-query" name="search">
                <button type="submit" name="submit" class="btn">Search</button>
            </form>
        
            <h4>Recently added users</h4>
            <table class="table" id="user_table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Program</th>
                        <th>Status</th>
                        <th>&nbsp;</th>
                        <th>&nbsp;</th>
                    </tr>
                </thead>
                <tbody></tbody>
            </table>
        </div>
        <div id="add_user">
            <form method="post" action="">
                <label>Name</label>
                <input type="text" name="first_name" placeholder="first name" /> <input type="text" name="last_name" placeholder="last name" />
                
                <label>Address</label>
                <input type="text" name="city" placeholder="city" /> <input type="text" name="state" placeholder="state" />
                
                <label></label>
                <input type="text" name="country" placeholder="country" />
                
                <label>Coordinates</label>
                <input type="text" name="latitude" placeholder="latitude" /> <input type="text" name="longitude" placeholder="longitude" />
                
                <label>Program</label>
                <input type="text" name="program_id" />
                
                <label>Status</label>
                <input type="text" name="status_id" />
                
                <input type="hidden" name="id" />
            </form>
        </div>
    </div>
    <div class="modal-footer">
        <a href="#" class="btn" id="go_back_link">Back</a>
        <a href="#" class="btn btn-primary" id="add_user_link">Add User</a>
    </div>
</div>

<script type="text/javascript" src="http://code.jquery.com/jquery-1.9.0.min.js"></script>
<script type="text/javascript" src="https://maps.googleapis.com/maps/api/js?key=AIzaSyAc41-D-3KuweoDpD4npOB7ApJnaVSWpk4&sensor=false"></script>
<script type="text/javascript" src="js/bootstrap.js"></script>
<script type="text/javascript" src="js/app.js"></script>

</body>
</html>