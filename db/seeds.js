const mongoose = require('mongoose');
const { dbURI } = require('../config/environment');

mongoose.Promise = require('bluebird');
mongoose.connect(dbURI);

const Rock = require('../models/rock');
const User = require('../models/user');

Rock.collection.drop();
User.collection.drop();

User
  .create([{
    username: 'Sazzle',
    email: 'sarah@hello',
    password: 'a',
    passwordConfirmation: 'a'
  }])
  .then((users) => {
    console.log(`${users.length} users created`);
    return Rock
      .create([{
        name: 'Moab Fault',
        location: 'moab',
        category: 'structures',
        image: 'https://upload.wikimedia.org/wikipedia/commons/4/4c/Moab_fault.JPG',
        createdBy: users[0],
        comment: 'its a biggie '
      },{
        name: 'Annot Sandstones',
        location: 'Annot',
        category: 'Sandstones',
        image: 'https://upload.wikimedia.org/wikipedia/commons/4/4c/Moab_fault.JPG',
        createdBy: users[0],
        comment: 'big frechie turbidites '
      }]);
  })
  .then((rocks) => console.log(`${rocks.length} rocks created`))
  .catch((err) => console.log(err))
  .finally(() => mongoose.connection.close());
