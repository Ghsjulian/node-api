"use strict";

async function login() {
    let url = "http://localhost:5000/api/user/verification";
    const data = {
        /*
        user_email: "ghsjulian@gmail.com",
        user_password: "123456" 
        */
        user_id : "66908f1041995ef7ca5951b6",
        user_email: "bma1i8h3db@hellomailo.net",
        user_otp: "671146"
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
