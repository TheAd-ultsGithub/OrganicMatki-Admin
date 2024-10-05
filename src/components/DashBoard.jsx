import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Import Axios
import { getAuth, signOut } from "firebase/auth";

const Dashboard = () => {
  const auth = getAuth();
  const [orders, setOrders] = useState([]); // State to hold orders
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [status, setStatus] = useState('placed'); // Default status
  const [loading, setLoading] = useState(true); // Loading state

  // Fetch data from API
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get('https://api.indiestori.com/api/admin/allorders');
        setOrders(response.data); // Assuming response.data contains the array of orders
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleOrderClick = (order) => {
    setSelectedOrder(order);
    setStatus(order.orderStatus); // Set the current order status
  };

  const closeDetails = () => {
    setSelectedOrder(null);
  };

  // Sort orders in descending order by id
  const sortedOrders = [...orders].sort((a, b) => b.id - a.id);

  // Function to reload content
  const reloadContent = () => {
    window.location.reload(false); // Reload the page without forcing a full refresh from the server
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      console.log("User signed out successfully");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <div className="container mx-auto p-4 md:p-6">
      <h1 className="text-lg md:text-2xl font-bold mb-4">Indie Stori Admin Dashboard</h1>
      
      {/* Reload Content Button */}
      <button 
        onClick={reloadContent} 
        className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-yellow-600 transition duration-200 mb-4"
      >
        Reload Content
      </button>

      <button 
        onClick={handleLogout} 
        className="bg-red-500 text-white py-2 px-4 mx-8 rounded hover:bg-red-600 transition duration-200 mb-4"
      >
        Logout
      </button>

      {loading ? (
        <div className="text-center text-lg text-gray-600">
          Loading content, please wait...
        </div>
      ) : (
        // <>
        //   <div className="overflow-x-auto">
        //     <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-md">
        //       <thead>
        //         <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
        //           <th className="py-3 px-2 md:px-6 text-left">Order Id</th>
        //           <th className="py-3 px-2 md:px-6 text-left">Name</th>
        //           <th className="py-3 px-2 md:px-6 text-left">Email</th>
        //           <th className="py-3 px-2 md:px-6 text-left">Total Amount</th>
        //           <th className="py-3 px-2 md:px-6 text-left">Payment Status</th>
        //           <th className="py-3 px-2 md:px-6 text-left">Payment Method</th>
        //           <th className="py-3 px-2 md:px-6 text-left">Order Status</th>
        //           <th className="py-3 px-2 md:px-6 text-left">Actions</th>
        //         </tr>
        //       </thead>
        //       <tbody className="text-gray-600 text-sm font-light">
        //         {sortedOrders.map(order => (
        //           <tr key={order.id} className="border-b border-gray-200 hover:bg-gray-100">
        //             <td className="py-2 px-2 md:px-6">{order.id}</td>
        //             <td className="py-2 px-2 md:px-6">{order.orderInfo.Name}</td>
        //             <td className="py-2 px-2 md:px-6">{order.orderInfo.Email}</td>
        //             <td className="py-2 px-2 md:px-6">₹{order.totalAmount}</td>
        //             <td className="py-2 px-2 md:px-6 font-bold">
        //               {order.orderInfo.PaymentMethod === 'cashOnDelivery' ? 'Cash' : order.paymentStatus}
        //             </td>
        //             <td className="py-2 px-2 md:px-6">{order.orderInfo.PaymentMethod}</td>
        //             <td className="py-2 px-2 md:px-6">{order.orderStatus}</td>
        //             <td className="py-2 px-2 md:px-6">
        //               <button 
        //                 onClick={() => handleOrderClick(order)} 
        //                 className="bg-blue-500 text-white py-1 px-4 rounded hover:bg-blue-600 transition duration-200"
        //               >
        //                 View Details
        //               </button>
        //             </td>
        //           </tr>
        //         ))}
        //       </tbody>
        //     </table>
        //   </div>

        //   {/* Order Details Modal */}
        //   {selectedOrder && (
        //     <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
        //       <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-lg relative">
        //         <span 
        //           className="absolute top-2 right-2 cursor-pointer text-gray-600 hover:text-red-600" 
        //           onClick={closeDetails}
        //         >
        //           &times;
        //         </span>
        //         <h2 className="text-xl font-bold mb-4">Order Details</h2>

        //         {/* Customer Information */}
        //         <h3 className="text-lg font-semibold">Customer Information</h3>
        //         <p><strong>Name:</strong> {selectedOrder.orderInfo.Name}</p>
        //         <p><strong>Email:</strong> {selectedOrder.orderInfo.Email}</p>
        //         <p><strong>Phone:</strong> {selectedOrder.orderInfo.Phone}</p>
        //         <p><strong>Address:</strong> {selectedOrder.orderInfo.StreetAddress}, {selectedOrder.orderInfo.City}, {selectedOrder.orderInfo.State}, {selectedOrder.orderInfo.Country}, Pincode - {selectedOrder.orderInfo.Pincode}</p>

        //         {/* Payment Information */}
        //         <h3 className="text-lg font-semibold mt-4">Payment Information</h3>
        //         <p><strong>Payment Method:</strong> {selectedOrder.orderInfo.PaymentMethod}</p>
        //         <p><strong>Total Amount:</strong> ₹{selectedOrder.totalAmount}</p>
        //         <p className='font-bold'><strong>Payment Status:</strong> {selectedOrder.orderInfo.PaymentMethod === 'cashOnDelivery' ? 'Cash' : selectedOrder.paymentStatus}</p>

        //         {/* Items Ordered */}
        //         <h3 className="text-lg font-semibold mt-4">Items Ordered</h3>
        //         <ul className="list-disc pl-5">
        //           {selectedOrder.items.map(item => (
        //             <li key={item.id}>
        //               {item.name} - Size: {item.size}, Price: ₹{item.price} x Quantity: {item.quantity} = Total: ₹{item.totalPrice}
        //             </li>
        //           ))}
        //         </ul>
        //       </div>
        //     </div>
        //   )}
        // </>
        <>
  <div className="overflow-x-auto">
    <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-md">
      <thead>
        <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
          <th className="py-3 px-2 md:px-6 text-left">Order Id</th>
          <th className="py-3 px-2 md:px-6 text-left">Name</th>
          <th className="py-3 px-2 md:px-6 text-left">Email</th>
          <th className="py-3 px-2 md:px-6 text-left">Total Amount</th>
          <th className="py-3 px-2 md:px-6 text-left">Payment Status</th>
          <th className="py-3 px-2 md:px-6 text-left">Payment Method</th>
          <th className="py-3 px-2 md:px-6 text-left">Order Status</th>
          <th className="py-3 px-2 md:px-6 text-left">Actions</th>
        </tr>
      </thead>
      <tbody className="text-gray-600 text-sm font-light">
        {sortedOrders.map(order => (
          <tr key={order.id} className="border-b border-gray-200 hover:bg-gray-100">
            <td className="py-2 px-2 md:px-6">{order.id}</td>
            <td className="py-2 px-2 md:px-6">{order.orderInfo.Name}</td>
            <td className="py-2 px-2 md:px-6">{order.orderInfo.Email}</td>
            <td className="py-2 px-2 md:px-6">₹{order.totalAmount}</td>
            <td className="py-2 px-2 md:px-6 font-bold">
              {order.orderInfo.PaymentMethod === 'cashOnDelivery' ? 'Cash' : order.paymentStatus}
            </td>
            <td className="py-2 px-2 md:px-6">{order.orderInfo.PaymentMethod}</td>
            <td className="py-2 px-2 md:px-6">{order.orderStatus}</td>
            <td className="py-2 px-2 md:px-6">
              <button 
                onClick={() => handleOrderClick(order)} 
                className="bg-blue-500 text-white py-1 px-4 rounded hover:bg-blue-600 transition duration-200"
              >
                View Details
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>

  {/* Order Details Modal */}
  {selectedOrder && (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-lg relative">
        <span 
          className="absolute top-2 right-2 cursor-pointer text-gray-600 hover:text-red-600" 
          onClick={closeDetails}
        >
          &times;
        </span>
        <h2 className="text-xl font-bold mb-4">Order Details</h2>

        {/* Customer Information */}
        <h3 className="text-lg font-semibold">Customer Information</h3>
        <p><strong>Name:</strong> {selectedOrder.orderInfo.Name}</p>
        <p><strong>Email:</strong> {selectedOrder.orderInfo.Email}</p>
        <p><strong>Phone:</strong> {selectedOrder.orderInfo.Phone}</p>
        <p><strong>Address:</strong> {selectedOrder.orderInfo.StreetAddress}, {selectedOrder.orderInfo.City}, {selectedOrder.orderInfo.State}, {selectedOrder.orderInfo.Country}, Pincode - {selectedOrder.orderInfo.Pincode}</p>

        {/* Payment Information */}
        <h3 className="text-lg font-semibold mt-4">Payment Information</h3>
        <p><strong>Payment Method:</strong> {selectedOrder.orderInfo.PaymentMethod}</p>
        <p><strong>Total Amount:</strong> ₹{selectedOrder.totalAmount}</p>
        <p className="font-bold"><strong>Payment Status:</strong> {selectedOrder.orderInfo.PaymentMethod === 'cashOnDelivery' ? 'Cash' : selectedOrder.paymentStatus}</p>

        {/* Items Ordered */}
        <h3 className="text-lg font-semibold mt-4">Items Ordered</h3>
        <ul className="list-disc pl-5">
          {selectedOrder.items.map(item => (
            <li key={item.id}>
              {item.name} - Size: {item.size}, Price: ₹{item.price} x Quantity: {item.quantity} = Total: ₹{item.totalPrice}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )}
</>

      )}
    </div>
  );
};

export default Dashboard;
