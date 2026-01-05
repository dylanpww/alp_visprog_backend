import express, { Request, Response } from 'express';
import { UserController } from '../controllers/user-controller';
import { CategoryController } from '../controllers/category-controller';
import { ProvinceController } from '../controllers/province-controller';
import { DestinationController } from '../controllers/destination-controller';
// import multer from 'multer';
// import { v2 as cloudinary } from 'cloudinary';
// import { CloudinaryStorage } from 'multer-storage-cloudinary';

export const publicRouter = express.Router();

// cloudinary.config({
//     cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//     api_key: process.env.CLOUDINARY_API_KEY,
//     api_secret: process.env.CLOUDINARY_API_SECRET
// });

// const storage = new CloudinaryStorage({
//     cloudinary: cloudinary,
//     params: async (req, file) => {
//         return {
//             folder: 'app_sana_destinations',
//             format: 'jpg',
//             public_id: file.fieldname + '-' + Date.now(),
//             transformation: [
//                 { width: 800, crop: "limit" }, 
//                 { quality: "auto" }
//             ]
//         };
//     },
// });

// const upload = multer({ storage: storage });

// publicRouter.post("/upload-image", upload.single('image'), (req: Request, res: Response) => {
//     if (!req.file) {
//         return res.status(400).json({ errors: "No file uploaded" });
//     }
//     res.status(200).json({
//         data: {
//             url: req.file.path
//         }
//     });
// });

publicRouter.post("/register", UserController.register);
publicRouter.post("/login", UserController.login);

publicRouter.get("/categories", CategoryController.getAllCategories);
publicRouter.get("/categories/:categoryId", CategoryController.getCategory);
publicRouter.post("/categories", CategoryController.createCategory);
publicRouter.put("/categories/:categoryId", CategoryController.updateCategory);
publicRouter.delete("/categories/:categoryId", CategoryController.deleteCategory);

publicRouter.get("/provinces", ProvinceController.getAllProvinces);
publicRouter.get("/provinces/:provinceId", ProvinceController.getProvince);
publicRouter.post("/provinces", ProvinceController.createProvince);
publicRouter.put("/provinces/:provinceId", ProvinceController.updateProvince);
publicRouter.delete("/provinces/:provinceId", ProvinceController.deleteProvince);

publicRouter.get("/destinations", DestinationController.list);
publicRouter.post("/destinations/filter", DestinationController.filter as any);
publicRouter.get("/destinations/:destinationId", DestinationController.get);
publicRouter.post("/destinations", DestinationController.create);
publicRouter.put("/destinations/:destinationId", DestinationController.update);
publicRouter.delete("/destinations/:destinationId", DestinationController.remove);