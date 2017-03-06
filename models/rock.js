//model includes embedded images and comments
const mongoose = require('mongoose');
const s3 = require('../lib/s3');

//commentSchema, embedded in rock model.
const commentSchema = new mongoose.Schema({
  content: {type: String, required: true},
  createdBy: {type: mongoose.Schema.ObjectId, ref: 'User', required: true}
}, {
  timestamps: true
});

// check to see if the comment is owned by the user who is logged in
commentSchema.methods.ownedBy = function ownedBy(user){
  return this.createdBy.id === user.id;
};

const rockSchema = new mongoose.Schema({
  name: {type: String},
  location: {type: String},
  category: {type: String},
  createdBy: {type: mongoose.Schema.ObjectId, ref: 'User', required: true},
  comments: [ commentSchema ],
  image: {
    filename: { type: String },
    caption: { type: String }
  }
},{
  timestamps: true
});
//check to see if the comment is owned by the user who is logged in
// rockSchema.methods.ownedBy = function ownedBy(user){
//   return this.createdBy.id === user.id;
// };


rockSchema.virtual('imageSRC')
  .get(function getImageSRC(){
    if(!this.image.filename) return null;
    return `https://s3-eu-west-1.amazonaws.com/wdi25project2/${this.image.filename}`;
  });

rockSchema.pre('remove', function removeImage(next) {
  s3.deleteObject({ Key: this.image.filename }, next);//amazon calls files objects, and filenames keys
});


module.exports = mongoose.model('Rock', rockSchema);
