import { Handler, Router } from "express";
import { addResponse } from "../controllers/form";
import { upload } from "../middleware/single-upload";
import { MulterError } from "multer";

const formRouter = Router();

const uploadFile: Handler = (req, res, next) => {
  const singleUpload = upload.single("file"); // file name to be uploaded

  singleUpload(req, res, (err) => {
    if (err instanceof MulterError) {
      return res.status(400).json({ message: err.message });
    } else if (err) {
      return res.status(400).json({ message: err.message });
    }
    next();
  });
};

formRouter.post("/", uploadFile, addResponse);

export default formRouter;
