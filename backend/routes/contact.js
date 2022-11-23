const express = require("express");
const router = express.Router();

const {
  createContact,
  getContacts,
  updateContact,
  deleteContact,
  getContact,
} = require("../controllers/contact");

router.post("/contacts", createContact);
router.get("/contacts", getContacts);
router.get("/contacts/:id", getContact);
router.put("/contacts/:id", updateContact);
router.delete("/contacts/:id", deleteContact);

module.exports = router;
