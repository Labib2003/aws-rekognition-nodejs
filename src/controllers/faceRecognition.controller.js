import { rekognitionService } from "../services/faceRecognition.service.js";
import catchAsync from "../utils/catchAsync.js";

const saveNewFace = catchAsync(async (req, res) => {
  const empId = req.body.empid;
  const base64Image = req.file.buffer.toString("base64");

  const response = await rekognitionService.saveNewFace(empId, base64Image);

  res.status(200).json({
    success: true,
    message: "User data saved successfully",
  });
});

const checkMatch = catchAsync(async (req, res) => {
  const base64Image = req.file.buffer;

  const response = await rekognitionService.checkMatch(base64Image);

  res.status(200).json({
    success: true,
    message: "Face matched",
    employeeId: response.ExternalImageId,
  });
});

const deleteFace = catchAsync(async (req, res) => {
  const empId = req.params.id;

  const response = await rekognitionService.deleteFace(empId);

  res.status(200).json({
    success: true,
    message: "Faces deleted successfully",
    data: response,
  });
});

export const faceRecognitionController = {
  saveNewFace,
  checkMatch,
  deleteFace,
};
