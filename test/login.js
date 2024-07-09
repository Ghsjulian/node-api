"use strict";

async function login() {
    let url = "http://localhost:5000/api/login";
    const data = {
        user_email: "ghsjulian@gmail.com",
        user_password: "123456"
    };

    try {
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });

        const responseData = await response.json();
        console.log(responseData);
    } catch (error) {
        console.error("Error:", error);
    }
}
login();
