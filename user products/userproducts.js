const api = "http://195.26.245.5:9505/api/products/myProducts?page=1&size=1";

async function products() {
    const products = document.getElementById("products");
    const error = document.getElementById("error");

    try {
        const data = await Response.json();
        const response = await fetch(api);

        if (!response.ok) {
            error.textContent = `${data.message}`;
            return;
        }
        error.classList.add("hidden");
    }
    catch (error) {
        console.log(error.message);
    }

}

window.onload = products;

