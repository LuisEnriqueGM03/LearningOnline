document.addEventListener('DOMContentLoaded', () => {
    const categoriaId = getIdFromUrl();
    console.log('Categoria ID:', categoriaId);
    if (categoriaId) {
        fetchCursosPorCategoria(categoriaId);
    }

    const searchForm = document.querySelector('form');
    if (searchForm) {
        searchForm.addEventListener('submit', handleSearch);
    }
});

function getIdFromUrl() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('id');
}

async function fetchCursosPorCategoria(categoriaId) {
    try {
        const response = await fetch(`http://localhost:4000/curso/categoria/${categoriaId}`);
        const data = await response.json();
        console.log('Cursos obtenidos:', data);
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
    searchCursos();
}

async function searchCursos() {
    const searchTerm = document.getElementById('search').value.toLowerCase();
    if (!searchTerm) {
        window.location.reload();
        return;
    }
    try {
        const response = await fetch('http://localhost:4000/curso/');
        const cursos = await response.json();
        const filteredCursos = cursos.filter(curso => curso.nombrecurso.toLowerCase().includes(searchTerm));
        console.log('Cursos obtenidos por búsqueda:', filteredCursos);
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
    const courseCardsContainer = document.getElementById('course-cards');
    let errorMessage = '';

    if (context === 'categoria') {
        errorMessage = message === 'Error al obtener los cursos.' ? 'Error al obtener los cursos.' : 'No se encontraron cursos para esta categoría.';
    } else if (context === 'search') {
        errorMessage = message === 'Error al buscar los cursos.' ? 'Error al buscar los cursos.' : 'El curso que está buscando no está disponible o no existe.';
    }

    courseCardsContainer.innerHTML = `<p>${errorMessage}</p>`;
}

function displayCursos(cursos, context) {
    const courseCardsContainer = document.getElementById('course-cards');
    courseCardsContainer.innerHTML = '';

    if (!cursos || cursos.length === 0) {
        let noCoursesMessage = '';
        if (context === 'categoria') {
            noCoursesMessage = 'No se encontraron cursos para esta categoría.';
        } else if (context === 'search') {
            noCoursesMessage = 'El curso que está buscando no está disponible o no existe.';
        }
        courseCardsContainer.innerHTML = `<p>${noCoursesMessage}</p>`;
        return;
    }

    cursos.forEach(curso => {
        console.log('Curso:', curso);
        const cursoCard = document.createElement('a');
        cursoCard.href = `curso.html?id=${curso.id}`;
        cursoCard.classList.add('course-card', 'carousel-item');

        const img = document.createElement('img');
        img.src = `data:image/png;base64,${curso.imagen}`;
        img.alt = `Curso de ${curso.nombrecurso}`;

        const textDiv = document.createElement('div');
        textDiv.classList.add('course-text');

        const h3 = document.createElement('h3');
        h3.textContent = curso.nombrecurso;

        textDiv.appendChild(h3);
        cursoCard.appendChild(img);
        cursoCard.appendChild(textDiv);
        courseCardsContainer.appendChild(cursoCard);
    });
}
