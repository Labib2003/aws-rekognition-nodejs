import { Router } from "express";
import faceRecognitionRouter from "./faceRecognition.routes.js";

const router = Router();

const routes = [{ path: "/", route: faceRecognitionRouter }];

routes.forEach((route) => router.use(route.path, route.route));

export default router;
