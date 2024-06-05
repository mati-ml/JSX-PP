async function enviarDatosFetch(urlAPI, email, password) {
    try {
      const respuesta = await fetch(urlAPI, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: email,
          password: password
        })
      });
      const datos = await respuesta.json();
      console.log("Datos enviados correctamente:", datos);
    } catch (error) {
      console.error("Error al enviar datos:", error);
    }
  }
  
  // Ejemplo de uso
  enviarDatosFetch('http://127.0.0.1:8000/api/login/', 'lucho@gmail.com', '1234');