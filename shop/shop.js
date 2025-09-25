const prooductList = document.querySelector(".products");
const category = document.querySelector(".categories");

let activeUser = JSON.parse(localStorage.getItem("activeUser"));
let products = [];
let filteredProducts = [];

fetchProducts();

async function fetchProducts() {
    try {
        const response = await fetch("http://195.26.245.5:9505/api/products", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${activeUser?.token}`
            }
        });

        if (!response.ok) throw new Error("Failed to fetch products");

        products = await response.json();
        filteredProducts = [...products];

        loadProducts();
    } catch (error) {
        console.error("Error fetching products:", error);
        prooductList.innerHTML = `<p class="text-danger text-center">Failed to load products.</p>`;
    }
}

function loadProducts() {
    prooductList.innerHTML = "";

    if (filteredProducts.length === 0) {
        prooductList.innerHTML = `<p class="text-center">No products found.</p>`;
        return;
    }

    filteredProducts.forEach(product => {
        const productCard = document.createElement("div");
        productCard.classList.add("col-md-3", "mb-4");

        productCard.innerHTML = `
            <div class="product-card">
                <img src="${product.imageUrl}" alt="${product.brand}" class="product-image" style="cursor:pointer;">
                <h4 class="product-title" data-id="${product.id}">${product.brand} ${product.model}</h4>
                <p class="price">${product.price}$</p>
                <p class="rating">${product.averageRating} (${Math.floor(Math.random() * 100) + 1})</p>
                <button class="btn-add-to-cart" data-id="${product.id}">Add to Cart</button>
            </div>
        `;

        const img = productCard.querySelector(".product-image");
        img.addEventListener("click", () => selectedProduct(product));

        prooductList.appendChild(productCard);
    });
}

function selectedProduct(product) {
    localStorage.setItem("selectedProduct", JSON.stringify(product));
    window.location.href = "../product page/product.html";
}

function getProducts(categoryId) {
    filteredProducts = products.filter(product => product.categoryId === categoryId);
    loadProducts();
}

fetch("http://195.26.245.5:9505/api/categories", {
    method: "GET",
    headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${activeUser?.token}`
    }
})
.then((res) => res.json())
.then((data) => {
    category.innerHTML = "";

    const allLi = document.createElement("li");
    allLi.textContent = "All";
    allLi.style.cursor = "pointer";
    allLi.addEventListener("click", () => {
        filteredProducts = [...products];
        loadProducts();
    });
    category.appendChild(allLi);

    data.forEach((obj) => {
        const li = document.createElement("li");
        li.textContent = obj.name;
        li.style.cursor = "pointer";
        li.addEventListener("click", () => {
            getProducts(obj.id);
        });
        category.appendChild(li);
    });
});
//son    