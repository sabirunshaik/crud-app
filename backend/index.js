const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5000;

let items = [
  { id: 1, name: "Item 1" },
  { id: 2, name: "Item 2" },
  { id: 3, name: "Item 3" },
];

app.use(cors());
app.use(bodyParser.json());

// Get all items
app.get("/api", async (req, res) => {
  try {
    res.json(items);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});

// Get a single item
app.get("/api/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const item = items.find((item) => item.id === id);
    if (item) {
      res.json(item);
    } else {
      res.status(404).json({ message: "Item not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});

// Create a new item
app.post("/api", async (req, res) => {
  try {
    const newItem = req.body;
    items.push(newItem);
    res.status(201).json(newItem);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});

// Update an item
app.put("/api/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const updatedItem = req.body;
    items = items.map((item) =>
      item.id === id ? { ...item, ...updatedItem } : item
    );
    res.json(updatedItem);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});

// Delete an item
app.delete("/api/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    items = items.filter((item) => item.id !== id);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`);
});