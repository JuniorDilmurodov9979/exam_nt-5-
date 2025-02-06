let token = localStorage.getItem("token");
console.log(token);
if (!token) {
  window.location.href = "/";
}
const list = document.querySelector(".list");

function getBlogs() {
  const loadingElement = document.createElement("h1");
  loadingElement.classList.add("text-center", "text-gray-500");
  loadingElement.textContent = "Loading...";

  // Append loading before fetching
  list.append(loadingElement);
  fetch("https://asadbek6035.pythonanywhere.com/blog/list", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((res) => res.json())
    .then((data) => {
      list.innerHTML = "";
      if (data) {
        data.forEach((blog) => {
          console.log(blog);
          const li = document.createElement("li");
          li.classList.add(
            "w-[300px]",
            "border",
            "border-gray-300",
            "rounded-lg",
            "flex",
            "flex-col",
            "justify-between"
          );

          li.innerHTML = `
  <img class="w-full h-[200px] rounded-t-lg" src="${blog.image}" alt="" />
  <div class="p-2 flex-grow">
    <h2 class="text-center text-lg">${blog.title}</h2>
    <p>${blog.description}...</p>
  <a href="/pages/singleBlog.html?id=${blog.id}" class="text-blue-500 cursor-pointer">Batafsil</a>
  </div>
  <p class="text-sm font-bold text-end p-2 mt-auto">${blog.date_created}</p>

`;

          list.appendChild(li);
        });
      } else {
        list.innerHTML = "No data";
      }
    });
}
getBlogs();
