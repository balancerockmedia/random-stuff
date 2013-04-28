<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Team extends CI_Controller {

	public function view($id) {
        $this->load->model('Team_model');
        $this->load->model('Player_model');
        
        $this->load->helper('date');
        
        $data['team'] = $this->Team_model->get_by_id($id);
        
        $team_id = $data['team']->id;
        
        $data['players'] = $this->Player_model->get_by_team($team_id);
        
        $data['games'] = $this->Team_model->get_schedule($team_id);
        
		$this->load->view('team/view', $data);
	}
    
}

/* End of file welcome.php */
/* Location: ./application/controllers/team.php */