import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import Login from './Login';

describe('Componente de Inicio de Sesión', () => {
  const mockOnLoginSuccess = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renderiza el componente de inicio de sesión', () => {
    render(
      <Router>
        <Login onLoginSuccess={mockOnLoginSuccess} />
      </Router>
    );
    expect(screen.getByText('Iniciar sesión')).toBeInTheDocument();
  });

  test('renderiza campos de entrada y botón de enviar', () => {
    render(
      <Router>
        <Login onLoginSuccess={mockOnLoginSuccess} />
      </Router>
    );
    expect(screen.getByPlaceholderText('Nombre de usuario')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Contraseña')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Iniciar sesión' })).toBeInTheDocument();
  });

  test('maneja el inicio de sesión correctamente', async () => {
    // Simula la función fetch
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

    // Restaura fetch
    global.fetch.mockRestore();
  });

  test('maneja el fallo de inicio de sesión debido a credenciales incorrectas', async () => {
    // Simula la función fetch para simular un fallo
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: false,
        json: () => Promise.resolve({ message: 'Credenciales inválidas' }),
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

    await waitFor(() => expect(screen.getByText('Credenciales inválidas')).toBeInTheDocument());

    // Restaura fetch
    global.fetch.mockRestore();
  });

  test('maneja el fallo de inicio de sesión debido a usuario administrador', async () => {
    // Simula la función fetch para simular una respuesta de usuario administrador
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

    // Restaura fetch
    global.fetch.mockRestore();
  });
});
