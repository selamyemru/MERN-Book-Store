import mongoose from 'mongoose'
const cartSchema=new mongoose.Schema({
  user:{
    type: mongoose.Schema.Types.ObjectId,
    ref:"User",
    require:true
  },
  cartItem:{
    bookID:{
      type:mongoose.Schema.Types.ObjectId,
      ref:"Book",
    },
    quantity:{
      type:Number,
      default:1
    },
    price:{
      type:Number,
      require:true
    }
  }
})
const Cart=mongoose.model('Cart',cartSchema)
export default Cart