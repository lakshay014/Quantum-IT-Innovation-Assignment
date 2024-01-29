const express = require("express");
const {
  registerUser,
  authUser,
  GenerateData,
} = require("../controllers/userController");
const { protect } = require("../middlewares/authMiddleware");

const router = express.Router();

router.route("/").post(registerUser);
router.post("/login", authUser);
router.get("/dashboard" , protect , GenerateData);

module.exports = router;