document.addEventListener('DOMContentLoaded', () => {
    document.querySelector('.search-btn').addEventListener('click', searchCategorias);
    document.querySelector('.search-input').addEventListener('keyup', function(event) {
        if (event.key === 'Enter') {
            searchCategorias();
        }
    });
    fetchCategorias();
});

async function fetchCategorias() {
    try {
        const response = await fetch('http://localhost:4000/categoria/');
        const categorias = await response.json();
        renderCategorias(categorias);
    } catch (error) {
        console.error('Error al obtener las categorías:', error);
    }
}

async function searchCategorias() {
    const searchTerm = document.querySelector('.search-input').value.toLowerCase();
    try {
        const response = await fetch('http://localhost:4000/categoria/');
        const categorias = await response.json();
        const filteredCategorias = categorias.filter(categoria => categoria.nombre.toLowerCase().includes(searchTerm));
        renderCategorias(filteredCategorias);
    } catch (error) {
        console.error('Error al buscar las categorías:', error);
    }
}

function renderCategorias(categorias) {
    const categoriesContainer = document.querySelector('.my-course-cards');
    categoriesContainer.innerHTML = '';
    categorias.forEach(categoria => {
        const categoryCard = document.createElement('div');
        categoryCard.classList.add('my-course-card');
        let base64Image = '';
        if (categoria.imagen) {
            base64Image = btoa(String.fromCharCode(...new Uint8Array(categoria.imagen.data)));
        }

        categoryCard.innerHTML = `
            <a>
                <img src="data:image/png;base64,${categoria.imagen}" alt="${categoria.nombre}">
                <div class="card-item" id="text-category">${categoria.nombre}</div>
            </a>
            <div class="card-item-button">
                <button class="option-btn edit" onclick="editCategoria(${categoria.id})"><i class="fas fa-edit"></i> Editar</button>
                <button class="option-btn delete" onclick="eliminateCategoria(${categoria.id})"><i class="fas fa-trash"></i> Eliminar</button>
            </div>
        `;
        categoriesContainer.appendChild(categoryCard);
    });
}

function eliminateCategoria(id) {
    openPopup(id);
}
function editCategoria(id) {
    openEditPopup(id);
}
