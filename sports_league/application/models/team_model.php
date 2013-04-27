<?php

class Team_model extends CI_Model {

    function __construct() {
        parent::__construct();
    }
    
    function get_all() {
        $this->db->select('team.*, league.name AS league_name');
        $this->db->from('team');
        $this->db->join('league', 'league.id = team.league_id');
        
        $query = $this->db->get();

        return $query->result();
    }
    
    function get_by_id($id) {
        $this->db->select('team.*, league.name AS league_name');
        $this->db->from('team');
        $this->db->where('team.id', $id);
        $this->db->join('league', 'league.id = team.league_id');
        
        $query = $this->db->get();

        return $query->row();
    }

}

?>