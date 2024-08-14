// // import Cart from '../component/AddToCart'
// import axios from 'axios'
// import { useEffect, useState } from 'react'
// import Modal from 'react-modal'

// function Home() {
//   const [books, setBooks] = useState([])
//   const [loading, setLoading] = useState(false)
//   const [selectedBook, setSelectedBook] = useState(null)
//   const [modalIsOpen, setModalIsOpen] = useState(false)
//   const [categories, setCategories] = useState()
//   const [selectCategory, setSelectCategory] = useState('')
//   const [searchTerm, setSearchTerm] = useState('')
//   const [cart, setCart] = useState([])

//   const handdleCategory = async () => {
//     const response = await axios.get('http://localhost:4000/book/category');
//     if (response) {
//       setCategories(response.data)
//     }
//   }

//   const fetchBook = async () => {
//     setLoading(true)
//     const response = await axios.get(`http://localhost:4000/getcategorybook?category=${selectCategory}`)
//     if (response) {
//       setBooks(response.data)
//       setLoading(false)
//     }
//   }

//   const handleCategoryChange = (e) => {
//     setSelectCategory(e.target.value);
//   };

//   useEffect(() => {
//     handdleCategory()
//   }, [])

//   useEffect(() => {
//     fetchBook()
//   }, [selectCategory])

//   const openModal = (book) => {
//     setSelectedBook(book)
//     setModalIsOpen(true)
//   }

//   const closeModal = () => {
//     setSelectedBook(null)
//     setModalIsOpen(false)
//   }


//   const addToCart = (book) => {
//     const updatedCart = [...cart, book];
//     setCart(updatedCart);
//     localStorage.setItem('cart', JSON.stringify(updatedCart));
//   };
//   return (
//     <section className='mt-[17vh] '>
//       <div className='mb-20 flex flex-col sm:flex-row mx-[10vw] items-center gap-2 sm:gap-0 '>
//         <div className=' gap-2 font-semibold text-green-800 '>
//           <select value={selectCategory} onChange={handleCategoryChange} className='border-2  border-gray-200 px-8 py-2 outline-none'>
//             <option value="" >All Categories</option>
//             {categories?.map((category) => (
//               <option key={category} value={category}>
//                 {category}
//               </option>
//             ))}
//           </select>
//           <input type='text' placeholder='Search here..' onChange={(e) => setSearchTerm(e.target.value)} className='border-2 border-gray-200 px-40 py-2 mr-4 w-fit outline-slate-200' />
//         </div>
//       </div>
//       <div className=' w-full sm:w-fit sm:h-screen fixed top-16 left-0  px-10'>

//       </div>
//       <div className="grid  mt-18 sm:mt-0 grid-cols-2 sm:grid-cols-3  lg:grid-cols-4  gap-6 items-center mx-[10vw]">
//         {loading ? <div>Loading...</div>
//           : (
//             books.filter((book) => {
//               if (searchTerm === '') {
//                 return book
//               } else if (book.name.toLowerCase().includes(searchTerm.toLowerCase())) {
//                 return book
//               }
//             }).map(book => (
//               <div key={book._id} className='flex flex-col  gap-2 bg-gray-100 w-[15vw] p-2 shadow-sm border-2 border-gray-200 pb-4'>
//                 <h1 className='font-semibold text-xl    '>{book.name}</h1>
//                 <img src={book.image} width={200} height={400} />
//                 <p>${book.price}</p>
//                 <div className='flex gap-4 '>
//                   <button onClick={() => openModal(book)} className='text-green-500'> View Detail</button>
//                   <button onClick={() => addToCart(book)} className='px-6 sm:px-4 py-1  rounded-lg bg-gray-200 '>Add to Cart</button>
//                 </div>
//               </div>
//             ))
//           )
//         }
//       </div>
//       <div>
//         <Modal
//           isOpen={modalIsOpen}
//           onRequestClose={closeModal}
//           contentClassName='bg-gray-200 p-6 rounded-md'
//           overlayClassName='fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center mt-[1vh]'
//         >
//           {selectedBook && (
//             <div>
//               <img src={selectedBook.image} width={300} height={600} />
//               <h2 className='text-2xl font-bold mb-2'>{selectedBook.name}</h2>
//               <p className='mb-4'>{selectedBook.description}</p>
//               <p><span className='font-bold'>Author:</span> {selectedBook.author}</p>
//               <p><span className='font-bold'>Publisher:</span> {selectedBook.publisher}</p>
//               <p><span className='font-bold'>Price:</span> ${selectedBook.price}</p>
//               <button onClick={() => addToCart(selectedBook)} className='mt-4 px-4 py-2 bg-green-800 text-white rounded-md'>Add to Cart</button>
//               <button onClick={closeModal} className='mt-4 ml-4 px-4 py-2 bg-gray-800 text-white rounded-md'>Close</button>
//             </div>
//           )}
//         </Modal>
//       </div>
//     </section>
//   )
// }

// export default Home
// import Cart from '../component/AddToCart'
import axios from 'axios'
import { useEffect, useState } from 'react'
import Modal from 'react-modal'

function Home() {
  const [books, setBooks] = useState([])
  const [loading, setLoading] = useState(false)
  const [selectedBook, setSelectedBook] = useState(null)
  const [modalIsOpen, setModalIsOpen] = useState(false)
  const [categories, setCategories] = useState()
  const [selectCategory, setSelectCategory] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const [cart, setCart] = useState([])

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
    // Load cart from local storage on component mount
    const cartFromStorage = localStorage.getItem('cart');
    if (cartFromStorage) {
      setCart(JSON.parse(cartFromStorage));
    }
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

  const addToCart = (book) => {
    const updatedCart = [...cart, book];
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  return (
    <section className='mt-[17vh] '>
      <div className='mb-20 flex flex-col sm:flex-row mx-[10vw] items-center gap-2 sm:gap-0 '>
        <div className=' gap-2 font-semibold text-green-800 '>
          <select value={selectCategory} onChange={handleCategoryChange} className='border-2  border-gray-200 px-8 py-2 outline-none'>
            <option value="" >All Categories</option>
            {categories?.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
          <input type='text' placeholder='Search here..' onChange={(e) => setSearchTerm(e.target.value)} className='border-2 border-gray-200 px-40 py-2 mr-4 w-fit outline-slate-200' />
        </div>
      </div>
      <div className=' w-full sm:w-fit sm:h-screen fixed top-16 left-0  px-10'>

      </div>
      <div className="grid  mt-18 sm:mt-0 grid-cols-2 sm:grid-cols-3  lg:grid-cols-4  gap-6 items-center mx-[10vw]">
        {loading ? <div>Loading...</div>
          : (
            books.filter((book) => {
              if (searchTerm === '') {
                return book
              } else if (book.name.toLowerCase().includes(searchTerm.toLowerCase())) {
                return book
              }
            }).map(book => (
              <div key={book._id} className='flex flex-col  gap-2 bg-gray-100 w-[15vw] p-2 shadow-sm border-2 border-gray-200 pb-4'>
                <h1 className='font-semibold text-xl    '>{book.name}</h1>
                <img src={book.image} width={200} height={400} />
                <p>${book.price}</p>
                <div className='flex gap-4 '>
                  <button onClick={() => openModal(book)} className='text-green-500'> View Detail</button>
                  <button onClick={() => addToCart(book)} className='px-6 sm:px-4 py-1  rounded-lg bg-gray-200 '>Add to Cart</button>
                </div>
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
              <button onClick={() => addToCart(selectedBook)} className='mt-4 px-4 py-2 bg-green-800 text-white rounded-md'>Add to Cart</button>
              <button onClick={closeModal} className='mt-4 ml-4 px-4 py-2 bg-gray-800 text-white rounded-md'>Close</button>
            </div>
          )}
        </Modal>
      </div>
    </section>
  )
}

export default Home
