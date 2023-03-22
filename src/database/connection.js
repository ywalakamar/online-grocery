import mongoose from "mongoose";

const dbConn = async () => {
  try {
    await mongoose.connect("mongodb://localhost/grocery", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("DB Connected...");
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

export default dbConn;
