<?php

$rss_feeds = array(
  'CNN' => 'http://rss.cnn.com/rss/cnn_topstories.rss', 
  'YAHOO' => 'http://rss.news.yahoo.com/rss/topstories'
);

$ch = curl_init();

curl_setopt($ch, CURLOPT_RETURNTRANSFER, TRUE);
  
foreach ($rss_feeds as $feed => $url) {
    $yql_url = "http://query.yahooapis.com/v1/public/yql?q=";
    $yql_url .= "select%20*%20from%20rss%20where%20url='$url'&format=json";
    
    curl_setopt($ch, CURLOPT_URL, $yql_url);
    
    $items = json_decode(curl_exec($ch), true);
    
    $results = $items['query']['results']['item'];
    
    foreach($results as $result) {
        echo '<p>'.$feed.'</p>';
        echo '<p>'.$result['title'].'</p>';
        echo '<p>'.$result['origLink'].'</p>';
        echo '<p>'.$result['pubDate'].'</p>';
        echo $result['description'];
        echo '<br /><br />';
    }
}

curl_close($ch);

?>
