document.addEventListener('DOMContentLoaded', function() {
    let courseId = new URLSearchParams(window.location.search).get('id');

    document.getElementById('btn-edit-description').addEventListener('click', async function() {
        document.querySelector('.curso-description-popup').style.display = 'block';
        await loadCourseDescription(); // Cargar la descripción del curso al abrir el popup
    });

    const saveDescriptionButton = document.querySelector('.curso-description-form .agregar-btn');
    const cancelDescriptionButton = document.querySelector('.curso-description-form .cancelar-btn');

    saveDescriptionButton.addEventListener('click', saveCourseDescription);
    cancelDescriptionButton.addEventListener('click', closePopup);

    function closePopup(event) {
        if (event) {
            event.preventDefault();
        }
        document.querySelector('.curso-description-popup').style.display = 'none';
    }

    async function loadCourseDescription() {
        try {
            const response = await fetch(`http://localhost:4000/curso/${courseId}`);
            if (response.ok) {
                const course = await response.json();
                document.getElementById('curso-description-popup').value = course.descripcion;
            } else {
                console.error('Error al cargar la descripción del curso');
            }
        } catch (error) {
            console.error('Error al cargar la descripción del curso:', error);
        }
    }

    async function saveCourseDescription(event) {
        event.preventDefault();

        const descripcion = document.getElementById('curso-description-popup').value;

        try {
            const response = await fetch(`http://localhost:4000/curso/descripcion/${courseId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ descripcion })
            });
            if (response.ok) {
                closePopup();
                window.location.reload();
            } else {
                console.error('Error al actualizar la descripción del curso');
            }
        } catch (error) {
            console.error('Error al actualizar la descripción del curso:', error);
        }
    }
});
