const bcrypt = require('bcrypt');

const encrypt = async (toEncrypt) => {
    return encrypted = await bcrypt.hash(toEncrypt, 8);
}

const compare = async (compare, toCompare) => {
    return compared = await bcrypt.compare(compare, toCompare);
}

module.exports = {
    encrypt,
    compare
}
// DOCUMENTATION TO USE bcrypt
// https://openbase.com/js/bcrypt/documentation