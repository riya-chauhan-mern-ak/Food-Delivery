import express from 'express';
import { createFoodItem, deleteFoodItem, getFoodItems, updateFoodItem } from '../controllers/foodController.js';
import multer from 'multer';


const foodRouter = express.Router();

//image upload configuration
const storage = multer.diskStorage({
  destination: 'uploads/',
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`); 
    }
});

const upload = multer({ storage: storage });

foodRouter.post('/create', upload.single('image'), createFoodItem);
foodRouter.get('/getall', getFoodItems);
foodRouter.put('/update/:id', upload.single('image'), updateFoodItem); 
foodRouter.delete('/delete/:id', deleteFoodItem); 

export default foodRouter