const { upload } = require("../utils/multerUtils");
const setUploadType = (type) => (req, res, next) => {
  req.uploadType = type;
  next();
};

const uploadProfile = [setUploadType("profile"), upload.single("avatar")];
const uploadStore = [setUploadType("store"), upload.single("avatar")];
const uploadSpace = [setUploadType("space"), upload.single("avatar")];

module.exports = { uploadProfile, uploadStore, uploadSpace };
