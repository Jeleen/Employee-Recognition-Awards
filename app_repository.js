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

  createAward(recipient_name, recipient_email, creation_time, award_type) {
    return this.dao.doRun(`INSERT INTO awards (recipient_name, recipient_email, creation_time, award_type)
      VALUES(?, ?, ?, ?)`, [recipient_name, recipient_email, creation_time, award_type]);
  }

  editUser(idOfUser, newEmail) {
    return this.dao.doRun(`UPDATE users SET email = ? WHERE id = ?`, [newEmail, idOfUser]);
  }

  getUserByName(name) {
    return this.dao.doGet(`SELECT * FROM users WHERE name = ?`, [name]);
  }

  getUserByEmail(email) {
    return this.dao.doGet(`SELECT * FROM users WHERE email = ?`, [email]);
  }

  getAdminByEmail(name) {
    return this.dao.doGet(`SELECT * FROM admins WHERE email = ?`, [name]);
  }

  getUserById(id) {
    return this.dao.doGet(`SELECT * FROM users WHERE id = ?`, [id]);
  }

  getAdminById(id) {
    return this.dao.doGet(`SELECT * FROM admins WHERE id = ?`, [id]);
  }

  getAllUsers() {
    return this.dao.doGetAll(`SELECT * FROM users`);
  }

  getAllAdmins() {
    return this.dao.doGetAll(`SELECT * FROM admins`);
  }

  getAward(id) {
    return this.dao.doGet(`SELECT * FROM awards WHERE id = ?`, [id]);
  }

  getAllAwards() {
    return this.dao.doGetAll(`SELECT * FROM awards`);
  }

  removeUser(id){
	return this.dao.doRun(`DELETE FROM users WHERE id = ?`, [id]);
  }
  removeAdmin(id){
  	return this.dao.doRun(`DELETE FROM admins WHERE id = ?`, [id]);
  }
  updateAdminEmail(email, id){
	return this.dao.doRun(`UPDATE admins SET email = ? WHERE id = ?`, [email, id]);
  }

  updateUserEmail(email, id){
	return this.dao.doRun(`UPDATE users SET email = ? WHERE id = ?`, [email, id]);
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
      .then(() => {
        // create default user if they don't exist
        return this.getUserByEmail("defaultUser").then((foundUser) => {
          if(foundUser) {
            console.log('Default User, default already exists in db');
          } else {
            console.log('No existing default user found in db, creating default user');
            return this.createUser("defaultUser", "defaultUser", "pass", "Americas", "10/20/2018 09:32:00");
          }
        });
      })
      .then(() => {
        // create default admin if they don't exist
        return this.getAdminByEmail("defaultAdmin").then((foundAdmin) => {
          if (foundAdmin) {
            console.log('Default Admin, defaultAdmin already exists in db');
          } else {
            console.log('No existing default Admin found in db, creating defaultAdmin');
            return this.createAdmin("defaultAdmin", "pass", "10/21/2018 10:33:00");
          }
        });
      })
      .then(() => console.log('Successfully created all database tables and default User/Admin'))
      .catch((error) => console.log('Error creating database tables or default User/Admin: ', error));
  }
}

module.exports = AppRepository
