import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
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
    mockedLogin.mockImplementation(() => <div>Login Page</div>);
    mockedRegister.mockImplementation(() => <div>Register Page</div>);
    mockedLoginAdmin.mockImplementation(() => <div>Login Admin Page</div>);
    mockedAdminDashboard.mockImplementation(() => <div>Admin Dashboard</div>);
    mockedStudentDashboard.mockImplementation(() => <div>Student Dashboard</div>);
    mockedTeacherDashboard.mockImplementation(() => <div>Teacher Dashboard</div>);
    mockedInscripcion.mockImplementation(() => <div>Inscripcion Page</div>);
    mockedReunion.mockImplementation(() => <div>Reunion Page</div>);
    mockedEstado.mockImplementation(() => <div>Estado Page</div>);
  });

  test('renders login page by default', () => {
    render(
      <Router>
        <AppWrapper />
      </Router>
    );

    expect(screen.getByText('Login Page')).toBeInTheDocument();
  });

  test('redirects to appropriate dashboard after login', async () => {
    render(
      <Router>
        <AppWrapper />
      </Router>
    );

    fireEvent.click(screen.getByText('Login Page'));

    // Simulate login success for student
    await waitFor(() => {
      fireEvent.click(screen.getByText('Login Page'));
      expect(screen.getByText('Student Dashboard')).toBeInTheDocument();
    });

    // Simulate login success for teacher
    await waitFor(() => {
      fireEvent.click(screen.getByText('Login Page'));
      expect(screen.getByText('Teacher Dashboard')).toBeInTheDocument();
    });

    // Simulate login success for admin
    await waitFor(() => {
      fireEvent.click(screen.getByText('Login Page'));
      expect(screen.getByText('Admin Dashboard')).toBeInTheDocument();
    });
  });

  test('protected routes redirect to login if not authenticated', () => {
    render(
      <Router>
        <AppWrapper />
      </Router>
    );

    // Try to access protected routes
    fireEvent.click(screen.getByText('Admin Dashboard'));
    expect(screen.getByText('Login Page')).toBeInTheDocument();

    fireEvent.click(screen.getByText('Student Dashboard'));
    expect(screen.getByText('Login Page')).toBeInTheDocument();

    fireEvent.click(screen.getByText('Teacher Dashboard'));
    expect(screen.getByText('Login Page')).toBeInTheDocument();
  });
});
