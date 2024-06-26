import axios from 'axios'
import { useEffect, useState } from 'react'
// import { Link, useParams } from 'react-router-dom'
import Modal from 'react-modal'
// import { FaSearch } from 'react-icons/fa'
function Home() {
  const [books, setBooks] = useState([])
  const [loading, setLoading] = useState(false)
  const [selectedBook, setSelectedBook] = useState(null)
  const [modalIsOpen, setModalIsOpen] = useState(false)
  const [categories, setCategories] = useState()
  const [selectCategory, setSelectCategory] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const handdleCategory = async () => {
    const response = await axios.get('http://localhost:4000/book/category');
    if (response) {
      setCategories(response.data)
    }
  }
  const fetchBook = async () => {
    setLoading(true)
    const response = await axios.get(`http://localhost:4000/getcategorybook?category=${selectCategory}`)
    if (response) {
      setBooks(response.data)
      setLoading(false)
    }
  }
  const handleCategoryChange = (e) => {
    setSelectCategory(e.target.value);
  };
  useEffect(() => {
    handdleCategory()

  }, [])
  useEffect(() => {
    fetchBook()

  }, [selectCategory])

  const openModal = (book) => {
    setSelectedBook(book)
    setModalIsOpen(true)
  }

  const closeModal = () => {
    setSelectedBook(null)
    setModalIsOpen(false)
  }

  return (
    <section className='mt-[17vh] flex flex-col sm:flex-none'>
      <div className='mb-20 flex items-center  justify-center '>
        <input type='text' placeholder='Search here..' onChange={(e)=>setSearchTerm(e.target.value)} className='border-2 border-gray-200 px-80 py-2 mr-4 w-[58%] outline-slate-200'/>
        {/* <FaSearch size={23} color='green'/> */}
      </div>
      <div className=' w-full sm:w-fit sm:h-screen bg-gray-200 sm:bg-gray-100 fixed top-16 left-0  px-10'>
        <div className='pt-20 flex flex-col items-center  gap-2 font-semibold text-green-800 '>
          <select value={selectCategory} onChange={handleCategoryChange} color='green' className='border-2 border-gray-200 px-8 py-1 outline-none'>
            <option value="">All Categories</option>
            {categories?.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="grid  mt-48 sm:mt-0 grid-cols-2 sm:grid-cols-3  lg:grid-cols-4  gap-6 items-center mr-[10vw] ml-[20vw] sm:ml-[25vw] md:ml-[20vw] ">
        {loading ? <div>Loading...</div>
          : (
            books.filter((book)=>{
              if(searchTerm===''){
                return book
              } else if(book.name.toLowerCase().includes(searchTerm.toLowerCase())){
                return book
              }

            }).map(book => (
              <div key={book._id} className='flex flex-col  gap-2 bg-gray-100 w-fit p-2  items-center shadow-lg border-2 border-gray-200'>
                <img src={book.image} width={200} height={400} />
                <p><span className='mr-4'>price:</span>${book.price}</p>
                <button onClick={() => openModal(book)} className='text-green-800'> View Book Detail</button>
                <button className=' px-6 sm:px-4 py-1 sm:py-2 rounded-lg bg-green-800 text-white'>Add to Cart</button>
              </div>
            ))
          )
        }
      </div>
      <div>
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          contentClassName='bg-gray-200 p-6 rounded-md'
          overlayClassName='fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center mt-[1vh]'
        >
          {selectedBook && (
            <div>
              <img src={selectedBook.image} width={300} height={600} />
              <h2 className='text-2xl font-bold mb-2'>{selectedBook.name}</h2>
              <p className='mb-4'>{selectedBook.description}</p>
              <p><span className='font-bold'>Author:</span> {selectedBook.author}</p>
              <p><span className='font-bold'>Publisher:</span> {selectedBook.publisher}</p>
              <p><span className='font-bold'>Price:</span> ${selectedBook.price}</p>
              <button onClick={closeModal} className='mt-4 px-4 py-2 bg-green-800 text-white rounded-md'>Close</button>
            </div>
          )}
        </Modal>
      </div>

    </section>
  )
}
export default Home
