const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Configure storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadDir = `./uploads/tasks/${req.user.id}/${req.params.taskId}`;

    // Create directory if it doesn't exist
    fs.access(uploadDir, (error) => {
      if (error) {
        return fs.mkdir(uploadDir, { recursive: true }, (err) => {
          cb(err, uploadDir);
        });
      } else {
        return cb(null, uploadDir);
      }
    });
  },
  filename: function (req, file, cb) {
    // Create unique filename with original extension
    const extension = path.extname(file.originalname);
    const filename = Date.now() + '-' + Math.round(Math.random() * 1E9) + extension;
    cb(null, filename);
  }
});

// File filter to only allow image files
const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png/;
  const extension = path.extname(file.originalname).toLowerCase().substring(1);
  const mimeTypeValid = allowedTypes.test(file.mimetype.split('/')[1]);
  const extValid = allowedTypes.test(extension);

  if (mimeTypeValid && extValid) {
    return cb(null, true);
  }

  cb(null, false);
};

// Export multer middleware
module.exports = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB file size limit
  }
});
