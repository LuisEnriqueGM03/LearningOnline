let categoriaAEditar = null;

function openEditPopup(id) {
    categoriaAEditar = id;
    document.querySelector('.category-edit-popup').style.display = 'block';
    loadCategoriaData(id); // Cargar datos de la categoría para editar
}

function closeEditPopup(event) {
    if (event) {
        event.preventDefault(); // Prevenir la acción por defecto del formulario si es necesario
    }
    document.querySelector('.category-edit-popup').style.display = 'none';
    categoriaAEditar = null; // Resetear el ID de la categoría a editar
}

async function loadCategoriaData(id) {
    try {
        const response = await fetch(`http://localhost:4000/categoria/${id}`);
        if (response.ok) {
            const categoria = await response.json();
            document.getElementById('category-edit-name').value = categoria.nombre;
            document.getElementById('category-edit-description').value = categoria.descripcion;
            // Si tienes una vista previa de la imagen, puedes cargarla aquí
        } else {
            console.error('Error al obtener los datos de la categoría');
        }
    } catch (error) {
        console.error('Error al obtener los datos de la categoría:', error);
    }
}

document.getElementById('category-edit-form').addEventListener('submit', async function(event) {
    event.preventDefault(); // Prevenir el envío del formulario

    const nombreCategoria = document.getElementById('category-edit-name').value;
    const descripcion = document.getElementById('category-edit-description').value;
    const imagenInput = document.getElementById('category-edit-image');
    let imagen = null;

    if (imagenInput.files.length > 0) {
        imagen = await toBase64(imagenInput.files[0]);
    }

    try {
        const response = await fetch(`http://localhost:4000/categoria/${categoriaAEditar}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                nombre: nombreCategoria,
                descripcion,
                imagen
            })
        });
        if (response.ok) {
            fetchCategorias(); // Actualizar la lista de categorías
            closeEditPopup();
        } else {
            console.error('Error al editar la categoría');
        }
    } catch (error) {
        console.error('Error al editar la categoría:', error);
    }
});

// Convertir archivo a base64
function toBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result.split(',')[1]);
        reader.onerror = error => reject(error);
    });
}

document.querySelector('.category-edit-form .cancelar-btn').addEventListener('click', closeEditPopup);
