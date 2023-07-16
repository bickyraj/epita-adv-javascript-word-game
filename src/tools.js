const jwt = require('jsonwebtoken');


const generateAccessToken = (payload) => {
  return jwt.sign({ id: payload }, proces.env.SECRET, { expiresIn: '1d' });
}

const generateRefreshToken = (payload) => {
  return jwt.sign({ id: payload }, proces.env.SECRET, { expiresIn: '30d' });
}

const verifyToken = (req, res, next) => {
  const token = req.headers['access_token'];

  if (!token) {
    return res.status(401).json({ data: null, success: false, message: 'No token provided.' });
  }

  jwt.verify(token, process.env.SECRET, (err, decoded) => {
    if (err) {
      console.log(err);
      return res.status(403).json({ message: 'Failed to authenticate token.' });
    }

    req.user = decoded;
    next();
  });
}

module.exports = {
  generateAccessToken,
  generateRefreshToken,
  verifyToken
};