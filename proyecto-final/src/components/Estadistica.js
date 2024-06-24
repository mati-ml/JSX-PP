import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const Dashboard = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await fetch('http://localhost:8000/api2/count_users_by_step/');
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
        <div style={{ backgroundColor: 'white', padding: '20px' }}>
            <h2>Gráfico de usuarios por paso</h2>
            <div style={{ width: '100%', height: '400px' }}>
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


