import { Router } from "express";
import auth from "../Middleware/Auth.js";
import uploadImageController, { uploadMultipleImages } from "../controllers/uploadImageController.js";
import upload from "../Middleware/multer.js";

const uploadRouter = Router();

uploadRouter.post("/upload-single", auth, upload.single('image'), uploadImageController);
uploadRouter.post("/upload-multiple", auth, upload.array('images', 10), uploadMultipleImages);


export default uploadRouter