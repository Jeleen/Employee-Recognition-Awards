const sqlite3 = require('sqlite3').verbose();

class AwardDao {
  constructor(filePath) {
    this.db = new sqlite3.Database(filePath, function(error) {
      if (error) {
        console.log('Error connectionto database', error);
      } else {
        console.log('Successfully connected to database')
      }
    });
  }

  doRun(sql, params = []) {
    return new Promise((resolve, reject) => {
      // db.run is used for things like CREATE and INSERT
      this.db.run(sql, params, function(error) {
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
      // db.get returns the FIRST row found, even if several matched
      this.db.get(sql, params, function(error, result) {
        if (error) {
          console.log('Error running get sql: ' + sql, error);
          reject(error);
        } else {
          resolve(result);
        }
      })
    })
  }

  doGetAll(sql, params = []) {
    return new Promise((resolve, reject) => {
      // db.all returns all found rows in an array
      this.db.all(sql, params, function(error, results) {
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
