document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('btn-add').addEventListener('click', function() {
        document.querySelector('.leccion-add-popup').style.display = 'block';
    });

    const addButton = document.querySelector('.form-buttons .agregar-btn');
    const cancelButton = document.querySelector('.form-buttons .cancelar-btn');

    addButton.addEventListener('click', addLesson);
    cancelButton.addEventListener('click', closePopup);

    function closePopup(event) {
        if (event) {
            event.preventDefault();
        }
        document.querySelector('.leccion-add-popup').style.display = 'none';
    }

    async function addLesson(event) {
        event.preventDefault();

        const nombre = document.getElementById('leccion-name').value;
        const descripcion = document.getElementById('leccion-descripcion').value;
        const tipoDeContenido = document.getElementById('type-content').value;
        let contenido = document.getElementById('leccion-content').value;
        const orden = document.getElementById('leccion-orden').value;
        const courseId = new URLSearchParams(window.location.search).get('id');

        if (tipoDeContenido === 'Video') {
            contenido = getEmbeddedVideoUrl(contenido);
        }

        try {
            const response = await fetch(`http://localhost:4000/leccion`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ nombre, descripcion, tipoDeContenido, contenido, orden, Curso_id: courseId })
            });
            if (response.ok) {
                const newLesson = await response.json();
                await window.createProgressForUsers(courseId, newLesson.id);
                closePopup();
                window.displayLessons();
            } else {
                console.error('Error al agregar la lección');
            }
        } catch (error) {
            console.error('Error al agregar la lección:', error);
        }
    }

    function getEmbeddedVideoUrl(url) {
        const videoId = getVideoId(url);
        if (videoId) {
            return `https://www.youtube.com/embed/${videoId}`;
        } else {
            alert("La Url ingresada es invalida");
            throw new Error("Invalid video URL");
        }
    }

    function getVideoId(url) {
        const videoId = url.match(/(?:https?:\/{2})?(?:w{3}\.)?youtu(?:be)?\.(?:com|be)(?:\/watch\?v=|\/)([^\s&]+)/);
        if (videoId != null) {
            return videoId[1];
        }
        return null;
    }
});
