
document.addEventListener('DOMContentLoaded', () => {
    fetch('http://localhost:4000/categoria')
        .then(response => response.json())
        .then(categorias => {
            const categoryCardsContainer = document.querySelector('.my-course-cards');
            categoryCardsContainer.innerHTML = '';

            categorias.forEach(categoria => {
                const imageUrl = `data:image/png;base64,${categoria.imagenCategoria}`;

                const categoryCard = document.createElement('div');
                categoryCard.className = 'my-course-card';

                categoryCard.innerHTML = `
                    <a href="client-categoria-curso.html?id=${categoria.id}" class="course-link">
                        <h3>${categoria.nombre}</h3>
                        <div class="image-container">
                            <img src="data:image/png;base64,${categoria.imagen}" alt="Imagen de la categoría ${categoria.nombre}">
                        </div>
                    </a>
                `;

                categoryCardsContainer.appendChild(categoryCard);
            });
        })
        .catch(error => console.error('Error:', error));
});
