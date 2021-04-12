import jwt from "jsonwebtoken";

export const verifyToken = async (req, res, next) => {
  const token = req.header("Authorization");
  if (!token) return res.status(401).send("Access Denied");

  try {
    const verify = await jwt.verify(token, process.env.SECRET_TOKEN);
    req.user = verify;
    next();
  } catch (err) {
    res.status(400).send("Invalid Token");
  }
};
