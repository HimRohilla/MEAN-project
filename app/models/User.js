var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
  name: String,
  username: { type: String, required: [true, 'username required'], unique: true },
  password: { type: String, required: [true, 'password required'] },
  created_at: Date,
  updated_at: Date
});

userSchema.pre('save', function(next) {
  var currentDate = new Date();
  this.updated_at = currentDate;

  if (!this.created_at)
    this.created_at = currentDate;
  next();
});

module.exports = mongoose.model('User', userSchema);