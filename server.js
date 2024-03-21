const express = require("express");

const app = express();

const port = 3000;

const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.listen(port, () => {
  console.log(`Server dang chay cong ${port}`);
});

const api = require("./api");
app.use("/api", api);

const uri =
  "mongodb+srv://nhungpth:nhungpthph41518@atlascluster.wgpzrhs.mongodb.net/md18309";

const spModel = require("./sanphamModel");
const mongoose = require("mongoose");

app.get("/", async (req, res) => {
  await mongoose.connect(uri);

  let sanphams = await spModel.find();

  console.log(sanphams);

  res.send(sanphams);
});

app.post("/add_sp", async (req, res) => {
  await mongoose.connect(uri);

  // let sanpham = {
  //     ten: 'Sanpham 4',
  //     gia: 500,
  //     soluong: 10,
  //     tonkho: false
  // }

  let sanpham = req.body;

  let kq = await spModel.create(sanpham);

  console.log(kq);

  let sanphams = await spModel.find();

  res.send(sanphams);
});

app.get("/xoa/:id", async (req, res) => {
  await mongoose.connect(uri);

  let id = req.params.id;
  let kq = await spModel.deleteOne({ _id: id });

  console.log(kq);

  res.redirect("../");
});

app.get("/update/:id", async (req, res) => {
  await mongoose.connect(uri);

  console.log("Ket noi DB thanh cong");

  let id = req.params.id;

  let tenSPMoi = "San pham phien ban moi 2024";

  await spModel.updateOne({ _id: id }, { ten: tenSPMoi });

  let sanphams = await spModel.find({});

  res.send(sanphams);
});

module.exports = app;
exports.uri = uri;
exports.mongoose = mongoose;
exports.spModel = spModel;
