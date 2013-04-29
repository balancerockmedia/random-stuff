<?php

require 'Collection.php';
require 'NewsItem.php';

class NewsCollection extends Collection {
    public $feeds;
    
    public function __construct($feeds) {
        $this->feeds = $feeds;
    }
    
    public function fetch() {
        $this->items = array();
        
        $ch = curl_init();

        curl_setopt($ch, CURLOPT_RETURNTRANSFER, TRUE);
  
        foreach ($this->feeds as $feed => $url) {
            $yql_url = "http://query.yahooapis.com/v1/public/yql?q=";
            $yql_url .= "select%20*%20from%20rss%20where%20url='$url'&format=json";
    
            curl_setopt($ch, CURLOPT_URL, $yql_url);
    
            $items = json_decode(curl_exec($ch), true);
    
            $results = $items['query']['results']['item'];
    
            foreach($results as $result) {
                $news_link = (isset($result['origLink'])) ? $result['origLink'] : NULL;
        
                $news_item = new NewsItem(
                    $feed, 
                    $result['title'],
                    $news_link,
                    $result['pubDate'],
                    $result['description']
                );
        
                $this->items[] = $news_item;
            }
        }

        curl_close($ch);
    }
}

?>
