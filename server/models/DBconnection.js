
const mongoose = require('mongoose');

  mongoose.connect('mongodb://localhost/america', {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useFindAndModify: false,
  })
  .then(() => console.log('america DB is connected'))
  .catch(error => console.log(error));

module.exports = mongoose;