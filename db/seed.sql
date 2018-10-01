CREATE TABLE posts (
  id serial primary key,
  title varchar(45),
  img text,
  content text,
  author_id integer FOREIGN KEY REFERENCES users(user_id)
);

CREATE TABLE users (
  user_id serial primary key,
  username varchar(20),
  password varchar(20),
  profile_pic text
);