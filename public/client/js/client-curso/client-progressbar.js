async function cargarProgreso(userId, courseId) {
    try {
        const response = await fetch(`http://localhost:4000/progresion/usuario/${userId}/curso/${courseId}`);
        if (!response.ok) {
            throw new Error('Error al obtener el progreso del curso');
        }
        const progresiones = await response.json();

        const totalLecciones = progresiones.length;
        const leccionesVistas = progresiones.filter(progresion => progresion.estado === 'Visto').length;

        const progreso = (leccionesVistas / totalLecciones) * 100;

        actualizarBarraDeProgreso(progreso);
    } catch (error) {
        console.error('Error al cargar el progreso del curso:', error);
    }
}

function actualizarBarraDeProgreso(progreso) {
    const progressBar = document.querySelector('.footer-bar progress');
    const progressText = document.querySelector('.footer-bar .progress-text');

    progressBar.value = progreso;
    progressText.textContent = `${Math.round(progreso)}%`;
}

// Hacer que la función esté disponible globalmente
window.cargarProgreso = cargarProgreso;
