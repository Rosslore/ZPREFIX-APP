import bcrypt from "bcrypt";
import knexfile from "../knexfile";

const encryptPassword = async (password) => {
  try {
  
    const hash = await bcrypt.hash(password, 10);
    return hash;
  } catch (error) {
    console.log("error hashing password", error);
  }
};

const verifyPassword = async (inputPassword, hashedPassword) => {
  try {
    const verified = bcrypt.compare(inputPassword, hashedPassword);
    console.log("verified :>> ", verified);

    return verified;
  } catch (error) {
    console.log("error verifying password", error);
  }
};

const retrievePassword = async (username) => {
  try {
    const hash = await knexfile('users').select('password').where('username', username)
      .catch(error => {
        throw 'Error retrieving password from database';
      })
  }
  catch (error) {
    return error
  }
  return hash
};

const get




export { encryptPassword, verifyPassword };