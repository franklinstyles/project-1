const url = "http://localhost:3001/products";

document.addEventListener('DOMContentLoaded', function() {
    const productContainer = document.querySelector('.popular-products');
    
    if (!productContainer) {
        console.error('Error: .popular-products container not found');
        return;
    }

    function fetchProducts() {
        fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                renderProducts(data);
            })
            .catch(error => {
                console.error('Error fetching products:', error);
            });
    }

    function renderProducts(products) {
        productContainer.innerHTML = ''; 
        products.forEach(product => {
            const productCard = createProductCard(product);
            productContainer.appendChild(productCard);
        });
    }

    function createProductCard(product) {
        const card = document.createElement('div');
        card.classList.add('product', 'card');
        card.setAttribute('data-product-id', product.id);

        const cardContainer = document.createElement('div');
        cardContainer.classList.add('product', 'card_container');

        const image = document.createElement('img');
        image.classList.add('product', 'card_image');
        image.src = product.images[0].url; 
        image.alt = product.name; 

        const productName = document.createElement('h2');
        productName.classList.add('product', 'card_title');
        productName.textContent = product.name;

        const productPrice = document.createElement('p');
        productPrice.classList.add('product', 'card_price');
        productPrice.textContent = product.price;

        const addToCartBtn = document.createElement('button');
        addToCartBtn.classList.add('product', 'card_btn', 'cart');
        addToCartBtn.innerHTML = '<span class="material-symbols-outlined">shopping_bag</span>';
        addToCartBtn.addEventListener('click', function() {
            addToCart(product.id);
        });

        const favBtn = document.createElement('button');
        favBtn.classList.add('product', 'card_btn', 'fav');
        favBtn.innerHTML = '<span class="material-symbols-outlined">favorite</span>';
        favBtn.addEventListener('click', function() {
            toggleFavorite(favBtn, product.id);
        });

        cardContainer.appendChild(image);
        cardContainer.appendChild(productName);
        cardContainer.appendChild(productPrice);
        cardContainer.appendChild(addToCartBtn);
        cardContainer.appendChild(favBtn);
        card.appendChild(cardContainer);

        return card;
    }

    function addToCart(productId) {
        alert('Product added to cart!');
        console.log('Added product with ID ' + productId + ' to cart.');
    }

    function toggleFavorite(button, productId) {
        button.classList.toggle('active'); 
        console.log('Toggled favorite status for product with ID ' + productId);
    }

    fetchProducts();
});
