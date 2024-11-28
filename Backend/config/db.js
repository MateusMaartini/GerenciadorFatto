const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_DB_URI, {
      dbName: process.env.MONGO_DB_NAME, // Nome do banco de dados
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Conectado ao MongoDB");
  } catch (error) {
    console.error("Erro ao conectar ao MongoDB:", error);
    process.exit(1); // Finaliza o processo se não conseguir conectar
  }
};

module.exports = connectDB;
