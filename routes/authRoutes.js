const { Router } = require("express");
const authController = require("../controllers/authController");

const router = Router();

router.get("/signup", (req, res) => {
  res.render("signup");
});
router.post("/signup", authController.signUpUser);
// router.post('/signup', (req, res) => {
//     const result = req.body;
//     console.log(result)
// })
router.get("/verify", (req, res) => {
  res.render("verify");
});
router.post("/verify", authController.verifyEmail);
router.get("/login", (req, res) => {
  res.render("login");
});
router.post("/login", authController.loginUser);

module.exports = router;
