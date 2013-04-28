<?php

class Player_model extends CI_Model {

    function __construct() {
        parent::__construct();
    }
    
    function get_by_team($team_id) {
        $query = $this->db->get_where('player', array('team_id' => $team_id));
        return $query->result();
    }

}