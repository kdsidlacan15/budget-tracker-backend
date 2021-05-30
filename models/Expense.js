const mongoose = require('mongoose')

const ExpenseSchema = new mongoose.Schema({
    category: {
        type: String,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },

    entry: {
        type: String,
        required: true
    },
    value: {
        type: Number,
        required: true
    }

},{timestamps: true})

module.exports = mongoose.model('Expense', ExpenseSchema)
