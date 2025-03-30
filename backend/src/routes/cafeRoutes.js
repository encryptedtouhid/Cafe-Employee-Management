const express = require('express');
const router = express.Router();
const cafeController = require('../controllers/cafeController');
const multer = require('multer');
const path = require('path');

// Set up multer for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/logos');
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

// File filter to only accept image files
const fileFilter = (req, file, cb) => {
    const allowedFileTypes = /jpeg|jpg|png|gif/;
    const extname = allowedFileTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedFileTypes.test(file.mimetype);

    if (extname && mimetype) {
        return cb(null, true);
    } else {
        cb(new Error('Only image files are allowed!'));
    }
};

// File size limit (2MB)
const limits = {
    fileSize: 2 * 1024 * 1024 // 2MB
};

const upload = multer({
    storage,
    fileFilter,
    limits
});

// GET /cafes - Get all cafes or filter by location
router.get('/', cafeController.getCafes);

// GET /cafes/:id - Get a specific cafe by ID
router.get('/:id', cafeController.getCafeById);

// POST /cafe - Create a new cafe
router.post('/', upload.single('logo'), cafeController.createCafe);

// PUT /cafe/:id - Update an existing cafe
router.put('/:id', upload.single('logo'), cafeController.updateCafe);

// DELETE /cafe/:id - Delete a cafe
router.delete('/:id', cafeController.deleteCafe);

module.exports = router;