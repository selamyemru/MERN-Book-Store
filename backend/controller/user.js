import User from "../model/user.js";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
export const login=async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      return res.status(400).json({ msg: 'The fields cannot be empty!' });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ msg: 'Username not found!' });
    }

    const checkPassword = await bcrypt.compare(password, user.password);
    if (!checkPassword) {
      return res.status(401).json({ msg: 'Incorrect password' });
    }

    const token = jwt.sign({ id: user._id, name: user.name }, process.env.SECRET_KEY, { expiresIn: '1h' });

    // Set the token in a cookie
    res.cookie('token', token, {
      httpOnly: true,
      secure: true,
      maxAge: 3600000, // Expires in 1 hour (in milliseconds)
    });

    // Return the token in the response
    return res.status(200).json({ token });
  } catch (error) {
    console.error('You could not login ', error);
    return res.status(500).json({ msg: 'Server error' });
  }
};
export const signup=async(req,res)=>{
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
    res.status(200).json(userdata);
  } catch (error) {
    console.log(error) 
  }
};
export const logout=(req, res) => {
  // Clear the token cookie
  res.clearCookie('token');
  res.status(200).json({ message: 'Logged out successfully' });
};
export const profile=async(req,res)=>{

}
