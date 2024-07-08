import express from 'express'
import { login,logout,signup,profile } from '../controller/user.js';
const routers=express.Router()

routers.post('/adduser',signup)
routers.post('/login',login);
routers.post('/logout', logout)
routers.put('/editprofile/:id',profile)
export  {routers}

