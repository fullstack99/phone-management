const express = require("express");
const router = express.Router();

const {
  createContact,
  getAllContacts,
  updateContact,
  deleteContact,
  getContactById,
} = require("../controllers/contact");

router.post("/contacts", createContact);
router.get("/contacts", getAllContacts);
router.get("/contacts/:id", getContactById);
router.put("/contacts/:id", updateContact);
router.delete("/contacts/:id", deleteContact);

module.exports = router;
