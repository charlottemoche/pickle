import React, { useState } from 'react'
import Modal from './components/Modal'

function App () {
  const [showModal, setShowModal] = useState(false)
  const sender = {
    name: 'Charlotte',
    id: 123,
    avatar: '../src/img/1722287477960.jpeg'
  }

  const handleDecline = () => setShowModal(true)
  const handleAccept = () => console.log('Offer accepted')

  return (
    <div className='min-h-screen bg-gray-100 flex flex-col items-center justify-center'>
      <img
        src={sender.avatar}
        alt='Sender Avatar'
        className='w-20 h-20 rounded-full mb-2'
      />
      <h1 className='text-xl font-medium mb-4'>
        {sender.name} sent you an offer
      </h1>
      <div className='flex space-x-4'>
        <button
          onClick={handleAccept}
          className='bg-brand text-white px-4 py-2 rounded'
        >
          Accept
        </button>
        <button
          onClick={handleDecline}
          className='bg-red-600 text-white px-4 py-2 rounded'
        >
          Decline
        </button>
      </div>

      {showModal && (
        <Modal onClose={() => setShowModal(false)} sender={sender} />
      )}
    </div>
  )
}

export default App
