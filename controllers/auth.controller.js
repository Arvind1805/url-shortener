import { credCollection } from "../app.js"
//it has a limitationn i.e it can only handle upto 72 characters, the solution is using argon2
// import bcrypt from 'bcryptjs'
//argon2 is capable of handling more than 72 characters.
import argon2 from 'argon2'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv';
import { userRegisterValidator } from "../middlewares/auth-validator/auth-validatior.js";
dotenv.config();


export const loginController = (req,res) =>{
  res.render("./auth/login")
}

export const registerController = (req,res) =>{
  res.render("./auth/register")
}

export const postLoginController = async(req,res) =>{
  // res.setHeader("Set-Cookie","isLoggedIn=true; path=/")
  console.log(req.body)
  const {password, email} = req.body;
  const checkUser = await credCollection.findOne({email});
  console.log(checkUser)
  if(checkUser){
    // console.log(checkUser)
    const isValidPassword = await argon2.verify(checkUser.password, password);
    console.log(isValidPassword)
    if(isValidPassword){
      console.log("entered")
      // res.cookie("isLoggedIn",true);  //this is only possible through the middle called cookie-parser
      const token = jwt.sign(
        {
          id: checkUser._id,
          name: checkUser.username,
          email: checkUser.email,
        },
        process.env.JWT_SECRET,
        {
          expiresIn: "24h",
        }
      );
      res.cookie("access_token",
        token, //payload 
      );
      res.status(301).redirect('/');
    }
    else{
      res.redirect("/auth/login");
    }
  }
  else{
    res.status(404).redirect("/auth/register");
  }
}

export const postRegisterController = async(req,res) =>{
    const {username, email, password} = req.body;

    const {data, error} = userRegisterValidator().safeParse(req.body);

    if(error){
      console.log(error.message)
      return res.redirect("/auth/register");
    }

    const checkUserExists = await credCollection.findOne({email});

    if(checkUserExists){
      res.send("User already exists...");
    }
    else{
      // const hashedPassword = await bcrypt.hash(password, 10);
      const hashedPassword = await argon2.hash(password);
      await credCollection.insertOne({username,email,password : hashedPassword});
      res.redirect("/auth/login");
    }
}

export const logoutController = (req,res) =>{
  res.clearCookie('access_token');
  res.status(301).redirect('/auth/register');
}
