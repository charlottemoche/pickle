import React, { useState } from 'react'
import Form from './Form'
import Message from './Message'
import Card from './Card'
import DeclineMessage from './DeclineMessage'

function Modal ({ sender, onClose }) {
  const [submitted, setSubmitted] = useState(false)
  const [feedback, setFeedback] = useState('')

  return (
    <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center'>
      <div className='bg-white rounded-lg p-6 w-full relative max-w-96'>
        <button
          onClick={onClose}
          className='absolute top-2 right-2 text-gray-500 hover:text-black'
        >
          ✕
        </button>
        <Card
          image='../src/img/maxi.png'
          name='Silk Maxi Dress'
          subtitle='Elegant evening wear'
          price='$75'
          size='L'
        />

        {submitted ? (
          <DeclineMessage feedback={feedback} />
        ) : (
          <>
            <Message sender={sender} />
            <Form
              onSubmitSuccess={(feedback) => {
                setSubmitted(true)
                setFeedback(feedback)
              }}
            />
          </>
        )}
      </div>
    </div>
  )
}

export default Modal
