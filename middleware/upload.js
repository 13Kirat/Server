const multer = require('multer');

// Configure Multer for temporary file storage before uploading to Cloudinary
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'temp/'); // Temporary folder for storing files before uploading to Cloudinary
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

module.exports = upload;
