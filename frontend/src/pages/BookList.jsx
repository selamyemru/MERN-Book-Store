import { FaTrashAlt, FaPencilAlt } from 'react-icons/fa'
import { useState, useEffect } from 'react';
// import {BsInfoCircle} from 'react-icons/bs'
import axios from 'axios'
import { Link } from 'react-router-dom';
import { useSnackbar } from 'notistack';
function BookList() {
  const [books, setBooks] = useState([])
  const [isLoading, setLoading] = useState(true)
  const {enqueueSnackbar}=useSnackbar()

  const fetchBook = async () => {
    try {
      setLoading(true)
      const response = await axios.get("http://localhost:4000/getbook");
      setBooks(response.data)
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }
  const handleDelete=async(id)=>{
  try {
    const response=await axios.delete(`http://localhost:4000/deletebook/`+id)
    fetchBook()
    enqueueSnackbar('Book Deleted!',{variant:"success"})
    console.log(response)
    
  } catch (error) {
    console.error(error)  
  } 
  }
  useEffect(() => {
    fetchBook()
  }, [])
  return (
    <div className="flex  flex-col gap-10  mt-[20vh] mx-[5vw]">
      <button className=' border-2 border-gray-200  w-fit px-12 py-3 rounded-lg'><Link to={'/addbook'}>Add Book</Link></button>
      
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <table className="table border-2 border-gray-200 border-collapse">
          <thead className="bg-gray-200 text-green-800 text-xl">
            <tr>
              <th className="px-16 text-center py-4 font-semibold">Id</th>
              <th className="px-16 text-center py-4 font-semibold">Name</th>
              <th className="px-16 text-center py-4 font-semibold">Description</th>
              <th className="px-16 text-center py-4 font-semibold">Price</th>
              <th className="px-16 text-center py-4 font-semibold">Author</th>
              <th className="px-16 text-center py-4 font-semibold">Publisher</th>
              <th className="px-16 text-center py-4 font-semibold">Category</th>
              <th className="px-16 text-center py-4 font-semibold">Operation</th>
            </tr>
          </thead>
          <tbody>
            {books.map((book,index) => (
              <tr key={book._id}>
                <td className="px-16 text-center py-6 text-sm font-sem" >{++index}</td>
                <td className="px-16 text-center py-6 text-sm font-sem">{book.name}</td>
                <td className="px-16 text-center py-6 text-sm font-sem">{book.description}</td>
                <td className="px-16 text-center py-6 text-sm font-sem">{book.price}</td>
                <td className="px-16 text-center py-6 text-sm font-sem">{book.author}</td>
                <td className="px-16 text-center py-6 text-sm font-sem">{book.publisher}</td>
                <td className="px-16 text-center py-6 text-sm font-sem">{book.category}</td>
                <td className="px-16 text-center py-6 text-sm font-sem flex  gap-8  ">
                 <a href={`editbook/${book._id}`} ><FaPencilAlt /></a>
                 {/* <a href={`/getbook/${book._id}`} ><BsInfoCircle /></a> */}
                 <button onClick={()=>handleDelete(book._id)}><FaTrashAlt color="red" /></button> 
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
export default BookList
