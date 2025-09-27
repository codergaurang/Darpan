const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 3030;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Serve static files
app.use("/login", express.static(path.join(__dirname, "Login")));
app.use("/dashboard", express.static(path.join(__dirname, "Dashboard")));
app.use("/assets", express.static(path.join(__dirname, "Assets")));

// Route to dashboard page
app.get("/dashboard", (req, res) => {
  return res.sendFile(path.join(__dirname, "Dashboard", "dashboard.html"));
});

// Login route (POST -> redirect GET per PRG)
app.post("/login", (req, res) => {
  const { rollnumber, password } = req.body;

  const loginData = JSON.parse(
    fs.readFileSync(path.join(__dirname, "Login", "login.json"), "utf8")
  );

  const user = loginData.find(
    (u) => u.rollnumber === rollnumber && u.password === password
  );

  if (user) {
    // 303 See Other ensures the client performs GET to the Location
    return res.redirect(303, `/dashboard?rollnumber=${encodeURIComponent(user.rollnumber)}`);
  }

  // Send JSON or HTML; the client can display an alert/toast
  return res.status(401).json({ error: "Invalid roll number or password" });
});

// Root route
app.get("/", (req, res) => {
  return res.sendFile(path.join(__dirname, "Login", "login.html"));
});




app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

