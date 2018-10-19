const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const QuestionSchema = new Schema({
    question: {
        type: String,
        required: true
    },
    answerTrue: {
        type: Number,
        default: 0
    },
    answerFalse: {
        type: Number,
        default: 0
    },
    author: {
        type: String,
        required: false,
        default: "Anon"
    }
});

const Answer = (module.exports = mongoose.model("Answer", QuestionSchema));