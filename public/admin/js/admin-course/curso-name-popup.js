document.addEventListener('DOMContentLoaded', function() {
    let courseId = new URLSearchParams(window.location.search).get('id'); // Captura el ID del curso desde la URL

    // Mostrar el popup de editar nombre del curso
    document.getElementById('btn-edit-name').addEventListener('click', function() {
        document.querySelector('.curso-name-popup').style.display = 'block';
    });

    // Seleccionar los botones de guardar y cancelar
    const saveNameButton = document.querySelector('.curso-name-form .agregar-btn'); // Renombrado a saveNameButton
    const cancelNameButton = document.querySelector('.curso-name-form .cancelar-btn'); // Renombrado a cancelNameButton

    // Agregar eventos de clic para cerrar el popup
    saveNameButton.addEventListener('click', saveCourseName);
    cancelNameButton.addEventListener('click', closePopup);

    function closePopup(event) {
        if (event) {
            event.preventDefault(); // Prevenir la acción por defecto del formulario
        }
        document.querySelector('.curso-name-popup').style.display = 'none';
    }

    async function saveCourseName(event) {
        event.preventDefault();

        const nombreCurso = document.getElementById('curso-name-popup').value;

        try {
            const response = await fetch(`http://localhost:4000/curso/nombre/${courseId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ nombreCurso })
            });
            if (response.ok) {
                closePopup();
                window.location.reload(); // Refresca la página para mostrar el nuevo nombre
            } else {
                console.error('Error al actualizar el nombre del curso');
            }
        } catch (error) {
            console.error('Error al actualizar el nombre del curso:', error);
        }
    }
});
