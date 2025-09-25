let form = document.querySelector(".was-validated")

form.addEventListener("submit",(event) => {
    event.preventDefault();
    const form = new FormData(event.target);
    let el = form.get("name");
    let ele = form.get("sname");
    let elem = form.get("e-mail");
    let eleme = form.get("username");
    let elemen = form.get("password")


    console.log(el);
    console.log(ele);
    console.log(elem);
    console.log(eleme);
    console.log(elemen);

})
//son    

