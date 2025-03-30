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

/**
 * @swagger
 * /cafes:
 *   get:
 *     summary: Get all cafes or filter by location
 *     description: Retrieve a list of cafes, optionally filtered by location. Returns cafes sorted by the highest number of employees first.
 *     parameters:
 *       - in: query
 *         name: location
 *         schema:
 *           type: string
 *         description: Location to filter cafes by
 *     responses:
 *       200:
 *         description: A list of cafes
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Cafe'
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get('/', cafeController.getCafes);

/**
 * @swagger
 * /cafes/{id}:
 *   get:
 *     summary: Get a specific cafe by ID
 *     description: Retrieve detailed information about a specific cafe by its ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: UUID of the cafe
 *     responses:
 *       200:
 *         description: Detailed cafe information
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Cafe'
 *       404:
 *         description: Cafe not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get('/:id', cafeController.getCafeById);

/**
 * @swagger
 * /cafe:
 *   post:
 *     summary: Create a new cafe
 *     description: Create a new cafe with the provided information
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - description
 *               - location
 *             properties:
 *               name:
 *                 type: string
 *                 description: Name of the cafe (6-10 characters)
 *                 example: JavaBeans
 *               description:
 *                 type: string
 *                 description: Description of the cafe (max 256 characters)
 *                 example: A cozy cafe with premium coffee
 *               location:
 *                 type: string
 *                 description: Location of the cafe
 *                 example: Central
 *               logo:
 *                 type: string
 *                 format: binary
 *                 description: Logo image file (max 2MB)
 *     responses:
 *       201:
 *         description: Cafe created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Cafe'
 *       400:
 *         description: Invalid input
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.post('/', upload.single('logo'), cafeController.createCafe);

/**
 * @swagger
 * /cafe/{id}:
 *   put:
 *     summary: Update an existing cafe
 *     description: Update an existing cafe with the provided information
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: UUID of the cafe
 *     requestBody:
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Name of the cafe (6-10 characters)
 *                 example: CuppaJoy
 *               description:
 *                 type: string
 *                 description: Description of the cafe (max 256 characters)
 *                 example: Updated cafe description
 *               location:
 *                 type: string
 *                 description: Location of the cafe
 *                 example: East
 *               logo:
 *                 type: string
 *                 format: binary
 *                 description: Logo image file (max 2MB)
 *     responses:
 *       200:
 *         description: Cafe updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Cafe'
 *       400:
 *         description: Invalid input
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       404:
 *         description: Cafe not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.put('/:id', upload.single('logo'), cafeController.updateCafe);

/**
 * @swagger
 * /cafe/{id}:
 *   delete:
 *     summary: Delete a cafe
 *     description: Delete a cafe and all its employees
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: UUID of the cafe
 *     responses:
 *       200:
 *         description: Cafe deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Cafe deleted successfully
 *       404:
 *         description: Cafe not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.delete('/:id', cafeController.deleteCafe);

module.exports = router;