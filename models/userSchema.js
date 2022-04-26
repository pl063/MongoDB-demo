    const mongoose = require("mongoose");
    const { Schema } = mongoose;

    const bcrypt = require("bcryptjs");

    const userSchema = new Schema({
        "username": {"type": String, "required": true, "unique": true},
        "password":  {"type": String, "required": true},
        "createdAt": {"type": Date, "default": Date.now},
        "displayName": String, 
        "bio": String
    });

    userSchema.methods.name = function() {
        return this.displayName || this.username;
    };

    const SALT_FACTOR = 10;
    const noop = () => {}; 

    userSchema.pre("save", function securePassword(done) {
        let user = this; 
        if(!user.isModified("password")) {
            return done();
        } else {
            bcrypt.genSalt(SALT_FACTOR, function saltPassword(err, salt) {
                if(err) {
                    return done(err);
                };
                bcrypt.hash(user.password, salt, noop, 
                    function hashPassword(err, hashedPassword) {
                        if(err) {
                            return done(err);
                        };
                        user.password = hashedPassword; 
                        done();
                    })
            })
        }
    });

    userSchema.methods.checkPassword = function checkPassword(guess, done) {
        bcrypt.compare(guess, this.password, (err, isMatched) => {
            done(err, isMatched);
        });
    };

    const User = mongoose.model("User", userSchema); 
    module.exports = User; 
