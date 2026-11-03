const express = require('express')
const { signup } = require('../controllers/authController')
const { registerShelter } = require('../controllers/userController'); // New controller
const authMiddleware = require('../middlewares/authMiddle'); // Your auth middleware
const route = express.Router()
const multer = require('multer');
route.post('/signup',signup)
// Multer storage setup
const storage = multer.diskStorage({
     destination: (req, file, cb) => {
     cb(null, "uploads/");
     },
     filename: (req, file, cb) => {
     cb(null, Date.now() + "-" + file.originalname);
     },
    });
    
const upload = multer({ storage });
    
    
const router = express.Router();
    
router.post('/registeryourshelter', authMiddleware, upload.single("verificationDocument"), registerShelter); // Protected route
    
module.exports= route