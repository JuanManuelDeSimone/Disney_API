const jwt = require('jsonwebtoken');

const createAccessToken = ({ email, password }) => {
  var jwt = require("jsonwebtoken");
  return jwt.sign({ foo: "bar" }, "shhhhh");
  //return jwt.sign(
  //  {
  //    data: { email, password },
  //  },
  //  "secret",
  //  { expiresIn: "2h" }
  //);
};

const decodeAccessToken = (token) => {
  try {
    const decoded = jwt.decode(token);
    return decoded;
  } catch (error) {
    console.log(error);
  }
};

module.exports = { createAccessToken, decodeAccessToken };
