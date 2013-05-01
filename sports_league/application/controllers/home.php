<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Home extends CI_Controller {

	public function index() {
        $this->load->model('League_model');
        
        $data['leagues'] = $this->League_model->get_all();
        
		$this->load->view('home', $data);
	}
    
}