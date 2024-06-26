import express from 'express'
import User from '../model/user.js'
import bcrypt from 'bcrypt'
const routers=express.Router()
routers.post('/adduser',async(req,res)=>{
  const {name,email,password}= await req.body;
  try {
    if(!name||!email||!password){
      res.json({msg:"the field cant not empty!"})
    }
    const hashPassword= await bcrypt.hash(password,10)
    const newUser= new User({
      name:name,
      email:email,
      password:hashPassword
    })
    const userdata=await newUser.save()
    res.status(201).json(userdata);
  } catch (error) {
    console.log(error) 
  }
})
routers.post('/login',async(req,res)=>{
  const {email,password}=req.body;
  try {
    if(!email||!password){
      res.json('Field can not empty!')
    }
    const user= await User.findOne({email})
    if(!user){
      res.json('Username not found!')
    }
    const checkPassword= await bcrypt.compare(password,user.password)
    if(!checkPassword){
      res.json('Incorrect password')
    }
    res.json('Logedin')
    
  } catch (error) {
    console.error('you could not login ',error)
  }

})
routers.put('/editprofile/:id',(req,res)=>{

})
export  {routers}

