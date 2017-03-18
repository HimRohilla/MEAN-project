var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var teacherSchema = new Schema({
  classes_taught: {type: String},
  user_details: {type: Schema.Types.ObjectId, ref: 'User'},
  created_at: Date,
  updated_at: Date
});

teacherSchema.pre('save', function(next) {
  var currentDate = new Date();
  this.updated_at = currentDate;

  if (!this.created_at)
    this.created_at = currentDate;
  next();
});

module.exports = mongoose.model('Teacher', teacherSchema);