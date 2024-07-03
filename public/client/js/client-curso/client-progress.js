async function crearProgreso(userId, courseId) {
    try {
        const response = await fetch(`http://localhost:4000/leccion/curso/${courseId}`);
        if (!response.ok) {
            throw new Error('Error al obtener las lecciones del curso');
        }
        const lecciones = await response.json();

        for (const leccion of lecciones) {
            await fetch(`http://localhost:4000/progresion`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    Usuario_id: userId,
                    Leccion_id: leccion.id,
                    estado: 'NoVisto'
                })
            });
        }
    } catch (error) {
        console.error('Error al crear el progreso:', error);
    }
}

async function eliminarProgreso(userId, courseId) {
    try {
        const response = await fetch(`http://localhost:4000/leccion/curso/${courseId}`);
        if (!response.ok) {
            throw new Error('Error al obtener las lecciones del curso');
        }
        const lecciones = await response.json();

        for (const leccion of lecciones) {
            const progresoResponse = await fetch(`http://localhost:4000/progresion/usuario/${userId}/leccion/${leccion.id}`);
            if (!progresoResponse.ok) {
                throw new Error('Error al obtener el progreso');
            }
            const progreso = await progresoResponse.json();
            if (progreso && progreso.id) {
                await fetch(`http://localhost:4000/progresion/${progreso.id}`, {
                    method: 'DELETE',
                });
            }
        }
    } catch (error) {
        console.error('Error al eliminar el progreso:', error);
    }
}
window.eliminarProgreso = eliminarProgreso;
window.crearProgreso = crearProgreso;
