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
            alert('Login exitoso');
            localStorage.setItem('user', JSON.stringify(result));

            if (result.tipoUsuario === 'Administrador') {
                window.location.href = `../../admin/pages/admin-page.html`;
            } else if (result.tipoUsuario === 'Estudiante') {
                window.location.href = `../pages/client-page.html`;
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


// Ejemplo de uso
document.addEventListener('DOMContentLoaded', function() {
    const currentUser = getCurrentUser();

    if (!currentUser) {
        // Redirigir a la página de inicio de sesión si no hay un usuario autenticado
        window.location.href = `../pages/login.html`;
    } else {
        console.log('Usuario actual:', currentUser);
        // Redirección basada en el tipo de usuario
        if (currentUser.tipoUsuario === 'Administrador') {
            window.location.href = `../../admin/pages/admin-page.html`;
        } else if (currentUser.tipoUsuario === 'Estudiante') {
            window.location.href = `../pages/client-page.html`;
        } else {
            console.log('Tipo de usuario desconocido');
        }
    }
});
