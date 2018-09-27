SELECT * FROM posts 
JOIN users ON posts.author_id = users.user_id 
WHERE NOT user_id = ($1)
AND title LIKE ($2);