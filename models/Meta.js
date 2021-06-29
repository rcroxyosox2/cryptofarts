const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const metaSchema = new Schema(
  {
    season: String,
    greedFearIndex: Number,
  }, { 
    timestamps: { 
      createdAt: false, updatedAt: true 
    },
  }
);

module.exports = {
  Schema: mongoose.model("Meta", metaSchema, "metas"),
}
