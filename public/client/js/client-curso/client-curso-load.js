function getCourseIdFromUrl() {
    const params = new URLSearchParams(window.location.search);
    return params.get('id');
}

async function fetchCourseData(courseId) {
    const response = await fetch(`http://localhost:4000/curso/${courseId}`);
    if (response.ok) {
        return response.json();
    } else {
        throw new Error('Error al obtener los datos del curso');
    }
}

async function displayCourseData() {
    const courseId = getCourseIdFromUrl();
    try {
        const courseData = await fetchCourseData(courseId);
        document.querySelector('.curso-presentation img').src = `data:image/png;base64,${courseData.imagen}`;
        document.querySelector('.curso-presentation h1').textContent = courseData.nombrecurso;
        document.querySelector('.description-section p').textContent = courseData.descripcion;
    } catch (error) {
        console.error('Error:', error);
    }
}

document.addEventListener('DOMContentLoaded', displayCourseData);
