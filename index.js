const express = require("express");
const cloudinary = require("./cloudinary");
const uploader = require("./multer");
const app = express();
const cors = require('cors');

app.use(cors({ origin: 'http://localhost:4200' }));

app.get("/", (req, res) => {
  res.send("Server is running");
});

app.post("/upload", uploader.single("file0"), async (req, res) => {
    console.log(req.file.path);
    const upload = await cloudinary.uploader.upload(req.file.path);
    return res.json({
      success: true,
      file: upload.secure_url,
    });
  });

app.listen(3000)