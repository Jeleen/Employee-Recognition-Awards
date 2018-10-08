const sqlite3 = require('sqlite3').verbose();
//const Promise = require('bluebird');

class AwardDao {
  constructor(filePath) {
    this.db = new sqlite3.Database(filePath, (error) => {
      if (error) {
        console.log('Error connectionto database', error);
      } else {
        console.log('Successfully connected to database')
      }
    });
  }

  doRun(sql, params = []) {
    return new Promise((resolve, reject) => {
      this.db.run(sql, params, (error) => {
        if (error) {
          console.log('Error running sql: ' + sql, error);
          reject(error);
        } else {
          // this.lastID is only provided by sqlite3 if sql statement included
          // an insert, and this.lastID will contain the id of the inserted.
          resolve({ id: this.lastID });
        }
      });
    });
  }

  doGet(sql, params = []) {
    return new Promise((resolve, reject) => {
      this.db.get(sql, params, (error, result) => {
        if (error) {
          console.log('Error running get sql: ' + sql, error);
          reject(error);
        } else {
          resolve(result)
        }
      })
    })
  }

  doGetAll(sql, params = []) {
    return new Promise((resolve, reject) => {
      this.db.all(sql, params, (error, results) => {
        if (error) {
          console.log('Error running get all sql: ' + sql, error);
          reject(error);
        } else {
          resolve(results);
        }
      })
    })
  }

}

module.exports = AwardDao
