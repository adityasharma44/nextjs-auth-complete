import mongoose from "mongoose";

export const dbConfig = async () => {
  try {
    mongoose.connect(process.env.DBURL!);
    const connection = mongoose.connection;
    connection.on("connected", () => {
      console.log("mongoDB Connected successfully");
    });

    connection.on("error", (err) => {
      console.log("error connecting mongodb showing" + err);
      process.exit();
    });
  } catch (error) {
    console.log("error connecting mongodb showing" + error);
  }
};
