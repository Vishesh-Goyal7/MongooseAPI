const mongoose = require('mongoose')

mongoose.connect('mongodb://127.0.0.1:27017/UserBase').then(() => `Mongoose Connected`).catch(() => `Mongoose Connection Failed`)

const mongoUserSchema = new mongoose.Schema({
    firstName: { 
        type: String, 
        required: true 
    },
    lastName: { 
        type: String, 
        required: true 
    },
    age: { 
        type: Number, 
        required: true 
    },
    gender: { 
        type: String, 
        required: true 
    },
    email: { 
        type: String, 
        required: true, 
        unique: true 
    },
    password: { 
        type: String, 
        required: true 
    }
});

const User = mongoose.model("User", mongoUserSchema)

module.exports = User