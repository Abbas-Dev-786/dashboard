const express = require("express");
const userController = require("./../controllers/userController");

const router = express.Router();

router.get("/customers", userController.getAllCustomers);

router.get("/admins", userController.getAllAdmins);

router.get("/geography", userController.getGeography);

router.get("/user/:id", userController.getUser);

router.get("/performance/:id", userController.getUserPerformance);

module.exports = router;
