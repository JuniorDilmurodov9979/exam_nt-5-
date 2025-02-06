const first_name = document.querySelector("#first_name");
const last_name = document.querySelector("#last_name");
const phone_number = document.querySelector("#phone_number");
const password = document.querySelector("#password");
const password_confirm = document.querySelector("#confirmation");
const Image = document.querySelector("#image");
const form = document.querySelector("form");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  if (password.value !== password_confirm.value) {
    alert("Passwords do not match");
    return;
  }
  let formData = new FormData(form);
  formData.append("full_name", first_name.value + " " + last_name.value);
  formData.append("phone_number", phone_number.value);
  formData.append("password", password.value);
  formData.append("password2", password_confirm.value);
  formData.append("avatar", Image.files[0]);
  console.log(formData);
  fetch("https://asadbek6035.pythonanywhere.com/account/register/", {
    method: "POST",
    body: formData,
  })
    .then((res) => res.json())
    .then((data) => {
      if (data) {
        alert("User created successfully");
        window.location.href = "/pages/login.html";
      } else {
        alert(data.message);
      }
    })
    .catch((err) => {
      console.log(err);
    });
});
const toggleEye = document.querySelector(".eye");
const toggleEyeConfirm = document.querySelector(".eyeConfirm");
toggleEye.addEventListener("click", () => {
  if (password.type === "password") {
    password.type = "text";
    toggleEye.style.backgroundImage = "url('../images/eyeClose.png')";
  } else {
    password.type = "password";
    toggleEye.style.backgroundImage = "url('../images/eyeOpen.png')";
  }
});
toggleEyeConfirm.addEventListener("click", () => {
  if (password_confirm.type === "password") {
    password_confirm.type = "text";
    toggleEyeConfirm.style.backgroundImage = "url('../images/eyeClose.png')";
  } else {
    password_confirm.type = "password";
    toggleEyeConfirm.style.backgroundImage = "url('../images/eyeOpen.png')";
  }
});
