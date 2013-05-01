<?php

class League_model extends CI_Model {

    function __construct() {
        parent::__construct();
    }
    
    function get_all() {
        $this->db->select('league.*, count(team.id) AS num_teams');
        $this->db->from('league');
        $this->db->join('team', 'team.league_id = league.id');
        $this->db->group_by('league.id');
        
        $query = $this->db->get();
        
        return $query->result();
    }
    
    function get_by_id($id) {
        $query = $this->db->get_where('league', array('id' => $id));
        return $query->row();
    }

}