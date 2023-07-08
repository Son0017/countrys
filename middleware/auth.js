const auth = (req, res, next) => {
  const data = req.headers.authorization;
  let token = data.split(" ")[data.length - 1];
  if (token) {
    try {
      const decode = jwt.verify(token, process.env.SECRET_KEY);
      req.user = decode;
    } catch (error) {
      return res.send({ message: error.message });
    }
  } else {
    return res.send({ message: "token isn`t gotten" });
  }
  next();
};
export default auth;
