const jwt = require("jsonwebtoken")

const {JWT_ACCESS_SECRET, JWT_REFRESH_SECRET} = process.env

const AccessToken = async(payload) => {
    const token = await jwt.sign(payload, JWT_ACCESS_SECRET, {expiresIn: "15m"})
    return token
}

const RefreshToken = async(payload) => {
    const token = await jwt.sign(payload, JWT_REFRESH_SECRET, {expiresIn: "1w"})
    return token
}

const verifyAccessToken = async(token) => {
    const payload = await jwt.verify(token, JWT_ACCESS_SECRET);
    return payload
}

const verifyRefreshToken = async(token) => {
    const payload = await jwt.verify(token, JWT_REFRESH_SECRET);
    return payload
}

const TokenPairs = async(payload) => {
    const accessToken = await AccessToken(payload);
    const refreshToken = await RefreshToken(payload);
    return {accessToken, refreshToken}
}


module.exports = {TokenPairs, verifyAccessToken, verifyRefreshToken}