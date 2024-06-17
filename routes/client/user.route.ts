import { Router } from "express";

// create instance router
const router: Router = Router();

// controller
import * as controller from "../../controllers/client/user.controller";

// use
router.get(
    '/register',
    controller.registerUI
);

router.post(
    '/register',
    controller.register
);
// export
export const userRouter: Router = router;