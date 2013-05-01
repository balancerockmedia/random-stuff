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
    
    function add_game() {
        $data = array(
           'date_played' => date('Y-m-d H:i:s', strtotime($this->input->post('date_played'))),
           'location' => $this->input->post('location'),
           'team_id1' => $this->input->post('team_id1'),
           'team_id2' => $this->input->post('team_id2'),
        );

        $this->db->insert('game', $data);
        
        return $this->db->insert_id();
    }

}