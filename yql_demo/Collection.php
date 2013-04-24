<?php

abstract class Collection {
    public $items;
    
    abstract public function fetch();
    
    public function __toString() {
        return count($this->items) . ' Items';
    }
}

?>
