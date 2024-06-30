document.addEventListener('DOMContentLoaded', function() {
    // Mostrar el popup de agregar lección
    document.getElementById('btn-add').addEventListener('click', function() {
        document.querySelector('.leccion-add-popup').style.display = 'block';
    });

    // Seleccionar los botones de agregar y cancelar
    const addButton = document.querySelector('.form-buttons .agregar-btn');
    const cancelButton = document.querySelector('.form-buttons .cancelar-btn');

    // Agregar eventos de clic para cerrar el popup
    addButton.addEventListener('click', addLesson);
    cancelButton.addEventListener('click', closePopup);

    function closePopup(event) {
        if (event) {
            event.preventDefault(); // Prevenir la acción por defecto del formulario
        }
        document.querySelector('.leccion-add-popup').style.display = 'none';
    }

    async function addLesson(event) {
        event.preventDefault();

        const nombre = document.getElementById('leccion-name').value;
        const descripcion = document.getElementById('leccion-descripcion').value;
        const tipoDeContenido = document.getElementById('type-content').value;
        const contenido = document.getElementById('leccion-content').value;
        const orden = document.getElementById('leccion-orden').value;
        const courseId = new URLSearchParams(window.location.search).get('id'); // Asumiendo que el ID del curso está en la URL

        try {
            const response = await fetch(`http://localhost:4000/leccion`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ nombre, descripcion, tipoDeContenido, contenido, orden, Curso_id: courseId })
            });
            if (response.ok) {
                closePopup(); // Aquí llamamos a closePopup sin pasar event
                window.displayLessons(); // Refresca la lista de lecciones
            } else {
                console.error('Error al agregar la lección');
            }
        } catch (error) {
            console.error('Error al agregar la lección:', error);
        }
    }
});
