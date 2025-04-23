import mongoose from "mongoose";
const Schema = mongoose.Schema;
import bcrypt from "bcryptjs";

const UserSchema = new Schema(
  {
    email: String,
    password: String,
    full_name: String,
    role: {
      type: String,
      enum: ["Admin", "Manager", "User"],
      default: "User",
    },
    created_at: { type: Date, default: Date.now },
  },
  { timestamps: false }
);

// Middleware để mã hóa mật khẩu trước khi lưu
UserSchema.pre("save", async function (next) {
  if (!this.email) throw new Error("Email is required");
  if (!this.password) throw new Error("Password is required");

  // Mã hóa mật khẩu nếu mật khẩu được thay đổi (hoặc khi tạo mới)
  if (this.isModified("password")) {
    const salt = await bcrypt.genSalt(10); // Tạo salt với độ dài 10
    this.password = await bcrypt.hash(this.password, salt); // Mã hóa mật khẩu
  }
  next();
});

// Phương thức để so sánh mật khẩu khi đăng nhập
UserSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

const User = mongoose.model("User", UserSchema);

export default User;
