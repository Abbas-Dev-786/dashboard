const express = require("express");
const userController = require("./../controllers/userController");

const router = express.Router();

router.get("/customers", userController.getAllCustomers);

router.get("/geography", userController.getGeography);

router.get("/user/:id", userController.getUser);

module.exports = router;
