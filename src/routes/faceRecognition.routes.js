import { Router } from "express";
import { upload } from "../utils/multer.js";
import { faceRecognitionController } from "../controllers/faceRecognition.controller.js";

const faceRecognitionRouter = Router();

faceRecognitionRouter
  .route("/save")
  .post(upload.single("image"), faceRecognitionController.saveNewFace);
faceRecognitionRouter
  .route("/checkmatch")
  .post(upload.single("image"), faceRecognitionController.checkMatch);
faceRecognitionRouter
  .route("/delete/:id")
  .delete(faceRecognitionController.deleteFace);

export default faceRecognitionRouter;
