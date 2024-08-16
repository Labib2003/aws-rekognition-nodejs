import express from "express";
import { rekognitionService } from "./aws.js";
import { upload } from "./multer.js";
import globalErrorHandler from "./globalErrorHandler.js";
const router = express.Router();

router.post("/save", upload.single("image"), function(req, res) {
  const base64Image = req.file.buffer.toString("base64");
  console.log(base64Image, req.body.empid);

  //recive params photo in base64 and any string represent id.
  const obj = {
    photo: base64Image,
    id_user: req.body.empid,
  };

  //calling method API AWS to index face.
  rekognitionService.indexFaces(obj, function(data) {
    if (data.found)
      res.json({ success: true, message: "Image saved successfully" });
    else res.json({ success: false, data: data });
  });
});

/* Method - Detect face of users by photo.
   Recive - Photo in format base 64.
   Return - Return result of reconize.
*/
router.post("/checkmatch", upload.single("image"), function(req, res) {
  const base64Image = req.file.buffer.toString("base64");
  //recive param photo in base64.
  const obj = {
    photo: base64Image,
  };

  //calling method API AWS to recoknition face.
  rekognitionService.search_face(obj, function(data) {
    if (!data.ExternalImageId)
      res.json({ success: false, message: "No match found" });
    else
      res.json({
        success: true,
        message: "Match found",
        data: { empId: data.ExternalImageId },
      });
  });
});

var app = express();

//Use application-level middleware for common functionality, including
app.use("/api", router);
app.use(globalErrorHandler);

const port_runing = 3000;
app.listen(port_runing);
