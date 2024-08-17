import app from "./app.js";
import { rekognition } from "./utils/aws.js";
import env from "./utils/env.js";

const main = async () => {
  app.listen(env.server.port, () => {
    console.log(`Server is running on port ${env.server.port}`);
  });
};

main();
