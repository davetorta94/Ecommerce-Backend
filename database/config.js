const mongoose = require('mongoose');

const dbConnection = async() => {

    try {

        await mongoose.connect(process.env.DB_CNN, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
          });

            console.log('DB Online')
        
    } catch (error) {
        console.error('Database connection error:', error.message);
        throw new Error('la conexión con la base de datos ha fallado');
    }
}


module.exports = { dbConnection }