const form = document.querySelector("form");
const phone_number = document.querySelector("#phone_number");
const password = document.querySelector("#password");
form.addEventListener("submit", (e) => {
  e.preventDefault();
  let formData = new FormData(form);
  formData.append("phone_number", phone_number.value);
  formData.append("password", password.value);
  fetch("https://asadbek6035.pythonanywhere.com/account/login/", {
    method: "POST",
    body: formData,
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data.data);

      if (data.success) {
        alert("You successfully loged in");
        localStorage.setItem("token", data.data.token.access);
        window.location.href = "/pages/home.html";
      }
    });
});
