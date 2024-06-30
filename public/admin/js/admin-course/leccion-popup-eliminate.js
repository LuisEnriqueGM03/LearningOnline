let lessonIdToDelete = null;

window.openDeletePopup = function(lessonId) {
    lessonIdToDelete = lessonId;
    document.querySelector('.leccion-popup').style.display = 'block';
};

// Seleccionar los botones de eliminar y cancelar
document.addEventListener('DOMContentLoaded', () => {
    const deleteLeccionButton = document.querySelector('.leccion-popup-buttons .delete');
    const cancelLeccionButton = document.querySelector('.leccion-popup-buttons .cancel');

    // Agregar eventos de clic para cerrar el popup
    deleteLeccionButton.addEventListener('click', deleteLesson);
    cancelLeccionButton.addEventListener('click', closeLeccionPopup);
});

function closeLeccionPopup() {
    document.querySelector('.leccion-popup').style.display = 'none';
    lessonIdToDelete = null;
}

async function deleteLesson() {
    if (!lessonIdToDelete) return;

    try {
        const response = await fetch(`http://localhost:4000/leccion/${lessonIdToDelete}`, {
            method: 'DELETE'
        });
        if (response.ok) {
            // Refrescar la lista de lecciones después de eliminar
            window.displayLessons();
            closeLeccionPopup();
        } else {
            console.error('Error al eliminar la lección');
        }
    } catch (error) {
        console.error('Error al eliminar la lección:', error);
    }
}
