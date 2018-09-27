const express = require("express"),
  bodyParser = require("body-parser"),
  app = express(),
  massive = require("massive"),
  session = require("express-session");
require("dotenv").config();

// Controller Imports
const controller = require("./controller");

// Middleware
app.use(bodyParser.json());
app.use(
  session({
    secret: "secrets",
    resave: false,
    saveUninitialized: false
  })
)

// Database
massive(process.env.CONNECTION_STRING)
  .then(dbInstance => {
    app.set("db", dbInstance);
    console.log("Connected to database");
  })
  .catch(err => {
    console.log(err.message);
  });

app.post("/api/register", (req, res, next) => {
  const db = app.get("db");
  const { username, password } = req.body;
  const profilePic = `https://robohash.org/${username}`;
  db.addUser([username, password, profilePic])
    .then(user => {
      req.session.user_id = user[0].user_id;
      res.status(200).send(user);
    })
    .catch(err => {
      res.status(500).send(err);
    });
});

app.post("/api/login", (req, res, next) => {
  const db = app.get("db");
  const { username, password } = req.body;
  db.findUser([username, password])
    .then(user => {
      req.session.user_id = user[0].user_id;
      res.status(200).send(user);
    })
    .catch(err => {
      res.status(500).send(err);
    });
});

app.get("/api/posts/:userid", (req, res, next) => {
  const db = app.get("db");
  const { user_id } = req.session;
  const mine = req.query.mine;
  let searchString = '%%';

  if (req.query.search !== undefined) {
    searchString = `%${req.query.search}%`;
  }

  if (mine && searchString !== '%%') {
    // console.log(mine, searchString);
    // console.log("Include user posts and search string exists")
    db.getPosts(searchString)
      .then(posts => {
        res.status(200).send(posts);
      })
      .catch(err => {
        res.status(500).send(err);
      });
  }

  else if (mine == undefined && searchString == '%%') {
    // console.log(userid, mine, searchString);
    // console.log("Don't include user posts and no search string")
    db.getPostsFilterUser([user_id, searchString])
      .then(posts => {
        res.status(200).send(posts);
      })
      .catch(err => {
        res.status(500).send(err);
      });
  }

  else if (mine == undefined && searchString !== '%%') {
    // console.log(userid, mine, searchString);
    // console.log("Don't include user posts and search string exists");
    db.getPostsFilterUser([user_id, searchString])
      .then(posts => {
        res.status(200).send(posts);
      })
      .catch(err => {
        res.status(500).send(err);
      });
  }

  else {
    // console.log(mine, searchString);
    // console.log("Include user posts and no search string")
    db.getPosts(searchString)
      .then(posts => {
        res.status(200).send(posts);
      })
      .catch(err => {
        res.status(500).send(err);
      });
  }
});

app.get("/api/post/:postid", (req, res, next) => {
  const db = app.get("db");
  const { postid } = req.params;
  db.getPost([postid])
    .then(post => {
      res.status(200).send(post);
    })
    .catch(err => {
      res.status(500).send(err);
    });
});

app.post("/api/post/:userid", (req, res, next) => {
  const db = app.get("db");
  const user_id = req.session.user_id;
  // console.log(userid, req.body);
  // console.log("creating new post...");
  db.addPost([req.body.title, req.body.img, req.body.content, user_id])
    .then(post => {
      res.status(200).send(post);
    })
    .catch(err => {
      res.status(500).send(err);
    });
});

// Logout Endpoint
app.post("/api/logout", (req, res, next) => {
  console.log("Logging out...");
  req.session.destroy();
});

app.listen(4000, () => {
  console.log("Server is listening on port 4000");
});
