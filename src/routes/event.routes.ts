import { Router } from 'express';
import { EventController } from '../controllers/event.controller';
import { validate, validateParams } from '../middlewares/validation';
import { EventValidation } from '../validations/event.validation';

const router = Router();
const eventController = new EventController();


router.get('/', eventController.getAllEvents);


router.get('/:id', validateParams(EventValidation.ID_PARAM), eventController.getEventById);


router.post('/', validate(EventValidation.CREATE), eventController.createEvent);


router.put('/:id', validateParams(EventValidation.ID_PARAM), validate(EventValidation.UPDATE), eventController.updateEvent);


router.delete('/:id', validateParams(EventValidation.ID_PARAM), eventController.deleteEvent);

export default router;
