<?php

class User extends Blog {
    
	public function getUserOptionTags($id) {
		$sql = "SELECT * FROM user";

		$stmt = $this->pdo->prepare($sql);
		$stmt->execute();
		$results = $stmt->fetchAll(PDO::FETCH_OBJ);

		$user_options = '';

		foreach ($results as $row) {
			if ($id === $row->id) {
				$user_options .= '<option value="'.$row->id.'" selected>'.$row->username.'</option>';
			} else {
				$user_options .= '<option value="'.$row->id.'">'.$row->username.'</option>';
			}
		}
		
		return $user_options;
	}
    
}

?>