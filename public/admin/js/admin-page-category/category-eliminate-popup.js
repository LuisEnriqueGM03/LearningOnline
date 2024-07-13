let categoriaAEliminar = null;

function openPopup(id) {
    categoriaAEliminar = id;
    document.querySelector('.eliminate-popup').style.display = 'block';
}

function closePopup() {
    document.querySelector('.eliminate-popup').style.display = 'none';
    categoriaAEliminar = null;
}

async function confirmDeleteCategoria() {
    if (categoriaAEliminar) {
        try {
            const response = await fetch(`http://localhost:4000/categoria/${categoriaAEliminar}`, {
                method: 'DELETE',
            });
            if (response.ok) {
                fetchCategorias();
                closePopup();
            } else {
                const errorData = await response.json();
                console.error('Error al eliminar la categoría:', errorData.error);
                alert(errorData.error);
            }
        } catch (error) {
            console.error('Error al eliminar la categoría:', error);
            alert('Error al eliminar la categoría');
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    document.querySelector('.eliminate-popup .delete').addEventListener('click', confirmDeleteCategoria);
    document.querySelector('.eliminate-popup .cancel').addEventListener('click', closePopup);
});
