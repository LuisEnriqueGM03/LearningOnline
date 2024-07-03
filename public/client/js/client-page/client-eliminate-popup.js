document.addEventListener('DOMContentLoaded', () => {
    const popup = document.querySelector('.eliminate-popup');
    const cancelBtn = document.querySelector('.eliminate-popup .cancel');
    const deleteBtn = document.querySelector('.eliminate-popup .delete');
    let courseIdToDelete = null;
    let realCourseId = null;

    cancelBtn.addEventListener('click', () => {
        popup.style.display = 'none';
        courseIdToDelete = null;
        realCourseId = null;
    });

    deleteBtn.addEventListener('click', async () => {
        if (courseIdToDelete && realCourseId) {
            try {
                const user = JSON.parse(localStorage.getItem('user'));
                if (!user) {
                    console.error('No user found in localStorage');
                    return;
                }
                const userId = user.id;

                await window.eliminarProgress(userId, realCourseId); // Usar el verdadero ID del curso
                const response = await fetch(`http://localhost:4000/inscripcion/${courseIdToDelete}`, {
                    method: 'DELETE'
                });
                if (response.ok) {
                    popup.style.display = 'none';
                    courseIdToDelete = null;
                    realCourseId = null;

                    window.location.reload();
                } else {
                    console.error('Failed to delete the course');
                }
            } catch (error) {
                console.error('Error deleting the course:', error);
            }
        }
    });

    window.showDeletePopup = (inscripcionId, courseId) => {
        courseIdToDelete = inscripcionId;
        realCourseId = courseId;
        popup.style.display = 'block';
    };
});
