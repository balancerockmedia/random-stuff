<?php

class Post extends Blog {
    
    public function getAllPosts($category = null) {
        if (!is_null($category)) {
            $where = "WHERE category.id = $category";
        } else {
            $where = '';
        }
        
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
                comment.body AS comment_body,
                category.id AS category_id,
                category.title AS category_title 
            FROM post 
            INNER JOIN user 
                ON post.user_id = user.id 
            INNER JOIN category 
                ON category.id = post.category_id 
            LEFT OUTER JOIN comment 
                ON comment.post_id = post.id 
            $where
            ORDER BY post_id ASC
            
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

        $result = $stmt->execute(array(
            $_POST['title'],
            $_POST['body'],
            $_POST['user_id'],
            $_POST['category_id']
        ));
            
        return $result;
    }
    
    public function updatePost() {
        $sql = "UPDATE post SET title = ?, body = ?, user_id = ?, category_id = ? WHERE id = ?";

        $stmt = $this->pdo->prepare($sql);

        $result = $stmt->execute(array(
            $_POST['title'],
            $_POST['body'],
            $_POST['user_id'],
            $_POST['category_id'],
            $_POST['id']
        ));
            
        return $result;
    }
    
    public function deletePost($id) {
        $sql = "DELETE FROM post WHERE id = ?";
        
        $stmt = $this->pdo->prepare($sql);
        $result = $stmt->execute(array($id));
        
        return $result;
    }
    
}

?>