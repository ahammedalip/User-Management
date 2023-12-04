import express from "express";
import { makeAdmin, test, userlist } from "../controllers/adminController.js";

const router= express.Router();

router.get('/test', test)
router.get('/userlist', userlist)
router.post('/makeadmin/:id',makeAdmin)

export default router;