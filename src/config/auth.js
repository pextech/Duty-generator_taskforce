import jwt from 'jsonwebtoken';

const auth = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    jwt.verify(token, process.env.TOKEN);
    req.userData = token;
    next();
  } catch {
    res.status(500).json({
      message: 'Auth failed',
    });
  }
};
export default auth;
