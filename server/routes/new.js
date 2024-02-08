const express = require('express');
const multer = require('multer');
const router = express.Router();
const Image = require('../moongoose'); // Adjust the path as necessary

// Configure storage
const storage = multer.memoryStorage();

// Initialize upload
const upload = multer({ 
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // Limit file size
  fileFilter: function (req, file, cb) {
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
      return cb(new Error('Only image files are allowed!'), false);
    }
    cb(null, true);
  }
});

// Route to handle file upload
router.post('/upload', upload.single('image'), (req, res) => {
  // Access uploaded file through req.file
  if (!req.file) {
    return res.status(400).send('No files were uploaded.');
  }

  // Proceed with your logic to handle the uploaded file
  // For example, saving it to MongoDB

  res.send('File uploaded successfully.');
});

router.get('/image/:id', async (req, res) => {
    try {
      const image = await Image.findById(req.params.id); // Find the image by ID
  
      if (!image || !image.image.data) {
        return res.status(404).send('Image not found');
      }
  
      // Set the content type of the response
      res.contentType(image.image.contentType);
  
      // Send the image data to the client
      res.send(image.image.data);
    } catch (error) {
      console.error(error);
      res.status(500).send('Server error');
    }
  });

module.exports = router;



