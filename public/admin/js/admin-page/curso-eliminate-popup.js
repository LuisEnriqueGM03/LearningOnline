let cursoAEliminar = null;

function openDeletePopup(id) {
    cursoAEliminar = id;
    document.querySelector('.eliminate-popup').style.display = 'block';
}

function closeDeletePopup() {
    document.querySelector('.eliminate-popup').style.display = 'none';
    cursoAEliminar = null; // Resetear el ID del curso a eliminar
}

async function confirmDeleteCurso() {
    if (cursoAEliminar) {
        try {
            const response = await fetch(`http://localhost:4000/curso/${cursoAEliminar}`, {
                method: 'DELETE',
            });
            if (response.ok) {
                fetchCursos();
                closeDeletePopup();
            } else {
                console.error('Error al eliminar el curso');
            }
        } catch (error) {
            console.error('Error al eliminar el curso:', error);
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    // Manejadores de eventos para el popup
    document.querySelector('.eliminate-popup .delete').addEventListener('click', confirmDeleteCurso);
    document.querySelector('.eliminate-popup .cancel').addEventListener('click', closeDeletePopup);
});
