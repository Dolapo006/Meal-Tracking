const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const validator = require('validator')

const Schema = mongoose.Schema

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }

})

//Static Methods

userSchema.statics.signup = async function (email, password) {

    //Validations
    if(!email || !password) {
        throw Error ('You can see you something is missing right??')
    }
    if(!validator.isEmail(email)) {
        throw Error('Does that look like a valid email to you lol!')
    }
    if(!validator.isStrongPassword(password)) {
        throw Error('Your password is so weak, fix it!!')
    }


    const exists = await this.findOne({email})

    if(exists) {
        throw Error('This email already exist')
    }
    //Hashing the passwords to prevents breaches 
    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)

    const user = await this.create({ email, password: hash })

    return user
}

//Static Logins
userSchema.statics.login = async function(email, password) {
    if(!email || !password) {
        throw Error ('You can see you something is missing right??')
    }
    const user = await this.findOne({email})

    if(!user) {
        throw Error('Excuse me this email is not correct')
    }

    const match = await bcrypt.compare(password, user.password)

    if(!match) {
        throw Error('Your password is wrong, please tell me you did not forget it')
    }

    return user


}

module.exports = mongoose.model('User', userSchema)