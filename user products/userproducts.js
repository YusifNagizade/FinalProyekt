const api = "http://195.26.245.5:9505/api/products/myProducts?page=1&size=1";

let activeUser = JSON.parse(localStorage.getItem("activeUser"));

async function products() {
    const productsBody = document.getElementById("products");
    const error = document.getElementById("error");

    try {
        const response = await fetch(api, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${activeUser.token}` 
            }
        });

        if (!response.ok) {
            const data = await response.json();
            error.textContent = data.message || "Xəta baş verdi!";
            return;
        }

        error.classList.add("hidden");
        const data = await response.json();

        // API-dən gələn məhsulları göstər
        productsBody.innerHTML = ""; 
        const items = data.content || data; 

        items.forEach(item => {
            const tr = document.createElement("tr");

            tr.innerHTML = `
                <td>${item.id}</td>
                <td>${item.brand}</td>
                <td>${item.model}</td>
                <td>${item.category}</td>
                <td><img class="laptop" src="${item.picture}" alt="" width="100"></td>
                <td>${item.price}$</td>
                <td>${item.rating}/5</td>
                <td>
                    <button class="btn btn-warning btn-sm">edit</button>
                    <button class="btn btn-danger btn-sm" onclick="deleteProduct(${item.id})">delete</button>
                </td>
            `;
            productsBody.appendChild(tr);
        });

    } catch (err) {
        console.log(err.message);
        error.textContent = "Serverə qoşulmaq mümkün olmadı!";
    }
}

async function deleteProduct(id) {
    if (!confirm("Məhsulu silmək istədiyinizə əminsiniz?")) return;

    try {
        const response = await fetch(`http://195.26.245.5:9505/api/products/delete/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${activeUser.token}`
            }
        });

        if (!response.ok) {
            const data = await response.json();
            alert(data.message || "Silinmə zamanı xəta baş verdi!");
            return;
        }

        alert("Məhsul silindi ✅");
        products(); // yenidən məhsulları yüklə
    } catch (err) {
        console.log(err.message);
        alert("Serverə qoşulmaq mümkün olmadı!");
    }
}

window.onload = products;
