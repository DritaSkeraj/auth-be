const router = require("express").Router();
const {checkRefreshToken} = require("../../middlewares/auth");

const User = require("../../services/users/users_schema");
const { TokenPairs } = require("../../utils/jwt");

router.post("/refreshToken", checkRefreshToken)

router.post("/login", async(req, res, next) => {
    try{
        const {email, password} = req.body;
        const user = await User.findByCredentials(email, password)
        if(user){
            const tokenPairs = await TokenPairs({_id: user._id})
            res.send(tokenPairs)
        } else {
            res.status(401).send("Who are you?")
        }
    } catch(err){
        res.status(500).send(err.message);
    }
})

module.exports = router;