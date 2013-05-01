<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class League extends CI_Controller {

	public function view($id) {
        $this->load->model('League_model');
        $this->load->model('Team_model');
        
        $data['league'] = $this->League_model->get_by_id($id);
        $data['teams'] = $this->Team_model->get_all_by_league($id);
        
		$this->load->view('league/view', $data);
	}
    
    public function add_game($id) {
        $this->load->model('League_model');
        
        $this->League_model->add_game();
        
        redirect('league/view/' . $id);
    }
    
}