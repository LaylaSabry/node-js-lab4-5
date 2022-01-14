
module.exports =function (req, res, next)  {
    if (!req.user)
    {
        res.status(403).json({ message: " you are not admin user..............." })

    }
next();
}

