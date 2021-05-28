const mongoose = require('mongoose')
console.log(process.env.DB_URI)
module.exports = mongoose.connect(
    process.env.DB_CONN, 
    {
        useNewUrlParser: true, 
        useUnifiedTopology: true
    }
)
.then( () => {
    console.log("Connected to database")
})
.catch( err => {
    console.log(err)
})