import { Router } from 'express';
import { ReviewController } from '../controllers/review.controller';
import { validate, validateParams } from '../middlewares/validation';
import { ReviewValidation } from '../validations/review.validation';

const router = Router();
const reviewController = new ReviewController();


router.get('/', reviewController.getAllReviews);


router.get('/:id', validateParams(ReviewValidation.ID_PARAM), reviewController.getReviewById);


router.get('/event/:eventId', validateParams(ReviewValidation.EVENT_ID_PARAM), reviewController.getReviewsByEventId);


router.post('/', validate(ReviewValidation.CREATE), reviewController.createReview);


router.put('/:id', validateParams(ReviewValidation.ID_PARAM), validate(ReviewValidation.UPDATE), reviewController.updateReview);


router.delete('/:id', validateParams(ReviewValidation.ID_PARAM), reviewController.deleteReview);

export default router;
