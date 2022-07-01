import http from "http";
import app from "./app";
import { config } from "./config";
import { connect } from "./db/connection";

const server = http.createServer(app);
const PORT = config.PORT;

(async function () {
  await connect();

  server.listen(PORT, () => {
    console.log(`listening port ${PORT}`);
  });
})();
