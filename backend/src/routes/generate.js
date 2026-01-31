const express = require("express");
const upload = require("../middleware/upload");
const auth = require("../middleware/authMiddleware");

const router = express.Router();

router.post(
  "/",
  auth,
  upload.array("documents"),
  async (req, res) => {
    try {
      const { prompt } = req.body;
      const files = req.files || [];

      // Extract document text
      let documentText = "";
      for (const file of files) {
        const text = await extractText(file);
        documentText += "\n" + text;
      }

      // Build LLM input (for future)
      const llmInput = {
        prompt,
        context: documentText,
        userId: req.user.userId
      };

      // TEMPORARY STUB (replace later with LLM)
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
