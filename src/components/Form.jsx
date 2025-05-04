import React, { useState } from 'react'

function Form({ onSubmitSuccess, sender }) {
  const [feedback, setFeedback] = useState('')
  const [proposedTime, setProposedTime] = useState('')
  const [action, setAction] = useState('none')

  const handleOffer = async e => {
    e.preventDefault()
    if (proposedTime) {
      try {
        const res = await fetch(
          'https://rqpecv6vpc.execute-api.us-east-2.amazonaws.com/prod/feedback',
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ proposedTime })
          }
        )
        const data = await res.json()
        console.log('Server response:', data)
        setProposedTime('')
        onSubmitSuccess({
          title: 'Offer sent!',
          body: `We'll let you know when ${sender.name} responds.`
        })
      } catch (err) {
        console.error('Error submitting proposed time:', err)
      }
    } else {
      console.log('No offer time provided.')
    }
  }

  const handleDecline = async e => {
    e.preventDefault()

    if (feedback) {
      try {
        const res = await fetch(
          'https://rqpecv6vpc.execute-api.us-east-2.amazonaws.com/prod/feedback',
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ feedback })
          }
        )
        const data = await res.json()
        console.log('Server response:', data)
        setFeedback('')
        onSubmitSuccess({
          title: 'Offer declined',
          body: 'Thanks for your feedback.'
        })
      } catch (err) {
        console.error('Error submitting feedback:', err)
      }
    } else {
      console.log('No feedback provided.')
      onSubmitSuccess({
        title: 'Offer declined',
        body: 'You\'re all set.'
      })
    }
  }

  return (
    <form className='mt-6 space-y-6'>
      <div className='flex gap-4 mb-4'>
        <button
          type='button'
          onClick={() => setAction('offer')}
          className={`w-full px-4 py-2 rounded ${
            action === 'offer' ? 'bg-black text-white' : 'bg-brand text-white'
          }`}
          disabled={action === 'offer'}
        >
          Offer a new time
        </button>
        <button
          type='button'
          onClick={() => setAction('decline')}
          className={`w-full px-4 py-2 rounded ${
            action === 'decline'
              ? 'bg-black text-white'
              : 'bg-red-600 text-white'
          }`}
          disabled={action === 'decline'}
        >
          Decline offer
        </button>
      </div>

      {action === 'offer' && (
        <div>
          <h3 className='font-semibold text-gray-700 mb-2'>Offer a new time</h3>
          <input
            type='datetime-local'
            value={proposedTime}
            onChange={e => setProposedTime(e.target.value)}
            className='w-full border border-gray-300 rounded px-3 py-2'
          />
          <button
            onClick={handleOffer}
            className='mt-3 w-full bg-brand text-white px-4 py-2 rounded'
          >
            Propose time
          </button>
        </div>
      )}

      {action === 'decline' && (
        <div>
          <h3 className='font-semibold text-gray-700 mb-2'>
            Why are you declining?
          </h3>
          <p className='text-sm text-gray-500 mb-2'>(Optional)</p>
          <input
            type='text'
            value={feedback}
            onChange={e => setFeedback(e.target.value)}
            className='w-full border border-gray-300 rounded px-3 py-2'
            placeholder='Not available, accepted another offer, etc.'
          />
          <button
            onClick={handleDecline}
            className='mt-3 w-full bg-red-600 text-white px-4 py-2 rounded'
          >
            Decline offer
          </button>
        </div>
      )}
    </form>
  )
}

export default Form
