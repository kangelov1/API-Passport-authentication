const JWT = require('jsonwebtoken')
const User = require('../models/user')
const {JWT_SECRET} = require('../config')

signtoken = (user) =>{
    return JWT.sign({
            iss:'Koko',
            sub:user._id,
            iat:new Date().getTime(),
            exp:new Date().setDate(new Date().getDate() + 1)
        },JWT_SECRET)
}

module.exports = {
    signUp:async(req,res,next)=>{
        //get email and password from user
        const {email,password} = req.value.body

        //check if email is in use
        const userExists = await User.findOne({email})
        if(userExists){return res.json({msg:'user exists',user:userExists})}

        //create new user
        const newUser = new User({
            email,
            password
        })

        await newUser.save()
        //res.json({user:'created'})

        //generate token
        const token = signtoken(newUser)

        //respond with token
        res.json({token})
    },
    signIn:async(req,res,next)=>{
        //generate token
        const token = signtoken(req.user)
        res.status(200).json({token})
    },
    secret:async(req,res,next)=>{
        console.log('UsersController.secret called')
        res.json({secret:'secret'})
    }
}
