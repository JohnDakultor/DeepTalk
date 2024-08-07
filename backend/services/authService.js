import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { User } from "../models/userModel.js";

class AuthService {
  static async signUp(userData) {
    const { firstName, lastName, email, password } = userData;
    try {
      const existingUser = await new User({ email }).fetch();
      if (existingUser) {
        throw new Error("Email already in use");
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = await new User({
        firstname: firstName,
        lastname: lastName,
        email,
        hash_password: hashedPassword,
      }).save();

      return newUser;
    } catch (error) {
      throw error;
    }
  }

  static async login(userData) {
    const { email, password } = userData;
    try {
      const user = await new User({ email }).fetch();
      if (!user) {
        throw new Error("Invalid email or password");
      }

      const isValidPassword = await bcrypt.compare(
        password,
        user.get("hash_password")
      );
      if (!isValidPassword) {
        throw new Error("Invalid email or password");
      }

      const token = jwt.sign({ id: user.id }, process.env.JWT_KEY, {
        expiresIn: 300,
      });

      return { user: user.toJSON(), token };
    } catch (error) {
      throw error;
    }
  }
}

export { AuthService };
