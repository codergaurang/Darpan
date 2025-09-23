const express = require("express");
const path = require("path");
const app = express();
const PORT = 3030;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Serve static files (CSS, JS, Images)
app.use("/assets", express.static(path.join(__dirname, "Assets")));
app.use("/login", express.static(path.join(__dirname, "Login")));
app.use("/dashboard", express.static(path.join(__dirname, "Dashboard")));

// Root route serves login page
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "Login", "login.html"));
});


// Handle login form submission
app.post("/login", (req, res) => {
  const { username, password } = req.body;

  // Simple check (replace with real auth logic)
  if (username === "admin" && password === "1234") {
    // On success, send dashboard
    res.sendFile(path.join(__dirname, "Dashboard", "dashboard.html"));
  } else {
    res.status(401).send("Login failed. Invalid username or password.");
  }
});

// Optional: dashboard route if accessed directly
app.get("/dashboard", (req, res) => {
  res.sendFile(path.join(__dirname, "Dashboard", "dashboard.html"));
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
