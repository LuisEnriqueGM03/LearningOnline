document.addEventListener('DOMContentLoaded', function() {
    let courseId = new URLSearchParams(window.location.search).get('id');

    document.getElementById('btn-edit-name').addEventListener('click', async function() {
        document.querySelector('.curso-name-popup').style.display = 'block';
        await loadCourseName(); // Cargar el nombre del curso al abrir el popup
    });

    const saveNameButton = document.querySelector('.curso-name-form .agregar-btn');
    const cancelNameButton = document.querySelector('.curso-name-form .cancelar-btn');

    saveNameButton.addEventListener('click', saveCourseName);
    cancelNameButton.addEventListener('click', closePopup);

    function closePopup(event) {
        if (event) {
            event.preventDefault();
        }
        document.querySelector('.curso-name-popup').style.display = 'none';
    }

    async function loadCourseName() {
        try {
            const response = await fetch(`http://localhost:4000/curso/${courseId}`);
            if (response.ok) {
                const course = await response.json();
                document.getElementById('curso-name-popup').value = course.nombrecurso;
            } else {
                console.error('Error al cargar el nombre del curso');
            }
        } catch (error) {
            console.error('Error al cargar el nombre del curso:', error);
        }
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
                window.location.reload();
            } else {
                console.error('Error al actualizar el nombre del curso');
            }
        } catch (error) {
            console.error('Error al actualizar el nombre del curso:', error);
        }
    }
});
