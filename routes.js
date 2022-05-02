    const express = require("express");
    const User = require("./models/userSchema.js");

    let router = express.Router();

    router.use(function(req, res, next) {
        User.find()
                    .sort({"createdAt": "descending"})
                    .exec(function(err, users) {
                        if(err) {return next(err)};
                        if(users && users !== "") {
                            res.render("index", {users});
                        } else {
                            res.render("index", {user: ["tEO"]})
                        }
                       
                    })
    })

    module.exports = router;