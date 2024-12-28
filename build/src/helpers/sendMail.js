"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _nodemailer = _interopRequireDefault(require("nodemailer"));
var _nodemailerSmtpTransport = _interopRequireDefault(require("nodemailer-smtp-transport"));
require("dotenv/config");
var _default = exports["default"] = function _default(email, subject, html) {
  var transporter = _nodemailer["default"].createTransport((0, _nodemailerSmtpTransport["default"])({
    service: 'gmail',
    host: 'smtp.gmail.com',
    auth: {
      user: process.env.USER_GMAIL,
      pass: process.env.USER_PASS
    }
  }));
  var mailOptions = {
    from: process.env.USER_GMAIL,
    to: email,
    subject: subject,
    html: html
  };
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      //   console.log("Email sent: " + info.response);
    }
  });
};