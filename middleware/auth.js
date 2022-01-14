const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
    const token = req.header("x-auth-token");
    if(!token)
    {
       return res.status(401).json({ message: " acsses rejected ......." })
    }
    try {
        const result = jwt.verify(token, "pprocess.env.SECRET_KEY");
        req.plan = result
        next();
    } catch (error) {
        res.status(401).json({ message: "un-authorized........wrong token......." })
    }
}

module.exports = auth