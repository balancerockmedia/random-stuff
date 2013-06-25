<?php

require 'NewsCollection.php';

$feeds = array(
  'CNN' => 'http://rss.cnn.com/rss/cnn_topstories.rss', 
  'NPR' => 'http://www.npr.org/rss/rss.php?id=1001'
);

$news_collection = new NewsCollection($feeds);
$news_collection->fetch();

echo $news_collection;

foreach($news_collection->items as $item) {
    echo "<p>$item</p>";
}

?>