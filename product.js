document.addEventListener("DOMContentLoaded", function () {
    // Fetch product ID from the URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get("id");

    // Fetch the specific product details
    fetch("product.json")
        .then(response => response.json())
        .then(data => {
            const products = data;

            const product = products.find(item => item.id == productId);

            if (product) {
                // Populate product details in the .detail container
                const detailContainer = document.querySelector(".detail");
                detailContainer.querySelector(".image img").src = product.image;
                detailContainer.querySelector(".content .name").textContent = product.name;
                detailContainer.querySelector(".content .price").textContent = `$${product.price}`;
                detailContainer.querySelector(".content .description").textContent = product.description;

                // Add event listener to "Add to Cart" button
                const addToCartButton = detailContainer.querySelector(".addCart");
                addToCartButton.addEventListener("click", () => addCart(product.id));

                // Fetch similar products (excluding the current one)
                const similarProducts = products.filter(item => item.id != productId);

                // Display similar products in the .listProducts container
                const listProductsContainer = document.querySelector(".listProducts");
                similarProducts.forEach(similarProduct => {
                    let newSimilarItem = document.createElement("div");
                    newSimilarItem.classList.add("item");
                    newSimilarItem.innerHTML = 
                    `
                        <a href="product.html?id=${similarProduct.id}">
                            <img src="${similarProduct.image}">
                        </a>
                        <h2>${similarProduct.name}</h2>
                        <div class="price">$${similarProduct.price}</div>
                        <button onclick="addCart(${similarProduct.id})">Add To Cart</button>
                    `;
                    listProductsContainer.appendChild(newSimilarItem);
                });
            } else {
                console.error("Product not found.");
            }
        })
        .catch(error => {
            console.error("Error fetching product data:", error);
        });
});
