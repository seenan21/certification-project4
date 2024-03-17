const User = require('../models/User');
const Quiz = require('../models/Quiz');



createUser = async (req, res) => {
    const { username, password } = req.body;
    const quizzes = [];
    const user = new User({ username, password, quizzes });
    try {
        await user.save();
        res.status(201).json(user);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

//check if username already exists
signUp = async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await User
            .findOne({ username });
        if (user) {
            res.status(400).json({ message: 'Username already exists' });
        }
        else {
            res.status(200).json({ message: 'Username is available' });
        }
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
}



module.exports = {
    createUser,
    signUp
};