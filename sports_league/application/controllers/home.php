<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Home extends CI_Controller {

	public function index() {
        $this->load->model('League_model');
        $this->load->model('Team_model');
        
        $data['leagues'] = $this->League_model->get_all();
        $data['teams'] = $this->Team_model->get_all();
        
		$this->load->view('home', $data);
	}
    
}

/* End of file welcome.php */
/* Location: ./application/controllers/home.php */