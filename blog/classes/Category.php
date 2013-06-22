<?php

class Category extends Blog {
	
    public function getCategoryOptionTags($id = null) {
		$sql = "SELECT * FROM category";

		$stmt = $this->pdo->prepare($sql);
		$stmt->execute();
		$results = $stmt->fetchAll(PDO::FETCH_OBJ);

		$category_options = '';

		foreach ($results as $row) {
			if (!is_null($id) && $id === $row->id) {
				$category_options .= '<option value="'.$row->id.'" selected>'.$row->title.'</option>';
			} else {
				$category_options .= '<option value="'.$row->id.'">'.$row->title.'</option>';
			}
		}
		
		return $category_options;
	}
    
}

?>