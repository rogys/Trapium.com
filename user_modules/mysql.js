const mysql = require('mysql2');
class Data {
  constructor() {
    this.online = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '902130',
        database: 'trapium',
    });
  }
};
const data = new Data();
module.exports = data;