const mongoose = require("mongoose");

const SanphamSchema = mongoose.Schema({
  ten: {
    type: String,
    require: true,
  },

  gia: {
    type: Number,
    require: true,
  },

  soluong: {
    type: Number,
    require: true,
  },

  avatar: {
    type: String,
  },
});

const SanphamModel = mongoose.model("sampham", SanphamSchema);

module.exports = SanphamModel;

// const uri =
//   "mongodb+srv://nhungpth:nhungpthph41518@atlascluster.wgpzrhs.mongodb.net/md18309";

// const uri =
//   "mongodb+srv://nhungpth:nhungpthph41518@atlascluster.wgpzrhs.mongodb.net/md18309";
