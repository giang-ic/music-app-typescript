import { Router } from "express";

// create instance router
const router: Router = Router();

// controller
import * as controller from "../../controllers/admin/auth.controller";

// use
router.get(
    '/login',
    controller.loginUI
);

// export
export const AuthRouter: Router = router;