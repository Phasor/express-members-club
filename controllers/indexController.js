const Post = require("../models/post");

exports.index_get = (req, res) => {
    Post.find({}, (err, posts) => {
        if (err) {
            res.render("index", {error: err});
        }
        if (posts) {
            console.log(posts);
            res.render("index", {posts: posts, title: "Home", user: req.user});
        }
    })
}