const form = document.querySelector(".form_profile");
const email = document.getElementById("email");
const town_city = document.getElementById("town_city");
const date_birth = document.getElementById("date_birth");
const gender = document.getElementById("gender");
const token = localStorage.getItem("token");
const dark_mode = localStorage.getItem("theme");
console.log(dark_mode);
if (dark_mode == "dark") {
  document.body.classList.add("dark");
} else {
  document.body.classList.remove("dark");
}
if (!token) {
  window.location.href = "/";
}

function getMe() {
  fetch(`https://asadbek6035.pythonanywhere.com/account/me/`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      email.value = data.email;
      town_city.value = data.town_city;
      date_birth.value = data.date_birth;
      gender.value = data.gender;
    });
}
getMe();

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const data = {
    email: email.value,
    town_city: town_city.value,
    date_birth: date_birth.value,
    gender: gender.value,
  };
  fetch(`https://asadbek6035.pythonanywhere.com/account/me/`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },

    body: JSON.stringify(data),
  })
    .then((res) => {
      if (!res.ok) {
        return res.json().then((errorData) => {
          throw new Error(errorData.message || "Failed to update profile");
        });
      }
      return res.json();
    })
    .then((me) => {
      console.log(me);
      alert("Profile updated successfully");
      window.location.href = "/pages/profile.html";
    })
    .catch((error) => {
      console.error("Error updating profile:", error);
      alert(error.message || "Failed to update profile. Please try again.");
    });
});
