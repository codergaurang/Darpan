// Extract rollnumber from URL
const params = new URLSearchParams(window.location.search);
const rollnumber = params.get("rollnumber");

// Show rollnumber in header
document.getElementById("student-id").textContent = "ID: " + (rollnumber || "Not provided");

// CSV URL (your published Google Sheet CSV)
const CSV_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vT-qPIGpVAcwK8o_4Z1q8VGoQEMrzbDBjfl2ENYqORkguam3gatFvYNjpDe7yKyIwjr-Y-rPHgNh5wI/pub?gid=1026909110&single=true&output=csv";

if (rollnumber) {
  fetch(CSV_URL)
    .then(res => res.text())
    .then(csvText => {
      // Convert CSV to array of rows
      const rows = csvText.trim().split("\n").map(r => r.split(","));
      const headers = rows[0].map(h => h.trim());

      // Map rows to objects
      const data = rows.slice(1).map(r => {
        let obj = {};
        headers.forEach((h, i) => {
          obj[h] = (r[i] || "").trim();
        });
        return obj;
      });

      // Filter all rows with matching Roll number
      const matchingRows = data.filter(row => row["Roll number"] === rollnumber);

      const tableContainer = document.getElementById("data-table");

      if (matchingRows.length > 0) {
        let table = "<table border='1' style='border-collapse:collapse; padding:8px;'>";

        // Table header
        table += "<tr>" + headers.map(h => `<th>${h}</th>`).join("") + "</tr>";

        // All matching rows
        matchingRows.forEach(row => {
          table += "<tr>" + headers.map(h => `<td>${row[h]}</td>`).join("") + "</tr>";
        });

        table += "</table>";
        tableContainer.innerHTML = table;
      } else {
        tableContainer.innerHTML = "<p>No record found.</p>";
      }
    })
    .catch(err => {
      console.error("Error loading CSV:", err);
      document.getElementById("data-table").innerHTML = "<p>Error loading data.</p>";
    });
}
