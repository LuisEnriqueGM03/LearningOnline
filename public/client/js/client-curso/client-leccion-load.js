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

async function checkInscripcion(userId, courseId) {
    try {
        const response = await fetch(`http://localhost:4000/inscripcion/usuario/${userId}/curso/${courseId}`);
        if (!response.ok) {
            throw new Error('Error en la respuesta del servidor');
        }
        const data = await response.json();
        return data.inscrito;
    } catch (error) {
        console.error('Error al verificar la inscripción:', error);
        return false;
    }
}

function createLessonElement(lesson, isInscrito) {
    const lessonElement = document.createElement('div');
    lessonElement.classList.add('lesson');

    if (isInscrito) {
        lessonElement.addEventListener('click', () => {
            const page = lesson.tipodecontenido === 'Video' ? 'client-videos.html' : 'client-documentos.html';
            window.location.href = `${page}?id=${lesson.id}`;
        });
    } else {
        lessonElement.classList.add('disabled');
    }

    const lessonInfo = document.createElement('div');
    lessonInfo.classList.add('lesson-info');

    const button = document.createElement('button');
    if (lesson.tipodecontenido === 'Video') {
        button.classList.add('play-button');
        button.innerHTML = '<i class="fas fa-play"></i>';
    } else if (lesson.tipodecontenido === 'Texto') {
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
    const user = JSON.parse(localStorage.getItem('user'));
    try {
        const lessons = await fetchLessons(courseId);
        const lessonsList = document.getElementById('lessons-list');
        lessonsList.innerHTML = '';
        if (lessons.length === 0) {
            const noLessonsMessage = document.createElement('p');
            noLessonsMessage.textContent = 'No existe ninguna lección disponible para este curso.';
            lessonsList.appendChild(noLessonsMessage);
        } else {
            let isInscrito = false;
            if (user && courseId) {
                isInscrito = await checkInscripcion(user.id, courseId);
            }
            lessons.sort((a, b) => a.orden - b.orden);
            lessons.forEach(lesson => {
                const lessonElement = createLessonElement(lesson, isInscrito);
                lessonsList.appendChild(lessonElement);
            });
        }
    } catch (error) {
        console.error('Error:', error);
    }
}

document.addEventListener('DOMContentLoaded', displayLessons);
