document.addEventListener('DOMContentLoaded', () => {
    const subscribeButton = document.getElementById('subscribe-button');
    const user = JSON.parse(localStorage.getItem('user'));

    // Obtener el ID del curso de la URL
    const urlParams = new URLSearchParams(window.location.search);
    const courseId = urlParams.get('id');

    if (user && courseId) {
        checkInscripcion(user.id, courseId)
            .then(isInscrito => {
                if (isInscrito) {
                    subscribeButton.textContent = 'Desincribirse';
                    subscribeButton.addEventListener('click', (e) => {
                        e.preventDefault();
                        desinscribirUsuario(user.id, courseId);
                    });
                } else {
                    subscribeButton.textContent = 'Incribirse';
                    subscribeButton.addEventListener('click', (e) => {
                        e.preventDefault();
                        inscribirUsuario(user.id, courseId);
                    });
                }
            })
            .catch(error => console.error('Error al verificar la inscripción:', error));
    }
});

async function checkInscripcion(userId, courseId) {
    try {
        const response = await fetch(`http://localhost:4000/inscripcion/usuario/${userId}/curso/${courseId}`);
        if (!response.ok) {
            throw new Error('Error en la respuesta del servidor');
        }
        const data = await response.json();
        return data.inscrito;
    } catch (error) {
        console.error('Error al verificar la inscripción:', error);
        return false;
    }
}

async function desinscribirUsuario(userId, courseId) {
    try {
        const response = await fetch(`http://localhost:4000/inscripcion/usuario/${userId}/curso/${courseId}`, {
            method: 'DELETE',
        });
        if (!response.ok) {
            throw new Error('Error al desinscribir al usuario');
        }
        document.getElementById('subscribe-button').textContent = 'Incribirse';
        window.location.reload(); // Recargar la página
    } catch (error) {
        console.error('Error al desinscribir al usuario:', error);
        alert('Hubo un error al desinscribirte del curso');
    }
}

async function inscribirUsuario(userId, courseId) {
    try {
        const response = await fetch(`http://localhost:4000/inscripcion`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ Usuario_id: userId, Curso_id: courseId }),
        });
        if (!response.ok) {
            throw new Error('Error al inscribir al usuario');
        }
        document.getElementById('subscribe-button').textContent = 'Desincribirse';
        window.location.reload(); // Recargar la página
    } catch (error) {
        console.error('Error al inscribir al usuario:', error);
        alert('Hubo un error al inscribirte en el curso');
    }
}
