const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {

    try {

        const authHeader =
            req.headers.authorization;

        if (!authHeader) {

            return res.status(401).json({
                message: 'No token provided'
            });
        }

        const token = authHeader.trim();

        const verified = jwt.verify(
            token,
            'mysecretkey'
        );

        req.user = verified;

        next();

    }

    catch (err) {

        console.log(err);

        return res.status(401).json({
            message: 'Invalid token'
        });
    }
};

module.exports = authMiddleware;