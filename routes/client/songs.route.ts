import { Router } from "express";

// create instance Router
const router: Router = Router();

// controller
import * as controller from '../../controllers/client/song.controller';

import * as middlewareUser from '../../middleware/client/user.middleware';

router.get(
    '/:topicSlug',
    controller.index
);

router.get(
    '/detail/:songSlug',
    controller.detail
);

router.patch(
    '/like/:status/:songID',
    middlewareUser.accessLogin,
    controller.like
);

export const songRouter: Router = router;