//npm install @testing-library/react @testing-library/jest-dom Hay que instalarlo



import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Register from './Register';

describe('Register Component', () => {
  test('renders Register component', () => {
    render(<Register />);
    expect(screen.getByText('Register')).toBeInTheDocument();
  });

  test('renders input fields and submit button', () => {
    render(<Register />);
    expect(screen.getByLabelText('First Name:')).toBeInTheDocument();
    expect(screen.getByLabelText('Apellido Paterno:')).toBeInTheDocument();
    expect(screen.getByLabelText('Apellido Materno:')).toBeInTheDocument();
    expect(screen.getByLabelText('Email:')).toBeInTheDocument();
    expect(screen.getByLabelText('Password:')).toBeInTheDocument();
    expect(screen.getByLabelText('Role:')).toBeInTheDocument();
    expect(screen.getByLabelText('Carrera:')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Register' })).toBeInTheDocument();
  });

  test('handles form submission successfully', async () => {
    // Mock the fetch function
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ message: 'Registration successful!' }),
      })
    );

    render(<Register />);

    fireEvent.change(screen.getByLabelText('First Name:'), { target: { value: 'John' } });
    fireEvent.change(screen.getByLabelText('Apellido Paterno:'), { target: { value: 'Doe' } });
    fireEvent.change(screen.getByLabelText('Apellido Materno:'), { target: { value: 'Smith' } });
    fireEvent.change(screen.getByLabelText('Email:'), { target: { value: 'john.doe@example.com' } });
    fireEvent.change(screen.getByLabelText('Password:'), { target: { value: 'password' } });
    fireEvent.change(screen.getByLabelText('Role:'), { target: { value: 'student' } });
    fireEvent.change(screen.getByLabelText('Carrera:'), { target: { value: 'Derecho' } });

    fireEvent.click(screen.getByRole('button', { name: 'Register' }));

    await waitFor(() => expect(screen.getByText('Registration successful!')).toBeInTheDocument());

    // Restore fetch
    global.fetch.mockRestore();
  });

  test('handles form submission failure', async () => {
    // Mock the fetch function to simulate a failure
    global.fetch = jest.fn(() =>
      Promise.reject(new Error('Network error'))
    );

    render(<Register />);

    fireEvent.change(screen.getByLabelText('First Name:'), { target: { value: 'John' } });
    fireEvent.change(screen.getByLabelText('Apellido Paterno:'), { target: { value: 'Doe' } });
    fireEvent.change(screen.getByLabelText('Apellido Materno:'), { target: { value: 'Smith' } });
    fireEvent.change(screen.getByLabelText('Email:'), { target: { value: 'john.doe@example.com' } });
    fireEvent.change(screen.getByLabelText('Password:'), { target: { value: 'password' } });
    fireEvent.change(screen.getByLabelText('Role:'), { target: { value: 'student' } });
    fireEvent.change(screen.getByLabelText('Carrera:'), { target: { value: 'Derecho' } });

    fireEvent.click(screen.getByRole('button', { name: 'Register' }));

    await waitFor(() => expect(screen.getByText('Registration failed: Network error')).toBeInTheDocument());

    // Restore fetch
    global.fetch.mockRestore();
  });
});
