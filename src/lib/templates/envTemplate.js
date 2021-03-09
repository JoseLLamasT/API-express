function envMakerMongoose(inde, db) {
  return `
  PORT=${inde.port}
  DATABASE_URL=mongodb://localhost/${db.name}
  DATABASE_NAME=${db.name}
    `;
}

function envMakersequelizaDb(inde, db) {
  return `
  SQL_HOST=${db.confi.host}
  SQL_PASSWORD=${db.confi.password}
  SQL_USERNAME=${db.confi.username}
  PORT=${inde.port}
  SQL_DATABASE=${db.name}
    `;
}
module.exports = { envMakerMongoose, envMakersequelizaDb };
