import { Router } from "express";

// create instance router
const router: Router = Router();

// controller
import * as controller from "../../controllers/client/user.controller";

// validate
import * as validate from "../../validate/client/user.validate";

// use
router.get(
    '/register',
    controller.registerUI
);

router.post(
    '/register',
    // validate.register,
    controller.register
);
// export
export const userRouter: Router = router;