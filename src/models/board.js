import mongoose from "mongoose";

const Schema = mongoose.Schema;

// PK: Primary key => 절대 중복이 되지 않는 유일한 값. (unique)
// FK: 외래키 (참조키) => 다른 테이블(스키마) PK값.

const boardSchema = new Schema({
  id: mongoose.Schema.Types.ObjectId,
  userId: {
    type: Schema.Types.ObjectId, // FK
    ref: "users",
    required: true,
  },
  writer: { type: String, default: null },
  title: { type: String, required: true },
  content: { type: String, default: null },
  create_at: { type: Date, default: Date.now },
});

module.exports = mongoose.model("boards", boardSchema);
