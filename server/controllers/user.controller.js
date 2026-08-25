import { email, z } from "zod";
import user from "../Schemas/user.model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import account from "../Schemas/account.model.js";

const schema = z.object({
    FirstName: z.string(),
    lastName: z.string(),
    email: z.string().email(),
    password: z.string().min(6)
});

const loginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6)
})

const updatefirstName = z.object({
    FirstName: z.string()
})

const updatelastName = z.object({
    lastName: z.string()
})

const updatepassword = z.object({
    password: z.string().min(6)
})

const signup = async (req, res) => {
    try {
        const { FirstName, lastName, email, password } = req.body;

        if (schema.safeParse(req.body).success) {

            const User = await user.findOne({ email: email });
            if (User) {
                return res.status(400).send("This email is already in use");
            }
            const hashPassword = await bcrypt.hash(password, 10);
            const newUser = new user({
                firstName: FirstName,
                lastName: lastName,
                email: email,
                password: hashPassword
            })
            await newUser.save();

            const newAccount = new account({
                userId: newUser._id,
                balance: Math.floor(Math.random() * 10000)
            })
            await newAccount.save();

            const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);
            return res.status(200).json({ token, msg: "Account created successfully!" });
        }
        else {
            return res.status(400).send("Invalid data");
        }
    } catch (error) {
        console.log("Error in signup controller", error);
        return res.status(500).send("Internal server error");
    }

}

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (loginSchema.safeParse({ email, password }).success) {
            const User = await user.findOne({ email: email });
            if (User && await bcrypt.compare(password, User.password)) {
                const token = jwt.sign({ id: User._id }, process.env.JWT_SECRET);
                return res.status(200).json({ token, msg: "Login successful!" });
            }
            else {
                return res.status(400).send("Invalid credentials");
            }
        }
        else {
            return res.status(400).send("Invalid data");
        }
    } catch (error) {
        console.log("Error in login controller", error);
        return res.status(500).send("Internal server error");
    }
}

const updateUser = async (req, res) => {
    try {
        const { firstName, lastName, password } = req.body;
        if (!firstName && !lastName && !password) {
            return res.status(400).send("No data provided");
        }
        const userId = req._id;
        const User = await user.findById(userId);
        if (!User) {
            return res.status(404).send("User not found");
        }
        if (firstName && updatefirstName.safeParse({ firstName }).success) {
            User.firstName = firstName;
        }
        if (lastName && updatelastName.safeParse({ lastName }).success) {
            User.lastName = lastName;
        }
        if (password && updatepassword.safeParse({ password }).success) {
            const hashPassword = await bcrypt.hash(password, 10);
            User.password = hashPassword;
        }
        await User.save();
        return res.status(200).send("User updated successfully");
    } catch (error) {
        console.log("Error in updateUser", error);
        return res.status(500).send("Internal server error");
    }
}

const searchUser = async (req,res) => {
    try {
        const { filter, page } = req.query;
        const list = await user.find({
            firstName: {
                $regex: filter,
                $options: 'i' // case-insensitive
            }
        })
        if (!filter) return res.status(400).send("No filter provided");
        let filteredUsers = [];
        // pagination : per page 10 users will be displayed
        for (let i = (page - 1) * 10; i < page * 10 && i < list.length; i++) {
            filteredUsers.push(list[i]);
        }
        return res.status(200).json(filteredUsers);
    } catch (error) {
        console.log("Error in searchUser function", error);
        return res.status(500).send("Internal server error")
    }
}



export { signup, login, updateUser, searchUser };
