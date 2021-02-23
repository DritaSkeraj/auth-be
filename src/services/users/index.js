const router = require("express").Router();

const Users = require("./users_schema")

const {TokenPairs} = require('../../utils/jwt')

router.get("/", async(req, res, next) => {
    try{
        const allUsers = await Users.find({});
        res.send(allUsers)
    } catch(err){
        res.send(err.message).status(500)
    }
})

router.get("/:id", async(req, res, next) => {
    try{
        const user = await Users.findById(req.params.id)
        res.send(user)
    } catch(err){
        res.send(err.message).status(500)
    }
})

router.post("/", async(req, res, next) => {
    try{
        const user = await new Users(req.body).save()
        console.log(user);
        const tokenPair = await TokenPairs({_id: user._id})
        console.log('token pair ', tokenPair)
        res.send(tokenPair)
    } catch(err){
        res.send(err.message).status(500)
    }
})

router.put("/:id", async(req, res, next) => {
    try{
        const user = await Users.findByIdAndUpdate(req.params.id, req.body, {new: true});
        res.send(user)
    } catch(err){
        res.send(err.message).status(500)
    }
})

router.delete("/:id", async(req, res, next) => {
    try{
        const user = await Users.findByIdAndDelete(req.params.id);
        res.send("OK").status(200)
    } catch(err){
        res.send(err.message).status(500)
    }
})

module.exports = router;