const adminMiddleware = (
    req,
    res,
    next
) => {

    try {

        if (
            req.user.role !== 'Admin'
        ) {

            return res.status(403).json({
                message:
                  'Access denied. Admin only.'
            });
        }

        next();

    }

    catch (err) {

        return res.status(500).json({
            message: 'Authorization error'
        });
    }
};

module.exports =
    adminMiddleware;