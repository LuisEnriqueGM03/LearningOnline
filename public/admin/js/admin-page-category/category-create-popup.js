document.getElementById('btn-add-category').addEventListener('click', function() {
    document.querySelector('.category-add-popup').style.display = 'block';
});

var addCategoryButton = document.querySelector('.category-add-form .agregar-btn');
var cancelCategoryButton = document.querySelector('.category-add-form .cancelar-btn');

cancelCategoryButton.addEventListener('click', closeCategoryPopup);

function closeCategoryPopup(event) {
    if (event) {
        event.preventDefault();
    }
    document.querySelector('.category-add-popup').style.display = 'none';
}

document.getElementById('category-form').addEventListener('submit', async function(event) {
    event.preventDefault();

    const nombreCategoria = document.getElementById('category-name').value;
    const descripcion = document.getElementById('category-description').value;
    const imagen = await toBase64(document.getElementById('category-image').files[0]);
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user) {
        console.error('No user found in localStorage');
        return;
    }
    const usuarioId = user.id;

    try {
        const response = await fetch('http://localhost:4000/categoria/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                nombre: nombreCategoria,
                descripcion,
                imagen,
                usuarioId
            })
        });
        if (response.ok) {
            fetchCategorias();
            closeCategoryPopup();
        } else {
            console.error('Error al agregar la categoría');
        }
    } catch (error) {
        console.error('Error al agregar la categoría:', error);
    }
});


function toBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result.split(',')[1]);
        reader.onerror = error => reject(error);
    });
}
