const token = localStorage.getItem("token");
const list = document.querySelector(".list");

const id = window.location.search.split("=")[1];
console.log(id);

if (!token) {
  window.location.href = "/";
}

function getSingleBlog() {
  const loadingElement = document.createElement("h1");
  loadingElement.classList.add("text-center", "text-gray-500");
  loadingElement.textContent = "Loading...";

  // Append loading before fetching
  list.appendChild(loadingElement);

  fetch(`https://asadbek6035.pythonanywhere.com/blog/retrieve/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      list.innerHTML = "";
      if (data) {
        const li = document.createElement("li");
        li.classList.add(
          "w-[600px]",
          "border",
          "border-gray-300",
          "rounded-lg",
          "flex",
          "flex-col",
          "justify-between"
        );

        li.innerHTML = `
  <img class="w-full h-[400px] img_single rounded-t-lg" src="${data.image}" alt="" />
  <div class="p-2 flex-grow">
    <h2 class="text-center text-lg">${data.title}</h2>
    <p>${data.description}</p>
  </div>
  <p class="text-sm font-bold text-end p-2 mt-auto">${data.date_created}</p>

`;

        list.appendChild(li);
      } else {
        list.innerHTML = `
        <h1 class="text-red-400 text-center text-3xl">Blog not found</h1>`;
      }
    });
}

getSingleBlog();
