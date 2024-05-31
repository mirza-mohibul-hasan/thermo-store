const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    let uploadPath;
    if (req.uploadType === "profile") {
      uploadPath = path.join(__dirname, "./public/uploads/profile");
    } else if (req.uploadType === "store") {
      uploadPath = path.join(__dirname, "./public/uploads/store");
    } else if (req.uploadType === "space") {
      uploadPath = path.join(__dirname, "./public/uploads/space");
    } else {
      return cb(new Error("Invalid upload type"), false);
    }
    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    const timestamp = Date.now();
    const userEmail = req.body.email;
    const sanitizedEmail = userEmail
      ? userEmail.replace(/[^a-zA-Z0-9]/g, "")
      : "unknown";
    const extension = path.extname(file.originalname);
    const filename = `${req.uploadType}_${sanitizedEmail}_${timestamp}${extension}`;
    cb(null, filename);
  },
});

const fileFilter = function (req, file, cb) {
  if (file.mimetype.startsWith("image/")) {
    cb(null, true);
  } else {
    cb(new Error("Only image files are allowed!"), false);
  }
};

const upload = multer({ storage: storage, fileFilter: fileFilter });

module.exports = { storage, fileFilter, upload };
