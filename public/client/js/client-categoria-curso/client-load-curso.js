// client-categoria-curso.js

document.addEventListener('DOMContentLoaded', () => {
    const categoriaId = getIdFromUrl();
    console.log('Categoria ID:', categoriaId); // Depuración
    if (categoriaId) {
        fetchCursosPorCategoria(categoriaId);
    }

    const searchForm = document.querySelector('form');
    searchForm.addEventListener('submit', handleSearch);
});

function getIdFromUrl() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('id');
}

async function fetchCursosPorCategoria(categoriaId) {
    try {
        const response = await fetch(`http://localhost:4000/curso/categoria/${categoriaId}`);
        const data = await response.json();
        console.log('Cursos obtenidos:', data); // Depuración
        if (data.error) {
            displayError(data.error, 'categoria');
        } else {
            displayCursos(data, 'categoria');
        }
    } catch (error) {
        console.error('Error al obtener los cursos:', error);
        displayError('Error al obtener los cursos.', 'categoria');
    }
}

async function handleSearch(event) {
    event.preventDefault();
    const searchTerm = document.getElementById('search').value.toLowerCase();
    try {
        const response = await fetch('http://localhost:4000/curso/');
        const cursos = await response.json();
        const filteredCursos = cursos.filter(curso => curso.nombrecurso.toLowerCase().includes(searchTerm));
        console.log('Cursos obtenidos por búsqueda:', filteredCursos); // Depuración
        if (filteredCursos.length === 0) {
            displayError('No se encontraron cursos.', 'search');
        } else {
            displayCursos(filteredCursos, 'search');
        }
    } catch (error) {
        console.error('Error al buscar los cursos:', error);
        displayError('Error al buscar los cursos.', 'search');
    }
}

function displayError(message, context) {
    const courseCardsContainer = document.querySelector('.course-cards');
    let errorMessage = '';

    if (context === 'categoria') {
        errorMessage = message === 'Error al obtener los cursos.' ? 'Error al obtener los cursos.' : 'No se encontraron cursos para esta categoría.';
    } else if (context === 'search') {
        errorMessage = message === 'Error al buscar los cursos.' ? 'Error al buscar los cursos.' : 'El curso que está buscando no está disponible o no existe.';
    }

    courseCardsContainer.innerHTML = `<p>${errorMessage}</p>`; // Mensaje de error
}

function displayCursos(cursos, context) {
    const courseCardsContainer = document.querySelector('.course-cards');
    courseCardsContainer.innerHTML = ''; // Limpiar el contenedor

    if (!cursos || cursos.length === 0) {
        let noCoursesMessage = '';
        if (context === 'categoria') {
            noCoursesMessage = 'No se encontraron cursos para esta categoría.';
        } else if (context === 'search') {
            noCoursesMessage = 'El curso que está buscando no está disponible o no existe.';
        }
        courseCardsContainer.innerHTML = `<p>${noCoursesMessage}</p>`; // Mensaje si no hay cursos
        return;
    }

    cursos.forEach(curso => {
        console.log('Curso:', curso); // Depuración de cada curso
        const cursoCard = document.createElement('div');

        cursoCard.innerHTML = `
            <a href="client-curso.html?id=${curso.id}" class="course-link">
            <div class="course-card carousel-item">
                <img src="data:image/png;base64,${curso.imagencurso}" alt="Curso de ${curso.nombrecurso}"/>
                <div class="course-text">
                    <h3>${curso.nombrecurso}</h3>
                </div>
            </div>
        </a>
        `;
        courseCardsContainer.appendChild(cursoCard);
    });
}
