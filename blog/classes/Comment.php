<?php

class Comment extends Blog {
    
    public function getFormHTML($post_id) {
		$html = <<<EOL
			<form class="comment_form" action="index.php?action=add_comment" method="post">
				<h4>Add a comment</h4>
				
				<p><label>Title</label>
				<input type="text" name="title" /></p>
				
				<p><label>Body</label>
				<textarea name="body"></textarea></p>
				
				<input type="hidden" name="post_id" value="$post_id" />
				
				<p><input type="submit" class="btn" name="submit" value="Submit" /></p>
			</form>
EOL;

		return $html;
    }
    
    public function addComment() {
        $sql = "INSERT INTO comment (title, body, user_id, post_id) VALUES (?, ?, ?, ?)";

        $stmt = $this->pdo->prepare($sql);

        $result = $stmt->execute(array(
            $_POST['title'],
            $_POST['body'],
            1,
            $_POST['post_id'],
        ));
            
        return $result;
    }
    
}

?>