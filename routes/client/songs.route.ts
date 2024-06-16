import { Router } from "express";

// create instance Router
const router: Router = Router();

// controller
import * as controller from '../../controllers/client/song.controller';

router.get(
    '/:topicSlug',
    controller.index
);

router.get(
    '/detail/:songSlug',
    controller.detail
);

export const songRouter: Router = router;