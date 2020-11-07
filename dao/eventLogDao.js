const poolConfig = require('../config/poolConfig')


async function save(array) {
  return await poolConfig.connect(`INSERT INTO eventLog (uname,path,date,data,status) VALUES (?,?,?,?,?)`, array);
}

async function update(array) {
  return await poolConfig.connect(`update eventLog set status = 1 where id = ?`, array)
}

module.exports = {
  save,
  update
}
