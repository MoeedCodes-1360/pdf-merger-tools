const express = require('express');
const path = require('path');
const app = express();
const multer = require('multer');
const mergePdf = require('./merge');
app.use(express.static('public'));
const port = 3000

const storage=multer.diskStorage({
  destination:'uploads/',
  filename:(req,file,cb)=>cb(null,Date.now()+'-'+file.originalname)
})
const upload = multer({ storage });


app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname,"templates/index.html"))
});
app.post('/merge', upload.array('pdfFiles', 12),async function (req, res, next) {
  // req.files is array of `pdfFiles` files
//   console.log(req.files);
console.log("files uploaded successfully");
const filepaths=req.files.map(f=>path.join(__dirname,f.path))
await mergePdf(filepaths);
   
   res.redirect("http://localhost:3000/merged.pdf");
  // req.body will contain the text fields, if there were any
});
app.listen(port, () => {
  console.log(`Example app listening on port  http://localhost:${port}`)
})