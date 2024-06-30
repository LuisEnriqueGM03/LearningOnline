function getCourseIdFromUrl() {
    const params = new URLSearchParams(window.location.search);
    return params.get('id');
}

async function fetchLessons(courseId) {
    const response = await fetch(`http://localhost:4000/leccion/curso/${courseId}`);
    if (response.ok) {
        return response.json();
    } else {
        throw new Error('Error al obtener las lecciones');
    }
}

function createLessonElement(lesson) {
    const lessonElement = document.createElement('a');
    lessonElement.href = "login.html";
    lessonElement.classList.add('lesson');

    const lessonInfo = document.createElement('div');
    lessonInfo.classList.add('lesson-info');

    const button = document.createElement('button');
    if (lesson.tipodecontenido === 'Video') { // Asegurarse de usar el nombre correcto de la propiedad
        button.classList.add('play-button');
        button.innerHTML = '<i class="fas fa-play"></i>';
    } else if (lesson.tipodecontenido === 'Texto') { // Asegurarse de usar el nombre correcto de la propiedad
        button.classList.add('document-button');
        button.innerHTML = '<i class="fa-solid fa-file"></i>';
    }

    const span = document.createElement('span');
    span.textContent = `Lección ${lesson.orden}: ${lesson.nombre}`;

    lessonInfo.appendChild(button);
    lessonInfo.appendChild(span);
    lessonElement.appendChild(lessonInfo);

    return lessonElement;
}

async function displayLessons() {
    const courseId = getCourseIdFromUrl();
    try {
        const lessons = await fetchLessons(courseId);
        const lessonsList = document.getElementById('lessons-list');
        lessonsList.innerHTML = '';
        if (lessons.length === 0) {
            const noLessonsMessage = document.createElement('p');
            noLessonsMessage.textContent = 'No existe ninguna lección disponible para este curso.';
            lessonsList.appendChild(noLessonsMessage);
        } else {
            lessons.forEach(lesson => {
                const lessonElement = createLessonElement(lesson);
                lessonsList.appendChild(lessonElement);
            });
        }
    } catch (error) {
        console.error('Error:', error);
    }
}

document.addEventListener('DOMContentLoaded', displayLessons);
