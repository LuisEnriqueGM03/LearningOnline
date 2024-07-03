async function createProgressForUsers(courseId, lessonId) {
    try {
        const response = await fetch(`http://localhost:4000/inscripcion/curso/${courseId}/usuarios`);
        if (!response.ok) {
            throw new Error('Error al obtener los usuarios inscritos');
        }
        const usuarios = await response.json();

        for (const usuario of usuarios) {
            await fetch(`http://localhost:4000/progresion`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    Usuario_id: usuario.usuario_id,
                    Leccion_id: lessonId,
                    estado: 'NoVisto'
                })
            });
        }
    } catch (error) {
        console.error('Error al crear el progreso para los usuarios:', error);
    }
}
window.createProgressForUsers = createProgressForUsers;