SELECT * FROM posts 
JOIN users ON posts.author_id = users.user_id
WHERE title LIKE ($1);