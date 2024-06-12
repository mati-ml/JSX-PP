import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Register from './Register';

describe('Componente de Registro', () => {
  test('renderiza el componente de registro', () => {
    render(<Register />);
    expect(screen.getByText('Register')).toBeInTheDocument();
  });

  test('renderiza campos de entrada y botón de enviar', () => {
    render(<Register />);
    expect(screen.getByLabelText('Nombre:')).toBeInTheDocument();
    expect(screen.getByLabelText('Apellido Paterno:')).toBeInTheDocument();
    expect(screen.getByLabelText('Apellido Materno:')).toBeInTheDocument();
    expect(screen.getByLabelText('Email:')).toBeInTheDocument();
    expect(screen.getByLabelText('Contraseña:')).toBeInTheDocument();
    expect(screen.getByLabelText('Rol:')).toBeInTheDocument();
    expect(screen.getByLabelText('Carrera:')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Register' })).toBeInTheDocument();
  });

  test('maneja el envío del formulario exitosamente', async () => {
    // Simula la función fetch
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ message: '¡Registro exitoso!' }),
      })
    );

    render(<Register />);

    fireEvent.change(screen.getByLabelText('Nombre:'), { target: { value: 'John' } });
    fireEvent.change(screen.getByLabelText('Apellido Paterno:'), { target: { value: 'Doe' } });
    fireEvent.change(screen.getByLabelText('Apellido Materno:'), { target: { value: 'Smith' } });
    fireEvent.change(screen.getByLabelText('Email:'), { target: { value: 'john.doe@example.com' } });
    fireEvent.change(screen.getByLabelText('Contraseña:'), { target: { value: 'password' } });
    fireEvent.change(screen.getByLabelText('Rol:'), { target: { value: 'estudiante' } });
    fireEvent.change(screen.getByLabelText('Carrera:'), { target: { value: 'Derecho' } });

    fireEvent.click(screen.getByRole('button', { name: 'Register' }));

    await waitFor(() => expect(screen.getByText('¡Registro exitoso!')).toBeInTheDocument());

    // Restaura fetch
    global.fetch.mockRestore();
  });

  test('maneja el fallo del envío del formulario', async () => {
    // Simula la función fetch para simular un fallo
    global.fetch = jest.fn(() =>
      Promise.reject(new Error('Error de red'))
    );

    render(<Register />);

    fireEvent.change(screen.getByLabelText('Nombre:'), { target: { value: 'John' } });
    fireEvent.change(screen.getByLabelText('Apellido Paterno:'), { target: { value: 'Doe' } });
    fireEvent.change(screen.getByLabelText('Apellido Materno:'), { target: { value: 'Smith' } });
    fireEvent.change(screen.getByLabelText('Email:'), { target: { value: 'john.doe@example.com' } });
    fireEvent.change(screen.getByLabelText('Contraseña:'), { target: { value: 'password' } });
    fireEvent.change(screen.getByLabelText('Rol:'), { target: { value: 'estudiante' } });
    fireEvent.change(screen.getByLabelText('Carrera:'), { target: { value: 'Derecho' } });

    fireEvent.click(screen.getByRole('button', { name: 'Register' }));

    await waitFor(() => expect(screen.getByText('Registro fallido: Error de red')).toBeInTheDocument());

    // Restaura fetch
    global.fetch.mockRestore();
  });
});




