const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required."],
      trim: true,
      minlength: [2, "Name must be at least 2 characters."],
      maxlength: [50, "Name cannot exceed 50 characters."],
    },

    email: {
      type: String,
      required: [true, "Email is required."],
      unique: true,
      trim: true,
      lowercase: true,
      match: [
        /^[\w.-]+@[\w.-]+\.\w{2,}$/,
        "Please provide a valid email address.",
      ],
    },

    phone: {
      type: String,
      trim: true,
      match: [/^[6-9]\d{9}$/, "Please provide a valid 10-digit Indian mobile number."],
    },

    password: {
      type: String,
      required: [true, "Password is required."],
      minlength: [3, "Password must be at least 3 characters."],
      select: false,
    },

    // Location
    state: {
      type: String,
      trim: true,
    },
    district: {
      type: String,
      trim: true,
    },
    city: {
      type: String,
      trim: true,
    },

    agreeToTerms: {
      type: Boolean,
      required: [true, "You must agree to the terms and conditions."],
      validate: {
        validator: (v) => v === true,
        message: "You must agree to the terms and conditions.",
      },
    },

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

userSchema.index({ email: 1 });

userSchema.pre("save", async function () {
  // 1. If password is not modified, exit early
  if (!this.isModified("password")) return;

  // 2. Hash the password. Mongoose handles any try/catch errors automatically in async hooks.
  const salt = await bcrypt.genSalt(12);
  this.password = await bcrypt.hash(this.password, salt);
});

userSchema.methods.comparePassword = async function (candidatePassword) {

  return bcrypt.compare(candidatePassword, this.password);
};

userSchema.methods.toPublicJSON = function () {
  return {
    id: this._id,
    name: this.name,
    email: this.email,
    phone: this.phone,
    state: this.state,
    district: this.district,
    city: this.city,
  };
};

module.exports = mongoose.model("User", userSchema);