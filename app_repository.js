class AppRepository {
  constructor(dao) {
    this.dao = dao;
  }

  createUser(name, email, password, region, adminID) {
      var d = new Date();
	  return this.dao.doRun(`INSERT INTO users (name, email, password, login_attempts, region, creation_time, creator_id)
      VALUES (?, ?, ?, ?, ?, ?, ?)`, [name, email, password, 0, region, d.getTime(), adminID]);
  }

  createAdmin(name, email, password, cId) {
      var d = new Date();
	  return this.dao.doRun(`INSERT INTO admins (name, email, password, login_attempts, creation_time, creator_id)
      VALUES (?, ?, ?, ?, ?, ?)`, [name, email, password, 0, d.getTime(), cId]);
  }

  createAward(recipient_name, recipient_email, creation_time, award_type, creator_id) {
    return this.dao.doRun(`INSERT INTO awards (recipient_name, recipient_email, creation_time, award_type, creator_id)
      VALUES(?, ?, ?, ?, ?)`, [recipient_name, recipient_email, creation_time, award_type, creator_id]);
  }

  editUser(idOfUser, newEmail) {
    return this.dao.doRun(`UPDATE users SET email = ? WHERE id = ?`, [newEmail, idOfUser]);
  }

  editUserImage(idOfUser, newPath) {
    return this.dao.doRun(`UPDATE users SET sig_image_path = ? WHERE id = ?`, [newPath, idOfUser]);
  }

  editUserPassword(idOfUser, newPassword) {
    return this.dao.doRun(`UPDATE users SET password = ? WHERE id = ?`, [newPassword, idOfUser]);
  }

  editAdminPassword(idOfAdmin, newPassword) {
    return this.dao.doRun(`UPDATE admins SET password = ? WHERE id = ?`, [newPassword, idOfAdmin]);
  }

  getUserByName(name) {
    return this.dao.doGet(`SELECT * FROM users WHERE name = ?`, [name]);
  }

  getUserByEmail(email) {
    return this.dao.doGet(`SELECT * FROM users WHERE email = ?`, [email]);
  }

  getAdminByName(name) {
    return this.dao.doGet(`SELECT * FROM admins WHERE name = ?`, [name]);
  }
 getAdminByEmail(email) {
    return this.dao.doGet(`SELECT * FROM admins WHERE email = ?`, [email]);
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

  getAllUsersCreatedBy(id) {
    return this.dao.doGetAll(`SELECT * FROM users WHERE creator_id = ?`, [id]);
  }

  getAllAwardsCreatedBy(id) {
      return this.dao.doGetAll(`SELECT * FROM awards WHERE creator_id = ?`, [id]);
  }

 getAllAwards() {
    return this.dao.doGetAll(`SELECT * FROM awards`);
  }

 getAward(id) {
    return this.dao.doGet(`SELECT * FROM awards WHERE id = ?`, [id]);
  }

  removeAward(awardId) {
    return this.dao.doRun(`DELETE FROM awards WHERE id = ?`, [awardId]);
  }

  removeAwardsOfUser(id){
    return this.dao.doRun(`DELETE FROM awards WHERE creator_id = ?`, [id]);
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

  updateUserLoginAttempts(email){
  	return this.dao.doRun(`UPDATE users SET login_attempts = login_attempts + 1 WHERE email = ?`, [email]);
  }

  updateAdminLoginAttempts(email){
    	return this.dao.doRun(`UPDATE admins SET login_attempts = login_attempts + 1 WHERE email = ?`, [email]);
  }

  updateUserLastLogin(id){
	var d = new Date();
	return this.dao.doRun(`UPDATE users SET last_login = ? WHERE id = ?`, [d.getTime(), id]);
  }

  updateAdminLastLogin(id){
    var d = new Date();
	return this.dao.doRun(`UPDATE admins SET last_login = ? WHERE id = ?`, [d.getTime(), id]);
  }


  createUsersTable() {
    return this.dao.doRun(`
      CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        email TEXT,
        password TEXT,
        region TEXT,
        last_login INTEGER,
        login_attempts INTEGER,
        sig_image_path TEXT,
        creation_time INTEGER,
        creator_id INTEGER,
        FOREIGN KEY(creator_id) REFERENCES admins(id)
      )`)
  }

  createAdminsTable() {
    return this.dao.doRun(`
      CREATE TABLE IF NOT EXISTS admins (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        email TEXT,
        password TEXT,
        last_login INTEGER,
        login_attempts INTEGER,
        creation_time INTEGER,
        creator_id INTEGER,
        FOREIGN KEY(creator_id) REFERENCES admins(id)
      )`)
  }

  createAwardsTable() {
    return this.dao.doRun(`
      CREATE TABLE IF NOT EXISTS awards (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        recipient_name TEXT,
        recipient_email TEXT,
        creation_time INTEGER,
        award_type TEXT,
        creator_id INTEGER,
        FOREIGN KEY(creator_id) REFERENCES users(id)
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
            return this.createUser("defaultUser", "defaultUser", "pass", "United States", 1);
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
            return this.createAdmin("defaultAdmin", "defaultAdmin", "pass", 1);
          }
        });
      })
      .then(() => console.log('Successfully created all database tables and default User/Admin'))
      .catch((error) => console.log('Error creating database tables or default User/Admin: ', error));
  }
}

module.exports = AppRepository
