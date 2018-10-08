class AppRepository {
  constructor(dao) {
    this.dao = dao;
  }

  createUser(name, email, password, region, creation_time) {
    return this.dao.doRun(`INSERT INTO users (name, email, password, region, creation_time)
      VALUES (?, ?, ?, ?, ?)`, [name, email, password, region, creation_time]);
  }

  createAdmin(email, password, creation_time) {
    return this.dao.doRun(`INSERT INTO admins (email, password, creation_time)
      VALUES (?, ?, ?)`, [email, password, creation_time]);
  }

  getUser(name) {
    return this.dao.doGet(`SELECT * FROM users WHERE name = ?`, [name])
  }

  getAllUsers() {
    return this.dao.doGetAll(`SELECT * FROM users`);
  }

  createUsersTable() {
    return this.dao.doRun(`
      CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        email TEXT,
        password TEXT,
        region TEXT,
        last_login TEXT,
        sig_image_path TEXT,
        creation_time TEXT)`
    );
  }

  createAdminsTable() {
    return this.dao.doRun(`
      CREATE TABLE IF NOT EXISTS admins (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        email TEXT,
        password TEXT,
        last_login TEXT,
        login_attempts TEXT,
        creation_time TEXT)`
    );
  }

  createAwardsTable() {
    return this.dao.doRun(`
      CREATE TABLE IF NOT EXISTS awards (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        recipient_name TEXT,
        recipient_email TEXT,
        creation_time TEXT,
        award_type INTEGER
      )`)
  }

  createRepo() {
    return this.createUsersTable()
      .then(() => this.createAdminsTable())
      .then(() => this.createAwardsTable())
      .then(() => console.log('Successfully created all database tables'))
      .catch((error) => console.log('Error creating database tables: ', error));
  }
}

module.exports = AppRepository
