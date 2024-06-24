import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const Dashboard = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await fetch('http://localhost:8000/api2/pasos/');
            if (!response.ok) {
                throw new Error('Error al obtener los datos');
            }
            const data = await response.json();
            setData(data);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const containerStyle = {
        backgroundColor: 'white',
        padding: '20px',
        borderRadius: '10px',
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
        maxWidth: '800px',
        margin: '20px auto',
        textAlign: 'center',
    };

    const chartContainerStyle = {
        width: '100%',
        height: '400px',
    };

    return (
        <div style={containerStyle}>
            <h2>Gráfico de usuarios por paso</h2>
            <div style={chartContainerStyle}>
                <ResponsiveContainer>
                    <LineChart data={data}>
                        <CartesianGrid stroke="#009846" />
                        <XAxis dataKey="step" interval={2} />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="total_users" stroke="#009846" activeDot={{ r: 1 }} />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default Dashboard;



