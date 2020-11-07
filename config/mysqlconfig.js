const mysql = require('mysql')

module.exports= {
    dbConfig
}

function dbConfig(sql, attrArr, fun) {
    let db = mysql.createConnection({
        host: 'localhost',
        port: 3306,
        user: 'root',
        password: '123456',
        database: 'user'
    })
    db.connect();
    db.query(sql,attrArr,fun);
    db.end;

}