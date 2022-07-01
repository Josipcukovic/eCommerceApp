import mongoose, { ConnectOptions } from "mongoose";
import { config } from "../config";

mongoose.set("runValidators", true);

async function connect() {
  mongoose.connect(config.MONGO_ATLAS_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  } as ConnectOptions);
}

mongoose.connection.once("open", () => {
  console.log("db is connected");
});

mongoose.connection.on("error", (error) => {
  console.error(error);
});

export { connect };
