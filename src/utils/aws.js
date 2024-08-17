import AWS from "aws-sdk";
import env from "./env.js";

AWS.config.update({
  accessKeyId: env.aws.accessKeyId,
  secretAccessKey: env.aws.secretAccessKey,
  region: env.aws.region,
});

export const rekognition = new AWS.Rekognition();
