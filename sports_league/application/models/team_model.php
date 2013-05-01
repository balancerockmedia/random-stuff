<?php

class Team_model extends CI_Model {

    function __construct() {
        parent::__construct();
    }
    
    function get_all_by_league($league_id) {
        $this->db->select('team.*, league.name AS league_name, count(player.id) AS num_players');
        $this->db->from('team');
        $this->db->join('league', 'league.id = team.league_id');
        $this->db->join('player', 'player.team_id = team.id', 'left outer');
        $this->db->where('league_id', $league_id);
        $this->db->group_by('team.id');
        
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
    
    function get_schedule($team_id) {
        $this->db->from('game');
        $this->db->where('team_id1 =', $team_id);
        $this->db->or_where('team_id2 =', $team_id); 
        
        $query = $this->db->get();
        
        $games = array();
        
        foreach ($query->result() as $game) {
            if ($game->team_id1 === $team_id) {
                $game->opponent = $this->get_by_id($game->team_id2);
            } else {
                $game->opponent = $this->get_by_id($game->team_id1);
            }
            
            $games[] = $game;
        }
        
        return $games;
    }

}