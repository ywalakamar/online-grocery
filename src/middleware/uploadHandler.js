import path from "path";
import multer from "multer";

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "public/assets/");
  },
  filename: (req, file, callback) => {
    let ext = path.extname(file.originalname);
    console.log(ext);
    callback(null, Date.now() + ext);
  },
});

const upload = multer({
  storage,
  fileFilter: (req, file, callback) => {
    if (
      file.mimetype == "image/png" ||
      file.mimetype == "image/jpg" ||
      file.mimetype == "image/jpeg"
    ) {
      callback(null, true);
    } else {
      console.log("File Format Not Supported");
      callback(null, false);
    }
  },
  limits: { fileSize: 1024 * 1024 * 2 },
});

export default upload;
