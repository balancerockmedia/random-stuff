<?php

class League_model extends CI_Model {

    function __construct() {
        parent::__construct();
    }
    
    function get_all() {
        $query = $this->db->get('league');
        return $query->result();
    }
    
    function get_by_id($id) {
        $query = $this->db->get_where('league', array('id' => $id));
        return $query->row();
    }

}