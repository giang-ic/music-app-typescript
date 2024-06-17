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

router.patch(
    '/like/:songID',
    controller.like
);

export const songRouter: Router = router;