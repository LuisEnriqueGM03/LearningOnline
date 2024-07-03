document.addEventListener('DOMContentLoaded', async () => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user) {
        console.error('No user found in localStorage');
        return;
    }

    const { id: Usuario_id } = user;

    try {
        const response = await fetch(`http://localhost:4000/inscripcion/usuario/${Usuario_id}`);
        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Error fetching courses: ${response.status} - ${response.statusText} - ${errorText}`);
        }

        const cursos = await response.json();
        console.log(cursos); // Agrega esta línea para ver los datos recibidos

        // Obtener el progreso para cada curso
        const cursosConProgreso = await Promise.all(cursos.map(async curso => {
            const progreso = await window.cargarProgreso(Usuario_id, curso.idcurso);
            return { ...curso, progreso };
        }));

        renderCursos(cursosConProgreso);
    } catch (error) {
        console.error('Error:', error.message);
    }
});

function renderCursos(cursos) {
    const coursesContainer = document.querySelector('.my-course-cards');
    coursesContainer.innerHTML = '';

    if (cursos.length === 0) {
        coursesContainer.innerHTML = `
            <div class="no-courses">
                <p>No estás inscrito en ningún curso</p>
                <a href="client-descubrir.html" class="discover-btn">Descubrir cursos</a>
            </div>
        `;
    } else {
        cursos.forEach(curso => {
            const courseCard = document.createElement('div');
            courseCard.classList.add('my-course-card');
            courseCard.setAttribute('data-id', curso.id);

            courseCard.innerHTML = `
                <a href="client-curso.html?id=${curso.idcurso}" class="course-link">
                    <h3>${curso.nombrecurso}</h3>
                    <div class="image-container">
                        <img src="data:image/png;base64,${curso.imagencurso}" alt="${curso.nombrecurso} Logo">
                    </div>
                    <div class="footer-bar">
                        <progress value="${curso.progreso}" max="100"></progress>
                        <span class="progress-text">${Math.round(curso.progreso)}%</span>
                    </div>
                </a>
                <button class="btn-del" onclick="showDeletePopup(${curso.id})">X</button>
            `;
            coursesContainer.appendChild(courseCard);
        });
    }
}
