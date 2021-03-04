function dbSetConection(name){
  return(`
const mongoose = require('mongoose');

  mongoose.connect('mongodb://localhost/${name}', {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useFindAndModify: false,
  })
  .then(() => console.log('${name} DB is connected'))
  .catch(error => console.log(error));

module.exports = mongoose;`
)
}
module.exports={dbSetConection}
