const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcryptjs')

//create schema
const userSchema = new Schema({
    email:{
        type:String,
        required:true,
        unique:true,
        lowercase:true
    },
    password:{
        type:String,
        required:true
    }
})

userSchema.pre('save',async function(next){
    try{
    //generate salt
    const salt = await bcrypt.genSalt(10)
    const passwordHash = await bcrypt.hash(this.password,salt)
    this.password = passwordHash
    }
    catch(err){next(err)}
})
userSchema.methods.isValidPassword = async function(newPassword){
    try{
        return await bcrypt.compare(newPassword,this.password)
    }
    catch(err){throw new Error(err)}
}


//create model
const User = mongoose.model('apiUser',userSchema)
module.exports = User