import mongoose from "mongoose"
import dotenv, { config } from 'dotenv';
dotenv.config()
const connection= ()=>{
  try {
    mongoose.connect(process.env.DB_URL)
    console.log('db successfully connected!')
    
  } catch (error) {
    console.error(error)
    
  }


}
export default  connection