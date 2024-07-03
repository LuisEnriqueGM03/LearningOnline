async function fetchLesson(lessonId) {
    const response = await fetch(`http://localhost:4000/leccion/${lessonId}`);
    if (response.ok) {
        return response.json();
    } else {
        throw new Error('Error al obtener la lección');
    }
}

function getLessonIdFromUrl() {
    const params = new URLSearchParams(window.location.search);
    return params.get('id');
}

async function displayLesson() {
    const lessonId = getLessonIdFromUrl();
    try {
        const lesson = await fetchLesson(lessonId);
        document.getElementById('lesson-prefix').textContent = `Lección ${lesson.orden}:`;
        document.getElementById('lesson-name').textContent = lesson.nombre;
        document.getElementById('lesson-content').textContent = lesson.contenido;
    } catch (error) {
        console.error('Error:', error);
    }
}

document.addEventListener('DOMContentLoaded', displayLesson);