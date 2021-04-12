import express from "express";
const router = express.Router();
import { verifyToken } from "../middleware/middleware.js";

router.get("/", verifyToken,(req, res) => {
  res.send("This is homepage");
});

export default router;
