import { Router } from "express";

// create instance Router
const router: Router = Router();

// controller
import * as controller from '../../controllers/client/song.controller';

router.get(
    '/',
    controller.index
);

export const songRouter: Router = router;