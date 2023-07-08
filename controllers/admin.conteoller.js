import Admin from "../models/admins.model.js";
import jwt from "jsonwebtoken";
const createAdmin = async (req, res) => {
  try {
    const { first_name, last_name, password, login } = req.body;

    const data = await Admin.create({
      first_name,
      last_name,
      password,
      login,
    });

    res.send({ data });
  } catch (error) {
    res.send({ message: error.message });
  }
};

const login = async (req, res) => {
  try {
    const { login, password } = req.body;

    const data = await Admin.findOne({
      where: {
        login,
        password,
      },
    });

    const token = jwt.sign({ id: data.id }, process.env.SECRET_KEY);

    res.send({
      first_name,
      last_name,
      token,
    });
  } catch (error) {
    res.send({ message: error.message });
  }
};

export { createAdmin, login };
