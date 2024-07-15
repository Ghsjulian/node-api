"use strict";

async function AddProduct() {
    let url = "http://localhost:5000/api/admin/add-product";
    const data = {
        product_title: "Full Sleeve T-shirt",
        product_img: "t-shirt_1.png",
        product_desc: {
            color: "Light Blue",
            size: "37 X 56",
            width: "230 Inch"
        },
        product_price: "140 TK BDT"
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
AddProduct();
