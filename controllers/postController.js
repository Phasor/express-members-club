const Post = require("../models/post");

exports.post_detail_get = (req, res) => {
    Post.findById(req.params.id).populate("author").exec((err, post) => {
        if (err) {
            console.log(err);
            res.redirect("/");
        } else {
            res.render("post", { user: req.user, post: post });
        }
    });
}
