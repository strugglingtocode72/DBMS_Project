const register_form = document.querySelector('.reg-form');
console.log(register_form);
register_form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const firstname = register_form.querySelector(".firstname").value;
    const lastname = register_form.querySelector(".lastname").value;
    const email = register_form.querySelector(".email").value;
    const username = register_form.querySelector("#username").value;
    const password = register_form.querySelector("#password").value;
    const confirm_password = register_form.querySelector("#confirm-password").value;
    const terms = register_form.querySelector(".checkbox-box");
    
    console.log(terms.checked);
  if(!terms.checked){
    return;
  }
    console.log(firstname, lastname, username, email, password, confirm_password, terms);
    const result = await fetch("/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        firstname,
        lastname,
        email,
        username,
        password,
        confirm_password
      }),
    });
    const data = await result.json();
    if(data.status === "200")
    {
      alert("registered Successfully")
      window.location.href = "/login"
    }

  });
