const list = document.querySelector(".list");
const profileBtn = document.querySelector(".profile_btn-wrapper");
const profileBtnAvatar = document.querySelector(".profile_btn-avatar");
const profileBtnName = document.querySelector(".profile_btn-name");

const token = localStorage.getItem("token");
let me = [];

if (!token) {
  window.location.pathname = "/";
} else {
  async function getMe() {
    await fetch("https://asadbek6035.pythonanywhere.com/account/me/", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          me.push(data.full_name);
          me.push(data.avatar);
          localStorage.setItem("me", JSON.stringify(me));
          profileBtnName.innerHTML = me[0];
          profileBtnAvatar.src = me[1];
        } else {
          console.error("Error:  not found in response", data);
        }
      })
      .catch((error) => console.error("Fetch error:", error));
  }

  getMe();
}
console.log(me);

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
      if (data && data.length > 0) {
        const reversedData = [...data].reverse();
        reversedData.forEach((blog) => {
          // console.log(blog);
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
  <img class="w-full h-[200px] rounded-t-lg" src="${
    blog?.image ? blog.image : "https://picsum.photos/200/300"
  }" alt="${blog.title}" />
  <div class="p-2 flex-grow">
    <h2 class="text-center text-lg">${blog.title}</h2>
    <p class="text-sm">${
      blog.description.length > 20
        ? blog.description.slice(0, 20) + "..."
        : blog.description
    }...</p>
  <a href="/pages/singleBlog.html?id=${
    blog.id
  }" class="text-blue-500 cursor-pointer">Batafsil</a>
  <a class="bg-yellow-600 text-white p-2 rounded-md w-1/4 text-center ml-auto block" href="/pages/blog.html?id=${
    blog.id
  }" >Edit</a>
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
