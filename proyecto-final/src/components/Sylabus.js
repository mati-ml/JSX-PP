import React, { useState, useEffect } from 'react';

const Sylabus = () => {
    const [pdfData, setPdfData] = useState(null);

    useEffect(() => {
        const fetchPdf = async () => {
            try {
                const response = await fetch('/Syllabus.pdf'); // Ruta relativa al archivo PDF en la carpeta 'public'
                const pdfBlob = await response.blob();
                setPdfData(pdfBlob);
            } catch (error) {
                console.error('Error fetching PDF:', error);
            }
        };
        fetchPdf();
    }, []);

    return (
        <div>
            {pdfData && (
                <embed
                    src={URL.createObjectURL(pdfData)}
                    type="application/pdf"
                    width="1000px" // Ancho del visor de PDF, ajusta según tus necesidades
                    height="800px" // Alto del visor de PDF, ajusta según tus necesidades
                />
            )}
        </div>
    );
};

export default Sylabus;