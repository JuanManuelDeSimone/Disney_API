const {createAccessToken}  = require('../services/auth');

const registerUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res
        .status(400)
        .json({ status: 400, message: "Body cannot be empty" });
    let validate = /^[\w-]+@([\w-]+\.)+[\w-]{2,4}$/g;
    if (!validate.test(email))
      return res
        .status(400)
        .json({ status: 400, message: "Wrong format email" });
    const token = createAccessToken({ email, password });
    return res.status(201).json({ status: 201, accessToken: token });
  } catch (error) {
    console.log(error);
  }
};

module.exports = { registerUser };
