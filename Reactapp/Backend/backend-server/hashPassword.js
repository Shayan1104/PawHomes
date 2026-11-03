const bcrypt = require('bcrypt');

const hashPassword = async () => {
    const plainTextPassword = 'Shayan@461'; // Replace with your password
    const hashedPassword = await bcrypt.hash(plainTextPassword, 10);
    console.log('Hashed Password:', hashedPassword);
};

hashPassword();
