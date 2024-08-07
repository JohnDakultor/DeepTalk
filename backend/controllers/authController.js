import { AuthService } from "../services/authService.js";
import passport from "passport";
import jwt from "jsonwebtoken";

class AuthController {
  static async signUp(req, res) {
    try {
      const newUser = await AuthService.signUp(req.body);
      res.status(201).send("User created successfully");
    } catch (error) {
      console.error('Error during sign up:', error);
      res.status(500).send(error.message);
    }
  }

  static async login(req, res, next) {
    passport.authenticate("local", async (err, user, info) => {
      if (err) {
        console.error('Passport authentication error:', err);
        return res.status(500).json({ auth: false, message: "Internal server error" });
      }
      if (!user) {
        return res.status(401).json({ auth: false, message: "Invalid email or password" });
      }

      req.logIn(user, async (err) => {
        if (err) {
          console.error('Error during login:', err);
          return res.status(500).json({ auth: false, message: "Error logging in" });
        }

        try {
          const token = jwt.sign({ id: user.id }, process.env.JWT_KEY, { expiresIn: 300 });
          const userData = { id: user.id, email: user.email };

          return res.status(200).json({ auth: true, token: token, result: userData });
        } catch (error) {
          console.error('Error creating token:', error);
          return res.status(500).json({ auth: false, message: "Error creating token" });
        }
      });
    })(req, res, next);
  }

  static async getUser(req, res) {
    try {
      const user = await AuthService.getUser(req.userId);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      return res.status(200).json({ result: user });
    } catch (error) {
      console.error('Error fetching user:', error);
      return res.status(500).json({ message: "error fetching data" });
    }
  }
}

export { AuthController };
