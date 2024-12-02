const express = require("express");
const router = express.Router();
const controller = require("./controller");

router.post('/generate-qr',controller.generateQr);




module.exports = router;