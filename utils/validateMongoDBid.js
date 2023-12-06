const mongoose = require('mongoose');

const validateMongoDBid = (id) => {
    const isValid = mongoose.Types.ObjectId.isValid(id);
    if (!isValid) throw new Error('This ID isn`t Valid or Not Found');
}

module.exports = { validateMongoDBid };