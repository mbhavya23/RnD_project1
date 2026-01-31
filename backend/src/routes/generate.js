const express = require("express");
const auth = require("../middleware/authMiddleware");

const router = express.Router();

router.post(
  "/",
  auth,
  async (req, res) => {
    try {
      const { prompt } = req.body;

      const output = `
PROMPT:
${prompt}

[GENERATED OUTPUT WILL APPEAR HERE]
      `;

      res.json({ output });

    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Generation failed" });
    }
  }
);

module.exports = router;
