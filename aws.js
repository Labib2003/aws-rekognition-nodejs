import AWS from "aws-sdk";
import dotenv from "dotenv";
dotenv.config();

AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: "us-east-1",
});

const rekognition = new AWS.Rekognition();

const indexFaces = function(data, callback) {
  console.log("Index new image face ...");
  const objReturn = {};

  rekognition.indexFaces(
    {
      CollectionId: "test",
      DetectionAttributes: ["ALL"], // set detect all atributes on image send.
      ExternalImageId: data.id_user,
      Image: {
        Bytes: new Buffer(data.photo, "base64"),
      },
    },
    function(err, data) {
      if (err) {
        console.log(err, err.stack); // an error occurred

        objReturn.found = false;
        (objReturn.resultAWS = err), err.stack;
        callback(objReturn);
      } else {
        console.log(data.FaceRecords[0].Face); // successful response

        objReturn.found = true;
        objReturn.resultAWS = data.FaceRecords[0].Face;
        callback(objReturn);
      }
    },
  );
};

const search_face = function(obj, callback) {
  const objReturn = {};

  rekognition.searchFacesByImage(
    {
      CollectionId: "test",
      FaceMatchThreshold: 70, //set minumum match in image send
      Image: {
        Bytes: new Buffer(obj.photo, "base64"),
      },
      MaxFaces: 1, // set the number face detect in image send
    },
    function(err, data) {
      if (err) {
        console.log(err);
        callback(err);
      } else {
        if (
          data.FaceMatches &&
          data.FaceMatches.length > 0 &&
          data.FaceMatches[0].Face
        ) {
          console.log(data.FaceMatches[0].Face);
          callback(data.FaceMatches[0].Face);
        } else {
          objReturn.found = false;
          callback(objReturn);
        }
      }
    },
  );
};

export const rekognitionService = {
  indexFaces,
  search_face,
};
