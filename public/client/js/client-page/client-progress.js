async function eliminarProgress(userId, courseId) {
    try {
        const response = await fetch(`http://localhost:4000/progresion/usuario/${userId}/curso/${courseId}`);
        if (!response.ok) {
            throw new Error('Error al obtener el progreso del curso');
        }
        const progresiones = await response.json();

        for (const progresion of progresiones) {
            const deleteResponse = await fetch(`http://localhost:4000/progresion/${progresion.id}`, {
                method: 'DELETE'
            });
            if (!deleteResponse.ok) {
                throw new Error('Error al eliminar el progreso');
            }
        }
    } catch (error) {
        console.error('Error al eliminar el progreso:', error);
    }
}

window.eliminarProgress = eliminarProgress;
