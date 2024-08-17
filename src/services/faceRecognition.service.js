import { rekognition } from "../utils/aws.js";
import env from "../utils/env.js";
import prisma from "../utils/prisma.js";

const searchFacesByImage = async (base64Image) => {
  return await rekognition
    .searchFacesByImage({
      CollectionId: env.aws.rekognitionCollectionId,
      FaceMatchThreshold: 70, //set minumum match in image send
      Image: {
        Bytes: new Buffer.from(base64Image, "base64"),
      },
      MaxFaces: 1, // set the number face detect in image send
    })
    .promise();
};

const indexFaces = async (empId, base64Image) => {
  return await rekognition
    .indexFaces({
      CollectionId: env.aws.rekognitionCollectionId,
      DetectionAttributes: ["ALL"], // set detect all atributes on image send.
      ExternalImageId: empId,
      Image: {
        Bytes: new Buffer.from(base64Image, "base64"),
      },
    })
    .promise();
};

const saveNewFace = async (empId, base64Image) => {
  const existingMatches = await searchFacesByImage(base64Image);
  let response;

  if (existingMatches.FaceMatches.length) {
    if (existingMatches.FaceMatches[0].Face.ExternalImageId !== empId)
      throw new Error("Face already exists with different employee id");
    response = await indexFaces(empId, base64Image);
  } else {
    const empIdTaken = await prisma.takenIds.findUnique({ where: { empId } });
    if (empIdTaken) throw new Error("Employee id already exists");

    await prisma.takenIds.create({ data: { empId } });
    response = await indexFaces(empId, base64Image);
  }

  if (!response.FaceRecords.length)
    throw new Error("No faces found in the uploaded image");
  if (response.FaceRecords.length > 1)
    throw new Error("Multiple faces found in the uploaded image");
  await prisma.takenIds.update({
    where: { empId },
    data: { faceIds: { push: response.FaceRecords[0].Face.FaceId } },
  });

  return response.FaceRecords[0].Face;
};

const checkMatch = async (base64Image) => {
  const response = await searchFacesByImage(base64Image);

  if (!response.FaceMatches?.length) throw new Error("Image not matched");

  return response.FaceMatches[0].Face;
};

const deleteFace = async (empId) => {
  const record = await prisma.takenIds.findFirst({
    where: { empId },
  });
  if (!record) throw new Error("Employee id not found");

  const params = {
    CollectionId: env.aws.rekognitionCollectionId,
    FaceIds: [...new Set(record.faceIds)],
  };

  const response = await rekognition.deleteFaces(params).promise();
  await prisma.takenIds.delete({ where: { empId } });

  return response;
};

export const rekognitionService = {
  saveNewFace,
  checkMatch,
  deleteFace,
};
