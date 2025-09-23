document.querySelector("form").addEventListener("submit", async function (e) {
  e.preventDefault();

  const email = document.querySelector('input[placeholder="Enter ID"]').value.trim();
  const password = document.querySelector('input[placeholder="Password"]').value;

  try {
    const res = await fetch("login.json", { cache: "no-store" });
    if (!res.ok) throw new Error("Failed to load login.json");

    const users = await res.json();

    const user = users.find(u => u.email === email && u.password === password);

    if (user) {
      sessionStorage.setItem("psl_user", JSON.stringify(user));
      // redirect to dashboard folder
      window.location.href = "Dashboard\dashboard.html";
    } else {
      alert("Invalid Email or Password");
    }
  } catch (err) {
    console.error("Error fetching login.json:", err);
    alert("Could not load login.json (are you running a server?)");
  }
});
