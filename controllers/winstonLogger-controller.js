const getLoggers = (req, res) => {
  res.send(req.body);
};
const postLogger = (req, res) => {
  console.log("this loggin ");
  console.log("Received log:", req.body);
  res.send(req.body);
};

module.exports = {
  getLoggers,
  postLogger,
};
