import { render, screen } from '@testing-library/react'
import Modal from '../../components/Modal'

test('renders modal title', () => {
  render(<Modal sender={{ name: 'Charlotte', id: 123 }} onClose={() => {}} />)
  expect(screen.getByText(/Charlotte/i)).toBeInTheDocument()
})
