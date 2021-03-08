function dbSetConection(dbDetail) {
  return `
const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize')
const basename = path.basename(__filename);

const db = {};

let config = {
  host: '${dbDetail.confi.host}',
  username: '${dbDetail.confi.username}',
  password: '${dbDetail.confi.password}',
  database: '${dbDetail.name}',
  logging: false,
  dialect: '${dbDetail.confi.dialect}',
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
};

const sequelize = new Sequelize(config);
fs.readdirSync(__dirname)
  .filter(file => {
    return (
      file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js'
    );
  })
  .forEach(file => {
    const model = require(path.join(__dirname, file))(
      sequelize,
      Sequelize.DataTypes
    );
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
})

console.log('${dbDetail.name} DB is connected')

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
  `;
}
module.exports = { dbSetConection };
