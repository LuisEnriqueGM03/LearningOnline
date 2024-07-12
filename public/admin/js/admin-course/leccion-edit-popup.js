let lessonToEdit = null;

window.openEditPopup = function(lesson) {
    lessonToEdit = lesson;
    document.querySelector('.leccion-edit-popup').style.display = 'block';

    document.getElementById('edit-leccion-name').value = lesson.nombre;
    document.getElementById('edit-leccion-descripcion').value = lesson.descripcion;
    document.getElementById('edit-type-content').value = lesson.tipodecontenido;
    document.getElementById('edit-leccion-content').value = lesson.contenido;
    document.getElementById('edit-leccion-orden').value = lesson.orden;
};

document.addEventListener('DOMContentLoaded', () => {
    const saveLeccionButton = document.querySelector('.leccion-edit-form .agregar-btn');
    const cancelLeccionButton = document.querySelector('.leccion-edit-form .cancelar-btn');

    saveLeccionButton.addEventListener('click', saveLesson);
    cancelLeccionButton.addEventListener('click', closeEditPopup);
});

function closeEditPopup() {
    document.querySelector('.leccion-edit-popup').style.display = 'none';
    lessonToEdit = null;
}

async function saveLesson(event) {
    event.preventDefault();

    const nombre = document.getElementById('edit-leccion-name').value;
    const descripcion = document.getElementById('edit-leccion-descripcion').value;
    const tipoDeContenido = document.getElementById('edit-type-content').value;
    let contenido = document.getElementById('edit-leccion-content').value;
    const orden = document.getElementById('edit-leccion-orden').value;

    if (tipoDeContenido === 'Video' && !contenido.includes('embed')) {
        contenido = getEmbeddedVideoUrl(contenido);
    }

    try {
        const response = await fetch(`http://localhost:4000/leccion/${lessonToEdit.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ nombre, descripcion, tipoDeContenido, contenido, orden })
        });
        if (response.ok) {
            window.displayLessons();
            closeEditPopup();
        } else {
            console.error('Error al actualizar la lección');
        }
    } catch (error) {
        console.error('Error al actualizar la lección:', error);
    }
}

function getEmbeddedVideoUrl(url) {
    const videoId = getVideoId(url);
    if (videoId) {
        return `https://www.youtube.com/embed/${videoId}`;
    } else {
        alert("La URL ingresada es inválida");
        throw new Error("Invalid video URL");
    }
}

function getVideoId(url) {
    const videoId = url.match(/(?:https?:\/{2})?(?:www\.)?youtu(?:be)?\.(?:com|be)(?:\/watch\?v=|\/)([^\s&]+)/);
    if (videoId != null) {
        return videoId[1];
    }
    return null;
}
