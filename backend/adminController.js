const db=require('./db');
const bcrypt =require('bcrypt');
const generatePassword=require('./generatePassword');

//create login
  exports.createAdmin = async (req, res) => {
  const { name, phone, email } = req.body;

  const password = generatePassword();
  const hashedPassword = await bcrypt.hash(password, 10);

  const sql = `
    INSERT INTO users (role, name, phone, email, password)
    VALUES ('admin', ?, ?, ?, ?)
  `;

  db.query(sql, [name, phone, email, hashedPassword], (err) => {
    if (err) {
      return res.status(400).json({ message: "Admin already exists" });
    }

    res.status(201).json({
      message: "Admin created",
      email:email,
      password:password,
      note:"save the password.It will not shown again"
    });
  });
};

//admin login
exports.loginAdmin = async (req, res) => {
  const { email, password } = req.body;

  const sql = `SELECT * FROM users WHERE email=? AND role='admin'`;

  db.query(sql, [email], async (err, result) => {
    if (err || result.length === 0) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const admin = result[0];
    const match = await bcrypt.compare(password, admin.password);

    if (!match) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    res.json({
      message: "Admin login successful",
      name: admin.name
    });
  });
};

//create agent
exports.createAgent = (req, res) => {
  const { name, phone, email } = req.body;

  const sql = `INSERT INTO agents (name, phone, email) VALUES (?, ?, ?)`;

  db.query(sql, [name, phone, email], (err) => {
    if (err) {
      return res.status(500).json({ message: "Error creating agent" });
    }

    res.status(201).json({ message: "Agent created successfully" });
  });
};

//create desk
exports.createDesk = (req, res) => {
  const { desk_name, location } = req.body;

  const sql = `INSERT INTO desks (desk_name, location) VALUES (?, ?)`;

  db.query(sql, [desk_name, location], (err) => {
    if (err) {
      return res.status(500).json({ message: "Error creating desk" });
    }

    res.status(201).json({ message: "Desk created successfully" });
  });
};

