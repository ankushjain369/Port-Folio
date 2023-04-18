const mongoose=require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


const registerSchema = new mongoose.Schema({
    firstname:{
        type:String,
        uppercase:true,
        required:true,
    
    },
    lastname:{
        type:String,
        uppercase:true,
    },
    phone:{
        type:Number,
        required:true,
        minlength:10,
        unique:true
    },
    age:{
        type:String,
        min:18,
        max:60,
        required:true
    },
    
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    cpassword:{
        type:String,
        required:true
    },
    tokens:[{
        token:{
            type:String,
            required:true
        }
    }]
    
})

// Generating Tokens
registerSchema.methods.generateAuthToken = async function(){
    try {
        
        const token=jwt.sign({_id:this._id.toString()},process.env.SECRET_KEY);
        this.tokens=this.tokens.concat({token:token});
        await this.save();
        return token
        
    } catch (error) {
        res.send(error);
    }
}

// Hashing the Password
registerSchema.pre("save",async function(next){
    if(this.isModified("password")){
        this.password = await bcrypt.hash(this.password,10);
        this.cpassword = await bcrypt.hash(this.password,10)
    }
    next()
})

const Register = new mongoose.model("Register",registerSchema);

module.exports = Register;