// manejador de err para trabajar con funciones asincronas
const asyncHandler = require('express-async-handler')
// funcionalidad de las rutas

//@Desc     Get goal
//@Route    GET /api/goals
//@Access   private
const getGoal = asyncHandler (async (req,res)=>{
    res.status(200).json({message: "get goals"})
})

//@Desc     Post goal
//@Route    POST /api/goals
//@Access   private
const postGoal = asyncHandler ( async (req,res)=>{
    if(!req.body.text){
        // res.status(400)
        throw new Error('please add text field')
    }res.status(200).json({message: "set goals"})

})

//@Desc     update goal
//@Route    PUT /api/goals:id
//@Access   private
const updateGoal = asyncHandler (async (req,res)=>{
    res.status(200).json({message: `update goals ${req.params.id}`})
})

//@Desc     delete goal
//@Route    DELETE /api/goals:id
//@Access   private
const deleteGoal = asyncHandler ( async (req,res)=>{
    res.status(200).json({message: `delete goals ${req.params.id}`})
})

module.exports = {
    getGoal,
    postGoal,
    updateGoal,
    deleteGoal
}