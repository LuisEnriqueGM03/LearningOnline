let courseIdToDelete = null;

document.addEventListener('DOMContentLoaded', function() {
    const params = new URLSearchParams(window.location.search);
    courseIdToDelete = params.get('id');

    if (courseIdToDelete) {
        document.getElementById('btn-eliminate').addEventListener('click', function () {
            document.querySelector('.eliminate-popup').style.display = 'block';
        });
    }
});

const deleteButton = document.querySelector('.eliminate-popup-buttons .delete');
const cancelButton = document.querySelector('.eliminate-popup-buttons .cancel');

deleteButton.addEventListener('click', async function (event) {
    event.preventDefault();
    await deleteCourse();
});
cancelButton.addEventListener('click', function(event) {
    event.preventDefault();
    closePopup();
});

function closePopup() {
    document.querySelector('.eliminate-popup').style.display = 'none';
}

async function deleteCourse() {
    if (!courseIdToDelete) return;

    try {
        const response = await fetch(`http://localhost:4000/curso/${courseIdToDelete}`, {
            method: 'DELETE'
        });
        if (response.ok) {
            closePopup();
            window.location.href = 'admin-page.html';
        } else {
            console.error('Error al eliminar el curso');
        }
    } catch (error) {
        console.error('Error al eliminar el curso:', error);
    }
}
