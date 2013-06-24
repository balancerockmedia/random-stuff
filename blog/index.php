<?php

//error_reporting(E_ALL);
//ini_set("display_errors", 1);

spl_autoload_register(function ($class) {
    include 'classes/' . $class . '.php';
});

$post = new Post();
$user = new User();
$category = new Category();

require 'actions.php';

?>
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<title></title>
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<link href="css/bootstrap.css" rel="stylesheet" />
<link href="css/main.css" rel="stylesheet" />
<link href="css/bootstrap-responsive.css" rel="stylesheet" />
<script src="http://code.jquery.com/jquery-1.10.1.min.js"></script>
<script src="js/bootstrap.js"></script>
<script src="js/main.js"></script>
</head>
<body>

<div class="navbar navbar-inverse navbar-fixed-top">
    <div class="navbar-inner">
        <div class="container">
            <button type="button" class="btn btn-navbar" data-toggle="collapse" data-target=".nav-collapse">
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
            </button>
            <a class="brand" href="index.php">Blog</a>
            <div class="nav-collapse collapse">
                <ul class="nav">
                    <li class="active"><a href="index.php">Home</a></li>
                    <li><a href="#">About</a></li>
                </ul>
            </div>
        </div>
    </div>
</div>

<div class="container">
    <div class="row">
        <div class="span6">
            <ul class="nav nav-pills">
                <?php echo $category->getCategoryLinks((isset($_GET['category'])) ? $_GET['category'] : NULL); ?>
            </ul>
            
            <?php
            
            if (isset($_GET['category'])) {
                $posts = $post->getAllPosts($_GET['category']);
            } else {
                $posts = $post->getAllPosts();
            }
                
            $i = 0;
            $post_id = null;
            $num_posts = count($posts);
            $retval = '';

            foreach($posts as $row) {
                if ($row->post_id === $post_id) {
                    $retval .= '<div class="comment">';
                    $retval .= '<h5>'.$row->comment_title.' left on '.$row->comment_date.'</h5>';
                    $retval .= '<p>'.$row->comment_body.'</p>';
                    $retval .= '</div>';
                } else {
                    if ($i !== 0) {
                        $retval .= '</div>';
                    }

                    $retval .= '<div class="post well">';

                    $retval .= '<h4>'.$row->post_title.' posted on '.$row->post_date.' by <a href="mailto:'.$row->author_email.'">'.$row->post_author.'</a></h4>';

                    $retval .= '<p>'.$row->post_body.'</p>';
        
                    $retval .= '<p><a href="index.php?action=edit_post&id='.$row->post_id.'">Edit</a> | <a href="index.php?action=delete_post&id='.$row->post_id.'">Delete</a></p>';

                    if ($row->comment_title != '') {
                        $retval .= '<div class="comment">';
                        $retval .= '<h5>'.$row->comment_title.' left on '.$row->comment_date.'</h5>';
                        $retval .= '<p>'.$row->comment_body.'</p>';
                        $retval .= '</div>';
                    }

                    $post_id = $row->post_id;
                }

                $i++;
            }

            if ($i == $num_posts && $num_posts > 0) {
                $retval .= '</div>';
            }
            
            if ($num_posts === 0) {
                echo ' <p>No Posts</p>';
            } else {
                echo $retval;
            }
                
            ?>
        </div>
        <div class="span6">
            <h4><?php echo (isset($edit_post)) ? 'Edit Post' : 'New Post'; ?></h4>
            
            <form method="post" action="index.php">
                <p><label>Title: </label>
                <input type="text" name="title" required value="<?php echo (isset($edit_post)) ? $edit_post->title : ''; ?>" /></p>
                
                <p><label>Body: </label>
                <textarea name="body" rows="5" cols="10"><?php echo (isset($edit_post)) ? $edit_post->body : ''; ?></textarea></p>
                
                <p><label>Author: </label>
                <select name="user_id">
                    <?php echo $user->getUserOptionTags((isset($edit_post)) ? $edit_post->user_id : NULL); ?>
                </select></p>
                
                <p><label>Category: </label>
                <select name="category_id">
                    <?php echo $category->getCategoryOptionTags((isset($edit_post)) ? $edit_post->category_id : NULL); ?>
                </select></p>
                
                <?php if (isset($edit_post)): ?>    
                    <input type="hidden" name="action" value="update_post" />
                    <input type="hidden" name="id" value="<?php echo $edit_post->id; ?>" />
                <?php else: ?>
                    <input type="hidden" name="action" value="add_post" />
                <?php endif; ?>
                
                <p><input type="submit" class="btn btn-primary" name="submit" value="Submit" /></p>
            </form>
        </div>
    </div>
</div>

</body>
</html>