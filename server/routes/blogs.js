// const express = require('express')
// const router = express.Router()
// const User = require('../database/models/user')
// const passport = require('../passport')

// router.get("/blogs",(req, res) => {
//     User.find({}, function(err, users) {
//       if (err) {
//         console.log(err);
//       } else {
//         res.json(users);
//         console.log(req.user);
//         console.log(req.body);
//       }
//     });
//   });
  
//   router.get("/:blogId/blogs",(req, res) => {
//     let blogId = req.params.blogId;
//     console.log(blogId);
//     let id = req.user._id;
//     User.findOne({ _id: id }, function(err, user) {
//       if (err) {
//         console.log(err);
//       } else {
//         var blogs = user.blogs;
//         blogs.forEach(function(blog) {
//           if (blog.id === blogId) {
//             console.log(blog.id);
//             res.json(blog);
//           }
//         });
//       }
//     });
//   });
  
//   router.post('/post', (req, res) => {
//     // let user = req.user;
//     console.log(req.user);
//     let id = req.user._id;
//     var today = new Date();
//     var dd = String(today.getDate()).padStart(2, "0");
//     var mm = String(today.getMonth() + 1).padStart(2, "0");
//     var yyyy = today.getFullYear();
  
//     today = mm + "/" + dd + "/" + yyyy;
//     User.findById(id, function(err, user) {
//       if (!user) {
//         res.status(404).send("User not found");
//       } else {
//         const newBlog = {
//           date: today,
//           title: req.body.title,
//           content: req.body.content,
//           author: user.name
//         };
//         user.blogs.push(newBlog);
//         user
//           .save()
//           .then(user => {
//             res.json("blog added!");
//           })
//           .catch(err => {
//             res.status(400).send("unable to post blog");
//           });
//       }
//     });
//   });

  
//   module.exports = router;