import { Router } from "express";

// create instance Router
const router: Router = Router();

// controller
import * as controller from '../../controllers/client/song.controller';

import * as middlewareUser from '../../middleware/client/user.middleware';

router.get(
    '/favorite',
    controller.listFavorite
);

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
    middlewareUser.accessActive,
    controller.like
);

router.patch(
    '/favorite/:status/:songID',
    middlewareUser.accessActive,
    controller.favorite
);

export const songRouter: Router = router;