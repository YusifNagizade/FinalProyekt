document.addEventListener("DOMContentLoaded", () => {
    const product = JSON.parse(localStorage.getItem("selectedProduct"));

    if (!product) {
        alert("No product selected!");
        window.location.href = "../shop/shop.html";
        return;
    }

    // Elementləri seç
    const image = document.getElementById("image");
    const title = document.getElementById("product-title");
    const price = document.getElementById("product-price");
    const description = document.getElementById("product-description");
    const addToCartBtn = document.getElementById("add-to-cart");

    // Məhsul məlumatlarını yerləşdir
    image.src = product.imageUrl;
    image.alt = `${product.brand} ${product.model}`;
    title.textContent = `${product.brand} ${product.model}`;
    price.textContent = `$${product.price}`;
    description.textContent = product.description;

    // "Add to cart" funksiyası
    addToCartBtn.addEventListener("click", () => {
        let cart = JSON.parse(localStorage.getItem("cart")) || [];

        const foundIndex = cart.findIndex(p => p.id === product.id);

        if (foundIndex === -1) {
            // Məhsul cart-da yoxdursa, quantity=1 ilə əlavə et
            cart.push({ ...product, quantity: 1 });
            alert("Product added to cart!");
        } else {
            // Məhsul varsa, quantity-ni artır
            cart[foundIndex].quantity += 1;
            alert("Product quantity increased in cart!");
        }

        // Yenilənmiş cart-ı localStorage-ə yaz
        localStorage.setItem("cart", JSON.stringify(cart));

        // İstəyirsənsə, sonra yönləndir:
        window.location = "../cart/cart.html";
    });

});
