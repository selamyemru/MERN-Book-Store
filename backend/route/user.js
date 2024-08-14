import express from 'express'
import { login,logout,signup,profile, logedin } from '../controller/user.js';
const routers=express.Router()

routers.post('/adduser',signup)
routers.post('/login',login);
routers.post('/logedin',logedin)
routers.post('/logout', logout)
routers.put('/editprofile/:id',profile)
export  {routers}

