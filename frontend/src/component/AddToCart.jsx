import { useState, useEffect } from 'react';

function Cart() {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    // Retrieve cart items from local storage on component mount
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      setCart(JSON.parse(storedCart));
    }
  }, []);

  return (
    <div className='flex flex-col justify-center items-center mt-[10vh]'>
      <h2 className='font-semibold text-xl'>Your Cart items</h2>
      {cart.map((item, index) => (
        <table key={index} className='table border-2   '>
          <tr  className=' border-gray-300 border-b-2'>
            <th className='border-r border-gray-300 px-20 py-1'>Image</th>
            <th  className='border-r border-gray-300 px-20 py-1 '>name</th>
            <th className='border-r border-gray-300 px-20 py-1'>Price($)</th>
            <th className='border-r border-gray-300  px-20 py-1'>Quantity</th>
            <th className=' px-20 py-1 '>Total Price</th>
          </tr>
           <tr >
             <td className='border-r border-gray-300 px-20 '><img src={item.image} alt={item.name}  className='w-10 h-10'/></td>
             <td className='border-r border-gray-300 px-20 '>{item.name}</td>
             <td className='border-r border-gray-300 px-20'>{item.price}</td>
             <td className='border-r border-gray-300 px-20'>{item.quantity}</td>
             <td className=' px-20'>{item.price}*{item.quantity}</td>
           </tr>
         
          {/* Add more cart functionality here */}
        </table>
      ))}
    </div>
  );
}
export default Cart;
