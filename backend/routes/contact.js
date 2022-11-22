const express = require("express");
const router = express.Router();

const {
  createContact,
  getContacts,
  updateContact,
  deleteContact,
  getContact,
} = require("../controllers/contact");

router.post("/contact", createContact);
router.get("/contacts", getContacts);
router.get("/contact/:id", getContact);
router.put("/contact/:id", updateContact);
router.delete("/contact/:id", deleteContact);

module.exports = router;
