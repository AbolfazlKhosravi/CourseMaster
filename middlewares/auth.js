const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = function auth(req, res, next) {
  const headerAccessToken = req.header("accessToken");
  const cookieAccessToken = req.cookies.accessToken;
  const headerRefreshToken = req.header("refreshToken");
  const cookieRefreshToken = req.cookies.refreshToken;
  if (!headerAccessToken) return res.status(401).send("access denied");
  if (!cookieAccessToken) return res.status(401).send("access denied");

  try {
    const decode = jwt.verify(
      headerAccessToken.split(" ")[1],
      process.env.ACCESS_TOKEN_SECRET
    );
    req.userData = decode;
    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      try {
        const decode = jwt.verify(
          headerRefreshToken.split(" ")[1],
          process.env.REFRESH_TOKEN_SECRET
        );

        const newAccessToken = jwt.sign(
          { id: decode.id },
          process.env. ACCESS_TOKEN_SECRET,
          { expiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN }
        );
        const newRefresgToken = jwt.sign(
          { id: decode.id },
          process.env.REFRESH_TOKEN_SECRET,
          { expiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN }
        );
        res.setHeader("accessToken", `Bearer ${newAccessToken}`);
        res.setHeader("refreshToken", `Bearer ${newRefresgToken}`);
        res.cookie("accessToken", newAccessToken, {
          httpOnly: true,
          secure: process.env.NODE_ENV !== "development",
        });
        res.cookie("refreshToken", newRefresgToken, {
          httpOnly: true,
          secure: process.env.NODE_ENV !== "development",
        });
        res.status(200).send("access token and refresh token updated")
      } catch (error) {
        return res.status(400).send("refresh token is invalid");
      }
    } else {
      return res.status(400).send("token is invalid");
    }
  }
};
