const express = require("express");
const transactionController = require("./../controllers/transactionController");

const router = express.Router();

router.get("/", transactionController.getAllTransactions);

router.get("/transaction/:id", transactionController.getTransaction);

module.exports = router;
