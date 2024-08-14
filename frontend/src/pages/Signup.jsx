
import axios from 'axios'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack'
function Signup() {
  const {enqueueSnackbar} = useSnackbar()
  const navigate = useNavigate()
  const [success, setSuccess] = useState('');
  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
    passwordVerify: ''

  })
  const addUser = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:4000/adduser", user,{withCredentials:true});

      if (response) {
        enqueueSnackbar('user successfull submited!',{variant:'success'})
        // Reset the form after successful submission
        setUser({
          name: '',
          email: '',
          password: '',
          passwordVerify: ''
        });
        navigate('/login')

      }
      console.log("Server response:", response.data);
    } catch (error) {
      console.error("Error storing the user:", error);
      if (error.response) {
        setSuccess(error.response)
        console.error("Server response:", error);
      }
    }
  };
  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value
    })

  }
  return (
    <div className="flex flex-col  items-center h-screen justify-center">
      <h1 className='text-2xl text-green-800 mb-6 '>Signup</h1>
      <form className='flex flex-col gap-3' onSubmit={addUser}>
        <div className='text-green-800 text-2xl mb-3  text-center animate-pulse'>{success}</div>
        <div className='flex flex-col gap-1'>
          <label className='font-semibold'>Name</label>
          <input type='text' name="name" placeholder="enter  name?" value={user.name} onChange={handleChange} className='h-[5vh] w-[25vw] rounded-lg  pl-3 outline-none bg-gray-100 border-2 border-gray-200' />
        </div>
        <div className='flex flex-col gap-1'>
          <label className='font-semibold'>Email</label>
          <input type='email' name="email" placeholder="enterr email?" value={user.email} onChange={handleChange} className='h-[5vh] w-[25vw] rounded-lg  pl-3 outline-none bg-gray-100 border-2 border-gray-200' />
        </div>
        <div className='flex flex-col gap-1'>
          <label className='font-semibold'>Password</label>
          <input type='password' name="password" placeholder="enterr book Password?" value={user.password} onChange={handleChange} className='h-[5vh] w-[25vw] rounded-lg  pl-3 outline-none bg-gray-100 border-2 border-gray-200' />
        </div>
        <div className='flex flex-col gap-1'>
          <label className='font-semibold'>Confirm password</label>
          <input type='password' name="passwordVerify" placeholder="confirm password?" value={user.passwordVerify} onChange={handleChange} className='h-[5vh] w-[25vw] rounded-lg  pl-3 outline-none bg-gray-100 border-2 border-gray-200' />
        </div>
        <button type='submit' className=' py-2 bg-green-800 w-fit px-6 rounded-lg text-white '>Register</button>
      </form>
    </div>
  )
}
export default Signup

