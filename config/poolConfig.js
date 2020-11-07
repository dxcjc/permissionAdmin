const mysql = require('mysql')
const dbConfig = {
  host: 'localhost',
  post: 3306,
  user: 'root',
  password: '123456',
  database: 'user'
}

const pool = {
  pool: {},
  create() {
    this.pool = mysql.createPool(dbConfig)
  },
  connect(sql, attrArr) {
    return new Promise(((resolve, reject) => {
      this.pool.query(sql, attrArr, function (err, info) {
        // console.log(JSON.stringify(data));
        //每次查询都会 回调
        //
        try {
          resolve({err, info});
        }catch (e){
          console.log(e)
        }

      })
    }))
  }

}
pool.create()
module.exports = pool


