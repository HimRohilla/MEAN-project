var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var studentSchema = new Schema({
  class: {type: String, required: [true, 'class is required']},
  user_details: { type: Schema.Types.ObjectId, ref: 'User' },
  subjects: {type: String},
  created_at: Date,
  updated_at: Date
});

studentSchema.pre('save', function(next) {
  var currentDate = new Date();
  this.updated_at = currentDate;

  if (!this.created_at)
    this.created_at = currentDate;
  next();
});

module.exports = mongoose.model('Student', studentSchema);