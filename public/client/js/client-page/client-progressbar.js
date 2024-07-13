async function cargarProgreso(userId, courseId) {
    try {
        const response = await fetch(`http://localhost:4000/progresion/usuario/${userId}/curso/${courseId}`);
        if (!response.ok) {
            throw new Error('Error al obtener el progreso del curso');
        }
        const progresiones = await response.json();

        const totalLecciones = progresiones.length;
        const leccionesVistas = progresiones.filter(progresion => progresion.estado === 'Visto').length;

        const progreso = totalLecciones === 0 ? 0 : (leccionesVistas / totalLecciones) * 100;

        return progreso;
    } catch (error) {
        console.error('Error al cargar el progreso del curso:', error);
        return 0;
    }
}

function actualizarBarraDeProgreso(progreso) {
    const progressBar = document.querySelector('.footer-bar progress');
    const progressText = document.querySelector('.footer-bar .progress-text');

    progressBar.value = progreso;
    progressText.textContent = `${Math.round(progreso)}%`;
}

window.cargarProgreso = cargarProgreso;
window.actualizarBarraDeProgreso = actualizarBarraDeProgreso;
