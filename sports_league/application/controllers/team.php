<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Team extends CI_Controller {

	public function view($id) {
        $this->load->model('Team_model');
        
        $data['team'] = $this->Team_model->get_by_id($id);
        
		$this->load->view('team/view', $data);
	}
    
}

/* End of file welcome.php */
/* Location: ./application/controllers/team.php */