const router = require('express').Router()
const bcrypt = require('bcrypt')
const saltRounds = parseInt(process.env.SALT_ROUNDS)
const User = require('./../models/User')
const jwt = require('jsonwebtoken')
const { verifyUser} = require('./../utils')
const { verifyAdmin } = require('./../utils')
const privateKey = process.env.PRIVATE_KEY

// register
router.post('/', (req,res,next)=> {
    // validate password
    let { password, confirmPassword } = req.body
    if( password.length < 8 || password !== confirmPassword) {
        throw new Error("Password must be atleast 8 characters and must matched confirm password")
    }

    // hash password
    bcrypt.hash(req.body.password, saltRounds)
    .then( hash => {
        req.body.password = hash

        return User.create(req.body)
    })
    .then( user => {
        user.password = undefined
        res.send(user)
    })
    .catch(next)
})

// login
router.post('/login', (req,res,next)=>{

    User.findOne({email : req.body.email})
    .then( user => {
        if (user) {
            req.user = user
            return user
        } else {
            res.status(401)
            next(new Error("Invalid credentials"))
        }
    })
    .then( user => {
        return bcrypt.compare(req.body.password, user.password)
    })
    .then( isMatchPassword => {
        if (isMatchPassword){
            
            return jwt.sign({ userId: req.user._id}, privateKey)

        } else {
            res.status(401)
            next(new Error("Invalid credentials"))
        }
    })
    .then( token =>{
        res.send({token})
    })
    .catch( next )


})

//Get All users(Admin)
router.get('/',verifyUser, verifyAdmin,(req,res,next)=> {
    User.find({isActive:true})
    .then(user=> {
        res.send(user)
    })
    .catch(next) 
})


module.exports = router
