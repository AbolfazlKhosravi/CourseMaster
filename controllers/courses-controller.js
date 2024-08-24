const CoursesModels = require("../models/courses-models");
const AppErrores = require("../utilities/app_errores");
const { tryCatchHandler } = require("../utilities/tryCatch_Handler");

const getCourses = tryCatchHandler(async (req, res) => {
  const result = await CoursesModels.getCourses();
  res.status(200).send(result);
});
const getCourse = tryCatchHandler(async (req, res, next) => {
  const result = await CoursesModels.getCourse(Number(req.params.id));
  if (!result) {
     throw new AppErrores(100,404,"course whith this id not founded");
    //  return res.status(404).send("course whith this id not founded");
  }
  res.status(200).send(result);
});

const insertCourse = tryCatchHandler(async (req, res) => {
  if (!req.body.name || req.body.name.length < 3)
    throw new AppErrores(101,400,"name is required");

  const result = await CoursesModels.insertCourse(req.body.name);
  res.status(201).send(result);
});
const updateCourse = tryCatchHandler(async (req, res) => {
  CoursesModels.getCourse(Number(req.params.id)).then((result) => {
    if (!result)
      throw new AppErrores(100,404,"course whith this id not founded");
  });
  if (!req.body.name || req.body.name.length < 3)
    throw new AppErrores(101,400,"name is required");

  const result = await CoursesModels.updateCourse(
    req.body.name,
    parseInt(req.params.id)
  );
  res.status(200).send(result);
});
const deleteCourse = tryCatchHandler(async (req, res) => {
  CoursesModels.getCourse(Number(req.params.id)).then((result) => {
    if (!result)
      throw new AppErrores(100,404,"course whith this id not founded");
  });
  const result = await CoursesModels.deletCourse(parseInt(req.params.id));
  res.status(200).send(result);
});

module.exports = {
  getCourse,
  getCourses,
  updateCourse,
  insertCourse,
  deleteCourse,
};
