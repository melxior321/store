const jwt = require('jsonwebtoken');


const generateToken = (id, email, role) => {
    return jwt.sign(
        {id, email, role},
        process.env.SECRET_KEY,
        {expiresIn: '24h'}
    )
};

const decodeToken = async (token) => {
    return jwt.verify(token, process.env.SECRET_KEY, { clockTimestamp: new Date().getSeconds() })
};

module.exports = {
    generateToken,
    decodeToken,
};
