<?php

namespace cdia;

use \mysqli as mysqli;

/**
 * A MySQLi Database Helper Class
 *
 * @author dan@balancerockmedia.com
 */
class Database2 {
    
    protected $mysqli;
    
    /**
     * Construct
     */
    public function __construct() {
        $this->mysqli = new mysqli(HOST, USERNAME, PASSWORD, DATABASE);
    }
    
    /**
     *
     * @param string $query
     * @param array $params
     * @return object|null
     */
    public function fetch($query, $params) {
        $result = $this->mysqli->query($query);
        
        return $result->fetch_object();
    }
    
    /**
     *
     * @param string $query
     * @param array $params 
     * @return array
     */
    public function fetchAll($query, $params) {
        $result = $this->mysqli->query($query);
        
        $data = array();
        
        while ($obj = $result->fetch_object()) {
            $data[] = $obj;
        }
        
        return $data;
    }
    
    /**
     * Destruct
     */
    public function __destruct() {
        $this->mysqli = null;
    }
    
}

?>