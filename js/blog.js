const token = window.localStorage.getItem("token");
const title = document.querySelector("#title_modal");
const category_modal = document.querySelector("#category_modal");
const image_modal = document.querySelector("#image_modal");
const description_modal = document.querySelector("#description_modal");
const id = window.location.search.split("=")[1];

if (!token) {
  window.location.href = "/pages/login.html";
}

// Create Blog
document.querySelector(".form_modal").addEventListener("submit", (e) => {
  e.preventDefault();

  let formData = new FormData();
  formData.append("title", title.value);
  formData.append("description", description_modal.value);
  formData.append("category", category_modal.value);

  if (image_modal.files[0]) {
    formData.append("image", image_modal.files[0]);
  }

  let url = id
    ? `https://asadbek6035.pythonanywhere.com/blog/retrieve/${id}/`
    : "https://asadbek6035.pythonanywhere.com/blog/create/";
  let method = id ? "PUT" : "POST";

  fetch(url, {
    method: method,
    body: formData,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      if (data) {
        alert(id ? "Blog updated successfully" : "Blog created successfully");
        window.location.href = "/pages/home.html";
      } else {
        alert(id ? "Error updating blog" : "Error creating blog");
      }
    })
    .catch((err) => console.error("Request failed", err));
});

// Edit blog
if (id) {
  fetch(`https://asadbek6035.pythonanywhere.com/blog/retrieve/${id}/`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      title.value = data.title;
      description_modal.value = data.description;
      category_modal.value = data.category;
    })
    .catch((err) => console.error("Failed to fetch blog details", err));
}
