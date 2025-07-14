import jwt from "jsonwebtoken";

const authenticate = async (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({
      msg: "Token tidak ditemukan",
    });
  }

  //   console.log("token:", token);

  //   console.log("Auth header:", authHeader);

  jwt.verify(token, process.env.JWT_TOKEN, (err, decoded) => {
    if (err) {
      return res.status(403).json({
        msg: "Token tidak valid",
      });
    }
    req.user = {
      id: decoded.id,
      email: decoded.email,
      role: decoded.role,
    };
    next();
  });
};

export default authenticate;
