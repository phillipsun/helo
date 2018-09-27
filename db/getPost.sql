SELECT * FROM posts 
JOIN users ON posts.author_id = users.user_id
WHERE id = ($1);