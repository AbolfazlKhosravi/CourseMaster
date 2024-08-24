const express = require("express");
const router = express.Router();
const {
  deleteCourse,
  getCourse,
  getCourses,
  insertCourse,
  updateCourse,
} = require("../controllers/courses-controller");
const auth = require("../middlewares/auth");

router.get("/:id", getCourse);

router.get("/", getCourses);

router.use(auth);

router.post("/", insertCourse);

router.put("/:id", updateCourse);

router.delete("/:id", deleteCourse);

module.exports = router;
