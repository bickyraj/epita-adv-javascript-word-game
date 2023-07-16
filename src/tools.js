const jwt = require('jsonwebtoken');


const generateAccessToken = (payload) => {
  return jwt.sign({ id: payload }, process.env.SECRET, { expiresIn: '3600s' });
}

const generateRefreshToken = (payload) => {
  return jwt.sign({ id: payload }, process.env.SECRET, { expiresIn: '30d' });
}

const verifyToken = (req, res, next) => {
  const access_token = req.headers['access_token'];

  const token = access_token && access_token.split(' ')[1];
  if (!token) {
    return res.status(401).json({ data: null, success: false, message: 'No token provided.' });
  }

  jwt.verify(token, process.env.SECRET, (err, decoded) => {
    if (err) {
      console.log(err);
      return res.status(403).json({ message: 'Failed to authenticate token.' });
    }

    req.id = decoded;
    next();
  });
}

module.exports = {
  generateAccessToken,
  generateRefreshToken,
  verifyToken
};