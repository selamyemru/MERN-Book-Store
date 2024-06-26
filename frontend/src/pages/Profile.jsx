
function Profile() {
  return (
    <div className="flex flex-col   items-center h-screen justify-center">
      <h1 className='text-2xl text-green-800 mb-16 '> Manage Profile</h1>
      <form className='flex flex-col gap-3'>
        <div className='flex flex-col gap-1'>
          <label className='font-semibold'>Name</label>
          <input type='text' name="name" placeholder="enter book email?" className='h-[5vh] w-[25vw] rounded-lg  pl-3 outline-none bg-gray-100 border-2 border-gray-200' />
        </div>
        <div className='flex flex-col gap-1'>
          <label className='font-semibold'>Email</label>
          <input type='email' name="email" placeholder="enter book email?" className='h-[5vh] w-[25vw] rounded-lg  pl-3 outline-none bg-gray-100 border-2 border-gray-200' />
        </div>
        <div className='flex flex-col gap-1'>
          <label className='font-semibold'>Password</label>
          <input type='password' name="password" placeholder="enter book password?" className='h-[5vh] w-[25vw] rounded-lg  pl-3 outline-none bg-gray-100 border-2 border-gray-200' />
        </div>
        <div className="flex  items-center justify-center mt-2 gap-[5vw]">
          <button className=' py-1 px-8 rounded-lg bg-green-800 text-white'>Update</button>
          <button className=' py-1 px-8 rounded-lg bg-green-800 text-white'>Logout</button>
        </div>

      </form>
    </div>
  )
}
export default Profile

