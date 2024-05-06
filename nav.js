document
  .querySelector(".logout")
  .addEventListener("click", async (req, res) => {
    try {
      const result = await fetch("/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await result.json();
      window.location.href = data.path;
    } catch (err) {
      console.log(err);
    }
  });
