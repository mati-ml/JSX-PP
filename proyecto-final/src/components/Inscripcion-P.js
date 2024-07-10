import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

function Inscripcion() {
  const { t } = useTranslation();

  // Estados para almacenar los valores del formulario
  const [fecha_ini, setFecha_ini] = useState('');
  const [fecha_ter, setFecha_ter] = useState('');
  const [nombre_emp, setNombre_emp] = useState('');
  const [rut_emp, setRut_emp] = useState('');
  const [sup_email, setSup_email] = useState('');
  const [nombre_sup, setNombre_sup] = useState('');
  const [rut_sup, setRut_sup] = useState('');
  const [profesores, setProfesores] = useState([]);
  const [teacher, setTeacher] = useState('');

  // Cargar la lista de profesores al montar el componente
  useEffect(() => {
    const fetchProfesores = async () => {
      try {
        const response = await fetch('http://48.216.215.72:8000/api/teachers/');
        
        if (response.ok) {
          const data = await response.json();
          // Verificar si la respuesta tiene la clave 'teacher_names'
          if (data && data.teacher_names) {
            // Actualizar el estado con los nombres de los profesores obtenidos
            setProfesores(data.teacher_names);
          } else {
            console.error('Error: La respuesta de la API no tiene el formato esperado.');
          }
        } else {
          console.error('Error al obtener la lista de profesores.');
        }
      } catch (error) {
        console.error('Error al realizar la solicitud:', error);
      }
    };
  
    fetchProfesores();
  }, []);

  // Manejar el envío del formulario
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      // Obtener el user_id de la cookie (simulado aquí)
      const user_id = parseInt(document.cookie.replace(/(?:(?:^|.*;\s*)user_id\s*=\s*([^;]*).*$)|^.*$/, "$1"), 10);

      // Realizar la solicitud POST a la API
      const response = await fetch('http://48.216.215.72:8000/api2/inscripcion-pasantias/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user_id,
          fecha_ini,
          fecha_ter,
          nombre_emp,
          rut_emp,
          sup_email,
          nombre_sup,
          rut_sup,
          teacher,
          Estado: 'Pendiente'
        }),
      });

      if (response.ok) {
        alert(t('applicationSubmitted')); // Traduce el mensaje de éxito
      } else {
        alert(t('errorSubmittingApplication')); // Traduce el mensaje de error
      }
    } catch (error) {
      console.error('Error al enviar la solicitud:', error);
      alert(t('errorSendingRequest')); // Traduce el mensaje de error
    }
  };

  return(
  <><div className="d-flex align-items-center justify-content-center ">
    <form onSubmit={handleSubmit} className="p-4" style={{ backgroundColor: 'white', borderRadius: '10px', maxWidth: '600px', width: '100%' }}>
      <div >
    <label className="form-label">
    {t('startDate')}: {/* Traduce el texto de Fecha Inicial */}
    <input type="date" className="form-control" value={fecha_ini} onChange={(e) => setFecha_ini(e.target.value)} />
  </label>
  
  <label className="form-label ms-3">
    {t('endDate')}: {/* Traduce el texto de Fecha Final */}
    <input type="date" className="form-control" value={fecha_ter} onChange={(e) => setFecha_ter(e.target.value)} />
  </label>
  </div>
  <div className="mb-3 d-flex align-items-center">
  <div className="me-3">
    <label className="form-label">
      {t('companyName')}: {/* Traduce el texto de Nombre Empresa */}
      <input type="text" className="form-control" value={nombre_emp} onChange={(e) => setNombre_emp(e.target.value)} />
    </label>
  </div>
  
  <div>
    <label className="form-label">
      {t('companyRut')}: {/* Traduce el texto de Rut Empresa */}
      <input type="text" className="form-control" value={rut_emp} onChange={(e) => setRut_emp(e.target.value)} />
    </label>
  </div>
</div>
  
<div className="mb-3 d-flex align-items-center">
  <div className="me-3 flex-fill">
    <label className="form-label">
      {t('supervisorEmail')}: {/* Traduce el texto de Email Supervisor */}
      <input type="email" className="form-control" value={sup_email} onChange={(e) => setSup_email(e.target.value)} />
    </label>
  </div>
  
  <div className="me-3 flex-fill">
    <label className="form-label">
      {t('supervisorName')}: {/* Traduce el texto de Nombre Supervisor */}
      <input type="text" className="form-control" value={nombre_sup} onChange={(e) => setNombre_sup(e.target.value)} />
    </label>
  </div>
  
  <div className="flex-fill">
    <label className="form-label">
      {t('supervisorRut')}: {/* Traduce el texto de Rut Supervisor */}
      <input type="text" className="form-control" value={rut_sup} onChange={(e) => setRut_sup(e.target.value)} />
    </label>
  </div>
</div>
  
      <div className="mb-3">
        <label className="form-label">
          {t('selectTeacher')}: {/* Traduce el texto de Seleccionar Profesor */}
          <select
            className="form-select"
            value={teacher}
            onChange={(e) => setTeacher(e.target.value)}
            required
          >
            <option value="">{t('selectTeacherPlaceholder')}</option> {/* Traduce el texto de selección de profesor */}
            {profesores.map((prof, index) => (
              <option key={index} value={prof}>
                {prof}
              </option>
            ))}
          </select>
        </label>
      </div>
  
      <button type="submit" className="btn btn-primary">
        {t('submitApplication')}
      </button> {/* Traduce el texto de enviar la solicitud */}
    </form>
  </div>

  </>
);
}

export default Inscripcion;

