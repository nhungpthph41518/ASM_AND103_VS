const express = require("express");
const router = express.Router();
const server = require("./server");

router.get("/", (req, res) => {
  res.send("URI:" + app.uri);
});

router.get("/list", async (req, res) => {
  await server.mongoose.connect(server.uri);

  let sinhviens = await server.spModel.find();

  console.log(sinhviens);

  res.send(sinhviens);
});
// Thêm sản phẩm
router.post("/add", async (req, res) => {
  try {
    const { ten, gia, soluong } = req.body;

    // Tạo một instance mới của model sản phẩm
    const newSanPham = new server.spModel({
      ten,
      gia,
      soluong,
      avatar
    });

    // Lưu sản phẩm mới vào cơ sở dữ liệu
    const savedSanPham = await newSanPham.save();

    res.status(201).json(savedSanPham); // Trả về sản phẩm vừa được tạo thành công
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Sửa sản phẩm
router.put("/update/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { ten, gia, soluong, avatar } = req.body;

    const updatedSanPham = await server.spModel.findByIdAndUpdate(
      id,
      { ten, gia, soluong, avatar },
      { new: true }
    );

    if (!updatedSanPham) {
      return res.status(404).json({ message: "Không tìm thấy sản phẩm" });
    }

    res.json(updatedSanPham);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Xóa sản phẩm
router.delete("/delete/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const deletedSanPham = await server.spModel.findByIdAndDelete(id);

    if (!deletedSanPham) {
      return res.status(404).json({ message: "Không tìm thấy sản phẩm" });
    }

    res.json({ message: "Xóa sản phẩm thành công" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
