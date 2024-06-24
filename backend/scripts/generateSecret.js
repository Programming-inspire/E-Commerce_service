const { v4: uuidv4 } = require('uuid');

const secretKey = uuidv4();
console.log(`Your JWT secret key: ${secretKey}`);
