const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const quizSchema = new Schema({
    title : String,
    date : Date,
    questions : [{ type: Schema.Types.ObjectId, ref: 'Question' }],
    isAttempted : Boolean,
    points : Number,
 
});

const questionSchema = new Schema({
    text: String, // The question text
    options: [String], // An array of options for the question
    correctOptionIndex: Number, // Index of the correct option in the options array
    points : Number,
});


const Question = mongoose.model('Question', questionSchema);
const Quiz = mongoose.model('Quiz', quizSchema);

module.exports = { Quiz, Question };