const mongoose = require("mongoose");

const resumeSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    name: {
      type: String,
      required: true,
      trim: true,
    },

    personal: {
      fullName: String,
      jobTitle: String,
      email: String,
      phone: String,
      location: String,
      summary: String,
    },

    experience: [
      {
        company: String,
        position: String,
        startDate: String,
        endDate: String,
        description: String,
      },
    ],

    education: [
      {
        institution: String,
        degree: String,
        startDate: String,
        endDate: String,
        description: String,
      },
    ],

    projects: [
      {
        name: String,
        technologies: String,
        description: String,
        link: String,
      },
    ],

    skills: {
      type: String,
      default: "",
    },

    template: {
      type: String,
      default: "modern",
    },

    isPublic: {
      type: Boolean,
      default: false,
    },

    publicId: {
      type: String,
      unique: true,
      sparse: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Resume", resumeSchema);