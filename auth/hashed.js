const hash = str => {
    let hash = 0;
    const prime = 31;
    for (let i = 0; i < str.length; i++) {
        hash = hash * prime + str.charCodeAt(i);
    }
    return hash.toString(16).padStart(8, "0") + "ghs";
};

const compareHashed = (hashedPassword, inputPassword) => {
    const inputHashedPassword = hash(inputPassword);
    return hashedPassword === inputHashedPassword;
};

/*
const password = "mysecretpassword";
const hashedPassword = hash(password);
console.log(`Hashed password: ${hashedPassword}`);

const inputPassword = "mysecretpassword";
const isValid = compareHashed(hashedPassword, inputPassword);
console.log(`Is password valid? ${isValid}`);

*/
module.exports = { hash, compareHashed };
