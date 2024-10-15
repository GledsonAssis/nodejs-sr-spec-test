import "dotenv/config";

export default {
  mongoUrl: process.env.MONGO_URL ?? "mongodb://localhost:27017/app",
  port: Number(process.env.APP_PORT ?? 3000),
};
