<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class League extends CI_Controller {

	public function view($id) {
        $this->load->model('League_model');
        
        $data['league'] = $this->League_model->get_by_id($id);
        
		$this->load->view('league/view', $data);
	}
    
}