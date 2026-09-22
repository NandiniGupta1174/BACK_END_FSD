 import express from "express";
import fs from "fs";
import cors from "cors";

const app = express();
const PORT = 3000;
const FILE = "requests.json";

app.use(cors());
app.use(express.json());

function readRequests() {
  if (!fs.existsSync(FILE)) {
    fs.writeFileSync(FILE, "[]");
  }
  const data = fs.readFileSync(FILE, "utf-8");
  return JSON.parse(data);
}

function writeRequests(data) {
  fs.writeFileSync(FILE, JSON.stringify(data, null, 2));
}

app.get("/api/requests", (req, res) => {
  const requests = readRequests();
  res.json(requests);
});

app.get("/api/requests/:id", (req, res) => {
  const requests = readRequests();
  const request = requests.find((r) => r.id == req.params.id);
  if (!request) {
    return res.status(404).json({ message: "Request not found" });
  }
  res.json(request);
});

app.post("/api/requests", (req, res) => {
  const requests = readRequests();
  const newRequest = {
    id: Date.now(),
    name: req.body.name,
    email: req.body.email,
    category: req.body.category,
    description: req.body.description,
    priority: req.body.priority
  };
  requests.push(newRequest);
  writeRequests(requests);
  res.status(201).json({ message: "Request added successfully", data: newRequest });
});

app.put("/api/requests/:id", (req, res) => {
  const requests = readRequests();
  const index = requests.findIndex((r) => r.id == req.params.id);
  if (index === -1) {
    return res.status(404).json({ message: "Request not found" });
  }
  requests[index] = {...requests[index],...req.body };
  writeRequests(requests);
  res.json({ message: "Request updated successfully", data: requests[index] });
});

app.delete("/api/requests/:id", (req, res) => {
  const requests = readRequests();
  const index = requests.findIndex((r) => r.id == req.params.id);
  if (index === -1) {
    return res.status(404).json({ message: "Request not found" });
  }
  requests.splice(index, 1);
  writeRequests(requests);
  res.json({ message: "Request deleted successfully" });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});