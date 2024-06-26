import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSnackbar } from 'notistack';
function EditBook() {
  const params = useParams();
  const {enqueueSnackbar} =useSnackbar()
  const navigate = useNavigate()
  const [success, setSuccess] = useState('');
  const [initialBook, setInitialBook] = useState(null);
  const [books, setBooks] = useState({
    name: '',
    description: '',
    image: '',
    price: '',
    author: '',
    publisher: '',
    category:'',
  });

  const getbook = async () => {
    const id = params.id;
    try {
      const response = await axios.get(`http://localhost:4000/getbook/${id}`);
      setInitialBook(response.data);
      setBooks(response.data);
      console.log(response);
    } catch (error) {
      console.error('Unable to access book', error);
    }
  };

  const editBooks = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`http://localhost:4000/editbook/${params.id}`, {
        name: books.name,
        description: books.description,
        image: books.image,
        price: books.price,
        author: books.author,
        publisher: books.publisher,
        category:books.category,
      });
      if (response.status == 200) {
        console.log("Server response:", response.data);
        enqueueSnackbar('Book sucessufull updated!',{variant:"success"})
        navigate('/booklist')
      }
    } catch (error) {
      setSuccess("Error updating the book:", error);
      if (error.response) {
        setSuccess("Server response:", error.response.data);
      }
    }
  };
  useEffect(() => {
    getbook();
  }, []);

  if (!initialBook) {
    return <div className='text-green-800'>Loading...</div>;
  }

  return (
    <div className="flex flex-col  items-center h-screen justify-center">
      <form className="flex flex-col gap-3" onSubmit={editBooks}>
        <div className="text-green-800 text-2xl mb-3 text-center animate-pulse">{success}</div>
        <div className="flex flex-col gap-1">
          <label className="font-semibold">Id</label>
          <input
            type="text"
            name="id"
            defaultValue={params.id}
            className="h-[5vh] w-[25vw] rounded-lg pl-3 outline-none bg-gray-100 border-2 border-gray-200"
            readOnly
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className="font-semibold">Name</label>
          <input
            type="text"
            name="name"
            defaultValue={initialBook.name}
            onChange={(e) => setBooks({ ...books, name: e.target.value })}
            className="h-[5vh] w-[25vw] rounded-lg pl-3 outline-none bg-gray-100 border-2 border-gray-200"
          />
        </div>
        <div className='flex flex-col gap-1'>
          <label className='font-semibold'>Description</label>
          <input type='text' name="description" defaultValue={initialBook.description} onChange={(e) => setBooks({ ...books, description: e.target.value })} className='h-[5vh] w-[25vw] rounded-lg  pl-3 outline-none bg-gray-100 border-2 border-gray-200' />
        </div>
        <div className='flex flex-col gap-1'>
          <label className='font-semibold'>Image</label>
          <input type='text' name="description" defaultValue={initialBook.image} onChange={(e) => setBooks({ ...books, image: e.target.value })} className='h-[5vh] w-[25vw] rounded-lg  pl-3 outline-none bg-gray-100 border-2 border-gray-200' />
        </div>
        <div className='flex flex-col gap-1'>
          <label className='font-semibold'>Price</label>
          <input type='text' name="price" defaultValue={initialBook.price} onChange={(e) => setBooks({ ...books, price: e.target.value })} className='h-[5vh] w-[25vw] rounded-lg  pl-3 outline-none bg-gray-100 border-2 border-gray-200' />
        </div>
        <div className='flex flex-col gap-1'>
          <label className='font-semibold'>Author</label>
          <input type='text' name="author" defaultValue={initialBook.author} onChange={(e) => setBooks({ ...books, author: e.target.value })} className='h-[5vh] w-[25vw] rounded-lg  pl-3 outline-none bg-gray-100 border-2 border-gray-200' />
        </div>
        <div className='flex flex-col gap-1'>
          <label className='font-semibold'>Publisher</label>
          <input type='text' name="publisher" defaultValue={initialBook.publisher} onChange={(e) => setBooks({ ...books, publisher: e.target.value })} className='h-[5vh] w-[25vw] rounded-lg  pl-3 outline-none bg-gray-100 border-2 border-gray-200' />
        </div>
        <div className='flex flex-col gap-1'>
          <label className='font-semibold'>Category</label>
          <input type='text' name="category" defaultValue={initialBook.category} onChange={(e) => setBooks({ ...books, category: e.target.value })} className='h-[5vh] w-[25vw] rounded-lg  pl-3 outline-none bg-gray-100 border-2 border-gray-200' />
        </div>
        <button type="submit" className="py-2 bg-green-800 w-fit px-8 rounded-lg text-white ">
          Update
        </button>
      </form>
    </div>
  );
}
export default EditBook;
