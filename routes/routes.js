const express = require("express");
const router = express.Router();
const Users = require('../models/user'); // Import the User model correctly
const multer = require('multer');

// Image upload configuration
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads');
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + "_" + file.originalname);
    },
});

var upload = multer({
    storage: storage,
}).single('image');

// Insert a user into the database route
router.post('/add', upload, (req, res) => {
    const User = new Users({  // Use 'newUser' to avoid conflict
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        image: req.file.filename,
    });

    User.save() // Use 'newUser' instead of 'User'
        .then(() => {
            req.session.message = {
                type: 'success',
                message: 'User added successfully!',
            };
            res.redirect('/');
        })
        .catch((err) => {
            res.json({ message: err.message, type: 'danger' });
        });
});

// Get all users route data
router.get("/", async (req, res) => {
    try {
        const users = await Users.find(); // Fetch users using 'Users' model
        res.render("index", {
            title: "Home Page",
            users: users,
            message: req.session.message, // Pass any messages if needed
        });
    } catch (err) {
        res.json({ message: err.message });
    }
});

router.get("/add", (req, res) => {
    res.render("add_users", { title: "Add Users" });
});

module.exports = router;
