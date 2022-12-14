const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    firstName: String,
    lastName: String,
    email: String,
    password: String,
    member: Boolean,
    admin: Boolean,
});

// Virtual for members's full name
UserSchema
  .virtual('fullName')
  .get(function () {
  // To avoid errors in cases where a user does not have either a last name or first name
  // We want to make sure we handle the exception by returning an empty string for that case
    let fullname = '';
    if (this.firstName && this.lastName) {
      fullname = `${this.firstName}, ${this.lastName}`;
    }
    if (!this.firstName || !this.lastName) {
      fullname = '';
    }
    return fullname;
  });

// Virtual for user's URL
UserSchema
    .virtual('url')
    .get(function() { // We don't use an arrow function as we'll need the this object
    return `/post/author/${this._id}`;
});

  //Export model
module.exports = mongoose.model('User', UserSchema);
