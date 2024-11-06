import express from "express";

const router = new express.Router();

router.get("/profile", function (req, res) {
    res.send("GET /profile");
  });
  
  router.post("/profile", function (req, res) {
    res.send("POST /profile");
  });
  
  export default router;