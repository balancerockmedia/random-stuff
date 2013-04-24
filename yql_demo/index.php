<?php

require 'NewsCollection.php';

$feeds = array(
  'CNN' => 'http://rss.cnn.com/rss/cnn_topstories.rss', 
  'YAHOO' => 'http://rss.news.yahoo.com/rss/topstories'
);

$news_collection = new NewsCollection($feeds);
$news_collection->fetch();

echo $news_collection;

?>
