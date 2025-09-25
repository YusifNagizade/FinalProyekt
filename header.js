
let logout = document.getElementById("logout")

checkout()
function checkout() {
    let username = document.getElementById("username")
    let login = document.getElementById("login")

    let activeUser = localStorage.getItem("activeUser") ? JSON.parse(localStorage.getItem("activeUser")).username : ""
    let part2 = document.querySelector(".part2")
    if (activeUser) {
        username.innerHTML = activeUser
        login.style.display = "none"
        part2.style.display = "flex"
        logout.style.display = "inline-block"
    } else {
        username.innerHTML = activeUser
        login.style.display = "inline-block"
        part2.style.display = "none"
        logout.style.display = "none"
    }

}


logout.addEventListener("click",()=>{
    localStorage.removeItem("activeUser")
    checkout()
})
//son    