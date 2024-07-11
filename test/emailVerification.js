"use strict";

async function login() {
    let url = "http://localhost:5000/api/user/verification";
    const data = {
        /*
        user_email: "ghsjulian@gmail.com",
        user_password: "123456" 
        */
        user_id : "668ff7a73e5734521c1fbfef",
        user_email: "bma1i8h3db@hellomailo.net",
        user_otp: "758973"
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
