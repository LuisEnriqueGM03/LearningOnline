document.getElementById('btn-add-curso').addEventListener('click', function() {
    document.querySelector('.curso-add-popup').style.display = 'block';
    fetchCategorias();
});

var addCursoButton = document.querySelector('.curso-add-form .agregar-btn');
var cancelCursoButton = document.querySelector('.curso-add-form .cancelar-btn');

cancelCursoButton.addEventListener('click', closeCursoPopup);

function closeCursoPopup(event) {
    if (event) {
        event.preventDefault();
    }
    document.querySelector('.curso-add-popup').style.display = 'none';
}

async function fetchCategorias() {
    try {
        const response = await fetch('http://localhost:4000/categoria/');
        const categorias = await response.json();
        const select = document.getElementById('curso-category');
        select.innerHTML = ''; // Limpiar opciones previas
        categorias.forEach(categoria => {
            const option = document.createElement('option');
            option.value = categoria.id;
            option.textContent = categoria.nombre;
            select.appendChild(option);
        });
    } catch (error) {
        console.error('Error al obtener las categorías:', error);
    }
}

document.getElementById('curso-form').addEventListener('submit', async function(event) {
    event.preventDefault()

    const nombreCurso = document.getElementById('curso-name').value;
    const descripcion = document.getElementById('curso-description').value;
    const categoriaId = document.getElementById('curso-category').value;

    const user = JSON.parse(localStorage.getItem('user'));
    if (!user) {
        console.error('No user found in localStorage');
        return;
    }
    const usuarioId = user.id;

    const imagenCurso = await toBase64(document.getElementById('curso-image').files[0]);

    try {
        const response = await fetch('http://localhost:4000/curso/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                nombreCurso,
                descripcion,
                imagenCurso,
                Categoria_id: categoriaId,
                Usuario_id: usuarioId
            })
        });
        if (response.ok) {
            fetchCursos();
            closeCursoPopup();
        } else {
            console.error('Error al agregar el curso');
        }
    } catch (error) {
        console.error('Error al agregar el curso:', error);
    }
});

function toBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result.split(',')[1]);
        reader.onerror = error => reject(error);
    });
}
