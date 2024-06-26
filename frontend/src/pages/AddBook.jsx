import axios from 'axios'
import {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { useSnackbar} from 'notistack'
function AddBook() {
 const navigate= useNavigate()
 const {enqueueSnackbar} =useSnackbar()

  // const [success,setSuccess]=useState('');
  const [books,setBooks]=useState({
    name:'',
    description:'',
    image:'',
    price:'',
    author:'',
    publisher:'',
    category:''

  })
  const addBooks = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:4000/addbook", books);
      if(response){
      setBooks({
          name:'',
          description:'',
          image:'',
          price:'',
          author:'',
          publisher:'',
          category:''
      
        })
        enqueueSnackbar('Book successfull added!',{variant:'success'})
        navigate('/booklist')
      }
      console.log("Server response:", response.data);
    } catch (error) {
      console.error("Error storing the book:", error);
      if (error.response) {
        console.error("Server response:", error.response.data);
      }
    }
  };
  return (
    <div className="flex flex-col   items-center h-screen justify-center">
      <h1 className='text-2xl text-green-800 mb-6 '> Registor a Book</h1>
      <form className='flex flex-col gap-3' onSubmit={addBooks}>
        <div className='flex flex-col gap-1'>
          <label className='font-semibold'>Name</label>
          <input type='text' name="name" placeholder ="enter book name?" value={books.name} onChange={(e)=>setBooks({...books,name:e.target.value})} className='h-[5vh] w-[25vw] rounded-lg  pl-3 outline-none bg-gray-100 border-2 border-gray-200'/>
        </div>
        <div className='flex flex-col gap-1'>
          <label className='font-semibold'>Description</label>
          <input type='text' name="description" placeholder ="enter book Description?" value={books.description} onChange={(e)=>setBooks({...books,description:e.target.value})} className='h-[5vh] w-[25vw] rounded-lg  pl-3 outline-none bg-gray-100 border-2 border-gray-200'/>
        </div>
        <div className='flex flex-col gap-1'>
          <label className='font-semibold'>Image</label>
          <input type='text' name="image" placeholder ="enter book image?" value={books.image} onChange={(e)=>setBooks({...books,image:e.target.value})} className='h-[5vh] w-[25vw] rounded-lg  pl-3 outline-none bg-gray-100 border-2 border-gray-200'/>
        </div>
        <div className='flex flex-col gap-1'>
          <label className='font-semibold'>Price</label>
          <input type='text' name="price" placeholder ="enter book Price?" value={books.price} onChange={(e)=>setBooks({...books,price:e.target.value})} className='h-[5vh] w-[25vw] rounded-lg  pl-3 outline-none bg-gray-100 border-2 border-gray-200'/>
        </div>
        <div className='flex flex-col gap-1'>
          <label className='font-semibold'>Author</label>
          <input type='text' name="author" placeholder ="enter book Author?" value={books.author} onChange={(e)=>setBooks({...books,author:e.target.value})} className='h-[5vh] w-[25vw] rounded-lg  pl-3 outline-none bg-gray-100 border-2 border-gray-200'/>
        </div>
        <div className='flex flex-col gap-1'>
          <label className='font-semibold'>Publisher</label>
          <input type='text' name="publisher" placeholder ="enter book Publisher?"  value={books.publisher} onChange={(e)=>setBooks({...books,publisher:e.target.value})} className='h-[5vh] w-[25vw] rounded-lg  pl-3 outline-none bg-gray-100 border-2 border-gray-200'/>
        </div>
        <div className='flex flex-col gap-1'>
          <label className='font-semibold'>Category</label>
          <input type='text' name="publisher" placeholder ="enter book Publisher?"  value={books.category} onChange={(e)=>setBooks({...books,category:e.target.value})} className='h-[5vh] w-[25vw] rounded-lg  pl-3 outline-none bg-gray-100 border-2 border-gray-200'/>
        </div>
        <button type='submit' className=' py-2 bg-green-800 text-white w-fit px-8 rounded-lg '>Add</button>
      </form>
    </div>
  )
}
export default AddBook;
