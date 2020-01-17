const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcryptjs");
mongoose.promise = Promise;

// Define Schemas
let BlogSchema = Schema({
  date: {
    type: Date,
    default: Date.now
  },
  title: {
    type: String
  },
  content: {
    type: String
  },
  author: {
    type: String
  }
});

let SkillSchema = Schema({
  name: {
    type: String
  },
  rating: {
    type: Number
  }
});

let TeamSchema = Schema({
  name: {
    type: String
  },
  technology: {
    type: String
  }
});

const userSchema = new Schema({
  username: { type: String, unique: false, required: false },
  password: { type: String, unique: false, required: false },
  userType: {
    type: String
  },
  rating: {
    type: Number
  },
  bio: {
    type: String
  },
  requirement: {
    type: String
  },
  github: {
    type: String
  },
  linkedIn: {
    type: String
  },
  facebook: {
    type: String
  },
  weblink: [
    {
      type: String
    }
  ],
  skills: [SkillSchema],
  team: [TeamSchema],
  blogs: [BlogSchema]
});

// Define schema methods
userSchema.methods = {
  checkPassword: function(inputPassword) {
    return bcrypt.compareSync(inputPassword, this.password);
  },
  hashPassword: plainTextPassword => {
    return bcrypt.hashSync(plainTextPassword, 10);
  }
};

// Define hooks for pre-saving
userSchema.pre("save", function(next) {
  if (!this.password) {
    console.log("models/user.js =======NO PASSWORD PROVIDED=======");
    next();
  } else {
    console.log("models/user.js hashPassword in pre save");

    this.password = this.hashPassword(this.password);
    next();
  }
});

const User = mongoose.model("User", userSchema);
module.exports = User;
