// Get query parameter rollnumber
  const params = new URLSearchParams(window.location.search);
  const rollnumber = params.get("rollnumber");

  if (rollnumber) {
    document.querySelector("h1").textContent = "ID: " + rollnumber;
  }