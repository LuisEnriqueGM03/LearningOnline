fetch('http://localhost:4000/categoria')
    .then(response => response.json())
    .then(categorias => {
        const categoryCardsContainer = document.querySelector('.category-cards');

        categorias.forEach(categoria => {
            const imageUrl = `data:image/png;base64,${categoria.imagen}`;

            const categoryCardLink = document.createElement('a');
            categoryCardLink.href = `client/pages/categoria-curso.html?id=${categoria.id}`;

            const categoryCard = document.createElement('div');
            categoryCard.className = 'category-card';

            categoryCard.innerHTML = `
                <img src="${imageUrl}" alt="Imagen categoria ${categoria.nombre}">
                <h3>${categoria.nombre}</h3>
            `;

            categoryCardLink.appendChild(categoryCard);
            categoryCardsContainer.appendChild(categoryCardLink);
        });
    })
    .catch(error => console.error('Error:', error));