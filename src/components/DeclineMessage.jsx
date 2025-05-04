import React from 'react'

function DeclineMessage({ feedback }) {
  return (
    <div className='text-center mt-6'>
      {feedback ? (
        <>
          <h3 className='text-lg font-semibold text-gray-800'>
            Thanks for your feedback!
          </h3>
          <p className='text-gray-500 mt-2'>We appreciate you taking the time.</p>
        </>
      ) : (
        <>
          <h3 className='text-lg font-semibold text-gray-800'>
            Offer declined
          </h3>
          <p className='text-gray-500 mt-2'>You're all set.</p>
        </>
      )}
    </div>
  )
}

export default DeclineMessage
