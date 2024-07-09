document.getElementById('login-form').addEventListener('submit', async function(event) {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    const errorElement = document.getElementById('error');
    errorElement.textContent = ''; // Limpiar mensaje de error previo

    // Verificar campos vacíos
    if (!username || !password) {
        let missingFields = [];
        if (!username) missingFields.push('Usuario');
        if (!password) missingFields.push('Contraseña');

        errorElement.textContent = 'Falta completar los siguientes campos: ' + missingFields.join(', ');
        return;
    }

    const data = {
        username: username,
        contraseña: password
    };

    try {
        const response = await fetch('http://localhost:4000/usuario/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        if (response.ok) {
            const result = await response.json();
            localStorage.setItem('user', JSON.stringify(result));

            if (result.tipoUsuario === 'Administrador') {
                window.location.href = '../../admin/pages/admin-page.html';
            } else if (result.tipoUsuario === 'Estudiante') {
                window.location.href = '../../client/pages/client-page.html';
            } else {
                errorElement.textContent = 'Tipo de usuario desconocido';
            }
        } else {
            const error = await response.json();
            errorElement.textContent = error.message || 'Error al iniciar sesión o tu usuario no existe';
        }
    } catch (error) {
        console.error('Error:', error);
        errorElement.textContent = 'Error al iniciar sesión';
    }
});