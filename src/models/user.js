import mongoose from "mongoose";

const Schema = mongoose.Schema;

// PK, FK
// PK => Primary Key => 절대 중복되지 않고, 유일한 값.
// FK => F Key => 외래키 => 다른 테이블의 PK

// ORM => Object Relation Model?
// TypeORM, Sequelize
// Mongoose => Sequelize
// Sequelize => Javascript, Typescript
// TypeORM => Typescript

const userSchema = new Schema({
  id: mongoose.Schema.Types.ObjectId, // PK
  email: { type: String, required: true, match: /.+\@.+\..+/, unique: true },
  password: { type: String, required: true },
  salt: { type: String, required: true },
  name: { type: String, required: true },
  age: { type: String, default: null },
  created_at: { type: Date, default: Date.now }, // Timestamp
});

module.exports = mongoose.model("users", userSchema);
