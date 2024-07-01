// client-eliminate-popup.js

document.addEventListener('DOMContentLoaded', () => {
    const popup = document.querySelector('.eliminate-popup');
    const cancelBtn = document.querySelector('.eliminate-popup .cancel');
    const deleteBtn = document.querySelector('.eliminate-popup .delete');
    let courseIdToDelete = null;

    cancelBtn.addEventListener('click', () => {
        popup.style.display = 'none';
        courseIdToDelete = null;
    });

    deleteBtn.addEventListener('click', async () => {
        if (courseIdToDelete) {
            try {
                const response = await fetch(`http://localhost:4000/inscripcion/${courseIdToDelete}`, {
                    method: 'DELETE'
                });
                if (response.ok) {
                    popup.style.display = 'none';
                    courseIdToDelete = null;
                    window.location.reload(); // Reinicia la página
                } else {
                    console.error('Failed to delete the course');
                }
            } catch (error) {
                console.error('Error deleting the course:', error);
            }
        }
    });

    window.showDeletePopup = (courseId) => {
        courseIdToDelete = courseId;
        popup.style.display = 'block';
    };
});
