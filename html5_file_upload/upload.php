<?php
    
$img_formats = array('jpg', 'gif', 'png');

$extension = end(explode('.', $_FILES['file_upload']['name']));

if (in_array($extension, $img_formats)) {
    $uploaddir = dirname(__FILE__) . '/uploads/';
    $uploadfile = $uploaddir . basename($_FILES['file_upload']['name']);
    
    if (move_uploaded_file($_FILES['file_upload']['tmp_name'], $uploadfile)) {
        echo 'succcess';
    } else {
        echo 'fail';
    }
}
    
?>