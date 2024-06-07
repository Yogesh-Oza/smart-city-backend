import jwt from "jsonwebtoken";


// verifing token
export const verifyToken = (req, res, next) => {
  const token = req.cookies.token;
//check if token is exists
  if (!token) {
    if (reNewToken(req, res)) {
      next();
    }
  } else {
    jwt.verify(token, process.env.JWT_SECRET_KEY, async (err, payload) => {
      if (err) return res.status(403).json({ message: "Token is not Valid!" });
      req.userId = payload.id;
      next();
    });
  }
};


//generating new token for access
const reNewToken = (req, res) => {
  const age = 100 * 10;
  const refreshtoken = req.cookies.refreshtoken;
  console.log("refresh token ", refreshtoken);

  if (!refreshtoken) {
    res.send({ message: "No refresh token is provided" });
  } else {
    jwt.verify(refreshtoken, process.env.JWT_SECRET_KEY, (err, user) => {
      if (err) {
        res.send({ message: "invalid refresh token" });
      } else {
        console.log("new access token is generated");
        const token = jwt.sign(
          { email: user.email },
          process.env.JWT_SECRET_KEY,
          {
            expiresIn: age,
          }
        );
        res
          .cookie("token", token, {
            maxAge: age,
          })
          .send({ message: "token refreshed" });
      }
    });
  }
};
