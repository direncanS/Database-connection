const mongoose = require("mongoose");
const HighScore = require("./HighScore");

const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    highScore: {
      type: Schema.Types.ObjectId,
      ref: "HighScore",
    },
  },
  { timestamps: true }
);

userSchema.pre("save", function (next) {
  if (this.highScore) {
    next();
  } else {
    const highScore = new HighScore({ score: 0 });
    highScore.save().then((result) => {
    this.highScore = result._id;
    next();
  });
  }
});

module.exports = mongoose.model("User", userSchema);
