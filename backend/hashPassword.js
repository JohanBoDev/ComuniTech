const bcrypt = require('bcrypt');

async function generateHash() {
    const hashedPassword = await bcrypt.hash('johan123', 10);
    console.log(hashedPassword);
}

generateHash();
