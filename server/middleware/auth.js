const jwt = require("jsonwebtoken");
require("dotenv").config();

//   get the token from the authorization header
module.exports = async (request, response, next) => {
  try {
    const token = await request.headers.authorization.split(" ")[1];

    if (!token) {
      return res
        .status(403)
        .json({ error: "Token is required for authentication" });
    }
   
    const jwtSecret = `${process.env.JWT_KEY}`;
    const payload = jwt.verify(token, jwtSecret);
  
    next();
  } catch (e) {

    if (e instanceof jwt.TokenExpiredError) {
      return response
        .status(401)
        .json({ error: `Token expired at ${err.expiredAt} ` });
    }
    if (e instanceof jwt.JsonWebTokenError) {
      return response.status(401).json({ error: `Token malformed` });
    } else {
      return response.status(401).json({ error: "Invalid Request" });
    }
  }
};

