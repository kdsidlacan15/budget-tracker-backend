const mongoose = require('mongoose')

const ExpenseSchema = new mongoose.Schema({
    categoryName: {
        type: String,
        required: true
    },
    entry: [
        {
            entryName: {
                type: String,
                required: true
            },
            value: {
                type: Number,
                required: true
            }
        }
    ]



})

module.exports = mongoose.model('Expense', ExpenseSchema)
