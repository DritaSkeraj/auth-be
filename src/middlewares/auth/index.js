const {verifyAccessToken, verifyRefreshToken, TokenPairs} = require("../../utils/jwt")

const Users = require("../../services/users/users_schema")

const checkBearerToken = async(req, res, next) => {
    if(req.headers.authorization){
        
        const [method, jwt] = req.headers.authorization.split(" ")
        //console.log("jwt: ", jwt);

        if(method === "Bearer" && jwt){
            try{
                const {_id} = await verifyAccessToken(jwt);
                const user = await Users.findById(_id)
                console.log("user: ", user)
                if(user){
                    req.user = user;
                    next();
                } else {
                    res.status(404).send('bad id')
                }
            } catch(err){
                res.status(400).send("bad token")
            }
        } else {
            res.status(400).send("bad auth method")    
        }
    } else {
        res.status(400).send("bad header")
    }
}

const checkRefreshToken = async (req, res, next) => {

    const {refreshToken} = req.body;
    console.log({refreshToken})
    try {

        const {_id} = await verifyRefreshToken(refreshToken);
       
        const tokenPairs = await TokenPairs({_id})

        res.send(tokenPairs)

    } catch (error) {
        console.log(error)
        res.status(401).send("Refresh token is not valid")
    }
}

module.exports = {checkBearerToken, checkRefreshToken}