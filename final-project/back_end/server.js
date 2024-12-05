const express = require("express");
const fs = require("fs");
const cors = require("cors");
const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

let data = []; // In-memory storage for entries (use a database for production)

// Endpoint to handle new submissions
app.post("/submit", (req, res) => {
  const { name, number } = req.body;
  if (!name || !number) {
    return res.status(400).send("Name and number are required!");
  }
  data.push({ name, number });
  res.send("Submission successful!");
});

// Endpoint to serve the consolidated CSV file
app.get("/download", (req, res) => {
  if (data.length === 0) {
    return res.status(400).send("No data available!");
  }

  const header = Object.keys(data[0]).join(",");
  const rows = data.map((entry) => Object.values(entry).join(",")).join("\n");
  const csvContent = header + "\n" + rows;

  const filePath = "data.csv";
  fs.writeFileSync(filePath, csvContent);
  res.send("Successful Download");
  res.download(filePath);
});

app.get("/clear-data", (req, res) => {
    data = []; // Reset the array to an empty state
    res.send("Data cleared successfully!");
  });

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});