const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;

const userSchema = mongoose.Schema(
  {
    first_name: {
      type: String,
      required: [true, "First name is required"],
      trim: true,
      text: true,
    },
    last_name: {
      type: String,
      required: [true, "Last name is required"],
      trim: true,
      text: true,
    },
    username: {
      type: String,
      required: [true, "Username is required"],
      unique: true,
      trim: true,
      text: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      trim: true,
      validate: [
        {
          validator: (value) => {
            const emailRegex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
            return emailRegex.test(value);
          },
          message: "Invalid email format",
        },
      ],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      select: false,
    },
    picture: {
      type: String,
      default: "default.jpg",
    },
    cover: {
      type: String,
    },
    gender: {
      type: String,
      required: [true, "Gender is required"],
      enum: ["male", "female", "other"],
    },
    birth_year: {
      type: Number,
      required: [true, "Year of birth is required"],
      trim: true,
    },
    birth_year_month: {
      type: Number,
      required: [true, "Month of birth is required"],
      trim: true,
    },
    birth_year_day: {
      type: Number,
      required: [true, "Day of birth is required"],
      trim: true,
    },
    verified: {
      type: Boolean,
      default: false,
    },
    friends: {
      type: Array,
      default: [],
    },
    following: {
      type: Array,
      default: [],
    },
    followers: {
      type: Array,
      default: [],
    },
    requests: {
      type: Array,
      default: [],
    },
    search: [
      {
        type: ObjectId,
        ref: "User",
      },
    ],
    details: {
      biography: {
        type: String,
        trim: true,
        text: true,
      },
      otherName: {
        type: String,
        trim: true,
        text: true,
      },
      job: {
        type: String,
        trim: true,
        text: true,
      },
      workPlace: {
        type: String,
        trim: true,
        text: true,
      },
      highSchool: {
        type: String,
        trim: true,
        text: true,
      },
      college: {
        type: String,
        trim: true,
        text: true,
      },
      currentCity: {
        type: String,
        trim: true,
        text: true,
      },
      homeTown: {
        type: String,
        trim: true,
        text: true,
      },
      relationShip: {
        type: String,
        enum: ["single", "married", "divorced", "widowed", "other"],
      },
      instagram: {
        type: String,
      },
    },
    savedPosts: [
      {
        post: {
          type: ObjectId,
          ref: "Post",
        },
        savedAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
  },
  { timestamp: true }
);

module.exports = mongoose.model("User", userSchema);