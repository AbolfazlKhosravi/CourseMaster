const pool = require("../utilities/mysql_database");

class UsersModels {
  static insertUser = async (name, email, password) => {
    const [resulte] = await pool.query(
      "insert into users (id,name , email ,password) values (uuid(),?,?,?)",
      [name, email, password]
    );
    return resulte;
  };

  static getUsersByEmail = async (email) => {
    const [result] = await pool.query("select * from users where email = ? ",[email]);
    return result[0];
  };
}

module.exports = UsersModels;
