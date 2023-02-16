const multer = require("multer");
const express = require('express')
const app = express()
const cors = require('cors')
const upload = multer({ dest: "../storage/images/" });

app.use(cors())

app.post("/upload",  upload.single("file",) ,  (req, res) => {
  if (req.file){
    console.log(req.body.file)
    res.json({ message: "File uploaded successfully" });
  }
});


app.listen(5000, () => console.log('start'))