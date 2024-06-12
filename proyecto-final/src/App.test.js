import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import AppWrapper from './App';
import Login from './pages/Login';
import Register from './pages/Register';
import LoginAdmin from './pages/LoginAdmin';
import AdminDashboard from './components/AdminDashboard';
import StudentDashboard from './components/StudentDashboard';
import TeacherDashboard from './components/TeacherDashboard';
import Inscripcion from './components/Inscripcion-P';
import Reunion from './components/Reunion';
import Estado from './components/Aprobacion-Pasantia';

jest.mock('./pages/Login');
jest.mock('./pages/Register');
jest.mock('./pages/LoginAdmin');
jest.mock('./components/AdminDashboard');
jest.mock('./components/StudentDashboard');
jest.mock('./components/TeacherDashboard');
jest.mock('./components/Inscripcion-P');
jest.mock('./components/Reunion');
jest.mock('./components/Aprobacion-Pasantia');

const mockedLogin = jest.requireMock('./pages/Login');
const mockedRegister = jest.requireMock('./pages/Register');
const mockedLoginAdmin = jest.requireMock('./pages/LoginAdmin');
const mockedAdminDashboard = jest.requireMock('./components/AdminDashboard');
const mockedStudentDashboard = jest.requireMock('./components/StudentDashboard');
const mockedTeacherDashboard = jest.requireMock('./components/TeacherDashboard');
const mockedInscripcion = jest.requireMock('./components/Inscripcion-P');
const mockedReunion = jest.requireMock('./components/Reunion');
const mockedEstado = jest.requireMock('./components/Aprobacion-Pasantia');

describe('App', () => {
  beforeEach(() => {
    mockedLogin.mockImplementation(() => <div>Página de inicio de sesión</div>);
    mockedRegister.mockImplementation(() => <div>Página de registro</div>);
    mockedLoginAdmin.mockImplementation(() => <div>Página de inicio de sesión de administrador</div>);
    mockedAdminDashboard.mockImplementation(() => <div>Panel de administrador</div>);
    mockedStudentDashboard.mockImplementation(() => <div>Panel de estudiante</div>);
    mockedTeacherDashboard.mockImplementation(() => <div>Panel de profesor</div>);
    mockedInscripcion.mockImplementation(() => <div>Página de inscripción</div>);
    mockedReunion.mockImplementation(() => <div>Página de reunión</div>);
    mockedEstado.mockImplementation(() => <div>Página de estado</div>);
  });

  test('renderiza la página de inicio de sesión por defecto', () => {
    render(
      <Router>
        <AppWrapper />
      </Router>
    );

    expect(screen.getByText('Página de inicio de sesión')).toBeInTheDocument();
  });

  test('redirige al panel adecuado después de iniciar sesión', async () => {
    render(
      <Router>
        <AppWrapper />
      </Router>
    );

    fireEvent.click(screen.getByText('Página de inicio de sesión'));

    // Simula el éxito del inicio de sesión para estudiante
    await waitFor(() => {
      fireEvent.click(screen.getByText('Página de inicio de sesión'));
      expect(screen.getByText('Panel de estudiante')).toBeInTheDocument();
    });

    // Simula el éxito del inicio de sesión para profesor
    await waitFor(() => {
      fireEvent.click(screen.getByText('Página de inicio de sesión'));
      expect(screen.getByText('Panel de profesor')).toBeInTheDocument();
    });

    // Simula el éxito del inicio de sesión para administrador
    await waitFor(() => {
      fireEvent.click(screen.getByText('Página de inicio de sesión'));
      expect(screen.getByText('Panel de administrador')).toBeInTheDocument();
    });
  });

  test('las rutas protegidas redirigen a la página de inicio de sesión si no está autenticado', () => {
    render(
      <Router>
        <AppWrapper />
      </Router>
    );

    // Intenta acceder a rutas protegidas
    fireEvent.click(screen.getByText('Panel de administrador'));
    expect(screen.getByText('Página de inicio de sesión')).toBeInTheDocument();

    fireEvent.click(screen.getByText('Panel de estudiante'));
    expect(screen.getByText('Página de inicio de sesión')).toBeInTheDocument();

    fireEvent.click(screen.getByText('Panel de profesor'));
    expect(screen.getByText('Página de inicio de sesión')).toBeInTheDocument();
  });
});
