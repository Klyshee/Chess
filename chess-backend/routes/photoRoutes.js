
const express = require('express');
const multer = require('multer');
const Photo = require('../models/photo');

const router = express.Router();
const storage = multer.memoryStorage();
const upload = multer({ storage });


router.post('/upload', upload.single('photo'), async (req, res) => {
  try {
    const newPhoto = new Photo({
      filename: req.file.originalname,
      contentType: req.file.mimetype,
      image: { data: req.file.buffer, contentType: req.file.mimetype },
    });
    await newPhoto.save();
    res.status(201).json({ message: 'Photo uploaded successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error uploading photo', error });
  }
});


router.get('/:id', async (req, res) => {
  try {
    const photo = await Photo.findById(req.params.id);
    if (!photo) {
      return res.status(404).json({ message: 'Photo not found' });
    }
    res.set('Content-Type', photo.contentType);
    res.send(photo.image.data);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving photo', error });
  }
});

module.exports = router;
