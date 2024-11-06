import express from "express";

import loginRouter from "./login.router.js";
import taskRouter from "./task.router.js";
import profileRouter from "./profile.router.js";

const router = new express.Router();

router.use(loginRouter);
router.use(taskRouter);
router.use(profileRouter);

export default router;