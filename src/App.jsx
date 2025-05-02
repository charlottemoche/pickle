import React, { useState, useContext } from 'react';
import Modal from './components/Modal';
import { UserContext } from './UserContext';

export default function App() {
  const [showModal, setShowModal] = useState(false);
  const user = useContext(UserContext);

  const handleDecline = () => setShowModal(true);
  const handleAccept = () => console.log("Offer accepted");

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
      <img src={user.avatar} alt="User Avatar" className="w-20 h-20 rounded-full mb-2" />
      <h1 className="text-xl font-medium mb-4">{user.name} sent you an offer</h1>
      <div className="flex space-x-4">
        <button
          onClick={handleAccept}
          className="bg-brand text-white px-4 py-2 rounded"
        >
          Accept
        </button>
        <button
          onClick={handleDecline}
          className="bg-red-600 text-white px-4 py-2 rounded"
        >
          Decline
        </button>
      </div>

      {showModal && <Modal onClose={() => setShowModal(false)} />}
    </div>
  );
}
