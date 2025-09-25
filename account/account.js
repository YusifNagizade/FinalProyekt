const { username, name, surname, email } = userInfo;

const infoContainer = document.getElementById('userInfo');


fetch("http://195.26.245.5:9505/api/clients/get-details", {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('activeUser') ? JSON.parse(localStorage.getItem('activeUser')).token : ''}`
    }
}


)
    .then(response => response.json())
    .then(data => {
        infoContainer.innerHTML = `
            <h2>User details</h2>
            <p>Name: <span>${data.name}</span></p>
            <p>Surname: <span> ${data.surname}</span></p>
            <p>E-mail: <span>${data.email}</span></p>
            <p>Username: <span> ${data.username}</span></p>`;

    })

//son    