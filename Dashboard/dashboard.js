const express = require("express");
const { google } = require("googleapis");

const app = express();

// Google Sheets setup
const auth = new google.auth.GoogleAuth({
  keyFile: "credentials.json", // service account credentials
  scopes: "https://www.googleapis.com/auth/spreadsheets",
});

const spreadsheetId = "1nKcJ-nAdDg58JTQ4C70ANCl9XQff6x3RdGTTvz_K6Sw";

// Hardcoded search value
const SEARCH_VALUE = "ndabhilasha.2025@gmail.com";

// Root route: fetch all rows where column C matches SEARCH_VALUE
app.get("/", async (req, res) => {
  try {
    const client = await auth.getClient();
    const googleSheets = google.sheets({ version: "v4", auth: client });

    // Fetch all rows
    const getRows = await googleSheets.spreadsheets.values.get({
      spreadsheetId,
      range: "Sheet1",
    });

    const rows = getRows.data.values;

    if (!rows || rows.length === 0) {
      return res.json({ message: "No data found in the sheet." });
    }

    // Filter all rows where column C (index 2) matches SEARCH_VALUE
    const filteredRows = rows.filter(
      (row) => row[2] && row[2].toLowerCase() === SEARCH_VALUE.toLowerCase()
    );

    if (filteredRows.length === 0) {
      return res.json({ message: `No rows found with column C = "${SEARCH_VALUE}"` });
    }

    // Return all filtered rows as JSON
    res.json({ matchingRows: filteredRows });
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ message: "Error fetching data from Google Sheets", error });
  }
});

app.listen(3030, () => console.log("Server running on http://localhost:3030"));


   const user = JSON.parse(sessionStorage.getItem("psl_user"));
    if (user) {
      document.getElementById("userInfo").textContent =
        `Email: ${user.email} | Roll No: ${user.rollNo} | Class: ${user.class}`;
    } else {
      // if no login data, go back
      window.location.href = "login.html";
    }