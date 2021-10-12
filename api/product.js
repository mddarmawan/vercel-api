const express = require("express");
const svg2img = require('svg2img');
const router = express.Router();

/**
 * GET product list.
 *
 * @return product list | empty.
 */
router.get("/", async (req, res) => {
  try {
    if (!req.query.url) {
      res.send({
        success: false,
        message: 'Please provide the url'
      });
    } else {
      const url = req.query.url;
      const width = req.query.width;
      const height = req.query.height;
      const size = Math.min(width, height);
      svg2img(url, {width: size, height: size, preserveAspectRatio: true},
        function(error, buffer) {
          if (buffer) {
            res.send(buffer);
          }
      });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).send("Server error");
  }
});

module.exports = router;
