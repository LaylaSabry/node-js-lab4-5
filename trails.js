// const bcrypt = require("bcrypt");

// (async () => {
//     const hash = await bcrypt.hash("12345678", 10);
//     console.log(hash);
//     // $2b$10$RCqrbmU8fSzHiuar4PxAcOrftqjf6kH3QjAYp/uvj7l9eSmw/079G => database
//     const valid = await bcrypt.compare("12345678", "$2b$10$RCqrbmU8fSzHiuar4PxAcOrftqjf6kH3QjAYp/uvj7l9eSmw/079G")
//     console.log(valid);
// })()

// const h = async ()=>{
//     const valid = await bcrypt.compare("12345678", "$2b$10$RCqrbmU8fSzHiuar4PxAcOrftqjf6kH3QjAYp/uvj7l9eSmw/079G")
//     return valid
// }

// h().then((res)=>{
//     console.log(res);
// })

const jwt = require("jsonwebtoken");

const result = jwt.sign({
    id: 1,
    isAdmin: true
}, "Put you server secret key here")

console.log(result);

//eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaXNBZG1pbiI6dHJ1ZSwiaWF0IjoxNjQxOTA0MTQ2fQ.X7xnqKyqZId72M4u0txGcLfoW7iD3iZ4FSM0BLvC12E

// const isValidToken = jwt.verify("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaXNBZG1pbiI6dHJ1ZSwiaWF0IjoxNjQxOTMzMTY2fQ.hNvq61naISLjqyuvXJR9vFnIjYxRXltk6BtGM0bJTPM", "secretKey")
// console.log(isValidToken);


//client
// const decode = jwt.decode("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaXNBZG1pbiI6dHJ1ZSwiaWF0IjoxNjQxOTMzMTY2fQ.hNvq61naISLjqyuvXJR9vFnIjYxRXltk6BtGM0bJTPM")
// console.log("decode", decode);