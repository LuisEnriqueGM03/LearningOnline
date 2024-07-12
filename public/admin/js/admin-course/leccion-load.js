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
    const lessonElement = document.createElement('div');
    lessonElement.classList.add('lesson');

    lessonElement.onclick = function() {
        if (lesson.tipodecontenido === 'Video') {
            window.location.href = `admin-videos.html?id=${lesson.id}`;
        } else if (lesson.tipodecontenido === 'Texto') {
            window.location.href = `admin-documentos.html?id=${lesson.id}`;
        }
    };

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

    const lessonAdmin = document.createElement('div');
    lessonAdmin.classList.add('lesson-admin');

    const editButton = document.createElement('button');
    editButton.classList.add('option-btn', 'edit');
    editButton.innerHTML = '<i class="fas fa-edit"></i> Editar';
    editButton.onclick = function(event) {
        event.stopPropagation();
        leccionPopupLeccion(lesson);
    };

    const deleteButton = document.createElement('button');
    deleteButton.classList.add('option-btn', 'delete');
    deleteButton.innerHTML = '<i class="fas fa-trash-alt"></i> Eliminar';
    deleteButton.onclick = function(event) {
        event.stopPropagation();
        leccionPopupEliminate(lesson.id);
    };

    lessonAdmin.appendChild(editButton);
    lessonAdmin.appendChild(deleteButton);

    lessonInfo.appendChild(button);
    lessonInfo.appendChild(span);
    lessonElement.appendChild(lessonInfo);
    lessonElement.appendChild(lessonAdmin);

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
            lessons.sort((a, b) => a.orden - b.orden);
            lessons.forEach(lesson => {
                const lessonElement = createLessonElement(lesson);
                lessonsList.appendChild(lessonElement);
            });
        }
    } catch (error) {
        console.error('Error:', error);
    }
}

function leccionPopupLeccion(lesson) {
    window.openEditPopup(lesson);
}

function leccionPopupEliminate(lessonId) {
    window.openDeletePopup(lessonId);
}

document.addEventListener('DOMContentLoaded', displayLessons);
window.displayLessons = displayLessons;
