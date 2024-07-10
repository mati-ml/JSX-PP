import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import 'bootstrap/dist/css/bootstrap.min.css';
import backgroundImage from '../pages/PENANOLEN_Universidad-Adolfo-Ibanez_2-1035x690-1-1035x687.jpg';
import NavbarAdmin from './navbaradmin';
const Dashboard = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await fetch('http://48.216.215.72:8000/api2/pasos/');
            if (!response.ok) {
                throw new Error('Error al obtener los datos');
            }
            const data = await response.json();
            setData(data);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <>
       <nav> <NavbarAdmin></NavbarAdmin></nav> 
        <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
            <div className="card mt-4 p-4" style={{ maxWidth: '800px', width: '100%' }}>
                <h2 className="text-center mb-4">Gráfico de usuarios por paso</h2>
                <div className="chart-container" style={{ height: 400 }}>
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={data}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="step" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="total_users" fill="#009846" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
        <style>
        {`
          body {
            background-image: url(${backgroundImage});
            background-size: cover;
            background-position: center;
            background-repeat: no-repeat;
            min-height: 100vh;
            margin: 0;
            padding: 0;
          }
        `}
      </style>
      </>
    );
};

export default Dashboard;





