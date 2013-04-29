<?php

class NewsItem {
    public function __construct($feed, $title, $link, $date, $description) {
        $this->feed = $feed;
        $this->title = $title;
        $this->link = $link;
        $this->date = $date;
        $this->description = $description;
    }
    
    public function __toString() {
        return $this->title;
    }
}

?>
