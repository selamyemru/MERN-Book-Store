
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import BackButton from '../component/BackButton';

function BookDetail() {
  const params = useParams();
  const [bookDetail, setBookDetail] = useState({
    name: '',
    description: '',
    image: '',
    price: '',
    author: '',
    publisher: '',
  });
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showBookDetail = async () => {
    const id = params.id;
    try {
      const response = await axios.get(`http://localhost:4000/getbook/${id}`);
      setBookDetail(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    showBookDetail();
  },[]);
  const openModal = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };
  return (
    <div className="flex flex-col justify-center items-center mt-[30vh]">
      <BackButton />
      <button
        className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
        onClick={openModal}
      >
        View Book Details
      </button>

      {isModalOpen && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
              &#8203;
            </span>
            <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div>
                <div className="flex gap-5 pb-4">
                  <span>
                    <img src={bookDetail.image} />
                  </span>
                </div>
                <div className="flex gap-5 pb-1">
                  <span>Name:</span>
                  <span>{bookDetail.name}</span>
                </div>
                <div className="flex gap-5 pb-1">
                  <span>Description:</span>
                  <span>{bookDetail.description}</span>
                </div>
                <div className="flex gap-5 pb-1">
                  <span>Author:</span>
                  <span>{bookDetail.author}</span>
                </div>
                <div className="flex gap-5 pb-1">
                  <span>Price:</span>
                  <span>{bookDetail.price}</span>
                </div>
                <div className="flex gap-5 pb-1">
                  <span>Publisher:</span>
                  <span>{bookDetail.publisher}</span>
                </div>
              </div>
              <div className="mt-5 sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-3 sm:grid-flow-row-dense">
                <button
                  type="button"
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:col-start-2 sm:text-sm"
                  onClick={closeModal}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
export default BookDetail;