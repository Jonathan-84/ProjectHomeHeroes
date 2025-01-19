const jwt = require('jsonwebtoken');

const secret = 'mysecretsshhhhh';
const expiration = '2h';

module.exports = {
  authMiddleware: (req, res, next) => {
    // allows token to be sent via req.body, req.query, or headers
    let token = req.body.token || req.query.token || req.headers.authorization;

    // ["Bearer", "<tokenvalue>"]
    if (req.headers.authorization) {
      token = token
        .split(' ')
        .pop()
        .trim();
    }

    // if no token, return request object as is
    if (!token) {
      return next();
    }

    try {
      // decode and attach user data to request object
      const { data } = jwt.verify(token, secret, { maxAge: expiration });
      req.user = data;
    } catch {
      console.log('Invalid token');
      // optionally, you can respond with an error status
      return res.status(401).json({ message: 'Invalid token' });
    }

    // pass control to the next middleware
    next();
  },
  
  signToken: ({ name, email, id, role, reset_hint, reset_code }) => {
    const payload = { name, email, id, role, reset_hint, reset_code };
    return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
  }
};
