async function marcarLeccionComoVisto(leccionId) {
    try {
        const user = JSON.parse(localStorage.getItem('user'));
        const userId = user.id;

        const response = await fetch(`http://localhost:4000/progresion/usuario/${userId}/leccion/${leccionId}`);
        if (!response.ok) {
            throw new Error('Error al obtener la progresión');
        }
        const progresion = await response.json();

        if (progresion && progresion.estado !== 'Visto') {
            await fetch(`http://localhost:4000/progresion/${progresion.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    Usuario_id: userId,
                    Leccion_id: leccionId,
                    estado: 'Visto'
                })
            });
        }
    } catch (error) {
        console.error('Error al marcar la lección como vista:', error);
    }
}

// Hacer que la función esté disponible globalmente
window.marcarLeccionComoVisto = marcarLeccionComoVisto;
