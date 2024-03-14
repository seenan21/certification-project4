const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: String,
    password: String,
    quizzes: [{ type: Schema.Types.ObjectId, ref: 'Quiz' }],
});

const User = mongoose.model('User', userSchema);

module.exports = User;