const models = require("../models");

const createContact = async (req, res, next) => {
  try {
    const contact = await models.ContactInfo.create(req.body);
    return res.status(201).json({ contact });
  } catch (err) {
    return next(error);
  }
};

const getAllContacts = async (req, res) => {
  try {
    const contacts = await models.ContactInfo.findAll();
    return res.status(200).json({ contacts });
  } catch (err) {
    return res.status(500).send(err.message);
  }
};

const getContactById = async (req, res) => {
  try {
    const { id } = req.params;
    const contact = await models.ContactInfo.findOne({
      where: { id },
    });
    if (contact) {
      return res.status(200).json({ contact });
    }
    return res.status(404).send("Contact with the specified ID does not exist");
  } catch (err) {
    return res.status(500).send(err.message);
  }
};

const updateContact = async (req, res, next) => {
  try {
    const { id } = req.params;
    const [updated] = await models.ContactInfo.update(req.body, {
      where: { id },
    });
    if (updated) {
      const updatedContact = await models.ContactInfo.findOne({
        where: { id },
      });
      return res.status(200).json({ contact: updatedContact });
    }
    throw new Error("Contact not found");
  } catch (err) {
    return res.status(500).send(err.message);
  }
};

const deleteContact = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deleted = await models.ContactInfo.destroy({
      where: { id },
    });
    if (deleted) {
      return res
        .status(204)
        .json({ message: "Contact deleted", success: true });
    }
    throw new Error("Contact not found");
  } catch (err) {
    return res.status(500).send(err.message);
  }
};

module.exports = {
  createContact,
  getAllContacts,
  getContactById,
  updateContact,
  deleteContact,
};
