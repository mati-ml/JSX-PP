import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { BrowserRouter as Router } from 'react-router-dom';
import Login from './Login';

describe('Login Component', () => {
  const mockOnLoginSuccess = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders Login component', () => {
    render(
      <Router>
        <Login onLoginSuccess={mockOnLoginSuccess} />
      </Router>
    );
    expect(screen.getByText('Iniciar sesión')).toBeInTheDocument();
  });

  test('renders input fields and submit button', () => {
    render(
      <Router>
        <Login onLoginSuccess={mockOnLoginSuccess} />
      </Router>
    );
    expect(screen.getByPlaceholderText('Nombre de usuario')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Contraseña')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Iniciar sesión' })).toBeInTheDocument();
  });

  test('handles login successfully', async () => {
    // Mock the fetch function
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ user_role: 'user', user_id: '123' }),
      })
    );

    render(
      <Router>
        <Login onLoginSuccess={mockOnLoginSuccess} />
      </Router>
    );

    fireEvent.change(screen.getByPlaceholderText('Nombre de usuario'), { target: { value: 'testuser' } });
    fireEvent.change(screen.getByPlaceholderText('Contraseña'), { target: { value: 'password' } });

    fireEvent.click(screen.getByRole('button', { name: 'Iniciar sesión' }));

    await waitFor(() => expect(mockOnLoginSuccess).toHaveBeenCalledWith({ user_role: 'user', user_id: '123' }));
    expect(document.cookie).toContain('user_role=user');
    expect(document.cookie).toContain('user_id=123');

    // Restore fetch
    global.fetch.mockRestore();
  });

  test('handles login failure due to incorrect credentials', async () => {
    // Mock the fetch function to simulate a failure
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: false,
        json: () => Promise.resolve({ message: 'Invalid credentials' }),
      })
    );

    render(
      <Router>
        <Login onLoginSuccess={mockOnLoginSuccess} />
      </Router>
    );

    fireEvent.change(screen.getByPlaceholderText('Nombre de usuario'), { target: { value: 'testuser' } });
    fireEvent.change(screen.getByPlaceholderText('Contraseña'), { target: { value: 'wrongpassword' } });

    fireEvent.click(screen.getByRole('button', { name: 'Iniciar sesión' }));

    await waitFor(() => expect(screen.getByText('Invalid credentials')).toBeInTheDocument());

    // Restore fetch
    global.fetch.mockRestore();
  });

  test('handles login failure due to admin user', async () => {
    // Mock the fetch function to simulate an admin user response
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ user_role: 'admin', user_id: '123' }),
      })
    );

    render(
      <Router>
        <Login onLoginSuccess={mockOnLoginSuccess} />
      </Router>
    );

    fireEvent.change(screen.getByPlaceholderText('Nombre de usuario'), { target: { value: 'adminuser' } });
    fireEvent.change(screen.getByPlaceholderText('Contraseña'), { target: { value: 'password' } });

    fireEvent.click(screen.getByRole('button', { name: 'Iniciar sesión' }));

    await waitFor(() => expect(screen.getByText('Usuario no autorizado')).toBeInTheDocument());

    // Restore fetch
    global.fetch.mockRestore();
  });
});
