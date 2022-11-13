import path from "path";
import multer from "multer";

const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5000000,
  },
  fileFilter: (req, file, cb) => {
    const filetypes = /pdf|pptx|ppt/;
    // Check ext
    const extname = filetypes.test(
      path.extname(file.originalname).toLowerCase()
    );
    // Check mime
    const mimetype = filetypes.test(file.mimetype);

    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb(new Error("Error: PDF and PPT files only!"));
    }
  },
});

export { upload };
