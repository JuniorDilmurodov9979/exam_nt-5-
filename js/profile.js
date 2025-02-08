const full_name = document.getElementById("full_name");
const gender = document.getElementById("gender");
const phone_number = document.getElementById("phone_number");
const email = document.getElementById("email");
const address = document.getElementById("address");
const birthday = document.getElementById("birthday");
const token = localStorage.getItem("token");
const profile_container = document.querySelector(".container_profile");
// dark mode
const dark_mode = localStorage.getItem("theme");
console.log(dark_mode);
if (dark_mode == "dark") {
  document.body.classList.add("dark");
  document.body.classList.remove("light");
} else {
  document.body.classList.remove("dark");
  document.body.classList.add("light");
}

if (!token) {
  window.location.href = "/";
}

function getProfile() {
  fetch(`https://asadbek6035.pythonanywhere.com/account/me/`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      profile_container.innerHTML = `
     <div
        class="profile_dark min-h-screen from-blue-50 to-indigo-50 p-6 flex items-center justify-center"
      >
        <div
          class="profile_dark-inner bg-white rounded-2xl shadow-xl overflow-hidden max-w-4xl w-full mx-auto"
        >
          <div
            class=" relative h-48 bg-gradient-to-r from-blue-500 to-indigo-600"
          >
            <div class=" absolute -bottom-20 left-8">
              <div class="relative">
                <img
                  src="${data.avatar ? data.avatar : "Dont had an avatar"}"
                  alt="Profile"
                  class="w-40 h-40 rounded-full border-4 border-white shadow-lg object-cover"
                />

                <div
                  class="absolute bottom-0 right-0 bg-green-500 w-5 h-5 rounded-full border-4 border-white"
                ></div>
              </div>
            </div>
          </div>

          <div class="profile_dark-inner-text pt-24 px-8 pb-8">
            <h1 class="text-3xl font-bold text-gray-900 mb-1 full_name">
              ${data.full_name}
            </h1>
            <div class="flex items-center space-x-3 text-gray-700">
              <span class="gender">${
                data.gender == 0 ? "Male" : "Female"
              }</span>
            </div>
            <div class="flex flex-col gap-3 mt-5">
              <div class="space-y-4">
                <div class="flex items-center space-x-3 text-gray-700">
                  <span class="phone_number">Tel : ${
                    data.phone_number == null
                      ? "u had to edit"
                      : data.phone_number
                  } </span>
                </div>
                <div class="flex items-center space-x-3 text-gray-700">
                  <span class="email">Email : ${
                    data.email ? data.email : "u had to edit"
                  } </span>


                </div>
                <div class="flex items-center space-x-3 text-gray-700">
                  <span class="address"
                    >Address : ${
                      data.town_city ? data.town_city : "u had to edit"
                    } </span
                  >
                </div>
              </div>

              <div class="space-y-4">
                <div class="flex items-center space-x-3 text-gray-700">
                  <span class="birthday">Birthday : ${
                    data.date_birth
                      ? data.date_birth.split("-").reverse().join("-")
                      : "u had to edit"
                  } </span>
                </div>
              </div>
              <a href="/pages/profileEdit.html" class="bg-yellow-500 text-center text-white uppercase px-4 py-2 rounded-md">
                Edit
              </a>
            </div>

          </div>
        </div>

      </div>
    `;
    });
}

getProfile();
