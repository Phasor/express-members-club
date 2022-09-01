const Post = require("../models/post");
const User = require("../models/user");

exports.index_get = (req, res) => {
    Post.find({}).populate("author").exec((err, posts) => {
        if (err) {
            console.log(err);
            res.render("index", { error: err });
        } else {
            //console.log(posts);
            console.log(req.user);
            res.render("index", { user: req.user, posts: posts });
        }
    });
};

   