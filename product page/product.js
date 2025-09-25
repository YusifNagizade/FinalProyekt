document.addEventListener("DOMContentLoaded", () => {
    const product = JSON.parse(localStorage.getItem("selectedProduct"));

    if (!product) {
        alert("No product selected!");
        window.location.href = "../shop/shop.html";
        return;
    }

    const image = document.getElementById("image");
    const title = document.getElementById("product-title");
    const price = document.getElementById("product-price");
    const description = document.getElementById("product-description");
    const addToCartBtn = document.getElementById("add-to-cart");

    image.src = product.imageUrl;
    image.alt = `${product.brand} ${product.model}`;
    title.textContent = `${product.brand} ${product.model}`;
    price.textContent = `$${product.price}`;
    description.textContent = product.description;

    addToCartBtn.addEventListener("click", () => {
        let cart = JSON.parse(localStorage.getItem("cart")) || [];

        const foundIndex = cart.findIndex(p => p.id === product.id);

        if (foundIndex === -1) {
            cart.push({ ...product, quantity: 1 });
            alert("Product added to cart!");
        } else {
            cart[foundIndex].quantity += 1;
            alert("Product quantity increased in cart!");
        }
        localStorage.setItem("cart", JSON.stringify(cart));
        window.location = "../cart/cart.html";
    });

});
//son    