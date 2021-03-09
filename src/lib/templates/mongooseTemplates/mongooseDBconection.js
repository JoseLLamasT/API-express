function dbSetConection(name) {
  return `
const mongoose = require('mongoose');

  mongoose.connect(process.env.DATABASE_URL, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useFindAndModify: false,
  })
  .then(() => console.log(process.env.DATABASE_NAME +' DB is connected'))
  .catch(error => console.log(error));

module.exports = mongoose;`;
}
module.exports = { dbSetConection };
