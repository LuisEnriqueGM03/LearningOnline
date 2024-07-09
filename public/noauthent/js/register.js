document.getElementById('register-form').addEventListener('submit', async function(event) {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const name = document.getElementById('name').value;
    const lastname = document.getElementById('lastname').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    const errorElement = document.getElementById('error');
    errorElement.textContent = '';

    if (!username || !name || !lastname || !email || !password) {
        let missingFields = [];
        if (!username) missingFields.push('Usuario');
        if (!name) missingFields.push('Nombre');
        if (!lastname) missingFields.push('Apellido');
        if (!email) missingFields.push('Email');
        if (!password) missingFields.push('Contraseña');

        errorElement.textContent = 'Falta completar los siguientes campos: ' + missingFields.join(', ');
        return;
    }

    if (username.length < 6) {
        errorElement.textContent = 'El nombre de usuario debe tener al menos 6 caracteres.';
        return;
    }

    if (password.length < 8) {
        errorElement.textContent = 'La contraseña debe tener al menos 8 caracteres.';
        return;
    }

    const data = {
        username: username,
        nombre: name,
        apellido: lastname,
        correo: email,
        contraseña: password,
        tipoUsuario: 'Estudiante'
    };

    try {
        const response = await fetch('http://localhost:4000/usuario/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        if (response.ok) {
            const result = await response.json();
            window.location.href = 'login.html';
        } else {
            const error = await response.json();
            if (error.error) {
                errorElement.textContent = error.error;
            } else {
                errorElement.textContent = 'Error al registrar usuario';
            }
        }
    } catch (error) {
        console.error('Error:', error);
        errorElement.textContent = 'Error al registrar usuario';
    }
});