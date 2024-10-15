import mongoose from "mongoose";

export interface Model {
  collection: string;
  schema: mongoose.Schema;
}
