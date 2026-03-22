import jwt from "jsonwebtoken";

export default function auth(req, res, next) {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith("Bearer ")) {
    return res.status(401).send({ message: "Autorização necessária" });
  }

  const token = authorization.replace("Bearer ", "");

  const secret =
    process.env.NODE_ENV !== "production"
      ? "dev-secret"
      : process.env.JWT_SECRET;

  try {
    const payload = jwt.verify(token, secret);
    req.user = payload;
    next();
  } catch (error) {
    return res.status(401).send({ message: "Token inválido" });
  }
}
