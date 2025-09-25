document.addEventListener("DOMContentLoaded", function () {
  const cartBody = document.getElementById("cart-body");
  const cartSubtotal = document.getElementById("cart-subtotal");
  const cartTotal = document.getElementById("cart-total");

  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  function renderCart() {
    cartBody.innerHTML = "";
    let total = 0;

    cart.forEach((product, index) => {
      const subtotal = (product.price * product.quantity).toFixed(2);
      total += parseFloat(subtotal);

      const row = document.createElement("tr");

      row.innerHTML = `
        <td class="d-flex align-items-center gap-3">
          <img src="${product.imageUrl}" alt="" width="70">
          <span>${product.brand} ${product.model}</span>
        </td>
        <td>${product.price.toFixed(2)}$</td>
        <td>
          <input class="form-control w-50 mx-auto quantity" 
                 type="number" min="1" max="20" value="${product.quantity}" 
                 data-index="${index}">
        </td>
        <td class="subtotal">${subtotal}$</td>
        <td><button class="btn btn-danger btn-sm remove" data-index="${index}">Remove</button></td>
      `;

      cartBody.appendChild(row);
    });

    cartSubtotal.textContent = total.toFixed(2) + "$";
    cartTotal.textContent = total.toFixed(2) + "$";
  }

  cartBody.addEventListener("input", function (e) {
    if (e.target.classList.contains("quantity")) {
      const index = e.target.getAttribute("data-index");
      const newQty = parseInt(e.target.value);
      if (newQty >= 1 && newQty <= 20) {
        cart[index].quantity = newQty;
        localStorage.setItem("cart", JSON.stringify(cart));
        renderCart();
      }
    }
  });

  cartBody.addEventListener("click", function (e) {
    if (e.target.classList.contains("remove")) {
      const index = e.target.getAttribute("data-index");
      cart.splice(index, 1);
      localStorage.setItem("cart", JSON.stringify(cart));
      renderCart();
    }
  });

  renderCart();
});
//son    