import mongoose from "mongoose";
import dns from "node:dns";

const fallbackDnsServers = ["8.8.8.8", "1.1.1.1"];

export const connectDB = async () => {
  try {
    const connection = await mongoose.connect(process.env.MONGO_URI);

    console.log(`MongoDB connected: ${connection.connection.host}`);
  } catch (error) {
    if (error.code === "ECONNREFUSED" && error.message.includes("querySrv")) {
      try {
        dns.setServers(fallbackDnsServers);
        const connection = await mongoose.connect(process.env.MONGO_URI);

        console.log(`MongoDB connected: ${connection.connection.host}`);
        return;
      } catch (retryError) {
        console.error(`MongoDB connection failed: ${retryError.message}`);
        process.exit(1);
      }
    }

    console.error(`MongoDB connection failed: ${error.message}`);
    process.exit(1);
  }
};
