const User = require('../Models/Mongoose')
const bcr = require('bcryptjs')
const jwt = require('jsonwebtoken')
const sec = "MySecretKey"
const options = {expiresIn : '1h'}

function hashF(password){
    const salt = bcr.genSaltSync(15)
    const hashed = bcr.hashSync(password, salt)
    return hashed
}

exports.signUpUser = async(req, res) => {   
    try{
        const newUser = new User({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            gender: req.body.gender,
            age:req.body.age,
            email: req.body.email,
            password:hashF(req.body.password)
        })
        await newUser.save()
        res.json({
            status:201,
            message:`Data Added`,
            success:true
        })
    } catch(err){
        res.json({
            status:400,
            message:`${err}`,
            success:false
        })
    } 
}

exports.signInUser = async(req, res) => {
    try{
        const userMatch = await User.findOne({email : req.body.email})
        if(userMatch){
            bcr.compare(req.body.password, userMatch.password, (err, isMatch) => {
                if(isMatch){
                    const userData = {
                        firstName:userMatch.firstName,  
                        email:userMatch.email
                    }
                    const tok = jwt.sign(userData, sec, options)
                    res.json({
                        status:200,
                        message:`Data Found`,
                        success:true,
                        responses:{
                            firstName:userMatch.firstName, 
                            lastName:userMatch.lastName, 
                            gender:userMatch.gender, 
                            email:userMatch.email, 
                            age:userMatch.age
                        },
                        token:tok
                    })
                } else {
                    res.json({
                        status:400,
                        message:`Username Correct, Password wrong`,
                        success:false
                    })
                }
            })
        } else {
                res.json({
                    status:400,
                    message:`Username incorrect, Password incorrect`,
                    success:false
                })
            }
        } catch(err){
        res.json({
            status:400,
            message:`${err}`,
            success:false
        })
    }
}

exports.userProfile = async(req, res) => {
    try{
        const userMatch = await User.findOne({email : req.user.email})
        if(userMatch){
            res.json({
                status:200,
                message:`Data Found`,
                success:true,
                responses:{
                    firstName:userMatch.firstName, 
                    lastName:userMatch.lastName, 
                    gender:userMatch.gender, 
                    email:userMatch.email, 
                    age:userMatch.age
                }
            })
        } else {
            res.json({
                status:400,
                message:`Token Invalid`,
                success:false
            })
        }
    }catch(err){
        res.json({
            status:400,
            message:`${err}`,
            success:false
        })
    }
}

exports.userDelete = async(req, res) => {
    try{
        const userMatch = await User.findOne({email : req.body.email})
        if(userMatch){
            bcr.compare(req.body.password, userMatch.password, async(err, isMatch) => {
                if(isMatch){
                    await User.deleteOne({email : userMatch.email})
                    res.json({
                        status:200,
                        message:`Data deleted`,
                        success:true
                    })
                } else {
                    res.json({
                        status:400,
                        message:`Wrong password, can't delete data`,
                        success:false
                    })
                }
            })
        } else {
            res.json({
                status:400,
                message:`User not found`,
                success:false
            })
        }
    } catch(err){
        res.json({
            status:400,
            message:`${err}`,
            success:false,
        })
    }
}