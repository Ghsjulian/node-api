function hash(str) {
  let hash = 0;
  const prime = 31;
  for (let i = 0; i < str.length; i++) {
    hash = hash * prime + str.charCodeAt(i);
  }
  return hash.toString(16).padStart(8, '0')+"ghs";
}

function compareHashed(hashedPassword, inputPassword) {
  const inputHashedPassword = hash(inputPassword);
  return hashedPassword === inputHashedPassword;
}

const password = "mysecretpassword";
const hashedPassword = hash(password);
console.log(`Hashed password: ${hashedPassword}`);

const inputPassword = "mysecretpassword";
const isValid = compareHashed(hashedPassword, inputPassword);
console.log(`Is password valid? ${isValid}`);







/*
function hash(str) {
  let hash = 0;
  const prime = 31;
  for (let i = 0; i < str.length; i++) {
    hash = hash * prime + str.charCodeAt(i);
  }
  return hash.toString(16).padStart(12, '0');
}

const password = "mysecretpassword";
const hashedPassword = hash(password);
console.log(`Hashed password: ${hashedPassword}`);

function hash(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash += str.charCodeAt(i);
  }
  return hash.toString(16).substr(0, 12);
}

const password = "mysecretpassword";
const hashedPassword = hash(password);
console.log(`Hashed password: ${hashedPassword}`);
*/
