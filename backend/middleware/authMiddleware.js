const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
const token = req.headers.authorization;
if (!token) return res.status(401).json({ message: 'Unauthorized' });

try {
const decoded = jwt.verify(token.split(' ')[1], process.env.JWT_SECRET);
req.adminId = decoded.id;
next();
} catch (err) {
return res.status(403).json({ message: 'Token is invalid' });
}
};

module.exports = authMiddleware;