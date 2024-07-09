document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('search-btn').addEventListener('click', searchCursos);
    document.getElementById('search-input').addEventListener('keyup', function(event) {
        if (event.key === 'Enter') {
            searchCursos();
        }
    });

    fetchCursos();
});

async function fetchCursos() {
    try {
        const response = await fetch('http://localhost:4000/curso/curso-categoria/');
        const cursos = await response.json();
        renderCursos(cursos);
    } catch (error) {
        console.error('Error al obtener los cursos:', error);
    }
}

async function searchCursos() {
    const searchTerm = document.getElementById('search-input').value.toLowerCase();
    try {
        const response = await fetch('http://localhost:4000/curso/curso-categoria/');
        const cursos = await response.json();
        const filteredCursos = cursos.filter(curso => curso.nombrecurso.toLowerCase().includes(searchTerm));
        renderCursos(filteredCursos);
    } catch (error) {
        console.error('Error al buscar los cursos:', error);
    }
}

function renderCursos(cursos) {
    const coursesContainer = document.querySelector('.my-course-cards');
    coursesContainer.innerHTML = '';
    cursos.forEach(curso => {
        const courseCard = document.createElement('div');
        courseCard.classList.add('my-course-card');

        courseCard.innerHTML = `
            <a>
                <div class="card-item" id="text-category">${curso.nombrecategoria}</div>
                <div class="card-item" id="text-course">${curso.nombrecurso}</div>
            </a>
            <div class="card-item-button">
                <button class="option-btn edit" onclick="editCurso(${curso.id})"><i class="fas fa-edit"></i> Editar</button>
                <button class="option-btn delete" onclick="eliminateCurso(${curso.id})"><i class="fas fa-trash"></i> Eliminar</button>
            </div>
        `;
        coursesContainer.appendChild(courseCard);
    });
}
function eliminateCurso(id) {
    openDeletePopup(id);
}

function editCurso(id) {
    window.location.href = `admin-course.html?id=${id}`;
}
