"use strict";

async function verifyEmail(verification) {
    let url = "http://localhost:5000/api/user/verification";
    const data = { user: verification };
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
async function signup() {
    let url = "http://localhost:5000/api/signup";
    const data = {
        
        user_name: "Banali Singh",
        user_email: "bma1i8h3db@hellomailo.net",
        user_password: "123456"
        /*
        user_name: "Ghs Julianne",
        user_email: "ghsjulian55@gmail.com",
        user_password: "123456"
        */
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
        //verifyEmail(responseData.user);
    } catch (error) {
        console.error("Error:", error);
    }
}
signup();
/*
setInterval(()=> {
    signup()
}, 7000);
*/
