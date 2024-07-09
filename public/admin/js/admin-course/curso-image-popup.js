document.addEventListener('DOMContentLoaded', function() {
    let courseId = new URLSearchParams(window.location.search).get('id');

    document.getElementById('btn-edit-photo').addEventListener('click', function() {
        document.querySelector('.imagen-image-popup').style.display = 'block';
    });

    const uploadButton = document.querySelector('.imagen-image-form .agregar-btn');
    const cancelButton = document.querySelector('.imagen-image-form .cancelar-btn');

    uploadButton.addEventListener('click', uploadImage);
    cancelButton.addEventListener('click', closePopup);

    function closePopup(event) {
        if (event) {
            event.preventDefault();
        }
        document.querySelector('.imagen-image-popup').style.display = 'none';
    }

    async function uploadImage(event) {
        event.preventDefault();

        const imageInput = document.getElementById('imagen-image-popup');
        const file = imageInput.files[0];

        if (!file) {
            alert('Por favor selecciona una imagen.');
            return;
        }

        try {
            const base64Image = await toBase64(file);

            const response = await fetch(`http://localhost:4000/curso/imagen/${courseId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ imagenCurso: base64Image })
            });

            if (response.ok) {
                closePopup();
                window.location.reload();
            } else {
                console.error('Error al actualizar la imagen del curso');
            }
        } catch (error) {
            console.error('Error al convertir la imagen a base64:', error);
        }
    }

    function toBase64(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result.split(',')[1]);
            reader.onerror = error => reject(error);
        });
    }
});
