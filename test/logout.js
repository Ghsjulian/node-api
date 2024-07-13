const Logout = async () => {
    const apiUrl = "http://localhost:5000/api";
    const data = {
        date: "Sat Jul 13 2024",
        isLogin: true,
        token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Ikdoc0p1bGlhbiIsImVtYWlsIjoiZ2hzanVsaWFuQGdtYWlsLmNvbSIsInRvZGF5IjoiU2F0IEp1bCAxMyAyMDI0IiwiaWF0IjoxNzIwODUwMTgxLCJleHAiOjE3MjA4NTAzMDF9.--ViK9YRXQk1zl_uhadvkS1oectWuaoWyWXBHZn7RXs",
        userId: "669178505c89b8980311cf32"
    };
    try {
        const response = await fetch(apiUrl + "/logout", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });
        const responseData = await response.json();
        if (responseData.type) {
            console.log(responseData);
        } else {
            console.log(responseData);
        }
    } catch (error) {
        console.log(error);
    }
};

Logout();
