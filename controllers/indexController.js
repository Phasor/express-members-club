const Post = require("../models/post");
const User = require("../models/user");

exports.index_get = (req, res) => {
    Post.find({}).populate("author").exec((err, posts) => {
        if (err) {
            console.log(err);
            res.redirect("/");
        } else {
            console.log(posts);
            res.render("index", { title: "Home", user: req.user, posts: posts });
        }
    });
};

   