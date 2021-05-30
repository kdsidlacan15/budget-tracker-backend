const router = require('express').Router()
const Expense = require('./../models/Expense')
const { verifyUser } = require('./../utils')
const { verifyAdmin } = require('./../utils')


//Add Expense
router.post('/', verifyUser, (req,res,next) =>{

    Expense.create({
    	category: req.body.category,
    	user: req.user.id,
    	entry: req.body.entry,
    	value: req.body.value
    })
    .then( expense => {
        res.send(expense)
    })
    .catch(next)
})



//Get User Expenses
router.get('/', verifyUser, (req,res,next)=> {
	Expense.find({user: req.user.id})
	.then(expense=>{
		res.send(expense)
	})
	.catch(next)
})


//Update Expenses Entry/Category
router.put('/:id', verifyUser, (req,res,next)=>{
	Expense.findByIdAndUpdate(req.params.id, req.body, {new:true, omitUndefined: true})
	.then( expense=> {
		res.send(expense)
	})
	.catch(next)
})

//Delete Expenses Entry/Category

router.delete('/:id', verifyUser, (req,res,next)=> {
	Expense.findByIdAndDelete(req.params.id)
	.then(expense=>{
		res.send(expense)
	})
	.catch(next)
})

//Admin View expenses of Specific User
router.get('/:id', verifyUser, verifyAdmin, (req,res,next)=> {
	Expense.find({user: req.params.id})
	.then(expense=>{
		res.send(expense)
	})
	.catch(next)
})

module.exports = router
