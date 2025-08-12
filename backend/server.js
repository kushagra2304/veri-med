import express from "express";
import cors from "cors";
import mysql from "mysql2/promise";
import dotenv from "dotenv";
// import multer from "multer";
// import pdfParse from "pdf-parse";
// import cloudinary from "cloudinary";
// import fs from "fs";

dotenv.config();
const app = express();
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://veri-med.vercel.app" 
    ],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.use(express.json()); 
// app.options("*", cors());

// cloudinary.v2.config({
//   cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//   api_key: process.env.CLOUDINARY_API_KEY,
//   api_secret: process.env.CLOUDINARY_API_SECRET,
// });

// const upload = multer({ dest: "uploads/" });



const db = await mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
});

console.log("✅ Connected to Aiven MySQL via Promise API");

// SIGNUP API
app.post("/api/signup", async (req, res) => {
  const { name, email, gender, age, password, role } = req.body;

  try {
    await db.execute(
      "INSERT INTO users (name, email, gender, age, password, role) VALUES (?, ?, ?, ?, ?, ?)",
      [name, email, gender, age, password, role]
    );
    res.status(201).json({ message: "User registered successfully!" });
  } catch (err) {
    console.error("Error inserting user:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});


// LOGIN API
app.post("/api/login", async (req, res) => {
  const { email, password, role } = req.body;

  console.log("🟡 Login Attempt:");
  console.log("➡ Email:", email);
  console.log("➡ Password:", password);
  console.log("➡ Role:", role);

  if (!email || !password || !role) {
    console.warn("⚠ Missing email, password, or role");
    return res.status(400).json({ error: "Email, password, and role are required." });
  }

  try {
    const [results] = await db.execute(
      "SELECT id, name, email, password, role FROM users WHERE email = ? AND role = ?",
      [email, role]
    );

    if (results.length === 0) {
      console.warn("❌ No user found with this email and role");
      return res.status(401).json({ error: "Invalid email or role" });
    }

    const user = results[0];
    console.log("✅ User Found:", user.email, "Role:", user.role);

    if (user.password === password) {
      console.log("✅ Password matched. Login successful!");
      
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
  } catch (err) {
    console.error("❌ Error during login:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
});

app.post("/documents", async (req, res) => {
  const { fileUrl, user_id } = req.body;

  if (!fileUrl || !user_id) {
    return res.status(400).json({ error: "fileUrl and user_id are required" });
  }

  try {
    await db.query(
      "INSERT INTO documents (file_url, user_id, uploaded_at) VALUES (?, ?, NOW())",
      [fileUrl, user_id]
    );
    res.json({ success: true, message: "Document saved successfully!" });
  } catch (err) {
    console.error("Error saving document:", err);
    res.status(500).json({ error: "Failed to save document" });
  }
});


app.get("/documents-pull", async (req, res) => {
  const { user_id } = req.query;
  if (!user_id) {
    return res.status(400).json({ error: "user_id is required" });
  }

  try {
    const [rows] = await db.query(
      "SELECT * FROM documents WHERE user_id = ? ORDER BY uploaded_at DESC",
      [user_id]
    );
    res.json({ documents: rows });
  } catch (err) {
    console.error("Error fetching documents:", err);
    res.status(500).json({ error: "Failed to fetch documents" });
  }
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
