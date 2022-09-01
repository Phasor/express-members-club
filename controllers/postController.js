const Post = require("../models/post");
const User = require("../models/user");

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

exports.post_delete = (req, res) => {
    // check sender is logged in and an admin
    if(!req.user) { // log in check
        res.render("post", { user: req.user, error: "You must be logged in to delete a post" });
    } else if(!req.user.admin){ // admin check
        res.render("post", { user: req.user, error: "You must be an admin to delete a post" });
    } else {
        Post.findByIdAndDelete(req.params.id, (err, post) => {
            if (err) {
                console.log(err);
                res.render("post", { user: req.user, error: "Error deleting post" });
            } else {
                res.redirect("/");
            }
        });
    }
}


