<?php

$iPhone = strpos($_SERVER['HTTP_USER_AGENT'], "iPhone");
$iPad = strpos($_SERVER['HTTP_USER_AGENT'], "iPad");
$android = strpos($_SERVER['HTTP_USER_AGENT'], "Android");

if ($iPhone || $iPad || $android) {
    header('Location: http://173.203.102.128/cdia_job_board/mobile/');
}
    
?>