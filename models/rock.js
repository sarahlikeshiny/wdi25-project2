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
//check to see if the comment is owned by the user who is logged in
commentSchema.methods.ownedBy = function ownedBy(user){
  return this.createdBy.id === user.id;
};
//image Schema - embedded in rock schema
const imageSchema = new mongoose.Schema({
  filename: { type: String },
  caption: { type: String }
});

imageSchema.virtual('src')
  .get(function getImageSRC(){
    if(!this.filename) return null;
    return `https://s3-eu-west-1.amazonaws.com/wdi25project2/${this.filename}`;
  });

imageSchema.pre('remove', function removeImage(next) {
  s3.deleteObject({ Key: this.image}, next);//amazon calls files objects, and filenames keys
});

const rockSchema = new mongoose.Schema({
  name: {type: String},
  location: {type: String},
  category: {type: String},
  createdBy: {type: mongoose.Schema.ObjectId, ref: 'User', required: true},//expect the value stored here to be an object id, in the user collection
  comments: [ commentSchema ],
  images: [imageSchema]
});


module.exports = mongoose.model('Rock', rockSchema);
