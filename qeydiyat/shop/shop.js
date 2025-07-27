document.addEventListener("DOMContentLoaded", async function () {
    const prooductList = document.getElementById("productList");

    let activeUser = JSON.parse(localStorage.getItem("activeUser"));
    let products = [];
    let filteredProducts = [];

    async function fetchProducts() {
        try {
            const response = await fetch("http://195.26.245.5:9505/api/products", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${activeUser?.token}`
                }
            });

            if (!response.ok) {
                throw new Error("Failed to fetch products");
            }

            products = await response.json();
            filteredProducts = [...products];

            localStorage.setItem("products", JSON.stringify(products));

            loadProducts();

        } catch (error) {
            console.error("Error fetching products:", error);
            prooductList.innerHTML = `<p class="text-danger text-center">Failed to load products.</p>`;
            
        }

        function loadProducts() {
            prooductList.innerHTML = "";

            if (filteredProducts.length === 0) {
                prooductList.innerHTML = `<p class="text-center">No products found.</p>`;
            }
        }

        filteredProducts.forEach(product => {
            const productCard = document.createElement("div");
            productCard.classList.add("col-md-3", "mb-4");

            productCard.innerHTML = `
            <div class="product-card">
    <img src="${product.imageUrl}" alt="${product.brand}" class="product-image" data-id="${product.id}">
    <h3 class="product-title" data-id="${product.id}">${product.brand} ${product.model}</h3>
    <p class="price">${product.price}</p>
    <p class="rating">${product.rating} (${Math.floor(Math.random() * 100) + 1})</p>
    <button class="btn-add-to-cart" data-id="${product.id}">Add to Cart</button>
</div>
            `;

            prooductList.appendChild(productCard);
        })
    }

})