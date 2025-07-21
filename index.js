const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

// File to store the click count
const COUNT_FILE = "count.txt";
let count = 0;

// Read the initial count
if (fs.existsSync(COUNT_FILE)) {
  count = parseInt(fs.readFileSync(COUNT_FILE, "utf-8")) || 0;
}

// When someone visits the page
app.get("/", (req, res) => {
  count++;
  fs.writeFileSync(COUNT_FILE, count.toString());
  res.send(`
    <html>
      <head><title>Click Count</title></head>
      <body style="font-family:sans-serif; text-align:center; margin-top:20%">
        <h1>🎉 You've clicked the button!</h1>
        <p>This button has been clicked (approximately):</p>
        <h2>${count} times</h2>
      </body>
    </html>
  `);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
