const express = require("express");
const crypto = require("crypto");
const Resume = require("../models/Resume");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/public/:publicId", async (req, res) => {
  try {
    const resume = await Resume.findOne({
      publicId: req.params.publicId,
      isPublic: true,
    }).select("-user");

    if (!resume) {
      return res.status(404).json({
        message: "Resume not found or sharing is disabled",
      });
    }

    res.json(resume);
  } catch (error) {
    console.error("Public resume error:", error);
    res.status(500).json({
      message: "Failed to load public resume",
    });
  }
});

// GET ALL RESUMES
router.get("/", authMiddleware, async (req, res) => {
  try {
    const resumes = await Resume.find({
      user: req.user.id,
    }).sort({ updatedAt: -1 });

    res.json(resumes);
  } catch (error) {
    console.error("Get resumes error:", error);

    res.status(500).json({
      message: "Failed to get resumes",
    });
  }
});

// CREATE RESUME
router.post("/", authMiddleware, async (req, res) => {
  try {
    console.log("========== CREATE RESUME ==========");
    console.log("req.user:", req.user);
    console.log("req.user.id:", req.user?.id);

    if (!req.user?.id) {
      return res.status(401).json({
        message: "User ID missing from authentication token",
        user: req.user,
      });
    }

    const resume = await Resume.create({
      user: req.user.id,
      name: req.body.name || "My Resume",
      personal: req.body.personal || {},
      experience: req.body.experience || [],
      education: req.body.education || [],
      projects: req.body.projects || [],
      skills: req.body.skills || "",
      template: req.body.template || "modern",
    });

    console.log("Resume created:", resume._id);

    res.status(201).json(resume);
  } catch (error) {
    console.error("Create resume error:", error);

    res.status(500).json({
      message: "Failed to create resume",
      error: error.message,
    });
  }
});

// UPDATE RESUME
router.put("/:id", authMiddleware, async (req, res) => {
  try {
    const resume = await Resume.findOneAndUpdate(
      {
        _id: req.params.id,
        user: req.user.id,
      },
      req.body,
      {
  returnDocument: "after",
  runValidators: true,
}
    );

    if (!resume) {
      return res.status(404).json({
        message: "Resume not found",
      });
    }

    res.json(resume);
  } catch (error) {
    console.error("Update resume error:", error);

    res.status(500).json({
      message: "Failed to update resume",
    });
  }
});

// DELETE RESUME
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const resume = await Resume.findOneAndDelete({
      _id: req.params.id,
      user: req.user.id,
    });

    if (!resume) {
      return res.status(404).json({
        message: "Resume not found",
      });
    }

    res.json({
      message: "Resume deleted successfully",
    });
  } catch (error) {
    console.error("Delete resume error:", error);

    res.status(500).json({
      message: "Failed to delete resume",
    });
  }
});

router.post("/:id/share", authMiddleware, async (req, res) => {
  try {
    const publicId = crypto.randomBytes(12).toString("hex");

    const resume = await Resume.findOneAndUpdate(
      {
        _id: req.params.id,
        user: req.user.id,
      },
      {
        isPublic: true,
        publicId,
      },
      {
  returnDocument: "after",
  runValidators: true,
}
    );

    if (!resume) {
      return res.status(404).json({
        message: "Resume not found",
      });
    }

    res.json({
      message: "Resume sharing enabled",
      publicId: resume.publicId,
    });
  } catch (error) {
    console.error("Share resume error:", error);
    res.status(500).json({
      message: "Failed to share resume",
    });
  }
});

// DISABLE PUBLIC SHARING
router.delete("/:id/share", authMiddleware, async (req, res) => {
  try {
    const resume = await Resume.findOneAndUpdate(
      {
        _id: req.params.id,
        user: req.user.id,
      },
      {
        $set: {
          isPublic: false,
        },
        $unset: {
          publicId: 1,
        },
      },
      {
    returnDocument: "after",
}
    );

    if (!resume) {
      return res.status(404).json({
        message: "Resume not found",
      });
    }

    res.json({
      message: "Resume sharing disabled",
    });
  } catch (error) {
    console.error("Disable sharing error:", error);

    res.status(500).json({
      message: "Failed to disable sharing",
    });
  }
});

module.exports = router;