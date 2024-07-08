import { Link, useNavigate } from "react-router-dom"
import axios from 'axios'
import { useState } from "react";
import { useSnackbar } from "notistack";
function Login() {
  const { enqueueSnackbar } = useSnackbar()
  const navigate = useNavigate()
  const [success, setSuccess] = useState('')
  const [user, setUser] = useState({
    email: '',
    password: ''
  })
  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value
    })
  }
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:4000/login", user)
      if (response.status==200) {
        setSuccess(response.data)
        setUser({
          email: '',
          password: '',
        })
        enqueueSnackbar('login Success', { variant: 'success' })
        navigate('/booklist')
        // localStorage.setItem('token',response.data.token); 
        document.cookie = `token=${response.data.token}; path=/; max-age=3600`;

      } else {
        navigate("/signup")
        alert("You are not registered to this service")

      }

    } catch (error) {
      console.error(error)

    }

  }
  return (
    <div className="flex flex-col   items-center h-screen justify-center">
      <h1 className='text-2xl  mb-6 text-green-800 '> Login</h1>
      <form className='flex flex-col gap-3' onSubmit={handleLogin}>
        <div className="text-green-900">{success}</div>
        <div className='flex flex-col gap-1'>
          <label className='font-semibold'>Email</label>
          <input type='email' name="email" value={user.email} onChange={handleChange} placeholder="enterr book email?" className='h-[5vh] w-[25vw] rounded-lg  pl-3 outline-none bg-gray-100 border-2 border-gray-200' />
        </div>
        <div className='flex flex-col gap-1'>
          <label className='font-semibold'>Password</label>
          <input type='password' name="password" value={user.password} onChange={handleChange} placeholder="enterr book password?" className='h-[5vh] w-[25vw] rounded-lg  pl-3 outline-none bg-gray-100 border-2 border-gray-200' />
        </div>
        <button type="submit" className=' py-1 bg-green-800 text-white w-fit px-8 rounded-lg outline-none'>Login</button>
        <p className="text-xl text-green-800">Click<Link to={'/signup'} className='px-3  rounded-lg py-2   underline text-blue-700'>here</Link>to register</p>
      </form>
    </div>
  )
}
export default Login

