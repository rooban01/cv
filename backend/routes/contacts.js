const express = require("express");
const router = express.Router();
const ContactController = require("../controllers/contacts");


const checkAuth = require("../middleware/check-auth");
const extractFile = require("../middleware/file");




router.get("",ContactController.getContacts);

router.post("", checkAuth, ContactController.createContact);

router.get("/:id",ContactController.getContact);

router.put("/:id", checkAuth,extractFile,ContactController.updateContact);

router.delete("/:id",  checkAuth,extractFile, ContactController.deleteContact);

module.exports = router;
