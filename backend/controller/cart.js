import React, { useState } from 'react';
import { FaTrashAlt } from 'react-icons/fa';
import { useSnackbar } from 'notistack';

function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const { enqueueSnackbar } = useSnackbar();

  const handleRemoveFromCart = (id) => {
    setCartItems(cartItems.filter(item => item._id !== id));
    enqueueSnackbar('Item removed from cart!', { variant: 'info' });
  };

  return (
    <div className="flex flex-col gap-10 mt-[20vh] mx-[5vw]">
      <h1 className="text-xl font-bold mb-4">Your Cart</h1>
      {cartItems.length === 0 ? (
        <div>Your cart is empty</div>
      ) : (
        <table className="table border-2 border-gray-200 border-collapse">
          <thead className="bg-gray-200 text-green-800 text-xl">
            <tr>
              <th className="px-16 text-center py-4 font-semibold">Name</th>
              <th className="px-16 text-center py-4 font-semibold">Price</th>
              <th className="px-16 text-center py-4 font-semibold">Operation</th>
            </tr>
          </thead>
          <tbody>
            {cartItems.map((item) => (
              <tr key={item._id}>
                <td className="px-16 text-center py-6 text-sm font-sem">{item.name}</td>
                <td className="px-16 text-center py-6 text-sm font-sem">{item.price}</td>
                <td className="px-16 text-center py-6 text-sm font-sem flex gap-8">
                  <button onClick={() => handleRemoveFromCart(item._id)}>
                    <FaTrashAlt color="red" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default Cart;
