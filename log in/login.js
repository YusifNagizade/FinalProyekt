document.addEventListener("DOMContentLoaded",function(){
    const form = document.getElementById("myform");

    form.addEventListener("submit", function(event){
        event.preventDefault();


        const formData = new FormData(form);
        const loginData = Object.fromEntries(formData.entries());

        loginFunc(loginData);
    });
});

function showMessage(message,type){
    const messageBox = document.getElementById("message-box");

    messageBox.innerHTML = `<div class="alert alert-${type}">${message}</div>`;
    setTimeout(
        () => {
            messageBox.innerHTML = "";
        }, 3000);
    
}

function loginFunc(user){
    console.log("Göndərilən loginData:", user);
    fetch("http://195.26.245.5:9505/api/auth", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",

        },
        body: JSON.stringify(user),
    })

    .then((res) => res.json())
    .then((data) => {
        console.log(data);
         
        if (data.status !== 403) {
            localStorage.setItem("activeUser",JSON.stringify(data.body))
        } else {
            showMessage("Invalid password","danger");
        }
        

        // setTimeout(() => {
        //     window.location.href = "http://127.0.0.1:5500/about/about.html";
        // }, 2000 );
    })
}

