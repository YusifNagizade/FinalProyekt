document.querySelector('.order-button').addEventListener('click', async function (e) {
    e.preventDefault();

    // Məlumatların toplanması
    const firstName = document.querySelector('input[placeholder="First name"]').value.trim();
    const lastName = document.querySelector('input[placeholder="Last name"]').value.trim();
    const state = document.querySelector('select').value;
    const city = document.querySelector('input[placeholder="City"]').value.trim();
    const address = document.querySelector('input[placeholder="Address"]').value.trim();
    const zip = document.querySelector('input[placeholder="Zip"]').value.trim();
    const tel = document.querySelector('input[placeholder="Tel"]').value.trim();
    const email = document.querySelector('input[placeholder="Email"]').value.trim();

    const cardNumber = document.querySelector('.card-input').value.trim();
    const expMonth = document.querySelector('input[placeholder="Expiration(MM)"]').value.trim();
    const expYear = document.querySelector('input[placeholder="Expiration(YY)"]').value.trim();
    const cvc = document.querySelector('input[placeholder="Card security code"]').value.trim();

    const agreed = document.querySelector('input[type="checkbox"]').checked;

    // Sadə validasiya
    if (!firstName || !lastName || !state || !city || !address || !zip || !tel || !email ||
        !cardNumber || !expMonth || !expYear || !cvc) {
        alert("Zəhmət olmasa bütün xanaları doldurun.");
        return;
    }

    if (!agreed) {
        alert("Şərtlərlə razılaşmalısınız.");
        return;
    }

    const orderData = {
        customer: {
            firstName,
            lastName,
            state,
            city,
            address,
            zip,
            tel,
            email
        },
        payment: {
            cardNumber,
            expMonth,
            expYear,
            cvc
        },
        subtotal: 189.97,
        shipping: "FREE",
        total: 189.97
    };

    try {
        const response = await fetch("http://195.26.245.5:9505/api/orders", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(orderData)
        });

        if (!response.ok) {
            throw new Error("Server error");
        }

        const data = await response.json();
        alert("Sifariş uğurla göndərildi!");
        console.log("Response:", data);

    } catch (error) {
        console.error("Sifarişi göndərərkən xəta baş verdi:", error);
        alert("Sifariş göndərilə bilmədi. Xahiş edirik sonra yenidən cəhd edin.");
    }
});
