document.getElementById("login-form").addEventListener("submit", async function (e) {
  e.preventDefault(); // stop native submit [web:20]

  const form = e.currentTarget; // reference to form [web:13]
  const rollnumber = document.getElementById("rollnumber").value.trim();
  const password = document.getElementById("password").value;

  try {
    const res = await fetch("/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ rollnumber, password }),
      // note: res.redirected tells if a redirect happened; res.url is final URL [web:10]
    });

    if (res.redirected) {
      // Successful login that triggered a server redirect (e.g., 302/303/307) [web:7][web:10]
      window.location.href = res.url; // navigate to final redirected URL [web:10][web:4]
      return;
    }

    // Not redirected, handle body as a message
    const msg = (await res.text()) || "Invalid credentials!";
    // Assume non-redirect implies failure or a success message without redirect
    if (!res.ok) {
      alert(msg); // pop-up for invalid credentials [web:8]
      form.reset(); // clear fields after failure [web:18]
    } else {
      alert(msg); // e.g., success message without redirect [web:8]
      form.reset(); // clear fields after success (no redirect) [web:18]
    }
  } catch (err) {
    console.error("Login error:", err);
    alert("⚠ Error during login!"); // pop-up on network/other errors [web:8]
    form.reset(); // clear fields after error [web:18]
  }
});
