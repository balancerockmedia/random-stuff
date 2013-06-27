<?php

if (isset($_REQUEST['action'])) {
    switch($_REQUEST['action']) {
        case 'add_post':
        $post->addPost();
        header('Location: index.php');
        break;
    
        case 'edit_post':
        $edit_post = $post->getPostById($_GET['id']);
        break;
    
        case 'update_post':
        $post->updatePost();
        header('Location: index.php');
        break;
    
        case 'delete_post':
        $post->deletePost($_GET['id']);
        header('Location: index.php');
        break;
        
        case 'add_comment':
        $comment->addComment();
        header('Location: index.php');
        break;
    }
}

?>