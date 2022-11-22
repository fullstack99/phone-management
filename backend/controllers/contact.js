const mongoose = require("mongoose");

const contactSchema = require("../models/Contact");

exports.createContact = async (req, res, next) => {
  contactSchema.create(req.body, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.json({
        ...req.body,
        _id: data._id,
      });
    }
  });
};

exports.getContacts = async (req, res, next) => {
  contactSchema.find((error, data) => {
    if (error) {
      return next(error);
    } else {
      res.json(data);
    }
  });
};

exports.getContact = async (req, res, next) => {
  contactSchema.findById(req.params.id, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.json(data);
    }
  });
};

exports.updateContact = async (req, res, next) => {
  contactSchema.findByIdAndUpdate(
    req.params.id,
    {
      $set: req.body,
    },
    (error, data) => {
      if (error) {
        return next(error);
      } else {
        res.status(200).json({
          success: true,
          message: "Contact updated successfully !",
        });
      }
    }
  );
};

exports.deleteContact = async (req, res, next) => {
  contactSchema.findByIdAndRemove(req.params.id, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.status(200).json({
        success: true,
        message: "Contact deleted successfully !",
      });
    }
  });
};
