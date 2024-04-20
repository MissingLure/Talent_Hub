const crypto = require("crypto");

function generateSalt() {
    const salt = crypto.randomBytes(128).toString('base64');
    return(salt.toString('base64'));
}
 
function encryptPassword(password, salt) {
    const ITERATIONS = 10000;
    const KEY_LENGTH = 64;
    const encryptedPassword = crypto.pbkdf2Sync(password, salt, ITERATIONS, KEY_LENGTH, 'sha256');
    return(encryptedPassword.toString('base64'));
};

module.exports = {
    generateSalt,
    encryptPassword,
};
