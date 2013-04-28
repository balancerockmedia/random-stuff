<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Team extends CI_Controller {

	public function view($id) {
        $this->load->model('Team_model');
        $this->load->model('Player_model');
        
        $this->load->helper('date');
        
        $data['team'] = $this->Team_model->get_by_id($id);
        $data['players'] = $this->Player_model->get_by_team($data['team']->id);
        $data['games'] = $this->Team_model->get_schedule($data['team']->id);
        
		$this->load->view('team/view', $data);
	}
    
}