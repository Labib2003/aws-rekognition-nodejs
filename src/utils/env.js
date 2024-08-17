import dotenv from "dotenv";
dotenv.config();

const env = {
  server: {
    port: process.env.PORT || 3000,
  },
  aws: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID || "",
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || "",
    region: process.env.AWS_REGION || "ap-south-1",
    rekognitionCollectionId: process.env.AWS_REKOGNITION_COLLECTION_ID || "",
  },
};

export default env;
