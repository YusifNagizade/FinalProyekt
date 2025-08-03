document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("SignUp");
    const messageBox = document.getElementById("message-box");

    form.addEventListener("submit", function (event) {
        event.preventDefault();

        const formData = new FormData(form);
        const userData = Object.fromEntries(formData.entries());

        if (Object.values(userData).some((value) => value.trim() === "")) {
            showMessage("All fields are required!", "danger");
            return;
        }

        console.log(userData);

        addUser(userData);
        form.reset();

    });
    function showMessage(message, type) {
        const messageBox = document.getElementById("message-box");

        messageBox.innerHTML = `<div class="alert alert-${type}">${message}</div>`;
        setTimeout(
            () => {
                messageBox.innerHTML = "";
            }, 3000);

    }

});


function addUser(user) {
    fetch("http://195.26.245.5:9505/api/clients", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",

        },
        body: JSON.stringify(user),
    })

        .then((res) => res.json())
        .then((data) => {
            alert("Qeydiyyat uğurlu oldu!")
            window.location = "../log in/login.html"
        })
        .catch(() => {
            alert("Error")
        })
}