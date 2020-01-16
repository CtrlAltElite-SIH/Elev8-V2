const express = require('express')
const router = express.Router()
const User = require('../database/models/user')
const passport = require('../passport')

router.post('/', (req, res) => {
    console.log('user signup');
    console.log(req.user);
    const { username, password } = req.body
    // ADD VALIDATION
    User.findOne({ username: username }, (err, user) => {
        if (err) {
            console.log('User.js post error: ', err)
        } else if (user) {
            res.json({
                error: `Sorry, already a user with the username: ${username}`
            })
        }
        else {
            const newUser = new User({
                username: username,
                password: password
            })
            newUser.save((err, savedUser) => {
                if (err) return res.json(err)
                res.json(savedUser)
            })
        }
    })
})

router.post(
    '/login',
    function (req, res, next) {
        console.log('routes/user.js, login, req.body: ');
        console.log(req.body)
        next()
    },
    passport.authenticate('local'),
    (req, res) => {
        console.log('logged in', req.user);
        var userInfo = {
            username: req.user.username
        };
        res.send(userInfo);
    }
)

router.get('/', (req, res, next) => {
    console.log('===== user!!======')
    console.log(req.user._id);
    if (req.user) {
        res.json({ user: req.user })
    } else {
        res.json({ user: null })
    }
});

router.post('/logout', (req, res) => {
    if (req.user) {
        req.logout()
        res.send({ msg: 'logging out' })
    } else {
        res.send({ msg: 'no user to log out' })
    }
});

router.post('/post', (req, res, next) => {
    console.log('===== user!!======')
    console.log(req.user);
    if (req.user) {
        var today = new Date();
        var dd = String(today.getDate()).padStart(2, "0");
        var mm = String(today.getMonth() + 1).padStart(2, "0");
        var yyyy = today.getFullYear();

        today = mm + "/" + dd + "/" + yyyy;
        User.findById(req.user._id, function(err, user) {
            if (!user) {
            res.status(404).send("User not found");
            } else {
            const newBlog = {
                date: today,
                title: req.body.title,
                content: req.body.content,
                author: user.name
            };
            user.blogs.push(newBlog);
            user
                .save()
                .then(user => {
                res.json("blog added!");
                })
                .catch(err => {
                res.status(400).send("unable to post blog");
                });
            }
        });
    } else {
        res.json({ user: null })
    }
});

router.get('/blogs', (req, res, next) => {
    console.log('===== user!!======')
    console.log(req.user._id);
    if (req.user) {
        User.find({}, function(err, users) {
            if (err) {
              console.log(err);
            } else {
              res.json(users);
              console.log(req.user);
              console.log(req.body);
            }
          });        
    } else {
        res.json({ user: null })
    }
});

router.get('/:blogId/blogs', (req, res, next) => {
    console.log('===== user!!======')
    // console.log(req.user._id);
  let blogId = req.params.blogId;
  console.log(blogId);
  User.findOne({}, function(err, user) {
    if (err) {
      console.log(err);
    } else {
      var blogs = user.blogs;
      blogs.forEach(function(blog) {
        if (blog.id === blogId) {
          console.log(blog.id);
          res.json(blog);
        }
      })
    }
  })
})

router.get('/profile',(req,res,next)=>{
    User.findById(req.user._id,function(err,user){
        if(!user){
            res.status(404).send("user not found")
        }else{
            res.json(user);
            console.log("user data sent");
            console.log(user);
        }
    })
});

router.post('/profile', (req, res, next) => {
    console.log('===== user!!======')
    User.findById(req.user._id, function(err, user) {
        if (!user) {
          res.status(404).send("User not found");
        } else {
          user.userType = req.body.userType;
          user.about.content = req.body.content;
          user.about.github = req.body.github;
          user.about.linkedIn = req.body.linkedIn;
          user.about.facebook = req.body.facebook;
          user.about.skills.name = req.body.skills.name;
          user.about.skills.rating = req.body.skills.rating;
          user
            .save()
            .then(user => {
              res.json("user updated!");
            })
            .catch(err => {
              res.status(400).send("update not possible");
            });
        }
      });
    
});

module.exports = router