const mongoose = require('mongoose');
const userSchema = require('../schema/userSchema');
const userDemo = mongoose.model('userdemo', userSchema);
module.exports = userDemo;