document.getElementById('login-form').addEventListener('submit', async function(event) {
    event.preventDefault(); // Evita que el formulario se envíe de la manera tradicional

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    const data = {
        username: username,
        contraseña: password
    };

    try {
        const response = await fetch('http://localhost:4000/usuario/login', { // Asegúrate de cambiar la URL por la correcta
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
                document.getElementById('error').textContent = 'Tipo de usuario desconocido';
            }
        } else {
            const error = await response.json();
            document.getElementById('error').textContent = error.message || 'Error al iniciar sesión';
        }
    } catch (error) {
        console.error('Error:', error);
        document.getElementById('error').textContent = 'Error al iniciar sesión';
    }
});
