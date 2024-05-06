const form = document.querySelector(".login-pg");
form.addEventListener("submit", async (event) => {
  event.preventDefault();
  const username = form.querySelector(".username").value;
  const password = form.querySelector(".password").value;
  // console.log(username, password);
  const result = await fetch("/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username,
      password,
    }),
  });
  const data = await result.json();
  if (data.status === "200") {
    console.log("Hello")
    window.location.href = data.path;
  }
});
