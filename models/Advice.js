const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const adviceSchema = new Schema(
  {
    coinId: String,
    currentPrice: Number,
    advice: {
      community: { weight: Number, bool: Boolean, },
      greedFearIndex: { weight: Number, bool: Boolean },
      random: { weight: Number, bool: Boolean },
      volumePrice: { weight: Number, bool: Boolean },
      season: { weight: Number, bool: Boolean },
      events: { weight: Number, bool: Boolean },
      version: String,
      summary: { score: Number, decision: String }
    }
  }, { 
    timestamps: { 
      createdAt: true
    },
  }
);

module.exports = {
  Schema: mongoose.model("Advice", adviceSchema, "advices"),
}


// {
//   coinId: 'cardano',
//   currentPrice: 1.2,
//   advice: {
//     community: { weight: 1, bool: true },
//     greedFearIndex: { weight: 1, bool: false },
//     random: { weight: 0.5, bool: true },
//     volumePrice: { weight: 4, bool: false },
//     season: { weight: 1, bool: true },
//     events: { weight: 1, bool: true },
//     _v: 'beta.1',
//     summary: { score: -0.35294117647058826, decision: 'no' }
//   }
// }