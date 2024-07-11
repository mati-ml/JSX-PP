import React, { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import NavbarEst from './navbarest';
import backgroundImage from '../pages/PENANOLEN_Universidad-Adolfo-Ibanez_2-1035x690-1-1035x687.jpg';
const Rubrica = () => {
    const [pdfData, setPdfData] = useState(null);

    useEffect(() => {
        const fetchPdf = async () => {
            try {
                const response = await fetch('/Rubrica.pdf'); // Ruta relativa al archivo PDF en la carpeta 'public'
                const pdfBlob = await response.blob();
                setPdfData(pdfBlob);
            } catch (error) {
                console.error('Error fetching PDF:', error);
            }
        };
        fetchPdf();
    }, []);

    return (
        <>
        <NavbarEst></NavbarEst>
        <Container className="d-flex justify-content-center align-items-center min-vh-100">
            {pdfData && (
                <embed
                    src={URL.createObjectURL(pdfData)}
                    type="application/pdf"
                    style={{ width: '50%', height: '80vh' }} // Ancho y alto responsivos
                />
            )}
        </Container>
    {/* Estilo de fondo para cubrir toda la página */}
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
export default Rubrica;

