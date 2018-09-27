SELECT * FROM users
WHERE users.username = ($1)
AND users.password = ($2);