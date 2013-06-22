<?php

class Post extends Blog {
	
    public function getAllPosts() {
		$sql = <<<EOL
            
            SELECT 
                post.id AS post_id, 
                post.title AS post_title, 
                DATE_FORMAT(post.last_updated, '%b %e, %Y') AS post_date, 
                post.body AS post_body, user.username AS post_author, 
                user.email AS author_email, 
                comment.post_id AS comment_post_id, 
                comment.title AS comment_title, 
                DATE_FORMAT(comment.last_updated, '%b %e, %Y') AS comment_date, 
                comment.body AS comment_body 
            FROM post 
            LEFT OUTER JOIN comment 
                ON comment.post_id = post.id 
            LEFT OUTER JOIN user 
                ON post.user_id = user.id
                
EOL;

		$stmt = $this->pdo->prepare($sql);
		$stmt->execute();
		return $stmt->fetchAll(PDO::FETCH_OBJ);
	}
	
	public function getPostById($id) {
		$sql = "SELECT * FROM post WHERE id = ?";
		$stmt = $this->pdo->prepare($sql);
		$stmt->execute(array($id));
		return $stmt->fetch(PDO::FETCH_OBJ);
	}
	
	public function addPost() {
		$sql = "INSERT INTO post (title, body, user_id, category_id) VALUES (?, ?, ?, ?)";

		$stmt = $this->pdo->prepare($sql);

		$stmt->execute(array(
			$_POST['title'],
			$_POST['body'],
			$_POST['user_id'],
			$_POST['category_id']
		));
	}
	
	public function updatePost() {
		$sql = "UPDATE post SET title = ?, body = ?, user_id = ?, category_id = ? WHERE id = ?";

		$stmt = $this->pdo->prepare($sql);

		$stmt->execute(array(
			$_POST['title'],
			$_POST['body'],
			$_POST['user_id'],
			$_POST['category_id'],
			$_POST['id']
		));
	}
	
	public function deletePost($id) {
		$sql = "DELETE FROM post WHERE id = ?";
		
		$stmt = $this->pdo->prepare($sql);
		$stmt->execute(array($id));
	}
    
}

?>