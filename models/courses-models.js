const pool = require("../utilities/mysql_database");

class CoursesModels {
  static getCourses = async () => {
    const [result] = await pool.query("select * from courses");
    return result;
  };
  static getCourse = async (id) => {
    const [result] = await pool.query(
      "select * from courses where courses.id=?",
      [id]
    );
    return result[0];
  };

  static updateCourse = async (title, id) => {
    const [result] = await pool.query("update courses set title=? where id=?", [
      title,
      id,
    ]);
    return getCourse(id);
  };
  static insertCourse = async (title) => {
    const [result] = await pool.query(
      "insert into courses (title) values (?)",
      [title]
    );

    return getCourse(result.insertId);
  };

  static deletCourse = async (id) => {
    const result = await pool.query("delete from courses where id=?", [id]);
    return getCourses();
  };
  static callStoredProdecure = async (id) => {
    const [result] = await pool.query("call sp_select (?)", [id]);
    return result;
  };
}
module.exports=CoursesModels
