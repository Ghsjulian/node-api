"use strict";

async function deleteUser() {
    let url = "http://localhost:5000/api/users/delete/668e754059c69aa1748d7dc9";
    try {
        const response = await fetch(url);
        const responseData = await response.json();
        console.log(responseData);
    } catch (error) {
        console.error("Error:", error);
    }
}
deleteUser();
