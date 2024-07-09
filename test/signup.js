"use strict";

async function signup() {
    let url = "http://localhost:5000/api/user/signup";
    const data = {
        user_name: "Sonam Singh",
        user_email: "sonam@gmail.com",
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
signup();
