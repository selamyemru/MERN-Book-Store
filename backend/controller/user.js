import User from "../model/user.js";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'


export const signup = async (req, res) => {
  const { name, email, password, passwordVerify } = await req.body;
  try {
    if (!name || !email || !password || !passwordVerify) {
      res.json({ msg: "the field cant not empty!" })
    }
    if (password !== passwordVerify) {
      return res.status(400).json({ errMessage: "please enter the same password a gain!" })
    }
    if (password.length < 8) {
      return res.status(400).json({ errMessage: "your password contain at least 8 character!" })
    }

    const hashPassword = await bcrypt.hash(password, 10)
    const newUser = new User({
      name: name,
      email: email,
      password: hashPassword
    })
    const userdata = await newUser.save()
    const token = jwt.sign({ "user": userdata.name }, process.env.JWT_SECRET, { expiresIn: "1h" })
    res.cookie("token", token, { httpOnly: true, secure: true, sameSite: 'None' }).send()
  } catch (error) {
    console.log(error)
  }
};
export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      return res.status(400).json({ msg: 'The fields cannot be empty!' });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ msg: 'Username not found please register!' });
    }

    const checkPassword = await bcrypt.compare(password, user.password);
    if (!checkPassword) {
      return res.status(401).json({ msg: 'Incorrect password please try a gain!' });
    }


    const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET, { expiresIn: "1h" });
    console.log(token)
    // Set the token in a cookie
    res.cookie("token", token, { httpOnly: true, secure: true, sameSite: 'None' }).send()



  } catch (error) {
    console.error('You could not login ', error);
    return res.status(500).json({ msg: 'Server error' });
  }
};
export const logedin = async (req, res) => {
  const token = req.cookie.token
  if (!token) return res.status(401).json(false)
  jsw.verify(token, process.env.JWT_SECRET)
  res.json(true)
}
export const logout = (req, res) => {
  // Clear the token cookie
  res.clearCookie('token');
  // res.status(200).json({ message: 'Logged out successfully' });
  res.cookie("token", '', { expire: new Date(0) })
};
export const profile = async (req, res) => {

}
