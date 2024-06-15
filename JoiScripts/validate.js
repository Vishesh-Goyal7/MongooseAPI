const joi = require('joi')
const jwt = require('jsonwebtoken')
const sec = "MySecretKey"

exports.joiSignUp = (req, res, next) => {
    const joiSignUpSchema = joi.object({
            firstName : joi.string().required(),
            lastName : joi.string().required(),
            age:joi.number().required(),
            gender:joi.string().required(),
            email:joi.string().required(),
            password:joi.string().required().min(8)
        })
    const {error, value} = joiSignUpSchema.validate(req.body)
    if(error){
        res.status(400).json({
            status : 400,
            message: error.message,
            success: false
        })
    } else {
        next(null, true)
    }
}

exports.joiSignInCred = (req, res, next) => {
    const joiSignInCredSchema = joi.object({
        email: joi.string().required(),
        password:joi.string().required()
    })
    const {error, value} = joiSignInCredSchema.validate(req.body)
    if(error){
        res.status(400).json({
            status : 400,
            message: error.message,
            success: false
        })
    } else {
        next(null, true)
    }
}

exports.joiProfileToken = (req, res, next) => {
    const data = req.headers['authorization']
    if(data){
        const token = data.split(' ')[1]
        if(token){
            const decode = jwt.decode(token, sec)
            req.user = decode
            next()
        } else {
            res.status(400).json({
                status:400,
                message:`Auth token element missing`,
                success:false
            })
        }
    } else {
        res.status(400).json({
            status:400,
            message:`Token not found`,
            success:false
        })
    }
}

