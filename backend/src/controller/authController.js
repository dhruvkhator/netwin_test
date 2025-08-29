
import jwt from "jsonwebtoken";
import dotenv, { parse } from "dotenv";
import User from "../model/User.js";
import {z, ZodError} from "zod";

dotenv.config();

const signupSchema = z.object({
    name:z.string().min(3, "Name should be at least 3 characters long"),
    email: z.email("Invlaid email"),
    password: z.string().min(8, "Password must be at least 8 characters long")
});

const loginSchema  = z.object({
    email: z.email("Invlaid email"),
    password: z.string().min(8, "Password must be at least 8 characters long")
})

const generateToken = (id) =>{
    return jwt.sign({id}, process.env.JWT_SECRET, {expiresIn: "1h"})
}


export const signup = async (req, res)=>{
    try {

        const parsed = signupSchema.parse(req.body);

        const userExists = await User.findOne({email: parsed.email});
        console.log(userExists)
        if(userExists) return res.status(400).json({ message: "User already exists"});

        const user = await User.create(parsed);

        return res.status(201).json({message:"User signed up successfully!", user})

        
    } catch (error) {

        if(error instanceof ZodError){
            res.status(400).json({
                message: "validation error"
            })
            console.log(error.message)
        }else {

            console.log("Server error: ", error );
            res.status(502).json({message: "Internal server error"});
        }
    }
}

export const login = async (req, res)=>{
    try {

        const parsed = loginSchema.parse(req.body);

        const user = await User.findOne({email: parsed.email});
        if(!user) return res.status(400).json({ message: "User with this email id doesn't exist"});

        const isMatch = await user.matchPassword(parsed.password);
        if(!isMatch) return res.status(403).json({ message: "Invalid credentials"});

        const token = generateToken(user._id);
        const userObj = user.toObject();
        delete userObj.password;

        return res.status(201).json({message:"User logged in successfully!", user:userObj, token })

        
    } catch (error) {

        if(error instanceof ZodError){
            res.status(400).json({
                message: error.errors[0].message
            })
            
        }else {

            console.log("Server error: ", error );
            res.status(502).json({message: "Internal server error"});
        }
    }
}




[
  {
    "origin": "string",
    "code": "too_small",
    "minimum": 3,
    "inclusive": true,
    "path": [
      "name"
    ],
    "message": "Name should be at least 3 characters long"
  },
  {
    "origin": "string",
    "code": "too_small",
    "minimum": 8,
    "inclusive": true,
    "path": [
      "password"
    ],
    "message": "Password must be at least 8 characters long"       
  }
]
