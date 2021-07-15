const mongoose = require('mongoose');

const connectDB = async () => {
  try{
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useCreateIndex: true
    })

    console.log(`MongoDB  Connected: ${conn.connection.host}`.cyan.underline)
  } catch (error) {
    console.error(`Error: ${error.message}`.red.underline.bold)
    process.exit(1)
  }
}

// const server = '127.0.0.1:27017'; // REPLACE WITH YOUR OWN SERVER
// const database = 'test';          // REPLACE WITH YOUR OWN DB NAME

//  connectDB = async () => {
//     try {
//         await mongoose.connect(`mongodb://${server}/${database}`, {
//             useNewUrlParser: true,
//             useUnifiedTopology: true,
//             useFindAndModify: false,
//             useCreateIndex: true
//         });

//         console.log('MongoDB connected!!');
//     } catch (err) {
//         console.log('Failed to connect to MongoDB', err);
//     }
// };

// connectDB();

module.exports = connectDB