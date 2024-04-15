const jwt = require("jsonwebtoken");
const { ROLES } = require("./roles");

function authenticateToken(req, res, next) {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (token == null)
        return res.status(401).send({ message: "Unauthorized", status: 401 });

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (e, user) => {
        if (e) {
            console.log(e);
            return res
                .status(403)
                .send({ message: "Invalid token", status: 403 });
        }

        // si no hay error
        const role = user.role;
        if (
            role != ROLES.ADMIN &&
            role != ROLES.ROLEMPLOYEE 
        ) {
            return res
                .status(401)
                .send({ message: "Unauthorized", status: 401 });
        }
        req.user = user;
        next();
    });
}

module.exports = authenticateToken;