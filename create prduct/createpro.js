document.getElementById("formProduct").addEventListener("submit", function (event) {
    event.preventDefault()
    let formData = new FormData(event.target)
    const data = {}
    for (const [key, value] of formData.entries()) {
        data[key] = value
    }

    
    fetch("http://195.26.245.5:9505/api/products", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            'Authorization': `Bearer ${localStorage.getItem('activeUser') ? JSON.parse(localStorage.getItem('activeUser')).token : ''}`
        },
        body: JSON.stringify(data)
    })

        .then(response => {
            if (!response.ok) {
                throw new Error(response.status)

            }
            return response.json();
        })
        .then((data)=>{
            window.location="../user products/userproducts.html"
        })
})

let category = document.getElementById("category")

fetch("http://195.26.245.5:9505/api/categories", {
    method: "GET",
    headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem('activeUser') ? JSON.parse(localStorage.getItem('activeUser')).token : ''}`
    }
})
    .then((res) => res.json())
    .then((data) => {

        data.forEach((obj) => {
            const option = document.createElement("option");
            option.textContent = obj.name;
            option.value = obj.id;
            console.log(option);
            category.appendChild(option);
        });
    });
    //son    