import express from "express";
import cors from "cors";
import mysql2 from "mysql2";
import dotenv from "dotenv";
// import multer from "multer";
// import pdfParse from "pdf-parse";
// import cloudinary from "cloudinary";
// import fs from "fs";

dotenv.config();
const app = express();
app.use(cors()); 
app.use(express.json()); 
// cloudinary.v2.config({
//   cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//   api_key: process.env.CLOUDINARY_API_KEY,
//   api_secret: process.env.CLOUDINARY_API_SECRET,
// });

// const upload = multer({ dest: "uploads/" });



const db = mysql2.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
});

db.connect((err) => {
  if (err) {
    console.error("❌ MySQL connection failed:", err);
    process.exit(1);
  }
  console.log("✅ Connected to Aiven MySQL");
});

// SIGNUP API
app.post("/api/signup", (req, res) => {
  const { name, email, gender, age, password, role } = req.body;

  const sql = `
    INSERT INTO users (name, email, gender, age, password, role)
    VALUES (?, ?, ?, ?, ?, ?)
  `;

  db.query(sql, [name, email, gender, age, password, role], (err, result) => {
    if (err) {
      console.error("Error inserting user:", err);
      return res.status(500).json({ error: "Internal server error" });
    }
    res.status(201).json({ message: "User registered successfully!" });
  });
});


// LOGIN API
app.post("/api/login", (req, res) => {
  const { email, password, role } = req.body;

  console.log("🟡 Login Attempt:");
  console.log("➡ Email:", email);
  console.log("➡ Password:", password);
  console.log("➡ Role:", role);

  if (!email || !password || !role) {
    console.warn("⚠ Missing email, password, or role");
    return res.status(400).json({ error: "Email, password, and role are required." });
  }

  const sql = `SELECT id, name, email, password, role FROM users WHERE email = ? AND role = ?`;

  db.query(sql, [email, role], (err, results) => {
    if (err) {
      console.error("❌ Error during login:", err);
      return res.status(500).json({ error: "Internal server error" });
    }

    if (results.length === 0) {
      console.warn("❌ No user found with this email and role");
      return res.status(401).json({ error: "Invalid email or role" });
    }

    const user = results[0];
    console.log("✅ User Found:", user.email, "Role:", user.role);

    if (user.password === password) {
      console.log("✅ Password matched. Login successful!");

      // Dummy token for demonstration (replace with JWT in production)
      const token = "dummy-token";

      const userData = {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      };

      return res.status(200).json({
        success: true,
        message: "Login successful!",
        user: userData,
        token,
      });
    } else {
      console.warn("❌ Password mismatch");
      return res.status(401).json({ error: "Invalid password" });
    }
  });
});

app.post("/documents", (req, res) => {
  const { fileUrl } = req.body;
  if (!fileUrl) {
    return res.status(400).json({ error: "No fileUrl provided" });
  }

  const sql = "INSERT INTO documents (file_url, uploaded_at) VALUES (?, NOW())";
  db.query(sql, [fileUrl], (err, result) => {
    if (err) {
      console.error("Error saving document:", err);
      return res.status(500).json({ error: "Failed to save document" });
    }
    res.status(201).json({ message: "Document saved successfully!" });
  });
});

app.get("/documents-pull", (req, res) => {
  const userId = req.query.user_id; // or req.user.id if from auth

  if (!userId) {
    return res.status(400).json({ error: "User ID is required" });
  }

  db.query(
    "SELECT id, file_url, uploaded_at FROM documents WHERE user_id = ? ORDER BY uploaded_at DESC",
    [userId],
    (err, results) => {
      if (err) {
        console.error("Error fetching documents:", err);
        return res.status(500).json({ error: "Failed to fetch documents" });
      }
      res.json({ documents: results });
    }
  );
});

// app.post("/upload", upload.single("file"), async (req, res) => {
//   try {
//     if (!req.file) return res.status(400).json({ error: "No file uploaded" });

//     const filePath = req.file.path;
//     const dataBuffer = fs.readFileSync(filePath);

//     const pdfData = await pdfParse(dataBuffer);
//     const extractedText = pdfData.text;

//     const cloudinaryResult = await cloudinary.v2.uploader.upload(filePath, {
//       folder: "verimed-pdfs",
//       resource_type: "raw",
//     });

//     try {
//       fs.unlinkSync(filePath);
//     } catch (unlinkErr) {
//       console.warn("⚠ Could not delete temp file:", unlinkErr.message);
//     }

//     // Optional: save in MySQL
//     const sql = "INSERT INTO documents (file_url, extracted_text) VALUES (?, ?)";
//     db.query(sql, [cloudinaryResult.secure_url, extractedText], (err) => {
//       if (err) console.error("❌ Error saving to DB:", err);
//     });

//     res.json({
//       cloudinaryUrl: cloudinaryResult.secure_url,
//       extractedText,
//     });

//   } catch (error) {
//     console.error("Error processing PDF:", error);
//     res.status(500).json({ error: "Failed to process PDF" });
//   }
// });


const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
