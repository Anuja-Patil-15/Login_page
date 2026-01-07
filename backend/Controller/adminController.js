const db = require('../Database/db');
const bcrypt = require('bcrypt');
const generatePassword = require('../Utils/generatePassword');

//create admin
exports.createAdmin = async (req, res) => {
  const { name, phone, email } = req.body;

  try {
    const password = generatePassword();
    const hashedPassword = await bcrypt.hash(password, 10);

    const sql = `
      insert into users (role, name, phone, email, password)
      values ('admin', ?, ?, ?, ?)
    `;

    db.query(sql, [name, phone, email, hashedPassword], (err) => {
      if (err) {
        if (err.code === 'ER_DUP_ENTRY') {
          return res.status(400).json({
            message: "Admin with this email already exists"
          });
        }

        return res.status(500).json({ message: "Server error" });
      }

      return res.status(201).json({
        message: "Admin created successfully",
        admin: {
          name,
          email,
          phone
        },
        password,
        note: "Save this password securely. It will not be shown again."
      });
    });

  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

//admin login

exports.loginAdmin = async (req, res) => {
  const { email, password } = req.body;

  const sql = `select * from users where email=? and role='admin'`;

  db.query(sql, [email], async (err, result) => {
    if (err) 
      return res.status(500).json({ message: "Server error" });
    if (result.length === 0) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const admin = result[0];
    const match = await bcrypt.compare(password, admin.password);

    if (!match) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    res.json({
      message: "Admin login successful",
      name: admin.name,
      email: admin.email
    });
  });
};





