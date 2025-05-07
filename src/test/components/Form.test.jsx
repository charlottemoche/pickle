import { vi, describe, test, beforeEach, expect } from 'vitest'
import '@testing-library/jest-dom'
import { render, fireEvent, screen, waitFor } from '@testing-library/react'
import Form from '../../components/Form'

vi.stubGlobal('fetch', vi.fn())

describe('Form Component', () => {
  const mockOnSubmitSuccess = vi.fn()
  const sender = { name: 'Charlotte', id: 123 }

  beforeEach(() => {
    fetch.mockClear()
  })

  test('renders the form with initial buttons', () => {
    render(<Form onSubmitSuccess={mockOnSubmitSuccess} sender={sender} />)

    expect(screen.getByText('Offer new time')).toBeInTheDocument()
    expect(screen.getByText('Decline offer')).toBeInTheDocument()
  })

  test('clicking "Offer new time" shows the proposed time input field', () => {
    render(<Form />)
    const offerButton = screen.getByText('Offer new time')
    fireEvent.click(offerButton)

    expect(screen.getByText('Offer new time')).toBeInTheDocument()
    expect(screen.getByLabelText(/Select time/i)).toBeInTheDocument()
  })

  test('clicking "Decline offer" shows the feedback input field', () => {
    render(<Form />)
    const declineButton = screen.getByText('Decline offer')
    fireEvent.click(declineButton)

    expect(screen.getByText('Why are you declining?')).toBeInTheDocument()
    expect(screen.getByLabelText(/Why are you declining?/i)).toBeInTheDocument()
  })

  test('submitting an offer sends the proposed time', async () => {
    render(<Form onSubmitSuccess={mockOnSubmitSuccess} sender={sender} />)

    fireEvent.click(screen.getByText('Offer new time'))
    fireEvent.change(screen.getByLabelText('Select time'), {
      target: { value: '2025-05-10T10:00' }
    })

    fetch.mockResolvedValueOnce({
      json: () => Promise.resolve({ success: true })
    })

    fireEvent.click(screen.getByText('Propose time'))

    await waitFor(() =>
      expect(fetch).toHaveBeenCalledWith(
        `${import.meta.env.VITE_PICKLE_API_URL}/feedback`,
        expect.objectContaining({
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ proposedTime: '2025-05-10T10:00' })
        })
      )
    )

    expect(mockOnSubmitSuccess).toHaveBeenCalledWith({
      title: 'Offer sent!',
      body: "We'll let you know when Charlotte responds."
    })
  })

  test('submitting a decline sends feedback or empty body', async () => {
    render(<Form onSubmitSuccess={mockOnSubmitSuccess} sender={sender} />)

    fireEvent.click(screen.getByText('Decline offer'))

    fireEvent.change(screen.getByLabelText('Why are you declining?'), {
      target: { value: 'Not available' }
    })

    console.log(
      'Feedback value after change:',
      screen.getByLabelText('Why are you declining?').value
    )

    fetch.mockResolvedValueOnce({
      json: () => Promise.resolve({ success: true })
    })

    fireEvent.click(screen.getByText('Decline'))

    await waitFor(() =>
      expect(fetch).toHaveBeenCalledWith(
        `${import.meta.env.VITE_PICKLE_API_URL}/feedback`,
        expect.objectContaining({
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ feedback: 'Not available' })
        })
      )
    )

    expect(mockOnSubmitSuccess).toHaveBeenCalledWith({
      title: 'Offer declined',
      body: 'Thanks for your feedback.'
    })
  })

  test('submitting decline without feedback sends empty body', async () => {
    render(<Form onSubmitSuccess={mockOnSubmitSuccess} sender={sender} />)

    fireEvent.click(screen.getByText('Decline offer'))

    const feedbackInput = screen.getByLabelText('Why are you declining?')
    fireEvent.change(feedbackInput, { target: { value: '' } })

    fireEvent.click(screen.getByText('Decline'))

    await waitFor(() => expect(fetch).not.toHaveBeenCalled())

    expect(mockOnSubmitSuccess).toHaveBeenCalledWith({
      title: 'Offer declined',
      body: "You're all set."
    })
  })
})
