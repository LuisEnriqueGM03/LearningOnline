document.getElementById('register-form').addEventListener('submit', async function(event) {
    event.preventDefault(); // Evita que el formulario se envíe de la manera tradicional

    const username = document.getElementById('username').value;
    const name = document.getElementById('name').value;
    const lastname = document.getElementById('lastname').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    const data = {
        username: username,
        nombre: name,
        apellido: lastname,
        correo: email,
        contraseña: password,
        tipoUsuario: 'Estudiante'
    };

    try {
        const response = await fetch('http://localhost:4000/usuario/create', { // Asegúrate de cambiar la URL por la correcta
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        if (response.ok) {
            const result = await response.json();
            alert('Usuario registrado con éxito');


        } else {
            const error = await response.json();
            document.getElementById('error').textContent = error.message || 'Error al registrar usuario';
        }
    } catch (error) {
        console.error('Error:', error);
        document.getElementById('error').textContent = 'Error al registrar usuario';
    }
});
